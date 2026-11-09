import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'devshelf:recursos';

// Obtiene todos los recursos almacenados o un arreglo vacío si no existen o hay error
export function getAll() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : []; //condicion operador ternario (if-else)
  } catch {
    return [];
  }
}

// Devuelve el recurso con ese id usando find, o null si no existe
export function getById(id) {
  const items = getAll();
  const recurso = items.find((item) => item.id === id);
  return recurso || null;
}

// Crea y persiste un nuevo recurso con id y fechaCreacion generados
export function create(data) {
  const items = getAll();
  const newItem = {
    ...data,
    id: uuidv4(),
    fechaCreacion: new Date().toISOString(),
  };
  items.push(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return newItem;
}

// Actualiza un recurso existente combinando sus datos y conservando id y fechaCreacion
export function update(id, data) {
  const items = getAll();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const recursoActual = items[index];
  const updatedItem = {
    ...recursoActual,
    ...data,
    id: recursoActual.id,
    fechaCreacion: recursoActual.fechaCreacion,
  };

  items[index] = updatedItem;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return updatedItem;
}

// Elimina un recurso por su ID. Devuelve true si fue eliminado o false si no existía
export function remove(id) {
  const items = getAll();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }

  items.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return true;
}

// Obtiene métricas del total de recursos, favoritos y cantidad de temas únicos
export function getStats() {
  const items = getAll();
  const total = items.length;
  const favoritos = items.filter((item) => Boolean(item.favorito)).length;
  const temas = new Set(items.map((item) => item.tema).filter(Boolean)).size;

  return { total, favoritos, temas };
}
