const express = require("express");
const Oclass = require("../models/oclass");
const UrlPath = require("../models/urlPath");
const OrderClassDetail = require("../models/orderClassDetail");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { count } = require("../models/notice");
const db = require("../models");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.route("/").get(isLoggedIn, async (req, res, next) => {
    try {
        const payment = await OrderClassDetail.findAll({});

        res.render("./pay/endPay", { payment, title: "결제완료" });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
