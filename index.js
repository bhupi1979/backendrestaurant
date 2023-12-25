
const express = require('express')
require('./db/config.js')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const user = require('./db/user')

app.use(express.json()) // Make sure this middleware is applied before your route
app.use(cors())
app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'https://cool-choux-0cdf69.netlify.app');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
//api for registration
app.post('/register',async(req,res)=>{
      let user1=new user(req.body)
      console.log('the result is'+req.body.password)
      let result= await user1.save()
      res.send(result)
      //console.warn(result)
})
//api for login
app.post('/login',async(req,res)=>{
      let user1= await user.findOne(req.body).select("-password")
      console.log('the result is'+user1)
      //let result= await user1.find(user1.name)
      if(user1)
      res.send({resultuser:1})
else
res.send({resultuser:0})
      //console.warn(result)
})
app.listen(5000)