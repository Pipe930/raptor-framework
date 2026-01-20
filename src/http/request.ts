import { HttpMethods } from "../enums/methods";
import { Headers } from "../utils/types";
import { Layer } from "../routes/layer";

/**
 * Representa una solicitud HTTP evolucionada con soporte para resolución de rutas.
 * * Esta versión permite la mutabilidad controlada de sus propiedades mediante
 * un patrón de interfaz fluida, facilitando su manipulación en el pipeline del framework.
 */
export class Request {
  /** @type {string} Ruta de la solicitud (ej. '/api/users/42') */
  protected url: string;

  /** @type {Layer} Capa de ruta asociada que gestiona el matching y parámetros */
  protected layer: Layer;

  /** @type {Headers} Diccionario de cabeceras HTTP entrantes */
  protected headers: Headers;

  /** @type {HttpMethods} Verbo HTTP de la petición */
  protected method: HttpMethods;

  /** @type {Record<string, any>} Cuerpo de la petición procesado (Payload) */
  protected data: Record<string, any>;

  /** @type {Record<string, any>} Parámetros de consulta (Query Strings) */
  protected query: Record<string, any>;

  /**
   * Obtiene la URL de la solicitud.
   * @returns {string}
   */
  get getUrl(): string {
    return this.url;
  }

  /**
   * Define la URL de la solicitud.
   * @param {string} url - Nueva URL.
   * @returns {this} Instancia actual para encadenamiento.
   */
  public setUrl(url: string): this {
    this.url = url;
    return this;
  }

  /**
   * Obtiene el método HTTP de la solicitud.
   * @returns {HttpMethods}
   */
  get getMethod(): HttpMethods {
    return this.method;
  }

  /**
   * Define el método HTTP.
   * @param {HttpMethods} method - El verbo HTTP (GET, POST, etc.).
   * @returns {this} Instancia actual.
   */
  public setMethod(method: HttpMethods): this {
    this.method = method;
    return this;
  }

  /**
   * Obtiene la instancia de la capa (Layer) asociada a esta solicitud.
   * @returns {Layer}
   */
  get getLayer(): Layer {
    return this.layer;
  }

  /**
   * Asocia una capa de enrutamiento a la solicitud.
   * @param {Layer} layer - Instancia de Layer que coincide con la ruta.
   * @returns {this} Instancia actual.
   */
  public setLayer(layer: Layer): this {
    this.layer = layer;
    return this;
  }

  /**
   * Obtiene las cabeceras HTTP de la solicitud.
   * @returns {Headers}
   */
  get getHeaders(): Headers {
    return this.headers;
  }

  /**
   * Define las cabeceras de la petición
   * @param {Headers} headers - Instancia de las cabeceras
   * @returns {Headers}
   */
  public setHeaders(headers: Headers): this {
    this.headers = headers;
    return this;
  }

  /**
   * Recupera los parámetros de consulta (query strings) de la URL.
   * @returns {Record<string, any>} Objeto clave-valor.
   */
  get getParams(): Record<string, any> {
    return this.query;
  }

  /**
   * Define los parámetros de consulta de la petición.
   * @param {Record<string, any>} query - Diccionario de parámetros.
   * @returns {this} Instancia actual.
   */
  public setQueryParameters(query: Record<string, any>): this {
    this.query = query;
    return this;
  }

  /**
   * Extrae y retorna los parámetros dinámicos de la ruta basándose en la Layer asociada.
   * @example Si la ruta es /user/{id} y la URL es /user/10, devuelve { id: '10' }.
   * @returns {Record<string, any>} Parámetros de ruta parseados.
   */
  public layerParameters(): Record<string, any> {
    return this.layer.parseParameters(this.url);
  }

  /**
   * Obtiene el cuerpo de la solicitud (datos enviados por el cliente).
   * @returns {Record<string, any>}
   */
  get getData(): Record<string, any> {
    return this.data;
  }

  /**
   * Define o sobrescribe el cuerpo de la petición.
   * @param {Record<string, any>} data - Payload de la solicitud.
   * @returns {this} Instancia actual.
   */
  public setData(data: Record<string, any>): this {
    this.data = data;
    return this;
  }
}
