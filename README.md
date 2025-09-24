## el Principio de Responsabilidad Única (SRP) 

### 1. Inventario

**¿Qué hace actualmente?**
- Gestiona productos y movimientos.
- Métodos principales: agregarProducto, registrarMovimiento, reporteStock, reporteMovimientos.

**¿Cómo aplica el SRP?**
- Actualmente mezcla la gestión de productos y movimientos con la generación de reportes.
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
- No es necesario hacer cambios.

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

### 2. Movimiento

*¿Cumple con OCP?*
- La clase está cerrada a modificación y cumple con OCP si el detalle se delega a un formateador externo.
- Si se requiere cambiar el formato del detalle, sería mejor usar una interfaz (IDetalleMovimientoFormatter) y polimorfismo.

*¿Cómo mejorar?*
- Implementar formateadores de detalle mediante interfaces.
- Permitir agregar nuevos formatos sin modificar la clase Movimiento.

### 3. Producto

*¿Cumple con OCP?*
- No cumple completamente, ya que la presentación está mezclada con la lógica de negocio.
- Cambios en la forma de mostrar información requieren modificar la clase Producto.

*¿Cómo mejorar?*
- Extraer la presentación a una interfaz (IProductoPresenter) y usar composición.
- Permitir nuevas formas de presentación sin modificar Producto.



# Informe SOLID (L, I y D) --- Proyecto: Sistema de Inventario Genérico

## 2. Inventario de Clases/Interfaces Analizadas

-   **Clase 1:** `src/models/Producto.ts` --- Representa un producto
    genérico con operaciones de stock\
-   **Clase 2:** `src/models/Inventario.ts` --- Gestiona la colección de
    productos y movimientos\
-   **Clase 3:** `src/models/Movimineto.ts` --- Representa un movimiento
    individual del inventario\
-   **Tipos:** `src/types/comunes.ts` --- Definiciones de tipos para el
    dominio

------------------------------------------------------------------------

## 3. Análisis por Clase/Interfaz

### 3.1 `src/models/Producto.ts`

**Rol:** Gestión de datos y operaciones básicas de un producto en el
inventario.

#### L (Liskov Substitution)

-   **Diagnóstico:** Si Cumple parcialmente\
-   **Justificación:** La clase usa genéricos
    (`Producto<T extends ProductoGenerico>`) lo que permite sustitución,
    pero no hay jerarquía de herencia real que probar. Sin embargo,
    cualquier tipo que extienda `ProductoGenerico` puede sustituir al
    genérico base sin romper funcionalidad.
-   **Refactor propuesto:** No necesario para LSP, pero se podría crear
    una jerarquía con `ProductoBase` abstracta.

#### I (Interface Segregation)

-   **Diagnóstico:** No cumple completamente\
-   **Justificación:** La clase mezcla operaciones de stock
    (`aumentarStock`, `disminuirStock`) con presentación
    (`mostrarInfo`). Si una clase solo necesita operaciones de stock,
    debe implementar también la presentación.
-   **Refactor propuesto:** Separar en interfaces `IStockable` e
    `IDisplayable`.

**Ejemplo (antes → después):**

``` ts
// Antes (viola I)
class Producto<T extends ProductoGenerico> {
  aumentarStock(cantidad: number) { /* ... */ }
  disminuirStock(cantidad: number) { /* ... */ }
  mostrarInfo() { /* presentación mezclada */ }
}

// Después (cumple I)
interface IStockable {
  aumentarStock(cantidad: number): void;
  disminuirStock(cantidad: number): void;
}

interface IDisplayable {
  mostrarInfo(): string;
}

class Producto<T extends ProductoGenerico> implements IStockable {
  aumentarStock(cantidad: number) { /* ... */ }
  disminuirStock(cantidad: number) { /* ... */ }
}

class ProductoFormatter<T extends ProductoGenerico> implements IDisplayable {
  constructor(private producto: Producto<T>) {}
  mostrarInfo(): string { /* lógica de presentación */ }
}
```

#### D (Dependency Inversion)

-   **Diagnóstico:** Si Cumple\
-   **Justificación:** Depende de la abstracción `ProductoGenerico`
    (tipo), no de implementaciones concretas.
-   **Refactor propuesto:** No necesario.

------------------------------------------------------------------------

### 3.2 `src/models/Inventario.ts`

**Rol:** Coordinador principal del sistema, gestiona productos,
movimientos y reportes.

#### L (Liskov Substitution)

-   **Diagnóstico:** Si Cumple\
-   **Justificación:** Usa genéricos correctamente y cualquier tipo que
    extienda `ProductoGenerico` puede ser sustituido sin problemas.
-   **Refactor propuesto:** No necesario.

#### I (Interface Segregation)

