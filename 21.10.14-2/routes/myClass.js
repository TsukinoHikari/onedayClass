const express = require("express");
const Oclass = require("../models/oclass");
const Wishlist = require("../models/wishlist");
const { sequelize } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const user = res.locals.user.userId;
            const classes = await Oclass.findAll({
                where: { userId: user },
            });

            res.render("myClass", { classes });
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

//찜하기 요청(동욱) signclass파일로 옮겨서 주석처리함 (삭제 예정)
// router.post("/:id", isLoggedIn, async (req, res) => {
//     try {
//         id = req.params.id;
//         user = res.locals.user.userId;
//         const classes = await Oclass.findOne({
//             where: { classNum: id },
//         });
//         console.log(user);
//         console.log(classes.classNum); //
//         const wish = await Wishlist.findOne({
//             where: { classNum: classes.classNum },
//         });

//         if (wish) {
//             await Wishlist.destroy({ where: { classNum: classes.classNum } });
//             res.redirect("/myClass/" + id);
//         } else {
//             await Wishlist.create({
//                 userId: user,
//                 classNum: classes.classNum,
//             });
//             res.redirect("/myClass/" + id);
//         }
//     } catch (err) {
//         console.error(err);
//     }
// });

router.get("/:id/delete", async (req, res, next) => {
    try {
        const deleteClass = await Oclass.destroy({
            where: { classNum: req.params.id },
        });
        res.redirect("/myClass");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
