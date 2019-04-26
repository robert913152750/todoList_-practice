const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//設定 body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//在express上使用handlebars當作模板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//設定 method-override
app.use(methodOverride("_method"));

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

//載入路由器
app.use("/", require("./routes/home"));
app.use("/todos", require("./routes/todo"));

//設定 express port 3000
app.listen(3000, () => {
  console.log("App is running");
});
