const express = require("express");
const Oclass = require("../models/oclass");

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
        console.log(myClass);
        res.render("classRegi/myClassDetail", { myClass });
    } catch (error) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
