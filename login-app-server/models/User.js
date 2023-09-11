const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
     email: {
          type: String,
          unique: true,
          required: true,
          maxlength: 100,
     },
     password: {
          type: String,
          required: true,
     },
     firstName: {
          type: String,
          //    required: true,
          maxlength: 50,
     },
     lastName: {
          type: String,
          //    required: true,
          maxlength: 50,
     },
     dateOfBirth: {
          type: Date,
          //    required: true,
     },
});

module.exports = mongoose.model("User", userSchema);
