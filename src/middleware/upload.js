import multer from "multer";
import path from "path";

// Carpeta de destino
const uploadDir = "uploads";

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.path);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + "-" + ext);
  },
});

const uploadAvatar = multer({ storage });

export default uploadAvatar;
