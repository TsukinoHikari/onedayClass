const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const Auth = require("../models/emailauth");
const router = express.Router();

// router.post("/reset-password/", isNotLoggedIn, (req, res) => {
//   console.log(req.params.token);
//   // async.waterfall([
//   //     function(done){
//   //         Auth.findOne({
//   //             token: req.params.token,
//   //         }).then((Auth)=>{
//   //         const
//   //         })
//   //     }

//   // 입력받은 token 값이 Auth 테이블에 존재하며 아직 유효한지 확인

//   // 유저데이터 호출

//   // 유저 비밀번호 업데이트
// });

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect(`/`);
  }
);

module.exports = router;
