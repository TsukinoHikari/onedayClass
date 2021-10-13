const express = require("express");
const Oclass = require("../models/oclass");
const Op = require("sequelize").Op;
const { QueryTypes } = require("sequelize");
const Oclasspath = require("../models/index")

const { sequelize } = require("../models");
//검색

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//검색추가본
router.get("/", async (req, res) => {
  try {
    let keyword = req.query.query;
    
    const searchClass = await Oclass.findAll({
      where: {[Op.or]:[
        { classTitle: {
        [Op.like]: `%${keyword}%`,
      }},
        { classAddr: {
        [Op.like]: `%${keyword}%`,
      }},

      ]
      },
    });

    const image = await Oclasspath
    
    // for (let i = 0; i < searchClass.length; i++) {
    //   let sql = `SELECT * FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id INNER JOIN oclasses ON oclasspaths.OclassClassNum=oclasses.classNum WHERE oclasses.classNum=${searchClass[i].classNum} GROUP BY OclassClassNum;`;
    
    //   const classImage = await sequelize.query(sql, {
    //     type: QueryTypes.SELECT,
    //   });
      
    // }
    
    return res.render("search", { searchClass});
    console.log(classImage);
    // return res.json(searchClass);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
