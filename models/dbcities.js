//step 1 require mongoose
const mongoose=require('mongoose');
var AutoIncrement = require('mongoose-sequence');


mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/flaties');
//step 2: connect
//step 3: tao Schema

  const citySchema = new mongoose.Schema({
    name: String,

});
	citySchema.plugin(AutoIncrement, {inc_field: 'idCity'});

//4: tao model
 const city=mongoose.model('cities',citySchema,'cities');
 module.exports=city;
// city.create(
//    {name:"All Region"}

//  );