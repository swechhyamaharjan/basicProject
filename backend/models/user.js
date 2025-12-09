import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcryptjs";
import {z} from "zod";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minLength: 6,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')){  //this represent userSchema
    next();
  } 
  const salt = await bcrypt.genSalt(10) //key strength -> greater the num, greater the strength but time is also more
  this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.matchedPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

export const userAddSchema = z.object({
  fullname: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  isAdmin: z.boolean().default(false),
})

const User = mongoose.model("User", userSchema);

export default User;