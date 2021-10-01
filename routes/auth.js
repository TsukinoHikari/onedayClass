const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post("/join", async (req, res, next) => {
  const { userid, userpwd, username, usertel, usermail, useraddr } = req.body;

  try {
    const exUser = await User.findOne({ where: { userid } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(userpwd, 12);
    await User.create({
      userid,
      userpwd: hash,
      username,
      usermail,
      usertel,
      useraddr,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
