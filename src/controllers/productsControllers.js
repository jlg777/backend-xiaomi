export const getAllProducts = (_req, res) => {
  res.send("Listado de Productos 🥸");
};

export const getProductById = (req, res) => {
  res.send(`Detalles del producto con ID: ${req.params.id}`);
};

export const createProduct = (req, res) => {
  res.send(`Agrega nuevo producto ${req}`);
};

export const updateProduct = (req, res) => {
  res.send(`Edita del producto con ID: ${req.params.id} y ${req}`);
};

export const deleteProduct = (req, res) => {
  res.send(`Borra del producto con ID: ${req.params.id}`);
};
