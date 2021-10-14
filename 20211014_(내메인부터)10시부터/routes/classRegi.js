const express = require("express");
const Admin = require("../models/admin");
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
const { body } = require("express-validator");

//여기까지

const router = express.Router();

router.use((req, res, next) => {
    if (req.user) {
        res.locals.user = req.user;
        next();
    } else {
        res.redirect("/login");
    }
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
            const writer = res.locals.user.userId;
            res.render("classRegi/classRegi", { title: "클래스 등록하기" });
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
                writer = res.locals.user.userId;
                const body = req.body;

                await Oclass.create({
                    userId: writer,
                    classTitle: body.title,
                    classAddr: body.addr,
                    classPrice: body.price,
                    classQty: body.qty,
                    classContent: body.content,
                    classDate: body.date,
                    categoryNum: body.category,
                });

                const ocNum = await Oclass.findOne({
                    where: {
                        userId: writer,
                        classTitle: body.title,
                        classAddr: body.addr,
                        classPrice: body.price,
                        classQty: body.qty,
                        classContent: body.content,
                    },
                });
                const oclassclassnumber = ocNum.classNum;

                const upFilenames = [];
                const fileNum = req.files.length;
                for (let i = 0; i < fileNum; i++) {
                    upFilenames.push(req.files[i].filename);
                    const urlpath = await UrlPath.create({
                        path: req.files[i].filename,
                    });

                    db.sequelize.models.oClassPath.create({
                        UrlPathId: urlpath.id,
                        OclassClassNum: oclassclassnumber,
                    });
                }

                res.redirect("/");
            } catch (err) {
                console.error(err);
                next(err);
            }
        }
    );

module.exports = router;
