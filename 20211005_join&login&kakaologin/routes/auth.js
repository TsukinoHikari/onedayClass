const express = require("express");
const passport = require('passport');
const bcrypt = require("bcrypt");
const {isLoggedIn , isNotLoggedIn}= require('./middlewares')
const User = require("../models/user");
const nodemailer = require('nodemailer');
const Auth = require('../models/')
const router = express.Router();

router.post("/join", async (req, res, next) => {
  const { userid,userpwd, username, usertel, usermail, useraddr } = req.body;

  try {
    const exUser = await User.findOne({ where: { userid } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(userpwd, 12);
    await User.create({
      userid,
      userpwd: hash,
      username,
      usermail,
      usertel,
      useraddr,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});


router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      //비회원 또는 비밀번호 불일치시 alert창 띄우고 로그인페이지 다시 불러오기
      res.writeHead(302,{'Content-Type':'text/html; charset=utf8'})
      res.write(`<script>alert('${info.message}')</script>`);
      return res.write("<script>window.location=\"../login\"</script>");//res.redirect(`/login`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

// 아이디 비번찾기 (아직 하는중임 ㅠㅠ)
// router.post("/findidpwd", function(req, res, next){
//   const crypto = require('crypto');
//   let usermail = req.body.usermail;

//   const user =  User.findOne({ // 1. 유저가 존재하면 유저 정보를 가져옴
//     where: {usermail },
//   });
//   if (user) { // 2. 유저가 있다면?
//     const token = crypto.randomBytes(20).toString('hex'); // 3. token 생성(인증코드)
//     const data = {
//       // 4. 인증코드 테이블에 넣을 데이터 정리
//       token,
//       userid: user.id,
//       ttl: 300, // ttl 값 설정 (5분)
//     };
//     Auth.create(data); // 5. 인증 코드 테이블에 데이터 입력
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.USERMAIL,  // gmail 계정 아이디를 입력
//       pass: process.env.USERPASS,        // gmail 계정의 비밀번호를 입력
//     }
//   });

//   let mailOptions = {
//     from: process.env.USERMAIL,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
//     to: usermail ,                     // 수신 메일 주소
//     subject: 'Sending Email using Node.js',   // 제목
//     text: 'That was easy!' , // 내용,
//     html: `<p>비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요.</p>` +
//     `<a href='http://localhost:3001/?????/${token}'>비밀번호 새로 입력하기</a>`, ///???에 넣을꺼
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     }
//     else {
//       console.log('Email sent: ' + info.response);
//     }
//   });

//   res.redirect("/");
// }else{
//   res.redirect('/login')
// }});


router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});


router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect(`/`);
});

module.exports = router;
