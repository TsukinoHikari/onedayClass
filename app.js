const express = require("express");
const cookieParser = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const nunjucks = require("nunjucks");
const passport = require("passport");

dotenv.config();
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const resetRouter = require("./routes/reset");
const mypageRouter = require("./routes/mypage");

const { sequelize } = require("./models");
const passportConfig = require("./passport");
const adminsRouter = require("./routes/admin");
const noticeRouter = require("./routes/notice");
const qnaRouter = require("./routes/qna");
const myClassRouter = require("./routes/myClass");
const classRegiRouter = require("./routes/classRegi");
const signClassRouter = require("./routes/signClass");
const payRouter = require("./routes/pay");
const categoryRouter = require("./routes/category");
//검색
const searchRouter = require("./routes/search");
// const indexRouter = require("./routes");
// const usersRouter = require("./routes/users");
// const classesRouter = require("./routes/classes");

const app = express();
passportConfig();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
});

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/reset", resetRouter);
app.use("/mypage", mypageRouter);

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/classes", classesRouter);

app.use("/admin", adminsRouter);
app.use("/notice", noticeRouter);
app.use("/qna", qnaRouter);
app.use("/classRegi", classRegiRouter);
//app.use("/myClass", myClassRouter);
app.use("/signClass", signClassRouter);
app.use("/pay", payRouter);
app.use("/category", categoryRouter);
//검색
app.use("/search", searchRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에 연결 성공!");
});
