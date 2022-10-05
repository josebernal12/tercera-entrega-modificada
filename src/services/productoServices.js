// const productDao = require("../daos/productDao");
const productDto = require("../daos/Dto/producto.dto");
const ProductoDao = require("../daos/productDao");

const productoDao = new ProductoDao();

exports.mostrarProductos = async () => {
  const producto = await productoDao.getAllProduct();

  return new productDto(producto);
};
exports.obtenerProductoPorId = async (id) => {
  const producto = await productoDao.getAById(id);

  return producto;
};
exports.CrearProducto = async (createdProduct) => {
  const producto = await productoDao.createProduct(createdProduct);

  return producto;
};
exports.actualizarProducto = async (id,product) => {
  const producto = await productoDao.updatedProduct(id,product);

  return producto;
};
exports.eliminarProducto = async (id) => {
  const producto = await productoDao.deletedProduct(id);

  return producto;
};
