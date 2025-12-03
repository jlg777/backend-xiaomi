import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  //id: String,
  name: {
    type: String,
    unique: true,
    index: true,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  image: {
    type: String,
    trim: true,
    required: false,
    default:
      "https://media.istockphoto.com/id/1204457395/es/vector/no-hay-icono-de-se%C3%B1al-dise%C3%B1o-vectorial-de-c%C3%ADrculo-cruzado-rojo.jpg?s=1024x1024&w=is&k=20&c=77DioSexSmTy5Lr5jKbeJTGmeit-OcgAKNlXdykvvUk=",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Smartphones",
      "Wearables",
      "Accessories",
      "Home Appliances",
      "Electronics",
    ],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 2000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("validate", function (next) {
  if (this.isModified("image")) {
    if (this.image === null || String(this.image).trim() === "") {
      this.image = undefined;
    }
  }
  next();
});

const Product = mongoose.model("product", productSchema);

export default Product;
