const mongoose=require('mongoose')
const infraSchema=new mongoose.Schema({
    name:String,
    tnumber:Number,
    rent:Number,
    descp:String
})
module.exports= mongoose.models.infra || mongoose.model('infra',infraSchema)