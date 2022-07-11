const User = require('../models/user')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const usersController ={}

usersController.register =(req,res)=>{
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
}

// usersController.login =(req,res)=>{
//     console.log("i am here")
//     const body = req.body
    
//     User.findOne({email : body.email})
//     .then((user)=>{
//         if(user){
//             //res.json(user)
//             comparepassword(body.password,user.password)
//                 .then((result)=>{
//                     // res.send(result)
//                     if(result){
//                         //res.send("email password matches")
//                         const tokenData ={
//                             id : user._id
//                         }
//                         const token = jwt.sign(tokenData,'dct@123',{expiresIn : '2d'})

//                         let options = {
//                             maxAge: 1000 * 60 * 15, // would expire after 15 minutes
//                             httpOnly: true, // The cookie only accessible by the web server
//                             signed: true // Indicates if the cookie should be signed
//                         }

//                         // Set cookie
//                         res.cookie('MessageAuth', 'token', options) // options is optional
//                         res.send('User loggedin successfully')
//                     }else {
//                         res.send('password does not match')
//                     }
//                 })
//                 .catch((err)=>{
//                     res.json(err)
//                 })
//         }else{
//             res.json({error : 'Invalid email /password'})
//         }
//     })
//     .catch((err)=>{
//         res.json(err)
//     })


// }

usersController.login = async (req,res)=>{
   
    const body = req.body
    
    
    User.findOne({email : body.email})
    .then((user)=>{
        if(user){
            //res.json(user)
            
           
            bycrpt.compare(body.password,user.password)
                .then((result)=>{
                    if(result){
                        //res.send("email password matches")
                        const tokenData ={
                            id : user._id
                        }
                        const token = jwt.sign(tokenData,'pratheek@123',{expiresIn : '2d'})
                        

                        let options = {
                            maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                            httpOnly: true, // The cookie only accessible by the web server
                            signed: true // Indicates if the cookie should be signed
                        }
                        
                        // Set cookie
                        res.cookie('token', token,{
                            httpOnly : true,
                            maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                            // secure : true , //only works on https
                        }) // options is optional
                        
                        res.send('User loggedin successfully')
                    }else {
                        res.send('password does not match')
                    }
                })
                .catch((err)=>{
                    
                    res.json(err)
                    
                })
        }else{
            res.json({error : 'Invalid email /password'})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}


module.exports = usersController