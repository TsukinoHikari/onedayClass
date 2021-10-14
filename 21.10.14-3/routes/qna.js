//
const express = require("express");
//express require 모듈 불러오기
const Qna = require("../models/qna");
//models/Qna 선언 requires 불러오기
const User = require("../models/user");
//models/User 선언 requires 불러오기
const Admin = require("../models/admin");
//Admin 선언 및 모듈 가져오기
const Answer = require("../models/answer");
//Answer 선언 및 모듈 가져오기
const { sequelize } = require("../models");
//sequelize 선언

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
//로그인 및 비로그인 선언
const { count } = require("../models/qna");

const router = express.Router();
//route/router선언 값은 express라우터

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.use((req, res, next) => {
    res.locals.admin = req.user;
    next();
});

//라우터는

router
    .route("/")
    //요청하다 요청 응답 다음
    .get(async (req, res, next) => {
        try {
            // pageNum 선언
            let pageNum = req.query.page; // 요청 페이지 넘버
            //offset 선언
            let offset = 0;

            //if문 페이지넘버가 1보다 작다면
            if (pageNum > 1) {
                //offset = 10 * (페이지넘버 -1)
                offset = 10 * (pageNum - 1);
            }
            //sql 에서 선택해라
            const sql = `SELECT @rownum:=@rownum+1 as no, b.* FROM qnas b WHERE (@rownum:=0)=0 ORDER BY no desc limit 10 OFFSET ${offset};`;

            const { QueryTypes } = require("sequelize");

            const nums = await sequelize.query(sql, {
                type: QueryTypes.SELECT,
            });

            const sql2 = `SELECT @rownum:=@rownum+1 as no, b.* FROM qnas b WHERE (@rownum:=0)=0 ORDER BY no desc;`;

            const nums2 = await sequelize.query(sql2, {
                type: QueryTypes.SELECT,
            });

            const sql3 = `SELECT @rownum:=@rownum+1 as no, b.* FROM answers b WHERE (@rownum:=0)=0 ORDER BY no desc limit 10 OFFSET ${offset};`;
            const nums3 = await sequelize.query(sql3, {
                type: QueryTypes.SELECT,
            });

            const sql4 = `SELECT @rownum:=@rownum+1 as no, b.* FROM answers b WHERE (@rownum:=0)=0 ORDER BY no desc;`;
            const nums4 = await sequelize.query(sql4, {
                type: QueryTypes.SELECT,
            });

            //총괄 페이지 선언 = 제목.키
            const totalPage = Object.keys(nums, nums3).length;
            const totalData = Object.keys(nums2, nums4).length;
            console.log(totalPage);
            console.log(totalData);
            console.log(nums);

            const qnas = await Qna.findAll({
                order: [["qnaNum", "desc"]],
                offset: offset,
                limit: 10,
            });

            const answers = await Answer.findAll({
                order: [["answerNum", "desc"]],
                offset: offset,
                limit: 10,
            });

            res.render("qna", {
                nums,
                qnas,
                answers,
                title: "질응답",
                totalPage,
                totalData,
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })

    .post(async (req, res, next) => {
        try {
            console.log(1);
        } catch (error) {
            console.error(err);
            next(err);
        }
    });

router.get("/post", (req, res, next) => {
    try {
        res.render("qnaPost");
    } catch (error) {}
});
router.post("/post", (req, res, next) => {
    let body = req.body;
    Qna.create({
        userId: body.writer,
        qnaTitle: body.title,
        qnaContent: body.contents,
    })
        .then((result) => {
            console.log("데이터추가 완료");
            res.redirect("/qna");
        })
        .catch((err) => {
            console.log("데이터추가 실패");
            console.error(err);
        });
});

router.get("/:id", async (req, res, next) => {
    try {
        const qna = await Qna.findAll({
            where: { qnaNum: req.params.id },
        });
        res.render("qnaDetail", { qna });
    } catch (error) {
        console.error(err);
        next(err);
    }
});

router.get("/:id/answer", (req, res, next) => {
    try {
        res.render("answer");
    } catch (error) {}
});

router.post("/post", (req, res, next) => {
    let body = req.body;
    Answer.create({
        adminId: body.writer,
        answerContent: body.contents,
    })
        .then((result) => {
            console.log("데이터추가 완료");
            res.redirect("/qna");
        })
        .catch((err) => {
            console.log("데이터추가 실패");
            console.error(err);
        });
});

router
    .route("/:id/edit")
    .get(async (req, res, next) => {
        try {
            const qna = await Qna.findAll({
                where: { qnaNum: req.params.id },
            });

            res.render("qnaUpdate", { qna });
        } catch (error) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            let body = req.body;
            const qna = await Qna.update(
                {
                    qnaTitle: body.title,
                    qnaContent: body.content,
                },
                {
                    where: { qnaNum: req.params.id },
                }
            );
            res.redirect("/qna/" + req.params.id);
        } catch (error) {
            console.error(err);
            next(err);
        }
    });

// router.get("/:id/answer", (req, res, next) => {
//     try {
//         res.render("answer");
//     } catch (error) {}
// });
// router.post("/post", (req, res, next) => {
//     let body = req.body;
//     Answer.create({
//         adminId: body.writer,
//         answerContent: body.contents,
//     })
//         .then((result) => {
//             console.log("데이터추가 완료");
//             res.redirect("/qna");
//         })
//         .catch((err) => {
//             console.log("데이터추가 실패");
//             console.error(err);
//         });
// });

router.get("/:id/delete", async (req, res, next) => {
    try {
        const qna = await Qna.destroy({
            where: { qnaNum: req.params.id },
        });

        res.redirect("/qna");
    } catch (error) {
        console.error(err);
        next(err);
    }
});
module.exports = router;
