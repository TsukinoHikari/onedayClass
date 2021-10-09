const express = require("express");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const User = require("../models/user");
const Oclass = require("../models/oclass");
const Wishlist = require("../models/wishlist");
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
  return res.render("myattendclasses", {
    title: "내가 참가한 클래스",
  });
});

router.get("/wishlist", isLoggedIn, async (req, res) => {
  try {
    const user = res.locals.user.userId;
    console.log(user);
    const wishlist = await Wishlist.findAll({
      include: [
        {
          model: Oclass,
          where: { userId: user },
          //   attributes: ["classTitle"],
        },
      ],
    });
    // return res.json(wishlist[0].Oclass.classTitle);
    for (let i = 0; i < wishlist.length; i++) {
      console.log(wishlist[i].Oclass.classTitle);
    }

    // return res.json(wishlist[0].wishNum);
    return res.render("wishlist", {
      title: "찜한 클래스",
      wishlist,
    });
  } catch (err) {
    console.error(err);
  }
});
router.get("/myClass", isLoggedIn, async (req, res) => {
  try {
    user = res.locals.user.userId;
    const classes = await Oclass.findAll({
      where: { userId: user },
    });
    res.render("classRegi/myClass", { classes });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const myClass = await Oclass.findAll({
      where: { classNum: req.params.id },
    });
    console.log(myClass);
    res.render("classRegi/myClassDetail", { myClass });
  } catch (error) {
    console.error(err);
    next(err);
  }
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
