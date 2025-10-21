import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  //id: String,
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
    validate: {
      validator: function (valor) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(valor);
      },
      message: (props) =>
        `${props.value} no es un nombre válido. Solo se permiten letras y espacios.`,
    },
  },
  avatar: String,
  roleAdmin: {
    type: String,
    default: "client",
    enum: ["admin", "user", "client"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    maxlength: 100,
    trim: true,
    lowercase: true,
    validate: {
      validator: (valor) => {
        const regex = /[A-Za-z0-9._+\-']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return regex.test(valor);
      },
      message: (props) => `${props.value} no es un correo electrónico válido.`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
