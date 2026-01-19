import { RouteHandler } from "utils/types";

/**
 * Representa una capa de ruta individual dentro del sistema de enrutamiento.
 * * Se encarga de la lógica de coincidencia (matching) de URLs mediante expresiones
 * regulares y de la extracción de parámetros dinámicos definidos en la ruta.
 */
export class Layer {
  /**
   * La plantilla de la URL original (ej: '/users/{id}').
   * @type {string}
   */
  protected url: string;

  /**
   * Expresión regular generada a partir de la URL para validar peticiones entrantes.
   * @type {RegExp}
   */
  protected regex: RegExp;

  /**
   * Lista de nombres de los parámetros capturados en la URL (ej: ['id']).
   * @type {string[]}
   */
  protected parameters: string[];

  /**
   * La función controladora o callback que se ejecuta cuando la ruta coincide.
   * @type {RouteHandler}
   */
  protected action: RouteHandler;

  /**
   * Crea una nueva instancia de Layer y compila la URL en una expresión regular.
   * @param {string} url - La plantilla de la ruta (soporta parámetros entre llaves `{param}`).
   * @param {RouteHandler} action - La función que procesará la petición para esta ruta.
   */
  constructor(url: string, action: RouteHandler) {
    const paramRegex = /\{([a-zA-Z]+)\}/g;
    const regexSource = url.replace(paramRegex, "([a-zA-Z0-9]+)");

    this.url = url;
    this.regex = new RegExp(`^${regexSource}/?$`);
    this.parameters = [...url.matchAll(paramRegex)].map((m) => m[1]);
    this.action = action;
  }

  /**
   * Obtiene la plantilla de URL original de esta capa.
   * @returns {string}
   */
  get getUrl(): string {
    return this.url;
  }

  /**
   * Obtiene el manejador (handler) asociado a esta ruta.
   * @returns {RouteHandler}
   */
  get getAction(): RouteHandler {
    return this.action;
  }

  /**
   * Comprueba si una URL entrante coincide con el patrón de esta capa.
   * @param {string} url - La URL de la petición a comparar.
   * @returns {boolean} Verdadero si la URL cumple con la estructura de la ruta.
   */
  public matches(url: string): boolean {
    return this.regex.test(url);
  }

  /**
   * Indica si la ruta actual contiene parámetros dinámicos.
   * @returns {boolean}
   */
  public hasParameters(): boolean {
    return this.parameters.length > 0;
  }

  /**
   * Extrae los valores de los parámetros dinámicos de una URL real.
   * * @example
   * // Si la URL es /user/{id} y recibimos /user/42
   * // Retorna: { id: "42" }
   * * @param {string} url - La URL real de la petición.
   * @returns {Record<string, string>} Un objeto clave-valor con los parámetros extraídos.
   */
  public parseParameters(url: string): Record<string, string> {
    const match = this.regex.exec(url);
    if (!match) return {};

    const params: Record<string, string> = {};

    this.parameters.forEach((name, index) => {
      params[name] = match[index + 1];
    });

    return params;
  }
}
