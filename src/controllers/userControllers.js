export const getAllUsers = (_req, res) => {
  res.send("Listado de Users 🥸");
};

export const getUserById = (req, res) => {
  res.send(`Detalles del User con ID: ${req.params.id}`);
};

export const createUser = (req, res) => {
  res.send(`Agrega nuevo User ${req} ${req.params.id}`);
};

export const updateUser = (req, res) => {
  res.send(`Edita el User con ID: ${req.params.id} y ${req}`);
};

export const deleteUser = (req, res) => {
  res.send(`Borra del User con ID: ${req.params.id}`);
};
