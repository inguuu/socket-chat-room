var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '채팅방입니다.!' });
});

router.use("/room", require("./room"));
module.exports = router;
