
const express = require('express')
require('./db/config.js')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const user = require('./db/user')
const infra = require('./db/Infra')
const productcategory = require('./db/productcategory.js')
const productdetail = require('./db/productdetail.js')
const mtable=require('./db/mtable.js')
//app.use(express.static('dist'))
app.use(express.json()) // Make sure this middleware is applied before your route
app.use(cors())
app.use('/uploads', express.static('uploads'));
// app.use((req, res, next) => {
//      // res.header('Access-Control-Allow-Origin', 'https://cool-choux-0cdf69.netlify.app');
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
const cld=require("./cldconfig.js")

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
      //let image=req.file.filename
      const image1= await cld.uploader.upload(req.file.path)
      console.log(image1)
       let image=image1.url
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
      app.get("/singleproductdetail/:id",async (req,res)=>{

            let result= await productdetail.findOne({_id:req.params.id})
            res.send(result)
            })
            app.put('/productdetail/:id',upload.single('image'), async(req,res)=>{
                  try {   
                  const { name, price,descp,pcategory } = req.body;
    //const imagePath = req.file ? req.file.filename: null; // Check if a new image is provided
    
    const imagePath= req.file?await cld.uploader.upload(req.file.path):null
    // Find the product by ID
    const productId = req.params.id;
    const existingProduct = await productdetail.findById(productId)
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
  }
    existingProduct.name = name || existingProduct.name;
    existingProduct.price = price || existingProduct.price;
    existingProduct.descp=descp||existingProduct.descp
    existingProduct.pcategory=pcategory||existingProduct.pcategory
    if(req.file)
    existingProduct.image=imagePath.url
      else
      existingProduct.image=existingProduct.image
    // Save the updated product
    let result=await existingProduct.save();
                  res.send(result)
} catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
            })
            app.get("/pitem/:id",async (req,res)=>{

                  let result= await productdetail.find({pcategory:req.params.id})
                  res.send(result)
                  })
                  /*************end of product details */
    /************starts of managament mtable */              
    app.post('/management',async(req,res)=>{
      let pc=new mtable(req.body)
      //console.log('the result is'+req.body.password)
      let result= await pc.save()
      res.send(result)
      //console.warn(result)
})   
app.get('/management',async(req,res)=>{
      let pc= await mtable.find({printqt:0})
      //console.log('the result is'+req.body.password)
      
      res.send(pc)
      //console.warn(result)
})   
app.put('/updatemanagement/:id', async(req,res)=>{
      let result=await mtable.updateOne(
            {_id:req.params.id},
            {$set:req.body}
      )
      res.send(result)
})
app.get('/managementsale',async(req,res)=>{
      let pc= await mtable.find({printqt:1})
      //console.log('the result is'+req.body.password)
      
      res.send(pc)
      //console.warn(result)
})   
app.listen(5000)