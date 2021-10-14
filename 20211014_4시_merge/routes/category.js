const express = require("express");
const { Auth, Category } = require("../models");
const Oclass = require("../models/oclass");

const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const { sequelize } = require("../models");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/:id", async (req, res) => {
  try {
    const categoryNumber = req.params.id; // 카테고리 넘버
    const thisCategory = await Category.findOne({
      where: { categoryNum: categoryNumber },
    }); // 현재 카테고리의 클래스들 가져옴
    const thisCateName = thisCategory.categoryName; // 현재 카테고리 이름 (타이틀에 쓸거)

    const sql1 = `SELECT * FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id INNER JOIN oclasses ON oclasspaths.OclassClassNum=oclasses.classNum WHERE oclasses.categoryNum=${categoryNumber} GROUP BY OclassClassNum;`;
    const { QueryTypes } = require("sequelize");
    const classImage = await sequelize.query(sql1, {
      type: QueryTypes.SELECT,
    }); // classImage = 이미지 url

    const categories = await Category.findAll({}); // 카테고리 메뉴위함
    const thisCateClass = await Oclass.findAll({
      where: { categoryNum: categoryNumber },
    }); // 현재 카테고리 클래스들

    res.render("category/category", {
      categories, // 카테고리 메뉴위함
      title: thisCateName,
      thisCateName,
      classImage,
      thisCateClass,
    });

    // const categoryNumber = req.params.id;
    // const thisCategory = await Category.findOne({
    //     where: { categoryNum: categoryNumber },
    // });
    // const thisCateName = thisCategory.categoryName;

    // const sql1 = `SELECT * FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id GROUP BY OclassClassNum;`;
    // const { QueryTypes } = require("sequelize");
    // const classImage = await sequelize.query(sql1, {
    //   type: QueryTypes.SELECT,
    // });

    // const categories = await Category.findAll({});
    // const thisCateClass = await Oclass.findAll({
    //   where: { categoryNum: categoryNumber },
    // });
    // console.log(thisCateClass);
    // res.render("category/category", {
    //   categories,
    //   title: thisCateName,
    //   thisCateName,
    //   classImage,
    // });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
