const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const Admin = require("../models/admin");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const Auth = require("../models/");

const router = express.Router();

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

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
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
      return res.redirect(`/?loginError=${info.message}`);
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
    res.redirect("/");
  }
);

module.exports = router;
