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
  avatar: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1204457395/es/vector/no-hay-icono-de-se%C3%B1al-dise%C3%B1o-vectorial-de-c%C3%ADrculo-cruzado-rojo.jpg?s=1024x1024&w=is&k=20&c=77DioSexSmTy5Lr5jKbeJTGmeit-OcgAKNlXdykvvUk=",
  },
  roleAdmin: {
    type: String,
    default: "user",
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
    //select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
