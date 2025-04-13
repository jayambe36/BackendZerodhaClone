const mongoose =  require("mongoose");
const bcrypt = require("bcryptjs");

const UsersSchema = new mongoose.Schema({
   fullName : String,
   email: String,
   password : String 
})


    UsersSchema.pre("save", async function(next){
        if(!this.isModified("password")) return next();
    this.password =  await bcrypt.hash(this.password, 12);
  });
module.exports = {UsersSchema};