const express = require("express");
const Notice = require("../models/notice");
const Admin = require("../models/admin");
const { sequelize } = require("../models");

//여기부터
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { count } = require("../models/notice");
//여기까지

const router = express.Router();

router.use((req, res, next) => {
    res.locals.admin = req.user;
    next();
});

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            let pageNum = req.query.page; // 요청 페이지 넘버
            let offset = 0;

            if (pageNum > 1) {
                offset = 10 * (pageNum - 1);
            }
            const sql = `SELECT @rownum:=@rownum+1 as no, b.* FROM notices b WHERE (@rownum:=0)=0 ORDER BY no desc limit 10 OFFSET ${offset};`;
            const { QueryTypes } = require("sequelize");
            const nums = await sequelize.query(sql, {
                type: QueryTypes.SELECT,
            });

            const sql2 = `SELECT @rownum:=@rownum+1 as no, b.* FROM notices b WHERE (@rownum:=0)=0 ORDER BY no desc;`;
            const nums2 = await sequelize.query(sql2, {
                type: QueryTypes.SELECT,
            });

            const totalPage = Object.keys(nums).length;
            const totalData = Object.keys(nums2).length;
            console.log(totalPage);
            console.log(totalData);
            console.log(nums);

            const notices = await Notice.findAll({
                order: [["noticeNum", "desc"]],
                offset: offset,
                limit: 10,
            });

            res.render("notice", {
                nums,
                notices,
                title: "공지사항",
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
        res.render("noticePost");
    } catch (error) {}
});
router.post("/post", (req, res, next) => {
    let body = req.body;
    Notice.create({
        noticeTitle: body.title,
        noticeContent: body.contents,
        adminId: body.writer,
        //adminId: req.login.adminid
    })
        .then((result) => {
            console.log("데이터추가 완료");
            res.redirect("/notice");
        })
        .catch((err) => {
            console.log("데이터추가 실패");
        });
});

router.get("/:id", async (req, res, next) => {
    try {
        const notice = await Notice.findAll({
            where: { noticeNum: req.params.id },
        });

        const a = notice[0].noticeView + 1;
        await Notice.update(
            {
                noticeView: a,
            },
            { where: { noticeNum: req.params.id } }
        );

        res.render("noticeDetail", { notice });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router
    .route("/:id/edit")
    .get(async (req, res, next) => {
        try {
            const notice = await Notice.findAll({
                where: { noticeNum: req.params.id },
            });

            res.render("noticeUpdate", { notice });
        } catch (error) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            let body = req.body;
            const notice = await Notice.update(
                {
                    noticeTitle: body.title,
                    noticeContent: body.content,
                },
                {
                    where: { noticeNum: req.params.id },
                }
            );
            res.redirect("/notice/" + req.params.id);
        } catch (error) {
            console.error(err);
            next(err);
        }
    });

router.get("/:id/delete", async (req, res, next) => {
    try {
        const notice = await Notice.destroy({
            where: { noticeNum: req.params.id },
        });

        res.redirect("/notice");
    } catch (error) {
        console.error(err);
        next(err);
    }
});
module.exports = router;
