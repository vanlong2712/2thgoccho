//step 1 require mongoose
const mongoose=require('mongoose');
var AutoIncrement = require('mongoose-sequence');


mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/flaties');
//step 2: connect
//step 3: tao Schema

  const suburbSchema = new mongoose.Schema({
    name: String,
    idCity:Number,
    idDistrict:Number
});
	suburbSchema.plugin(AutoIncrement, {inc_field: 'idSuburb'});

//4: tao model
 const suburb=mongoose.model('suburb',suburbSchema,'suburb');
 module.exports=suburb;
