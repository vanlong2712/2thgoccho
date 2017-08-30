//step 1 require mongoose
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/flaties');
//step 2: connect
//step 3: tao Schema
  const userSchema =new mongoose.Schema({
  	username:String,
  	firstName:String,
  	lastName:String,
  	email:String,
  	password:String,
  	role:Number,
  });

//4: tao model
 const user=mongoose.model('users',userSchema,'users');
 module.exports=user;
