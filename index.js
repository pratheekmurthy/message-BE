const express = require('express')  
const app = express()

const Port = 4000
app.use(express.json())


app.listen(Port,()=>{
    console.log(" server is running on ",Port)
})
