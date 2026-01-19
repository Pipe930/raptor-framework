import { HttpMethods } from "../enums/methods";
import { CreateServer } from "../app/createServer";
import { Headers } from "../utils/types";

/**
 * Representa la abstracción de una solicitud HTTP entrante.
 * * Esta clase encapsula todos los datos relevantes de la petición (URL, cabeceras,
 * método, cuerpo y parámetros) proporcionando métodos de acceso controlados.
 */
export class Request {
  /**
   * El constructor es privado para forzar la instanciación a través del método estático `from`.
   * @param {string} url - La URL completa de la solicitud.
   * @param {Headers} headers - Objeto que contiene las cabeceras HTTP (clave-valor).
   * @param {HttpMethods} method - El verbo HTTP de la petición (GET, POST, etc.).
   * @param {Record<string, any>} data - El cuerpo de la petición (payload) ya procesado.
   * @param {Record<string, any>} query - Los parámetros de consulta (query strings) de la URL.
   */
  private constructor(
    protected readonly url: string,
    protected readonly headers: Headers,
    protected readonly method: HttpMethods,
    protected readonly data: Record<string, any>,
    protected readonly query: Record<string, any>,
  ) {}

  /**
   * Método de factoría estático que crea una nueva instancia de `Request`
   * abstrayendo la implementación del servidor nativo.
   * @param {CreateServer} server - Instancia del servidor que contiene la lógica de extracción de datos.
   * @returns {Request} Una nueva instancia de la clase Request configurada.
   */
  public static from(server: CreateServer): Request {
    return new Request(
      server.requestUrl(),
      server.requestHeaders(),
      server.requestMethod(),
      server.postData(),
      server.queryParams(),
    );
  }

  /**
   * Obtiene la URL de la solicitud.
   * @returns {string}
   */
  get getUrl(): string {
    return this.url;
  }

  /**
   * Obtiene el método HTTP de la solicitud.
   * @returns {HttpMethods}
   */
  get getMethod(): HttpMethods {
    return this.method;
  }

  /**
   * Obtiene las cabeceras HTTP de la solicitud.
   * @returns {Headers}
   */
  get getHeaders(): Headers {
    return this.headers;
  }

  /**
   * Recupera el cuerpo de la solicitud (datos enviados por el cliente).
   * @returns {Record<string, any>} Objeto con los datos del cuerpo de la petición.
   */
  public getData(): Record<string, any> {
    return this.data;
  }
}
