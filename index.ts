
import { ProductoGenerico } from "./src/types/comunes";
import { Producto } from "./src/models/Producto";
import { Inventario } from "./src/models/Inventario";



const arroz: ProductoGenerico = {
  codigo: "A001",
  nombre: "Arroz Diana",
  categoria: "alimentos",
  cantidad: 50,
  precio: "2500"
};

const laptop: ProductoGenerico = {
  codigo: "T100",
  nombre: "Laptop Lenovo",
  categoria: "tecnologia",
  cantidad: 10,
  precio: 3500
};

// Instancias
const prod1 = new Producto(arroz);
const prod2 = new Producto(laptop);

const inventario = new Inventario<ProductoGenerico>();

// Agregar productos
inventario.agregarProducto(prod1);
inventario.agregarProducto(prod2);

// Movimientos
inventario.registrarMovimiento("entrada", "A001", 20);
inventario.registrarMovimiento("salida", "T100", 2);

// Reportes
console.log("📦 STOCK ACTUAL:");
console.log(inventario.reporteStock());

console.log("\n📜 MOVIMIENTOS:");
console.log(inventario.reporteMovimientos());
