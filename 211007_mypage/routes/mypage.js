const express = require("express");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
router.get("/main", isLoggedIn, (req, res) => {
  res.render("mypage", { title: "내정보" });
});
router.get("/myinfo", isLoggedIn, (req, res) => {
  return res.render("myinfo", { title: "내정보" });
});
router.get("/myattendclasses", isLoggedIn, (req, res) => {
  return res.render("myattendclasses", { title: "내가 참가한 클래스" });
});
router.get("/myhostclasses", isLoggedIn, (req, res) => {
  return res.render("myhostclasses", { title: "내가 등록한 클래스" });
});

router.post("/resetinfo", isLoggedIn, async (req, res) => {
  console.log("콘솔찍히는중!");

  const {
    userpwd,
    newpassword,
    newpassword2,
    username,
    usermail,
    usertel,
    useraddr,
  } = req.body;
  console.log(userpwd);
  console.log(username);
  console.log(usermail);
  console.log(usertel);
  console.log(useraddr);
  console.log(newpassword);
  console.log(newpassword2);

  try {
    const exUser = await User.findOne({
      where: { userId: res.locals.user.dataValues.userId },
    });

    //현재비밀번호가 db에 비밀번호랑 일치하는지 확인하는건 구현못함
    //그냥 새 비밀번호만 입력하면 되는 구조임 ㅠ
    if (newpassword !== newpassword2 && userpwd === newpassword2) {
      return false;
    }
    if (exUser) {
      const hash = await bcrypt.hash(newpassword2, 12);
      await User.update(
        {
          userPwd: hash,
          userName: username,
          userMail: usermail,
          userTel: usertel,
          userAddr: useraddr,
        },
        { where: { userId: res.locals.user.dataValues.userId } }
      );
    }
    return res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
