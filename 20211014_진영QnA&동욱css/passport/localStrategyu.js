const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                //userid는 안되고 usermail은 왜 될까?
                usernameField: "userid",
                passwordField: "userpwd",
            },
            async (userId, userpwd, done) => {
                try {
                    const exUser = await User.findOne({ where: { userId } });
                    if (exUser) {
                        const result = await bcrypt.compare(
                            userpwd,
                            exUser.userPwd
                        );
                        if (result) {
                            console.log(exUser);
                            done(null, exUser);
                        } else {
                            done(null, false, {
                                message: "비밀번호가 일치하지 않습니다.",
                            });
                        }
                    } else {
                        done(null, false, {
                            message: "가입되지 않은 회원입니다.",
                        });
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
