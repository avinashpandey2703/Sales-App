
// import express
const express = require('express');
// Importing Cors
const cors = require('cors');
// Import jwt token
const JWT=require('jsonwebtoken');


// import PORT from config.js
const { PORT,SECRET_JWT } = require('./config')
const { MONGODB_URL } = require('./config')
// import Mongoose
const MONGODB = require('mongoose')
//Import middleware
const MiddleWare=require('./MiddleWare/RouteProtectedMW')

//Importing Schema file
require('./Models/userModels')
require('./Models/salesModel')
// here we are importing  database
const UserModel = MONGODB.model('SalesAppUserData')
const salesModel=MONGODB.model('SalesDataModel')

// express does not allow access to other origin
const app = express();
 // cors is allow to other origin 
app.use(cors());
// aplying json( )as middleware
app.use(express.json());

// here exports bycrypt
const bcryptjs = require('bcryptjs');

// DataBase connection
MONGODB.connect(MONGODB_URL)

MONGODB.connection.on("connected", () => {
    console.log("MongoDB connected")
})
MONGODB.connection.on("error", () => {
    console.log("MongoDB Error")
})





app.post("/userregister", (req, response) => {

    // try catch
    try {
        const { Firstname, Lastname, email, password } = req.body;
        // validation
        if (!Firstname || !Lastname || !email || !password) {
            response.status(400).json({ error_msg: "All fields are mendatory" })
        }
        // validation to check whether the user is already registered
        UserModel.findOne({ email: email })
            .then((userFounded) => {
                if (userFounded) {
                    response.status(400).json({ userError: "User is already registered" })
                }
                else {
                    // change the password input to bcrypted password
                    bcryptjs.hash(password, 10)
                        .then((bcryptedpassword) => {
                            // here we are creating new user and store  data
                            const NewRegisterUser = new UserModel({
                                Firstname: Firstname,
                                Lastname: Lastname,
                                email: email,
                                password: bcryptedpassword
                            });
                            NewRegisterUser.save()
                                .then(() => {
                                    response.status(200).json({ regis_Success: "Registration Successful" })
                                })
                                .catch(err => {

                                    response.status(400).json({ regis_error: "Something went wrong" })
                                })
                        })
                        .catch((err) => {
                            response.status(error.status).json({ error_msg: error.message });
                        })
                }




            })

    } catch (error) {
        response.status(error.status).json({ error_msg: error.message });
    }

})

// post method to user Login
app.post('/login', (req, response) => {


    try {
        const { email, password } = req.body;
        if (!email || !password) {
            response.status(400).json({ error_msg: "All fields are mendatory" })
        }
        // validation to check wtheter the user is not register
        UserModel.findOne({ email: email })
            .then((userFounded) => {
                if (!userFounded) {
                    response.status(400).json({ userError: "Please register" })
                }
                else {
                    // if userfound then first check the password are correct
                    // for theat we use compare function
                    // syntax : bycrypt.js.compare(user eneter the passwors in login page,password store in database)
                    bcryptjs.compare(password, userFounded.password)
                        .then((passwordMatched)=>{
                            if(passwordMatched){
                                // when the paswod match we have to return token and user data so that user can login
                                // generate token usjng jasonwentoken package
                             const Token=JWT.sign({password:userFounded.password},SECRET_JWT)
                             const userInfo={'_id':userFounded.id,"Username":userFounded.Firstname+" "+userFounded.Lastname}
                              response.status(200).json({Result:{Token:Token,userInfo:userInfo}})

                            }else{
                                response.status(400).json({error_msg:"Wrong Credential"})
                            }
                        })
                        .catch((err) => {
                            
                            response.status(400).json({ regis_error: "Something went wrong" }) 
                        })


                }
            })
            .catch((err)=>{
                response.status(400).json({ regis_error: "Something went wrong" }) 
            })
    }
    catch {
        response.status(error.status).json({ error_msg:"Something went wrong" });
    }

})


// this end point will be protected give permision to add sales if user data
// to protect  we have to create a middleware 
app.post('/addsales',MiddleWare,(req,response)=>{
    const { product_name,quantity,amount }=req.body;
    try{
        if (! product_name || !quantity ||!amount) {
            response.status(400).json({ error_msg: "All fields are mendatory" })
        }
        const SalesData=new salesModel({product_name:product_name,quantity:quantity,amount:amount})
        SalesData.save()
        .then((data)=>{
            response.status(200).json({Success:"Sales Add Successfuly"})
        })
        .catch(err =>{
              response.status(400).json({error_msg:"Something went wrong"})
        })




    }catch(err){

    }
})

const  todayDate=new Date;
app.get('/getallsales',MiddleWare,async(req,res)=>{
    await salesModel.find()
 
    .then((data)=>{
        const TodaysData=data.filter((date)=>date.Date.toLocaleDateString()== todayDate.toLocaleDateString())
      res.status(200).json({Result:TodaysData})
    })
    .catch(error=>{
        console.log("Error",error)
        res.status(400).json({error_msg:"Something went wrong"})
    })

})



// Get API  to fecth the top sales data








app.listen(PORT, () => {
    console.log("Port is started " + PORT);
})