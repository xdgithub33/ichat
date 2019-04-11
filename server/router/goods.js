const express = require('express')
const router = express.Router()
const GoodsCollection = require('../mongoDB/goods')
const jwt = require('jsonwebtoken')

router.get('/list', function(req, res, next) {
  //headers 里面开头自动变小写了！！
  const token = req.headers['x-require-token']
  const secretPrivateKey = 'xiaomengying'
  jwt.verify(token, secretPrivateKey, (err, data) => {
    console.log('data.userId::', data.userId)
    if (data.userId) {
      GoodsCollection.find({}, function(err, doc) {
        if (err) throw err
        // console.log('doc:::', doc)
        res.json({
          status: 200,
          msg: 'goods-ok',
          result: {
            list: doc,
          },
        })
      })
    } else {
      res.json({
        status: 500,
        msg: '账户已失效，请重新登录账户',
      })
    }
  })
})

module.exports = router
