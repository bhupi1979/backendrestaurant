const mongoose=require('mongoose')
const mtableSchema=new mongoose.Schema({
    str:String,
    
    datestr:String,
    printqt:Number
})
module.exports= mongoose.models.mtable || mongoose.model('mtable',mtableSchema)