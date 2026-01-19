import { HttpMethods } from "../enums/methods";
import { IncomingMessage, ServerResponse } from "node:http";
import { Headers } from "../utils/types";
import { Server } from "./server";
import { Response } from "../http/response";

/**
 * Implementación concreta del servidor que actúa como adaptador para el módulo nativo de Node.js.
 * * Esta clase extrae, procesa y normaliza la información proveniente de `IncomingMessage`
 * y gestiona la escritura de la salida a través de `ServerResponse`.
 * @implements {Server}
 */
export class CreateServer implements Server {
  /**
   * Objeto de solicitud nativo de Node.js.
   * @type {IncomingMessage}
   */
  private request: IncomingMessage;

  /**
   * Objeto URL de la API nativa para el parseo eficiente de rutas y parámetros.
   * @type {URL}
   */
  private urlHost: URL;

  /**
   * Crea una instancia del adaptador de servidor.
   * @param {IncomingMessage} request - La solicitud nativa recibida del servidor HTTP.
   */
  constructor(request: IncomingMessage) {
    this.request = request;
    this.urlHost = new URL(
      this.request.url || "",
      `http://${this.request.headers.host}`,
    );
  }

  /**
   * Retorna el camino (path) de la URL solicitada, excluyendo la cadena de consulta.
   * @returns {string}
   * @example '/api/users'
   */
  public requestUrl(): string {
    return this.urlHost.pathname;
  }

  /**
   * Retorna el método HTTP de la solicitud, normalizado según el enum {@link HttpMethods}.
   * @returns {HttpMethods}
   */
  public requestMethod(): HttpMethods {
    return (this.request.method as HttpMethods) || HttpMethods.get;
  }

  /**
   * Obtiene las cabeceras originales de la solicitud.
   * @returns {Headers}
   */
  public requestHeaders(): Headers {
    return this.request.headers;
  }

  /**
   * Procesa de forma asíncrona el cuerpo de la petición (stream) y lo convierte en un objeto.
   * * Actualmente maneja exclusivamente contenido en formato JSON.
   * @returns {Promise<Record<string, any>>} Promesa que resuelve con el cuerpo parseado o un objeto vacío.
   * @throws {Error} Si el JSON recibido es inválido.
   */
  public async postData(): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      let body = "";

      this.request.on("data", (chunk) => {
        const buffer: Buffer = chunk as Buffer;
        body += buffer.toString("utf-8");
      });

      this.request.on("end", () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch (e) {
          reject(new Error("Invalid JSON"));
        }
      });
    });
  }

  /**
   * Extrae los parámetros de búsqueda (query strings) de la URL.
   * @returns {Record<string, any>} Objeto clave-valor con los parámetros (ej: { id: "1" }).
   */
  public queryParams(): Record<string, any> {
    return Object.fromEntries(this.urlHost.searchParams.entries());
  }

  /**
   * Toma una instancia de la clase de respuesta del framework y la vuelca
   * en el objeto de respuesta nativo de Node.js para enviarla al cliente.
   * @param {ServerResponse} res - El objeto de respuesta nativo de Node.js.
   * @param {Response} response - La instancia de Response de tu framework con los datos a enviar.
   * @returns {void}
   */
  public sendResponse(res: ServerResponse, response: Response): void {
    response.prepare();

    const content = response.getContent;
    res.statusCode = response.getStatus;
    const headers = response.getHeaders;

    for (const [header, value] of Object.entries(headers)) {
      res.setHeader(header, value as string);
    }

    if (!content) res.removeHeader("Content-Type");

    res.end(content);
  }
}
