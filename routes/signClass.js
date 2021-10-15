const express = require("express");
const Oclass = require("../models/oclass");
const UrlPath = require("../models/urlPath");
const Wishlist = require("../models/wishlist");
const OrderClass = require("../models/orderClass");
const OrderClassDetail = require("../models/orderClassDetail");
const Comment = require("../models/comment");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models");
const multer = require("multer");
const moment = require("moment");
const { QueryTypes } = require("sequelize");

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

router.get("/pay", isLoggedIn, async (req, res) => {
    try {
        const user = res.locals.user.userId;

        console.log(user);
        const sql1 = `SELECT urlpaths.path, oclasses.classTitle, oclasses.classContent, orderclasses.orderQty, oclasses.classPrice, oclasses.classNum, orderclasses.orderClassNum FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id INNER JOIN orderclasses ON oclasspaths.OclassClassNum=orderclasses.classNum INNER JOIN oclasses ON orderclasses.classNum=oclasses.classNum WHERE orderclasses.userId='${user}' GROUP BY OclassClassNum;`;
        const classImage = await sequelize.query(sql1, {
            type: QueryTypes.SELECT,
        }); // classImage = 이미지 url
        const orderClass = await OrderClass.findAll({
            include: [
                {
                    model: Oclass,
                },
            ],
            where: { userId: user },
        });
        //res.json(orderClass);
        res.render("pay/pay", { orderClass, classImage, title: "결제하기" });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.post("/pay", async (req, res) => {
    const { orderName, orderTel, totalPrice, classNum, orderclassnum } =
        req.body;
    try {
        const user = res.locals.user;

        if (typeof totalPrice == "object") {
            for (let i = 0; i < classNum.length; i++) {
                await OrderClassDetail.create({
                    orderName,
                    orderTel,
                    orderPrice: totalPrice[i],
                    classNum: classNum[i],
                    userId: user.userId,
                });

                await OrderClass.destroy({
                    where: { orderClassNum: orderclassnum[i] },
                });
            }
        } else {
            await OrderClassDetail.create({
                orderName,
                orderTel,
                orderPrice: totalPrice,
                classNum: classNum,
                userId: user.userId,
            });

            await OrderClass.destroy({
                where: { orderClassNum: orderclassnum },
            });
        }

        //console.log(orderName, orderTel, totalPrice, classNum, orderclassnum);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.post("/order/:id", isLoggedIn, async (req, res) => {
    try {
        const classNum = req.params.id;
        const user = res.locals.user;

        await OrderClass.create({
            userId: user.userId,
            orderClassDate: req.body.classdate,
            orderQty: req.body.applicants,
            classNum,
        });
        res.redirect("/signClass/pay");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const myClass = await Oclass.findOne({
            where: { classNum: req.params.id },
        });

        const sql = `SELECT oclasspaths.OclassClassNum, oclasspaths.UrlPathId, urlpaths.path FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id where OclassClassNum=${req.params.id};`;
        const { QueryTypes } = require("sequelize");
        const classPath = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
        });
        const id = req.params.id;
        const usercomments = await Comment.findAll({
            where: { classNum: id },
        });

        res.render("signClass/detailClass", {
            myClass,
            classPath,
            title: "클래스 상세보기",
            usercomments,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
/*
    /////////////////////
    ////////////////
    */

router.post("/:id", async (req, res) => {
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
        res.redirect("pay");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post("/:id/pay", async (req, res) => {
    try {
        res.render("pay/pay");
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.get("/delete/:id", async (req, res) => {
    try {
        await OrderClass.destroy({
            where: { orderClassNum: req.params.id },
        });

        res.redirect("/signClass/pay");
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

router.post("/:id/:commentnum/edit", async (req, res, next) => {
    try {
        let classnumber = req.params.id;
        let user = res.locals.user.userId;
        let commentnumber = req.params.commentnum;
        console.log(commentnumber);
        let { commentNumber } = req.body;

        const b = await Comment.findAll({
            where: { classNum: classnumber, userId: user },
        });
        // return res.json(b);
        if (typeof commentNumber == "object") {
            for (let i = 0; i < b.length; i++) {
                if (b[i].commentNum == commentnumber) {
                    await Comment.update(
                        {
                            commentContent: req.body.updateComment[i],
                            updatedAt: Date.now(),
                        },
                        { where: { commentNum: commentnumber } }
                    );
                }
            }
        } else {
            for (let i = 0; i < b.length; i++) {
                if (b[i].commentNum == commentnumber) {
                    await Comment.update(
                        {
                            commentContent: req.body.updateComment,
                            updatedAt: Date.now(),
                        },
                        { where: { commentNum: commentnumber } }
                    );
                }
            }
        }

        //
        /*
    4개의 댓글
    updateComment[몇번째가 들어가야되나요? 0~3]
    commentNumber는 랜덤
    */
        //return false;
        // let { commentNumber } = req.body;
        // const a = await Comment.findOne({ where: { commentNum: commentNumber } });
        //console.log(a);

        return res.redirect(`/signClass/${classnumber}`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.post("/:id/comment", async (req, res) => {
    try {
        let id = req.params.id;
        let user = res.locals.user.userId;
        let { comment } = req.body;

        user = res.locals.user.userId;
        // const classes = await Oclass.findOne({
        //   where: { classNum: id },
        // });
        console.log(id);
        console.log(user);
        console.log(comment);
        // return false;

        const a = await Comment.create({
            userId: user,
            classNum: id,
            commentContent: comment,
        });
        return res.redirect(`/signClass/${id}`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post("/:id/:commentnum/delete", async (req, res) => {
    try {
        let classnumber = req.params.id;
        let commentnumber = req.params.commentnum;
        await Comment.destroy({
            where: { commentNum: commentnumber },
        });

        return res.redirect(`/signClass/${classnumber}`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
