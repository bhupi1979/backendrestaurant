const mongoose=require('mongoose')
const productcategorySchema=new mongoose.Schema({
    name:String,
    slug:String
})
module.exports= mongoose.models.productcategory || mongoose.model('productcategory',productcategorySchema)