const Productos = require("../models/modelProducto");

class ProductoDao {
  constructor() {
    this.producto = Productos;
  }

  async getAllProduct() {
    const product = this.producto.find();
    return product;
  }

  async getAById(id) {
    const product = await this.producto
      .findById(id)
      .populate("usuario", "nombre");
    return product;
  }
  async createProduct(createdProduct) {
    const productName = await Productos.findOne({
      nombre: createdProduct.nombre,
    });
    if (productName) throw "el producto ya existe";
    const product = this.producto.create(createdProduct);
    return product;
  }

  async updatedProduct(id, product) {
    const response = await this.producto.findByIdAndUpdate(id, product, {
      new: true,
    });
    return response;
  }

  async deletedProduct(id) {
    const response = await this.producto.findByIdAndDelete(id);
    return response;
  }
}
module.exports = ProductoDao;
