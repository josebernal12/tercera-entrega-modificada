class ProductoDto {
  static instancia;

  constructor(data) {
    if (!!ProductoDto.instancia) {
      return ProductoDto.instancia;
    }

    ProductoDto.instancia = this;

    this.product = data;
  }
}
module.exports = ProductoDto;
