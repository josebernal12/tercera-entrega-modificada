class CarritoDto {
  static instancia;

  constructor(data) {
    if (!!CarritoDto.instancia) {
      return CarritoDto.instancia;
    }

    CarritoDto.instancia = this;

    this.carrito = data;
  }
}
module.exports = CarritoDto;
