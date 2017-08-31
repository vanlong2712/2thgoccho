const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

// mongoose.Schema.Types.ObjectId

let homeSchema = new Schema({
  short_id: {
    type: String,
    default: shortid.generate,
    unique: true
  },
  name: {
    type: String,
    required: "House's name is required",
    trim: true,
    minlength: 5,
    maxlength: 30
  },
  images: [String],
  address: {
    street_number: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
      maxlength: 20
    },
    street_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
      maxlength: 30
    },
    ward: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
      maxlength: 30
    },
    district: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
      maxlength: 30
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
      maxlength: 30
    }
  },
  amenities: {
    type: [String]
  },
  showers: {
    type: Number,
    trim: true
  },
  bedrooms: {
    type: Number,
    trim: true
  },
  home_type: {
    type: String,
    enum: ['House', 'Apartment', 'Hotel', 'Nature lodge', 'Hostel', 'Cabin', 'Condominium', 'Guesthouse', 'Villa', 'Other']
  },
  description: {
    type: String,
    trim: true
    required: 'description is required'
  },
  in_the_area: {
    type: String,
    trim: true
  },
  created: {
    type : Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isSold: {
    type: Boolean,
    default: false
  }, // true for Sold
  isRented: {
    type: Boolean, // true for Rented
    default: false
  },
  review: [{
    message: {
      type: String,
      trim: true,
      required: true
    },
    vote: Number
  }],
  // nearby: [false,false],
  regulations: [false,false,false], //isPet, isSmoking, isLate
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

let Home = mongoose.model('Home', homeSchema);

module.exports = {Home};
