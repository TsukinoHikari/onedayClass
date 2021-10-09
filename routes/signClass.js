const express = require("express");
const Oclass = require("../models/oclass");
const UrlPath = require("../models/urlPath");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models");
const multer = require("multer");
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

router.get("/:id", async (req, res) => {
    try {
        const myClass = await Oclass.findAll({
            where: { classNum: req.params.id },
        });
        const sql = `SELECT oclasspaths.OclassClassNum, oclasspaths.UrlPathId, urlpaths.path FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id where OclassClassNum=${req.params.id};`;
        const { QueryTypes } = require("sequelize");
        const classPath = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
        });

        res.render("signClass/detailClass", { myClass, classPath });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
