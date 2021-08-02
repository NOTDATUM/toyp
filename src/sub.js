const express = require('express')
const app = express()
const route = require('./sub_router.js')
const bodyParser = require('body-parser')
const expressSession = require('express-session');
const passport = require('./sub_passport.js')
const flash = require('connect-flash')
 
app.set('views', __dirname + '/public')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
 
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(expressSession({
    secret: 'my Key',
    resave: true,
    saveUninitialized:true
}))
 
app.use('/', route)
 
app.listen(8001, () => {
    console.log("server started")
})