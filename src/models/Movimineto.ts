import { TipoMovimiento, ProductoGenerico } from "../types/comunes";
import { Producto } from "./Producto";

export class Movimiento<T extends ProductoGenerico> {
  constructor(
    public tipo: TipoMovimiento,
    public producto: Producto<T>,
    public cantidad: number,
    public fecha: Date = new Date()
  ) {}

  detalleMovimiento() {
    return `${this.tipo.toUpperCase()} | ${this.producto.datos.nombre} x${this.cantidad} | ${this.fecha.toLocaleString()}`;
  }
} 