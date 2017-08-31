
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

let UserSchema = new Schema({
  short_id: {
    type: String,
    required: 'Short id is required',
    default: shortid.generate,
    unique: true
  },
  firstName: {
    type: String,
    trim: true,
    required: 'Please enter a First Name',
    minlength: 2,
    maxlength: 35
  },
  lastName: {
    type: String,
    trim: true,
    required: 'Please enter Last name',
    minlength: 2,
    maxlength: 35
  },
  auth: {
    facebook: {
      id: { type: String, trim: true },
      token: { type: String, trim: true }
    }
  },
  saved_homes: {
    type: [Schema.Types.ObjectId],
    ref: 'Home'
  },
  sex: {
    type: String,
    trim: true,
    lowercase: true
  },
  picture: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    minlength: 5,
    unique: true,
    lowercase: true
  },

  birthdate: {
    type : Date,
    default: Date.now
  },
  phone_number: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    default: 'User',
    trim: true
  },
  native_currency: {
    type: String,
    uppercase: true,
    maxlength: 3,
    default: 'VND'
  },
  about: {
    type: String,
    trim: true
  },

  created: {
    type : Date,
    default: Date.now
  },
  identity_verified: {
    type: Boolean,
    default: true
  },
  is_active: {
    type: Boolean,
    default: true
  }
});

// Methods

UserSchema.pre('save', function (next) {
  var user = this;

  if(user.isModified('password')) { // chỉ khi password bị chỉnh sửa thì mới hash password.
                                    // nếu ko sẽ phát sinh ra lỗi khi mỗi lần gọi save function
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
