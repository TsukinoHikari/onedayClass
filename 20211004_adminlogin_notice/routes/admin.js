const express = require("express");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

// load();
// function load() {
//     const password = 1234;
//     const hash = bcrypt.hash(password, 12);
//     Admin.create({
//         adminId: "admin",
//         adminPwd: hash,
//         adminName: "비대면수업",
//         adminTel: "010-1234-4567",
//         adminMail: "gg@naver.com",
//     });
// }

router
    .get("/", async (req, res, next) => {
        try {
            res.render("adminLogin", { title: "관리자로그인" });
        } catch (error) {
            console.error(err);
            next(err);
        }
    })
    .post("/", isLoggedIn, async (req, res, next) => {
        try {
            // console.log(admin);
            res.status(201).json(admin);
        } catch (error) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
