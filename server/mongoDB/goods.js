var mongoose = require('mongoose')

var goodsSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  salePrice: Number,
  productImage: String,
  productUrl: String,
})

module.exports = mongoose.model('Goods', goodsSchema)
