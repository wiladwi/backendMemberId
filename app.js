var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var methodOverride = require("method-override");
var cors = require("cors");
const server = require("http").createServer(app);
const socketIO = require('socket.io');
const swaggerSetup = require('./swagger');
const config = require("./config");

const io = socketIO(server);
const homeRouter = require("./app/home/router");
const rootRouter = require('./app/index.js')

const session = require("express-session");
const flash = require("connect-flash");


var app = express();
const URL = `/api`;
app.use(cors());

swaggerSetup(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(
  session({
    secret: config.jwtKey,
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
app.use(methodOverride("_method"));
app.use(flash());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));


// VIEWS ROUTES
app.use("/", homeRouter, cors());
// API
app.use('/', rootRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler


app.use(function (err, req, res, next) {
 
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  if (app.get("env") === "development") {
    app.locals.pretty = true;
  }

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
