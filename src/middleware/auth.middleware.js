import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) return res.status(401).json({ error: "Token no proporcionado" });

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ error: "Formato de token inválido" });

  try {
    // ✅ jwt.verify verifica la firma y la expiración automáticamente
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // datos del usuario del payload
    next();
  } catch (err) {
    console.error("Token inválido o expirado", err.message)
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
