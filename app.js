const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

//在express上使用handlebars當作模板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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
// todo 首頁
app.get("/", (req, res) => {
  return res.render("index");
});
// 列出全部todo
app.get("/todos", (req, res) => {
  res.send("列出所有");
});
// 新增一筆todo頁面
app.get("/todos/new", (req, res) => {
  res.send("新增todo頁面");
});
// 顯示一筆 Todo 的詳細內容
app.get("/todos/:id", (req, res) => {
  res.send("顯示todo的詳細內容");
});
// 新增一筆  Todo
app.post("/todos", (req, res) => {
  res.send("建立todo");
});
// 修改 Todo 頁面
app.get("/todos/:id/edit", (req, res) => {
  res.send("修改todo頁面");
});
// 修改 Todo
app.post("/todos/:id", (req, res) => {
  res.send("修改todo");
});
// 刪除 Todo
app.post("/todos/:id/delete", (req, res) => {
  res.send("刪除 todo");
});

//設定 express port 3000
app.listen(3000, () => {
  console.log("App is running");
});
