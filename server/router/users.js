const express = require('express')
const router = express.Router()
const UserDB = require('../mongoDB/users')
const jwt = require('jsonwebtoken')

router.post('/login', function(req, res, next) {
  console.log('用户名：' + req.body.username + '账户密码：' + req.body.password)
  let params = {
    userPwd: req.body.password,
    userName: req.body.username,
  }
  UserDB.findOne(params, function(err, db) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message,
      })
    } else {
      //请求成功
      if (db) {
        //生成token
        console.log('登录成功,用户id::', db.id)
        let secretPrivateKey = 'xiaomengying'
        let token = jwt.sign({ userId: db.id }, secretPrivateKey, {
          expiresIn: 60 * 60 * 1,
        })
        //保存token
        db.token = token
        db.save()
        res.json({
          status: 1,
          msg: '登录OK',
          result: {
            userName: db.userName,
            token: db.token,
            accountId: db.id,
          },
        })
      } else {
        res.json({
          status: 0,
          msg: '密码或账户错误',
        })
      }
    }
  })
})

module.exports = router
