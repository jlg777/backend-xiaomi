export default function authorize(...allowedRoles) {
  return (req, res, next) => {
    const { roleAdmin } = req.user;

    if (!allowedRoles.includes(roleAdmin)) {
      return res
        .status(403)
        .json({ error: "No tienes permisos suficientes 🚫" });
    }

    next(); // El rol está permitido
  };
}
