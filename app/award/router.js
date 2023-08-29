var express = require("express");
var router = express.Router();
const { findList } = require("./controller");
const { isLogin } = require("../middleware/auth");

router.get("/", isLogin, findList);
        
module.exports = router;
