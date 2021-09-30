const express = require("express");
const path = require("path");
const morgan = require("morgan");
const ejs = require("ejs");
const fs = require("fs");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "onedayclass",
    dateStrings: "date",
});
// const { sequelize } = require("./models");
// const indexRouter = require("./routes");
// const usersRouter = require("./routes/users");
// const commentsRouter = require("./routes/comments");

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected");
//     const sql = "select * from user";
//     con.query(sql, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });

const app = express();
app.set("port", process.env.PORT || 3001);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// sequelize
//     .sync({ force: false })
//     .then(() => {
//         console.log("데이터베이스 연결 성공");
//     })
//     .catch((err) => {
//         console.error(err);
//     });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/comments", commentsRouter);

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views/form.html"));
});
app.post("/", (req, res) => {
    const sql = "INSERT INTO oclass SET ?";

    con.query(sql, req.body, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send("등록이 완료 되었습니다");
    });
});

app.get("/", (req, res) => {
    const sql = "select * from oclass";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render("index", { user: result });
    });
});

// fs.readFile("index.ejs", "utf-8", (error, data) => {
//     con.query("SELECT * FROM user", (error, results) => {
//         res.send(ejs.render(data, { data: results }));
//     });
// });

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
    console.log(app.get("port"), "번 포트에서 대기 중");
});
