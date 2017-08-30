//step 1 require mongoose
const mongoose=require('mongoose');
var AutoIncrement = require('mongoose-sequence');


mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/flaties');
//step 2: connect
//step 3: tao Schema

  const districtSchema = new mongoose.Schema({
    name: String,
    idCity:Number

});
	districtSchema.plugin(AutoIncrement, {inc_field: 'idDistrict'});

//4: tao model
 const district=mongoose.model('district',districtSchema,'district');
 module.exports=district;
