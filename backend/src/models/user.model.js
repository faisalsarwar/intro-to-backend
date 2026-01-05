import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlenght: 1,
    maxlenght: 30,
  },
  password: {
    type: String,
    required: true,
    minlenght: 6,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

},
{
    timestamps: true
});

// before saving any password we need to hash it
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
});

//Compare passwords
userSchema.methods.comparePassword = async function (password){
  return await bcrypt.compare(password, this.password);
}












export const User = mongoose.model("User", userSchema);
