const express = require("express");
const router = express.Router();
const Todo = require("../models/todo2");

// 載入 auth middleware
const { authenticated } = require("../config/auth");

// 列出全部todo
router.get("/", authenticated, (req, res) => {
  res.send("列出所有");
});

// 新增一筆todo頁面
router.get("/new", authenticated, (req, res) => {
  return res.render("new");
});

// 顯示一筆 Todo 的詳細內容
router.get("/:id", authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    return res.render("detail", { todo: todo });
  });
});

// 新增一筆  Todo
router.post("/", authenticated, (req, res) => {
  const todo = Todo({
    name: req.body.name
  });

  todo.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

// 修改 Todo 頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    return res.render("edit", { todo: todo });
  });
});

// 修改 Todo
router.put("/:id", authenticated, (req, res) => {
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
router.delete("/:id/delete", authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    todo.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

//設定 /todos 路由
module.exports = router;
