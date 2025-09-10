// Tipos básicos y uniones
export type TipoMovimiento = "entrada" | "salida"; 
export type Categoria = "alimentos" | "ropa" | "tecnologia" | "otros";

// Union type para el precio
export type Precio = number | string; 


// Intersección de tipos
// "InfoBase" guarda la información esencial de cualquier producto: su código y su nombre
export type InfoBase = {
  codigo: string;
  nombre: string;
};

// "Inventariable" describe lo que cualquier producto inventariable debe tener: cantidad en stock y precio.
export type Inventariable = {
  cantidad: number;
  precio: Precio;
};

export type ProductoGenerico = InfoBase & Inventariable & { categoria: Categoria };