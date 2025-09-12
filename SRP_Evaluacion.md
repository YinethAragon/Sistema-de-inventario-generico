En este documento te comparto una revisión sencilla y práctica sobre cómo aplicar el Principio de Responsabilidad Única (SRP) en las clases de la carpeta `src/models`. La idea es ayudarte a identificar oportunidades para que el código sea más claro, fácil de mantener y escalar. Aquí encontrarás observaciones y sugerencias pensadas para que el sistema evolucione de forma ordenada y eficiente.

---

## 1. Inventario

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
## 2. Movimiento

*¿Qué hace actualmente?*
- Representa un movimiento de inventario.
- Método principal: detalleMovimiento.

*¿Cómo aplica el SRP?*
- Aquí sí se cumple el SRP: la clase solo representa un movimiento y su detalle.

*¿Qué podrías mejorar?*
- No es necesario hacer cambios.

---

## 3. Producto

*¿Qué hace actualmente?*
- Representa un producto genérico.
- Métodos principales: aumentarStock, disminuirStock, mostrarInfo.

*¿Cómo aplica el SRP?*
- Mezcla la lógica de negocio (gestión de stock) con la presentación (mostrarInfo).
- Lo ideal sería separar la presentación en otra clase o método externo.

*¿Qué podrías mejorar?*
- Extraer el método mostrarInfo a un formateador o servicio de presentación.
- Mantener la clase Producto solo para la gestión de datos y lógica de stock.
