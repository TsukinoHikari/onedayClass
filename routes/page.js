const express = require("express");
const { Auth, Category } = require("../models");
const Oclass = require("../models/oclass");

const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const { sequelize } = require("../models");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get("/login", isNotLoggedIn, (req, res) => {
    res.render("login", { title: "로그인" });
});
router.get("/findidpwd", isNotLoggedIn, (req, res) => {
    res.render("findidpwd", { title: "아이디/비밀번호 찾기" });
});
router.get("/resetidpw/:token", isNotLoggedIn, async (req, res) => {
    res.render("reset-password", { title: "비밀번호 재설정" });
});
router.get("/terms", (req, res) => {
    res.render("terms", { title: "이용약관" });
});
router.get("/privacy", (req, res) => {
    res.render("privacy", { title: "개인정보 처리 방침" });
});
// router.get("/mypage", isLoggedIn, (req, res) => {
//   res.render("mypage", { title: "내정보" });
// });
router.get("/prejoin", isNotLoggedIn, (req, res) => {
    res.render("prejoin", { title: "약관동의" });
});
router.get("/join", isNotLoggedIn, (req, res) => {
    res.render("join", { title: "회원가입" });
});
router.get("/join/complete", isNotLoggedIn, (req, res) => {
    res.render("joincomplete", { title: "가입완료" });
});

router.get("/qnas", isLoggedIn, (req, res) => {
    res.render("qna", { title: "질응답" });
});

router.get("/", async (req, res) => {
    try {
        const sql1 = `SELECT * FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id GROUP BY OclassClassNum;`;
        const { QueryTypes } = require("sequelize");
        const classImage = await sequelize.query(sql1, {
            type: QueryTypes.SELECT,
        });
        const categories = await Category.findAll({});
        const classes = await Oclass.findAll({});

        res.render("main", {
            title: "원데이클래스",
            classImage,
            classes,
            categories,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
