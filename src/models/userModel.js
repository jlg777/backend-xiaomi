import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  //id: String,
  name: String,
  avatar: String,
  roleAdmin: Boolean,
  email: String,
  createdAt: Date,
});

export default Product = mongoose.model("user", productSchema);
