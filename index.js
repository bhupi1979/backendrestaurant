
const express = require('express')
require('./db/config.js')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const user = require('./db/user')
const infra = require('./db/Infra')
const productcategory = require('./db/productcategory.js')
const productdetail = require('./db/productdetail.js')
//app.use(express.static('dist'))
app.use(express.json()) // Make sure this middleware is applied before your route
app.use(cors())
app.use('/uploads', express.static('uploads'));
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
/************************* */
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
      /********end of api code for infra */
/************end of infra api code */

/****************apicode for product category */
/********************************** */
app.post('/productcategoryadd',async(req,res)=>{
      let pc=new productcategory(req.body)
      //console.log('the result is'+req.body.password)
      let result= await pc.save()
      res.send(result)
      //console.warn(result)
})
app.get('/showproductcategory',async(req,res)=>{
      let pc= await productcategory.find()
      //cdconsole.log('the result is'+req.body.password)
      //let result= await infra1.find().exec()
      res.send(pc)
      //console.warn(result)
})
app.delete("/productcategory:id",async (req,res)=>{

const result= await productcategory.deleteOne({_id:req.params.id})
res.send(result)
})
app.get("/singleproductcategory/:id",async (req,res)=>{

      let result= await productcategory.findOne({_id:req.params.id})
      res.send(result)
      })
      app.put('/productcategory/:id', async(req,res)=>{
            let result=await productcategory.updateOne(
                  {_id:req.params.id},
                  {$set:req.body}
            )
            res.send(result)
      })


/************* */
/**********end of product categoy */
//************add product detail */
const multer  = require('multer')
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() 
        cb(null, uniqueSuffix+"-"+file.originalname)
      }
    })
    
    const upload = multer({ storage: storage })
app.post('/productdetail',upload.single('image'),async(req,res)=>{
      const { name, price,descp,pcategory } = req.body
      let image=req.file.filename
      let pdetail=new productdetail({name,price,descp,pcategory,image})
      let result= await pdetail.save()
     res.send(result)
})
app.get('/showproductdetail',async(req,res)=>{
      let pc= await productdetail.find()
      //cdconsole.log('the result is'+req.body.password)
      //let result= await infra1.find().exec()
      res.send(pc)
      //console.warn(result)
})
app.delete("/productdetail/:id",async (req,res)=>{

      const result= await productdetail.deleteOne({_id:req.params.id})
      res.send(result)
      })
app.listen(5000)