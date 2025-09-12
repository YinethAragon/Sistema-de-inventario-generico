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
- No es necesario hacer cambios. Si buscas mayor flexibilidad, podrías delegar la generación de detalles a un formateador externo.

---

