## el Principio de Responsabilidad Única (SRP) 

### 1. Inventario

**¿Qué hace actualmente?**
- Gestiona productos y movimientos.
- Métodos principales: agregarProducto, registrarMovimiento, reporteStock, reporteMovimientos.

**¿Cómo aplica el SRP?**
- Actualmente mezcla la gestión de productos y movimientos con la generación de reportes.
- Sería ideal que la generación de reportes estuviera en clases especializadas.

**¿Qué podría mejorar?**
- Extraer la lógica de reportes a servicios independientes, por ejemplo: `ReporteStockService` y `ReporteMovimientosService`.
- Mantener la clase Inventario enfocada solo en la gestión de productos y movimientos.

---
### 2. Movimiento

*¿Qué hace actualmente?*
- Representa un movimiento de inventario.
- Método principal: detalleMovimiento.

*¿Cómo aplica el SRP?*
- Aquí sí se cumple el SRP: la clase solo representa un movimiento y su detalle.

*¿Qué podrías mejorar?*
- No es necesario hacer cambios. Si buscas mayor flexibilidad, podrías delegar la generación de detalles a un formateador externo.

---

### 3. Producto

*¿Qué hace actualmente?*
- Representa un producto genérico.
- Métodos principales: aumentarStock, disminuirStock, mostrarInfo.

*¿Cómo aplica el SRP?*
- Mezcla la lógica de negocio (gestión de stock) con la presentación (mostrarInfo).
- Lo ideal sería separar la presentación en otra clase o método externo.

*¿Qué podrías mejorar?*
- Extraer el método mostrarInfo a un formateador o servicio de presentación.
- Mantener la clase Producto solo para la gestión de datos y lógica de stock.
---

## Evaluación del Principio Open/Close (OCP)

### 1. Inventario

**¿Cumple con OCP?**
- Actualmente no está completamente abierta a extensión ni cerrada a modificación, ya que la lógica de reportes y gestión están acopladas.
- Cambios en la generación de reportes requieren modificar la clase Inventario.

**¿Cómo mejorar?**
- Definir interfaces para servicios de reporte (`IReporteStock`, `IReporteMovimientos`).
- Usar composición para delegar la generación de reportes a clases externas.
- Permitir la extensión agregando nuevos servicios de reporte sin modificar Inventario.

