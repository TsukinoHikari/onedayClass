const express = require("express");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { sequelize, UrlPath } = require("../models");

const User = require("../models/user");
const Oclass = require("../models/oclass");
const Wishlist = require("../models/wishlist");
const { QueryTypes } = require("sequelize");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get("/", isLoggedIn, async (req, res) => {
    try {
        const user = res.locals.user.userId;

        const sql1 = `SELECT oclasses.classNum,oclasses.classTitle, urlpaths.path FROM wishlists INNER JOIN oclasspaths ON wishlists.classNum = oclasspaths.OclassClassNum INNER JOIN oclasses ON wishlists.classNum=oclasses.classNum INNER JOIN urlpaths ON oclasspaths.UrlPathId=urlpaths.id WHERE wishlists.userId='${user}' GROUP BY OclassClassNum;`;
        const wishClass = await sequelize.query(sql1, {
            type: QueryTypes.SELECT,
        });

        return res.render("wishlist", {
            title: "찜한 클래스",
            wishClass,
        });
    } catch (err) {
        console.error(err);
    }
});

router.get("/myinfo", isLoggedIn, (req, res) => {
    return res.render("myinfo", { title: "내정보" });
});

router.get("/myattendclasses", isLoggedIn, async (req, res) => {
    try {
        const user = res.locals.user.userId;
        const sql2 = `SELECT orderclassdetails.classNum, orderclassdetails.orderName, orderclassdetails.orderTel, orderclassdetails.orderPrice, oclasses.classTitle, urlpaths.path FROM orderclassdetails INNER JOIN oclasspaths ON orderclassdetails.classNum = oclasspaths.OclassClassNum INNER JOIN oclasses ON orderclassdetails.classNum=oclasses.classNum INNER JOIN urlpaths ON oclasspaths.UrlPathId=urlpaths.id WHERE orderclassdetails.userId='${user}' GROUP BY orderClassDetailNum;`;
        const attendClass = await sequelize.query(sql2, {
            type: QueryTypes.SELECT,
        });

        return res.render("myattendclasses", {
            title: "내가 참가한 클래스",
            attendClass,
        });
    } catch (err) {
        console.error(err);
    }
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
        const user = res.locals.user.userId;
        const classes = await Oclass.findAll({
            where: { userId: user },
        });
        res.render("myClass", { classes });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get("/myClass/:id", async (req, res, next) => {
    try {
        console.log(req.params.id);
        const myClass = await Oclass.findAll({
            where: { classNum: req.params.id },
        });
        const sql = `SELECT oclasspaths.OclassClassNum, oclasspaths.UrlPathId, urlpaths.path FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id where OclassClassNum=${req.params.id};`;
        const { QueryTypes } = require("sequelize");
        const classPath = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
        });

        res.render("myClassDetail", { myClass, classPath });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.post("/myClass/:id", isLoggedIn, async (req, res) => {
    try {
        id = req.params.id;
        user = res.locals.user.userId;
        const classes = await Oclass.findOne({
            where: { classNum: id },
        });

        console.log(classes.classNum); //
        const wish = await Wishlist.findOne({
            where: { classNum: classes.classNum },
        });

        if (wish) {
            await Wishlist.destroy({ where: { classNum: classes.classNum } });
            res.redirect("/mypage/myClass/" + id);
        } else {
            await Wishlist.create({
                userId: user,
                classNum: classes.classNum,
            });
            res.redirect("/mypage/myClass/" + id);
        }
    } catch (err) {
        console.error(err);
    }
});

router.get("/myClass/:id/delete", async (req, res, next) => {
    try {
        const deleteClass = await Oclass.destroy({
            where: { classNum: req.params.id },
        });
        res.redirect("/mypage/myClass");
    } catch (err) {
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
        if (newpassword !== newpassword2 || userpwd === newpassword2) {
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
        //내정보수정
        res.writeHead(302, { "Content-Type": "text/html; charset=utf8" });
        res.write(`<script>alert('수정되었습니다..')</script>`);
        return res.write('<script>window.location="/"</script>');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
