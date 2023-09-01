export const formatearCantidad = (quantity) => {
  return Number(quantity).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const idGenerator = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const fecha = Date.now().toString(36);

  return random + fecha;
};

export const formatearFecha = (date) => {
  const dateNew = new Date(date);
  const opciones = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };

  return dateNew.toLocaleDateString("es-ES", opciones);
};
