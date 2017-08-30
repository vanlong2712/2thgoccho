//step 1 require mongoose
const mongoose=require('mongoose');
var AutoIncrement = require('mongoose-sequence');
var mongoosePaginate = require('mongoose-paginate');


mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/flaties');
//step 2: connect
//step 3: tao Schema

  const roomSchema = new mongoose.Schema({
    propertyTitle: String,
  	propertyDetail:String,
  	address:String,
  	city:String,
  	state:String,
  	zipCode:Number,
  	roomsAvailable:Number,
  	rooms:Number,
  	bedRooms:Number,
  	bathRooms:Number,
  	price:Number,
  	currentFlatmates:String,
    img:String,
    img2:String,
    img3:String,
    img4:String,
    img5:String,
    isGym:Boolean,
    isSwimmingPool:Boolean,
    isParty:Boolean,
    isWindow:Boolean,
    isLaundry:Boolean,
    isParty:Boolean,
    isTidy:Boolean,
    ownerName:String,
    email:String,
    phone:String	

});

	roomSchema.plugin(AutoIncrement, {inc_field: 'idroom'});
	roomSchema.plugin(mongoosePaginate);

//4: tao model
 const room=mongoose.model('properties',roomSchema,'properties');
 module.exports=room;
// room.create(
//    {name:"All Region"}

//  );
// room.create(
// {propertyTitle:"Queen's Apartment",propertyDetail:"Spacious",adderss:"17 Wakefield Street",city:"Auckland",state:"Auckland",zipCode:1010,roomsAvailable:1,rooms:4,bedRooms:1
// ,bathRooms:1,price:600,currentFlatmates:"2 men, 1 girl",img:"popular-location-01.jpg",img2:"popular-location-02.jpg",img3:"popular-location-03.jpg",img4:"popular-location-04.jpg",img5:"popular-location-05.jpg",
// isGym:true,isSwimmingPool:true,isParty:true,isLaundry:true,isLaundry:true,isParty:true,ownerName:"Phu",email:"phu.nguyen09995@gmail.com",phone:"0220717763"}
// );