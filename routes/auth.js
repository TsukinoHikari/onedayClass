const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const Admin = require("../models/admin");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const Auth = require("../models/emailauth");

const router = express.Router();
//const smtpTransport = require("nodemailer-smtp-transport");

//여기서부터 user
router.post("/join", async (req, res, next) => {
    const { userid, userpwd, username, usertel, usermail, useraddr } = req.body;
    
    try {
        const exUser = await User.findOne({ where: { userid } });
        if (exUser) {
            return res.redirect("/join?error=exist");
        }
        const hash = await bcrypt.hash(userpwd, 12);
        await User.create({
            userId:userid,
            userPwd: hash,
            userName:username,
            userMail:usermail,
            userTel:usertel,
            userAddr:useraddr,
        });
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        console.log(user);
        console.log(info);
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            //비회원 또는 비밀번호 불일치시 alert창 띄우고 로그인페이지 다시 불러오기
            res.writeHead(302, { "Content-Type": "text/html; charset=utf8" });
            res.write(`<script>alert('${info.message}')</script>`);
            return res.write('<script>window.location="../login"</script>'); //res.redirect(`/login`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/");
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});
//

//여기서 부터 admin
router.post("/admin", isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local", (authError, admin, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!admin) {
            res.writeHead(302, { "Content-Type": "text/html; charset=utf8" });
            res.write(`<script>alert('${info.message}')</script>`);
            return res.write('<script>window.location="../admin"</script>'); //res.redirect(`/login`);
        }
        return req.login(admin, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/notice");
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.post("/findidpwd", isNotLoggedIn, async (req, res, next) => {
    const { usermail } = req.body;
    try {
        const user = await User.findOne({
            // 1. 유저가 존재하면 유저 정보를 가져옴
            where: { usermail: usermail },
        });
        //console.log(user);
        if (user) {
            // 2. 유저가 있다면?
            let arr =
                "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z~,`,!,@,#,$,%,^,&,*;".split(
                    ","
                );
            createCode(arr, 10);
            console.log(createCode(arr, 10));
            function createCode(objArr, iLength) {
                let arr = objArr;
                let randomStr = "";
                for (let i = 0; i < iLength; i++) {
                    randomStr += arr[Math.floor(Math.random() * arr.length)];
                }
                return randomStr;
            }
            console.log(randomStr);
            randomStr;
            //임시비밀번호 생성 함수
            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    // 이메일을 보낼 계정 데이터 입력
                    user: process.env.USERMAIL,
                    pass: process.env.USERPASS,
                    // .env에 따로 관리해야함
                },
            });

            const mailOptions = {
                from: process.env.USERMAIL, // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
                to: usermail, // 수신 메일 주소
                subject: "비밀변호 분실 인증", // 제목
                text: "비밀번호 찾기 위한 인증 url입니다.", // 내용
                html:
                    `<p>비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요.<p>` +
                    "<p>" +
                    randomStr +
                    "</p>",
            };
            try {
                await transporter.verify();
                await transporter.sendMail(mailOptions);
                console.log("Email sent success!!!!");
                return res.redirect("/login");
            } catch (err) {
                console.error(err);
            }
        }
    } catch (e) {
        // try에서 result 결과값이 null일때 catch에서 에러로 잡지 않음 이유는?..
        res.send(e);
    }
});

router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
});
//

router.get("/kakao", passport.authenticate("kakao"));

router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    (req, res) => {
        res.redirect(`/`);
    }
);

module.exports = router;
