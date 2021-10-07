const express = require("express");
const Admin = require("../models/admin");
const Oclass = require("../models/oclass");
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

try {
    fs.readdirSync("uploads");
} catch (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads/");
        },
        filename(req, file, cb) {
            writer = req.body.writer;
            title = req.body.title;
            const ext = path.extname(file.originalname);
            cb(
                null,
                Date.now() +
                    path.basename(file.originalname, ext) +
                    "_" +
                    writer +
                    "_" +
                    title +
                    ext
            );
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            writer = res.locals.user.userId;
            console.log(writer);
            res.render("classRegi/classRegi");
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(
        // fields([{ name: "img" }, { name: "photos" }])
        // single('img')
        upload.array("img"),
        async (req, res, next) => {
            try {
                const fileNum = req.files.length;
                for (let i = 0; i < fileNum; i++) {
                    console.log(req.files[i].filename);
                }

                console.log("//////////////////////////////////////");
                writer = res.locals.user.userId;
                body = req.body;
                Oclass.create({
                    userId: writer,
                    classTitle: body.title,
                    classAddr: body.addr,
                    classPrice: body.price,
                    classQty: body.qty,
                    classContent: body.content,
                });
                res.redirect("/");
            } catch (err) {
                console.error(err);
                next(err);
            }
        }
    );

module.exports = router;
