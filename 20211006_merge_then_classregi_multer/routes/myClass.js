const express = require("express");
const Admin = require("../models/admin");
const Oclass = require("../models/oclass");
const { sequelize } = require("../models");

//여기부터
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { count } = require("../models/notice");
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
    .post
    // fields([{ name: "img" }, { name: "photos" }])
    // single('img')
    // upload.array("img"),
    // async (req, res, next) => {
    //     try {
    //         Oclass.create({
    //             userId: body.writer,
    //             classTitle: body.title,
    //             classAddr: body.addr,
    //             classPrice: body.price,
    //             classQty: body.qty,
    //             classContent: body.content,
    //         });
    //         res.redirect("/");

    //         console.log(1);
    //     } catch (err) {
    //         console.error(err);
    //         next(err);
    //     }
    // }
    ();

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
