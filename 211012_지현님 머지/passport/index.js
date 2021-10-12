const passport = require("passport");
const localu = require("./localStrategyu");
const locala = require("./localStrategya");

const kakao = require("./kakaoStrategy");
const google = require("./googleStrategy");
const User = require("../models/user");
const Admin = require("../models/admin");

// 저희 이름 좀 상의할까요?
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });
  passport.deserializeUser((userId, done) => {
    User.findOne({ where: { userId } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  // passport.serializeUser((admin, done) => {
  //     done(null, admin.adminId);
  // });
  // passport.deserializeUser((adminId, done) => {
  //     Admin.findOne({ where: { adminId } })
  //         .then((admin) => done(null, admin))
  //         .catch((err) => done(err));
  // });

  localu();
  //locala();
  kakao();
  google();
};
