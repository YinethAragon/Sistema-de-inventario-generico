import { ProductoGenerico } from "../types/comunes";

export class Producto<T extends ProductoGenerico> {
  constructor(public datos: T) {}

  aumentarStock(cantidad: number) {
    this.datos.cantidad += cantidad;
  }

  disminuirStock(cantidad: number) {
    if (this.datos.cantidad >= cantidad) {
      this.datos.cantidad -= cantidad;
    } else {
      throw new Error("Stock insuficiente");
    }
  }

  mostrarInfo() {
    return `${this.datos.nombre} (${this.datos.codigo}) - Stock: ${this.datos.cantidad}, Precio: ${this.datos.precio}`;
  }
}