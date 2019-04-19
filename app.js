const express = require("express");
const app = express();
const mongoose = require("mongoose");

//mongoose 連線
mongoose.connect("mongodb://localhost/todo2", { useNewUrlParser: true });

//mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection;

//資料庫連線狀態
db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

//載入 todo model
const Todo = require("./models/todo2");

//設定路由
app.get("/", (req, res) => {
  res.send("hi 123");
});

//設定 express port 3000
app.listen(3000, () => {
  console.log("App is running");
});
