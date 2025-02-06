// src/shared/utils/compareObj.js

// funcion para comparar dos objetos, devuelve true si son diferentes
export const hasChanges = (obj1, obj2) => {
    if (typeof obj1 !== "object" || obj1 === null) {
      return obj1 !== obj2; // Comparación directa para valores primitivos
    }
  
    if (Array.isArray(obj1)) {
      if (!Array.isArray(obj2) || obj1.length !== obj2.length) {
        return true; // Diferencia en tipo o longitud
      }
      return obj1.some((item, index) => hasChanges(item, obj2[index]));
    }
  
    return Object.keys(obj1).some((key) => hasChanges(obj1[key], obj2[key]));
  };