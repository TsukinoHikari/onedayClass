//테스트용 임시 파일 입니다.

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello was");
});

app.listen(3000, () => {
  console.log("3000");
});
