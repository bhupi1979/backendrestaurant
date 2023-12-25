
const express = require('express')
require('./db/config.js')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const user = require('./db/user')
const infra = require('./db/Infra')
//app.use(express.static('dist'))
app.use(express.json()) // Make sure this middleware is applied before your route
app.use(cors())
// app.use((req, res, next) => {
//       res.header('Access-Control-Allow-Origin', 'https://cool-choux-0cdf69.netlify.app');
//       res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//       res.header('Access-Control-Allow-Headers', 'Content-Type');
//       next();
//     });
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
/*******this api code for infra */
app.post('/addinfra',async(req,res)=>{
      let infra1=new infra(req.body)
      //console.log('the result is'+req.body.password)
      let result= await infra1.save()
      res.send(result)
      //console.warn(result)
})
app.get('/infra',async(req,res)=>{
      let infra1= await infra.find()
      //cdconsole.log('the result is'+req.body.password)
      //let result= await infra1.find().exec()
      res.send(infra1)
      //console.warn(result)
})
app.delete("/infra/:id",async (req,res)=>{

const result= await infra.deleteOne({_id:req.params.id})
res.send(result)
})
app.get("/singleinfra/:id",async (req,res)=>{

      let result= await infra.findOne({_id:req.params.id})
      res.send(result)
      })
      app.put('/infra:id', async(req,res)=>{
            let result=await infra.updateOne(
                  {_id:req.params.id},
                  {$set:req.body}
            )
            res.send(result)
      })
/************end of infra api code */
app.listen(5000)