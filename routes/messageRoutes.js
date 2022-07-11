const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userController')

router.post('/', (req,res)=>{
    res.json('HI')
})

// user register
router.post('/api/register',usersController.register)
router.post('/api/login',usersController.login)


module.exports = router