const mongoose=require('mongoose')
//  mongoose.connect('mongodb+srv://bhupi:bhupi@123@cluster0.ey8speb.mongodb.net/ecom-123?retryWrites=true&w=majority'
// //  ,{
// // useNewUrlParser:true,
// // useCreateIndex:true,
// // useUnifiedTopology:true,
// // useFindAndModify:false
// // }
// ).then(()=>{
//     console.log('connection sucessful')
//  }).catch((err)=>{console.log(err)

//  })
const username = 'bhupi';
const password = 'bhupi@123';
const database = 'ecom-123';

const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@cluster0.ey8speb.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
 
  useUnifiedTopology: true
 
}).then(() => {
  console.log('Connection successful');
}).catch((err) => {
  console.log(err);
});