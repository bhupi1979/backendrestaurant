const mongoose=require('mongoose')
const productdetailSchema=new mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    descp:String,
    pcategory:String
})
module.exports= mongoose.models.productdetail || mongoose.model('productdetail',productdetailSchema)