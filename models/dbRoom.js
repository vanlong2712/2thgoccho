//step 1 require mongoose
const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
var mongoosePaginate = require('mongoose-paginate');

//step 2: connect
//step 3: tao Schema

const roomSchema = new Schema({
  short_id: {
    type: String,
    default: shortid.generate,
    unique: true
  },
  name: {
    type: String,
    required: "Room's name is required",
    trim: true,
    minlength: 5,
    maxlength: 30
  },
  images: [String],
  features: [false,false,false,false,false], // isShower, isAir, isWindow, isWifi, isTivi
  peopleCapacity: Number,
  price: {
    type: Number,
    required: true
  },
  created: {
    type : Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isSingle: {
    type: Boolean,
    default: true
  },
  isShare: {
    type: Boolean,
    default: false
  },
  _homeBelonged: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home'
  },
  _guests: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }
});

	roomSchema.plugin(mongoosePaginate);

//4: tao model
 const room = mongoose.model('Room',roomSchema);
 module.exports = {room};
// room.create(
//    {name:"All Region"}

//  );
// room.create(
// {propertyTitle:"Queen's Apartment",propertyDetail:"Spacious",adderss:"17 Wakefield Street",city:"Auckland",state:"Auckland",zipCode:1010,roomsAvailable:1,rooms:4,bedRooms:1
// ,bathRooms:1,price:600,currentFlatmates:"2 men, 1 girl",img:"popular-location-01.jpg",img2:"popular-location-02.jpg",img3:"popular-location-03.jpg",img4:"popular-location-04.jpg",img5:"popular-location-05.jpg",
// isGym:true,isSwimmingPool:true,isParty:true,isLaundry:true,isLaundry:true,isParty:true,ownerName:"Phu",email:"phu.nguyen09995@gmail.com",phone:"0220717763"}
// );
