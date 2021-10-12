const express = require("express");
const Oclass = require("../models/oclass");
const UrlPath = require("../models/urlPath");
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

router.route("/").get(async (req, res, next) => {
    try {
        res.render("./pay/pay");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
