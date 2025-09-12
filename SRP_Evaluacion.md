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
