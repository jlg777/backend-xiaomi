import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  //id: String,
  name: String,
  avatar: String,
  roleAdmin: Boolean,
  email: String,
  createdAt: Date,
});

const User = mongoose.model("user", userSchema);

export default User;
