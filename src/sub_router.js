const express = require('express')
const router = express.Router()
const passport = require('./sub_passport.js')
 
router.get('/', (req, res) => {
    res.render('login', {title: "인덱스"})
})

router.post('/', passport.authenticate('local-login', {
    successRedirect : '/loginSuccess', 
    failureRedirect : '/loginFail', 
    failureFlash : true 
}))
 
router.get('/loginSuccess', (req, res) => {
    res.render('logins')
})
router.get('/loginFail', (req, res) => {
    res.render('loginf')
})
 
 
module.exports = router