-   **Diagnóstico:** No cumple\
-   **Justificación:** La clase tiene múltiples responsabilidades:
    gestión de productos, registro de movimientos y generación de
    reportes. Una clase que solo necesite reportes debe cargar con toda
    la funcionalidad.
-   **Refactor propuesto:** Dividir en interfaces más específicas:
    `IProductManager`, `IMovementTracker`, `IReportGenerator`.

#### D (Dependency Inversion)

-   **Diagnóstico:**  No cumple completamente\
-   **Justificación:** Depende directamente de clases concretas
    (`Producto`, `Movimiento`) en lugar de abstracciones. Instancia
    directamente `new Movimiento()`.
-   **Refactor propuesto:** Inyectar factories o builders para crear
    movimientos y productos.

**Ejemplo (antes → después):**

``` ts
// Antes (viola I y D)
class Inventario<T extends ProductoGenerico> {
  private productos: Producto<T>[] = [];
  private movimientos: Movimiento<T>[] = [];
  
  agregarProducto(producto: Producto<T>) { /* ... */ }
  registrarMovimiento(tipo: TipoMovimiento, codigo: string, cantidad: number) {
    const movimiento = new Movimiento(tipo, producto, cantidad); // Viola D
    /* ... */
  }
  reporteStock() { /* ... */ }
  reporteMovimientos() { /* ... */ }
}

// Después (cumple I y D)
interface IProductManager<T> {
  agregarProducto(producto: IStockable & { datos: T }): void;
}

interface IMovementTracker<T> {
  registrarMovimiento(tipo: TipoMovimiento, codigo: string, cantidad: number): void;
}

interface IReportGenerator {
  reporteStock(): string[];
  reporteMovimientos(): string[];
}

interface IMovementFactory<T> {
  crearMovimiento(tipo: TipoMovimiento, producto: IStockable & { datos: T }, cantidad: number): IMovement;
}

class Inventario<T extends ProductoGenerico> implements IProductManager<T>, IMovementTracker<T> {
  constructor(private movementFactory: IMovementFactory<T>) {}
  
  registrarMovimiento(tipo: TipoMovimiento, codigo: string, cantidad: number) {
    const movimiento = this.movementFactory.crearMovimiento(tipo, producto, cantidad);
    /* ... */
  }
}

```
### 3.3 src/models/Movimineto.ts
Rol: Representa un movimiento individual del inventario con sus detalles.
#### L (Liskov Substitution)

- **Diagnóstico:** Cumple
- **Justificación:** No hay herencia, pero la clase es consistente y podría ser extendida sin problemas.
Refactor propuesto: No necesario.

#### I (Interface Segregation)

- **Diagnóstico:** Cumple
- **Justificación:** La clase tiene una responsabilidad única y bien definida. El método `detalleMovimiento()` es cohesivo con los datos del movimiento.
Refactor propuesto: No necesario.

#### D (Dependency Inversion)

- **Diagnóstico:** No cumple completamente
Justificación: Depende directamente de la clase concreta Producto en lugar de una abstracción.
Refactor propuesto: Depender de una interfaz `IProducto` o `IMovable`.

**Ejemplo (antes → después)**
``` ts
ts// Antes (viola D)
class Movimiento<T extends ProductoGenerico> {
  constructor(
    public tipo: TipoMovimiento,
    public producto: Producto<T>, // Dependencia concreta
    public cantidad: number,
    public fecha: Date = new Date()
  ) {}
}

// Después (cumple D)
interface IMovable<T> {
  datos: T;
}

class Movimiento<T extends ProductoGenerico> {
  constructor(
    public tipo: TipoMovimiento,
    public producto: IMovable<T>, // Dependencia abstracta
    public cantidad: number,
    public fecha: Date = new Date()
  ) {}
}
```

## 4. Conclusiones Generales
**Resumen de hallazgos:**
**Clases que cumplen L, I, D completamente:** Ninguna cumple los tres principios al 100%.
Casos de deuda técnica priorizada:

**Interface Segregation:** Inventario tiene demasiadas responsabilidades (gestión + reportes)
**Dependency Inversion:** Dependencias directas de clases concretas en lugar de abstracciones
**Interface Segregation:** Producto mezcla lógica de negocio con presentación

### Impacto de aplicar refactors:

**Mantenibilidad:** Mayor facilidad para modificar reportes sin afectar gestión de inventario
**Escalabilidad:** Posibilidad de agregar nuevos tipos de movimientos y productos sin modificar código existente
**Pruebas:** Mejor testabilidad al poder mockear dependencias mediante interfaces
**Reutilización:** Componentes más específicos y reutilizables

#### Prioridad de refactoring:

Alta: Separar reportes del Inventario (ISP)
Media: Introducir abstracciones para Movimiento y Producto (DIP)
Baja: Separar presentación de Producto (ISP)

```