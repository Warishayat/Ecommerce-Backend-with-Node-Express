const dotenv = require('dotenv').config();
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter the name field"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Enter the email field"],
    unique: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Enter the password field"]
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const UserModel = model("User", UserSchema);
module.exports = { UserModel };
