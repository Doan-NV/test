const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: false, index: true },
  password: { type: String, required: false, select: false },
  firstName: { type: String, required: false },
  middleName: { type: String, required: false },
  lastName: { type: String, required: false },
  nickName: { type: String, required: false },
  dob: { type: String, required: false },
  sex: { type: String, required: false },
  gender: { type: String },
  address: { type: String, required: false },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    index: true,
  },
  phoneNumber: { type: String, required: false },
  picture: {type: String, required:  false}
});

module.exports = mongoose.model('users', UserSchema);