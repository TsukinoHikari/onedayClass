const express = require("express");
const Oclass = require("../models/oclass");
const UrlPath = require("../models/urlPath");
const Wishlist = require("../models/wishlist");
const Comment = require("../models/comment");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models");
const multer = require("multer");
const moment = require("moment");
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

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      let id = req.params.id;
      const myClass = await Oclass.findAll({
        where: { classNum: req.params.id },
      });
      const sql = `SELECT oclasspaths.OclassClassNum, oclasspaths.UrlPathId, urlpaths.path FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id where OclassClassNum=${req.params.id};`;
      const { QueryTypes } = require("sequelize");
      const classPath = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
      });
      //유저댓글들 표시
      // const classes = await Oclass.findOne({
      //     where: { classNum: id },
      // });
      const usercomments = await Comment.findAll({
        where: { classNum: id },
      });
      // return res.json(usercomments)

      res.render("signClass/detailClass", { myClass, classPath, usercomments });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res) => {
    try {
      const params = req.params.id;
      res.redirect("/pay");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.post("/:id/pay", async (req, res) => {
  try {
    const params = req.params.id;
    res.redirect("/pay");
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
