const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', {}) //连接index的页面（路径须正确）
})

module.exports = router
