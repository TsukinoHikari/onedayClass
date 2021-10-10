const express = require("express");
const Oclass = require("../models/oclass");
const UrlPath = require("../models/urlPath");
const Wishlist = require("../models/wishlist");
const OrderClass = require("../models/orderClass");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models");
const multer = require("multer");

OrderClass;
// 기타 express 코드

//여기부터
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { count } = require("../models/notice");
const db = require("../models");

//여기까지

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            res.render("signClass/detailClass");
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(
        // fields([{ name: "img" }, { name: "photos" }])
        // single('img')
        async (req, res, next) => {
            try {
            } catch (err) {
                console.error(err);
                next(err);
            }
        }
    );

router
    .route("/:id")
    .get(async (req, res) => {
        try {
            const myClass = await Oclass.findAll({
                where: { classNum: req.params.id },
            });

            const sql = `SELECT oclasspaths.OclassClassNum, oclasspaths.UrlPathId, urlpaths.path FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id where OclassClassNum=${req.params.id};`;
            const { QueryTypes } = require("sequelize");
            const classPath = await sequelize.query(sql, {
                type: QueryTypes.SELECT,
            });

            res.render("signClass/detailClass", {
                myClass,
                classPath,
                title: "클래스 상세보기",
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            res.redirect("/pay");
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.post("/:id/pay", async (req, res) => {
    try {
        const classNum = req.params.id;

        const user = res.locals.user;

        await OrderClass.create({
            userId: user.userId,
            orderClassDate: req.body.classdate,
            orderQty: req.body.applicants,
            classNum,
        });
        const oc = await OrderClass.findAll({});
        res.json({ oc });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post("/:id/wishlist", async (req, res) => {
    try {
        id = req.params.id;
        user = res.locals.user.userId;
        const classes = await Oclass.findOne({
            where: { classNum: id },
        });
        console.log(user);
        console.log(classes.classNum); //
        const wish = await Wishlist.findOne({
            where: { classNum: classes.classNum },
        });

        if (wish) {
            await Wishlist.destroy({ where: { classNum: classes.classNum } });
            res.redirect(`/signClass/${id}`);
        } else {
            await Wishlist.create({
                userId: user,
                classNum: classes.classNum,
            });
            res.redirect(`/signClass/${id}`);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
