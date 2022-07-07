const express = require('express')  
const configureDB = require('./database/db')
const router = require('./routes/messageRoutes')
const app = express()
const Port = 4000


configureDB()
app.use(express.json())
app.use(router)


app.listen(Port,()=>{
    console.log(" server is running on ",Port)
})
