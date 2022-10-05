const Carrito = require("../models/modelCarrito");

class CarritoDao {
  constructor() {
    this.carrito = Carrito;
  }
  async getAllCart() {
    const response = await this.carrito.find().populate({
      path: "pedido.producto",
      model: "Producto",
    });
    return response;
  }
  async getById(id) {
    const response = await this.carrito.findById(id);
    return response;
  }
  async createdCart(cart) {
    const emailExiste = await Carrito.findOne({ email: cart.email });
    if (emailExiste) throw `el email ${emailExiste.email} ya tiene un carrito!`;
    const response = await this.carrito.create(cart);
    return response;
  }
  async updatedCart(id, cart) {
    const response = await this.carrito.findByIdAndUpdate(id, cart).populate({
      path: "pedido.producto",
      model: "Producto",
    });
    return response;
  }
  async deletedCart(id) {
    const response = await this.carrito.findByIdAndDelete(id).populate({
      path: "pedido.producto",
      model: "Producto",
    });
    return response;
  }
}
module.exports = CarritoDao;

