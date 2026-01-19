import { HttpMethods } from "enums/methods";
import { Headers } from "../utils/types";

/**
 * Interfaz que define el contrato para los adaptadores de servidor.
 * * Establece los métodos necesarios para extraer información de una petición
 * entrante de manera agnóstica a la implementación subyacente (Node.js nativo,
 * Testing mocks, etc.).
 * @interface Server
 */
export interface Server {
  /**
   * Obtiene la ruta de la solicitud (pathname).
   * @returns {string} La URL limpia sin parámetros de consulta.
   * @example "/api/v1/users"
   */
  requestUrl: () => string;

  /**
   * Obtiene el método HTTP utilizado en la petición.
   * @returns {HttpMethods} El verbo HTTP normalizado (GET, POST, etc.).
   */
  requestMethod: () => HttpMethods;

  /**
   * Obtiene todas las cabeceras de la solicitud entrante.
   * @returns {Headers} Objeto con pares clave-valor de las cabeceras.
   */
  requestHeaders: () => Headers;

  /**
   * Recupera y procesa el cuerpo (payload) de la petición.
   * Habitualmente se utiliza para peticiones POST, PUT o PATCH.
   * @returns {Record<string, any> | Promise<Record<string, any>>}
   * Un objeto con los datos procesados (ej. de JSON a objeto JS).
   */
  postData(): Record<string, any>;

  /**
   * Extrae los parámetros de consulta de la URL (query strings).
   * @returns {Record<string, any>} Objeto con las variables de la URL.
   * @example Para "?id=10&sort=desc" retorna { id: "10", sort: "desc" }
   */
  queryParams: () => Record<string, any>;
}
