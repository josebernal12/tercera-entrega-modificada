const CarritoDao = require("../daos/carritoDaos");
const carritoDao = new CarritoDao();
const CarritoDto = require("../daos/Dto/carrito.dto");

exports.mostrarCarrito = async () => {
  const response = await carritoDao.getAllCart();

  return new CarritoDto(response);
};
exports.obtenerCarritoPorId = async (id) => {
  const response = await carritoDao.getById(id);
  return response;
};
exports.crearCarrito = async (email, pedido) => {
  const response = await carritoDao.createdCart(email, pedido);
  return response;
};
exports.actualizarCarrito = async (id, cart) => {
  const response = await carritoDao.updatedCart(id, cart);
  return response;
};
exports.eliminarCarrito = async (id) => {
  const response = await carritoDao.deletedCart(id);
  return response;
};
