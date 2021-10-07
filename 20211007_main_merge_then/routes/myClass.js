const express = require("express");
const Oclass = require("../models/oclass");
const { sequelize } = require("../models");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            user = res.locals.user.userId;
            const classes = await Oclass.findAll({
                where: { userId: user },
            });
            res.render("classRegi/myClass", { classes });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post();

router.get("/:id", async (req, res, next) => {
    try {
        console.log(req.params.id);
        const myClass = await Oclass.findAll({
            where: { classNum: req.params.id },
        });
        const sql = `SELECT oclasspaths.OclassClassNum, oclasspaths.UrlPathId, urlpaths.path FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id where OclassClassNum=${req.params.id};`;
        const { QueryTypes } = require("sequelize");
        const classPath = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
        });

        res.render("classRegi/myClassDetail", { myClass, classPath });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
