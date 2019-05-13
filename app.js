const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//載入 express-session 與 passport
const session = require("express-session");
const passport = require("passport");

//使用 express session
app.use(
  session({
    secret: "fjdklsk457" // secret: 定義一組自己的私鑰（字串)
  })
);
//使用passport
app.use(passport.initialize());
app.use(passport.session());

//載入 Passport config
require("./config/passport")(passport);

//登入後可以取得使用者的資訊方便我們在view使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//設定 body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//在express上使用handlebars當作模板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//設定method-override
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
app.use("/users", require("./routes/user"));

//設定 express port 3000
app.listen(3000, () => {
  console.log("App is running");
});
