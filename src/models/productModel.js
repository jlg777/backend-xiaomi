import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  //id: String,
  name: String,
  image: String,
  price: Number,
  category: String,
  description: String,
  createdAt: Date,
});

const Product = mongoose.model("product", productSchema);

export default Product