const express = require("express");
const Oclass = require("../models/oclass");
const Op = require("sequelize").Op;

//검색

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//검색
router.get("/", async (req, res) => {
  try {
    let keyword = req.query.query;

    const searchClass = await Oclass.findAll({
      where: {
        classTitle: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });
    // return res.json(searchClass);
    res.render("search", { searchClass });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
