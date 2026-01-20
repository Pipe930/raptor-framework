import { Request } from "../http/request";
import { Response } from "../http/response";

/**
 * Contrato de alto nivel para el motor del servidor.
 * * Esta interfaz abstrae la complejidad de la red y el protocolo HTTP,
 * reduciendo la interacción a dos flujos principales: la obtención de una
 * solicitud estructurada y el despacho de una respuesta procesada.
 * @interface Server
 */
export interface Server {
  /**
   * Genera y retorna una instancia de la clase {@link Request} basada
   * en la información de la conexión actual.
   * * Este método debe encargarse de normalizar la URL, los métodos,
   * las cabeceras y procesar el cuerpo de la petición antes de entregarla.
   * @returns {Request} El objeto de solicitud listo para ser procesado por el router.
   */
  getRequest: () => Request;

  /**
   * Toma una instancia de la clase {@link Response} y transfiere su estado,
   * cabeceras y contenido al cliente a través del socket de red subyacente.
   * @param {Response} response - El objeto que contiene la lógica de respuesta
   * definida por el desarrollador.
   * @returns {void}
   */
  sendResponse: (response: Response) => void;
}
