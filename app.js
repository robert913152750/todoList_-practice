const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

//設定 body-parser
app.use(bodyParser.urlencoded({ extended: true }));

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
  Todo.find((err, todos) => {
    if (err) return console.error(err);
    return res.render("index", { todos: todos });
  });
});
// 列出全部todo
app.get("/todos", (req, res) => {
  res.send("列出所有");
});
// 新增一筆todo頁面
app.get("/todos/new", (req, res) => {
  return res.render("new");
});
// 顯示一筆 Todo 的詳細內容
app.get("/todos/:id", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    return res.render("detail", { todo: todo });
  });
});

// 新增一筆  Todo
app.post("/todos", (req, res) => {
  const todo = Todo({
    name: req.body.name
  });

  todo.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

// 修改 Todo 頁面
app.get("/todos/:id/edit", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    return res.render("edit", { todo: todo });
  });
});

// 修改 Todo
app.post("/todos/:id", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    todo.name = req.body.name;
    if (req.body.done === "on") {
      todo.done = true;
    } else {
      todo.done = false;
    }
    todo.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/todos/${req.params.id}`);
    });
  });
});
// 刪除 Todo
app.post("/todos/:id/delete", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    todo.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

//設定 express port 3000
app.listen(3000, () => {
  console.log("App is running");
});
