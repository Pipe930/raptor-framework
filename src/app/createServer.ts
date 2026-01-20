import { HttpMethods } from "../enums/methods";
import { IncomingMessage, ServerResponse } from "node:http";
import { Server } from "./server";
import { Response } from "../http/response";
import { Request } from "../http/request";

/**
 * Implementación de servidor para Node.js nativo.
 * disponibles, esta clase debe extraer activamente los datos del
 * objeto IncomingMessage de Node.js.
 * @implements {Server}
 */
export class NodeNativeServer implements Server {
  /**
   * @param {IncomingMessage} req - Objeto de solicitud nativo de Node.js.
   * @param {ServerResponse} res - Objeto de respuesta nativo de Node.js.
   */
  constructor(
    private readonly req: IncomingMessage,
    private readonly res: ServerResponse,
  ) {}

  /**
   * Construye y retorna un objeto Request mapeando los datos de Node.js.
   * @returns {Request} Instancia de la petición hidratada.
   */
  public getRequest(): Request {
    const url = new URL(this.req.url || "", `http://${this.req.headers.host}`);

    return new Request()
      .setUrl(url.pathname)
      .setMethod((this.req.method as HttpMethods) || HttpMethods.get)
      .setQueryParameters(Object.fromEntries(url.searchParams.entries()))
      .setHeaders(this.req.headers)
      .setData({});
  }

  /**
   * Envía la respuesta al cliente mapeando el objeto Response al ServerResponse nativo.
   * @param {Response} response - Objeto de respuesta del framework.
   */
  public sendResponse(response: Response): void {
    response.prepare();
    this.res.statusCode = response.getStatus;
    const headers = response.getHeaders;

    for (const [header, value] of Object.entries(headers)) {
      this.res.setHeader(header, value as string);
    }

    if (!response.getContent) this.res.removeHeader("Content-Type");

    this.res.end(response.getContent);
  }
}
