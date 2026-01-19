import { Headers } from "../utils/types";

/**
 * Clase encargada de gestionar la respuesta HTTP que se enviará al cliente.
 * * Permite configurar el estado, las cabeceras y el cuerpo de la respuesta
 * mediante una interfaz fluida (Fluent Interface).
 */
export class Response {
  /**
   * Código de estado HTTP de la respuesta.
   * @type {number}
   * @default 200
   */
  protected status = 200;

  /**
   * Colección de cabeceras HTTP de la respuesta.
   * Se inicializa sin prototipo para evitar colisiones con propiedades heredadas.
   * @type {Headers}
   */
  protected headers: Headers = Object.create(null) as Headers;

  /**
   * Contenido del cuerpo de la respuesta.
   * @type {string | null}
   */
  protected content?: string = null;

  /**
   * Obtiene el código de estado actual de la respuesta.
   * @returns {number}
   */
  get getStatus(): number {
    return this.status;
  }

  /**
   * Define el código de estado HTTP (ej. 200, 404, 500).
   * @param {number} newStatus - El código numérico del estado.
   * @returns {this} Retorna la instancia actual para encadenamiento.
   */
  public setStatus(newStatus: number): this {
    this.status = newStatus;
    return this;
  }

  /**
   * Obtiene todas las cabeceras configuradas actualmente.
   * @returns {Headers}
   */
  get getHeaders(): Headers {
    return this.headers;
  }

  /**
   * Agrega o actualiza una cabecera HTTP.
   * @param {string} header - El nombre de la cabecera (ej. 'Cache-Control').
   * @param {string} value - El valor de la cabecera.
   * @returns {this} Retorna la instancia actual para encadenamiento.
   */
  public setHeader(header: string, value: string): this {
    this.headers[header] = value;
    return this;
  }

  /**
   * Elimina una cabecera específica de la respuesta.
   * @param {string} header - El nombre de la cabecera a eliminar.
   * @returns {void}
   */
  public removeHeader(header: string): void {
    delete this.headers[header];
  }

  /**
   * Atajo para definir la cabecera 'Content-Type'.
   * @param {string} value - El tipo de contenido (ej. 'application/json').
   * @returns {this} Retorna la instancia actual para encadenamiento.
   */
  public setContentType(value: string): this {
    this.headers["content-type"] = value;
    return this;
  }

  /**
   * Obtiene el contenido del cuerpo de la respuesta.
   * @returns {string | null}
   */
  get getContent(): string | null {
    return this.content;
  }

  /**
   * Define el cuerpo de la respuesta en formato string.
   * @param {string} content - El contenido a enviar.
   * @returns {this} Retorna la instancia actual para encadenamiento.
   */
  public setContent(content: string): this {
    this.content = content;
    return this;
  }

  /**
   * Prepara la respuesta antes de ser enviada, gestionando automáticamente
   * las cabeceras de longitud y tipo de contenido según la presencia de datos.
   * @returns {void}
   */
  public prepare(): void {
    if (!this.content) {
      this.removeHeader("content-type");
      this.removeHeader("content-length");
    } else {
      this.setHeader("content-length", this.content.length.toString());
    }
  }

  /**
   * Crea una instancia de Response configurada para enviar datos en formato JSON.
   * @static
   * @param {any} data - Cualquier dato serializable a JSON.
   * @returns {Response} Una nueva instancia de Response.
   */
  public static json(data: any): Response {
    return new this()
      .setContentType("application/json")
      .setContent(JSON.stringify(data));
  }

  /**
   * Crea una instancia de Response configurada para enviar texto plano.
   * @static
   * @param {string} data - El texto a enviar.
   * @returns {Response} Una nueva instancia de Response.
   */
  public static text(data: string): Response {
    return new this().setContentType("text/plain").setContent(data);
  }

  /**
   * Crea una instancia de Response configurada para realizar una redirección.
   * @static
   * @param {string} url - La URL de destino.
   * @returns {Response} Una nueva instancia de Response con status 302.
   */
  public static redirect(url: string): Response {
    return new this().setStatus(302).setHeader("location", url);
  }
}
