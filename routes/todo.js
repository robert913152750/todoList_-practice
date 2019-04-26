const express = require("express");
const router = express.Router();
const Todo = require("../models/todo2");

// 列出全部todo
router.get("/todos", (req, res) => {
  res.send("列出所有");
});

// 新增一筆todo頁面
router.get("/todos/new", (req, res) => {
  return res.render("new");
});

// 顯示一筆 Todo 的詳細內容
router.get("/todos/:id", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    return res.render("detail", { todo: todo });
  });
});

// 新增一筆  Todo
router.post("/todos", (req, res) => {
  const todo = Todo({
    name: req.body.name
  });

  todo.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

// 修改 Todo 頁面
router.get("/todos/:id/edit", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    return res.render("edit", { todo: todo });
  });
});

// 修改 Todo
router.put("/todos/:id", (req, res) => {
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
router.delete("/todos/:id/delete", (req, res) => {
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
