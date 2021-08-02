const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const Router = require('@koa/router')
const ejs = require('koa-ejs')
const log = require('../util/log')
const http = require('http')
const io = require('socket.io')

const app = new Koa
const router = new Router
const port = 3001
const server = http.createServer(app.callback())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:sshs21012@userdatabase.fxmzb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error))

ejs(app, {
    root: path.join('C:/Users/styki/OneDrive/바탕 화면/Test', 'static'),
    viewExt: 'ejs',
    layout: false
})

router.get('/', async (ctx, next) => {
    const rawContent = fs.readFileSync('./static/index.html').toString('utf8')
    ctx.body = rawContent
})

router.get('/about', async (ctx, next) => {
    const auther = 'Seonu'
    const ip_list = fs.readFileSync('./connection.log').toString('utf8')
    await ctx.render('about', { auther, ip_list })
})

router.get('/about/:naverId', async (ctx, next) => {
    const naverId = ctx.params.naverId
    await ctx.render('aboutUser', { naverId })
})

router.get('/chat', async (ctx, next) => {
    await ctx.render('chat')
})

router.get('/login',async (ctx, next) => {
    await ctx.render()
})

app.use(async (ctx, next) => {
    log.writeLogFile(ctx.request.ip)
    await next()
})

app.use(router.routes())
app.use(router.allowedMethods())


server.listen(port, () => {
    console.log('서버가 시작되었습니다!')
})
        
io(server).on('connect', (socket) => {
    console.log(`${socket.id} 클라이언트 연결됨!`)
    socket.emit('message', 'init')
    socket.on('message', (text) => {
        console.log('websocket', text)
        socket.emit('message', 'send_message')
    })
})