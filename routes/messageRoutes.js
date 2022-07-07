const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userController')

router.get('/', (req,res)=>{
    res.json('HI')
})

// user register
router.post('/api/register',usersController.register)

module.exports = router