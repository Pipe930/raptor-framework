/**
 * Enumeración que representa los métodos HTTP soportados por el framework.
 *
 * Este enum se utiliza como objeto de validación para:
 * - Normalizar los métodos provenientes de adaptadores HTTP.
 * - Definir y validar rutas en el sistema de enrutamiento.
 * - Comparar métodos de forma segura sin depender de strings mágicos.
 *
 * Los valores siguen la especificación estándar HTTP.
 */
export enum HttpMethods {
  /** Método HTTP GET: utilizado para obtener recursos. */
  get = "GET",

  /** Método HTTP POST: utilizado para crear recursos. */
  post = "POST",

  /** Método HTTP PUT: utilizado para reemplazar recursos. */
  put = "PUT",

  /** Método HTTP PATCH: utilizado para modificar parcialmente recursos. */
  patch = "PATCH",

  /** Método HTTP DELETE: utilizado para eliminar recursos. */
  delete = "DELETE",
}
