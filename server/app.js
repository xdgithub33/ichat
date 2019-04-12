let express = require('express')
let app = express()
let path = require('path')

//引入路由
let usersRouter = require('./router/users')
let goodsRouter = require('./router/goods')

let indexRouter = require('./router/index')

// 处理请求的body和cookie
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')

//连接MongoDB数据库
let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/dumall')

mongoose.connection.on('connected', function() {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', function() {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected', function() {
  console.log('MongoDB connected disconnected.')
})

//nodejs显示html页面 ,需要引入相关路由
let ejs = require('ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

//使用 各个中间件
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/goods', goodsRouter)
app.use('/api/', indexRouter)

let server = app.listen(3000, function() {
  console.log('login success hahaha...')
})

let io = require('socket.io').listen(server)
io.sockets.on('connection', socket => {
  console.log('123')
})
//socket.io
io.on('connection', scoket => {
  scoket.on('message', data => {
    console.log('data:::', data)
    scoket.emit('backMessage', '我是服务器返回的数据' + data)
  })
})
