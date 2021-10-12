const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (request, accessToken, refreshToken, profile, done) => {
        // console.log("google profile", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "google" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            console.log(profile);
            console.log(profile.id);
            console.log(profile._json);
            console.log("ggggg");
            const newUser = await User.create({
              userId: profile.id,
              userPwd: profile.id,
              userName: profile.displayName,
              userTel: profile.provider,
              userMail: profile._json.email,
              userAddr: profile.id,
              snsId: profile.id,
              provider: "google",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
