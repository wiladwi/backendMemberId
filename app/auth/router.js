var express = require("express");
var router = express.Router();
const { signup, signin } = require("./controller");
const multerIntance = require("multer");
const { isLogin } = require("../middleware/auth");
const os = require("os");
  
router.post("/signup", signup);
router.post("/signin", signin);
        
module.exports = router;
