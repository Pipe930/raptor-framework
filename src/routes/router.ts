import { HashMapRouters, RouteHandler } from "../utils/types";
import { HttpMethods } from "../enums/methods";
import { Request } from "../http/request";
import { Layer } from "./layer";
import { HttpNotFoundException } from "../exceptions/httpNotFoundException";
/**
 * Clase encargada de la gestión y resolución de rutas del framework.
 * * Almacena las instancias de {@link Layer} organizadas por métodos HTTP y
 * determina qué controlador debe ejecutarse basándose en la solicitud.
 */
export class Router {
  /**
   * Diccionario que agrupa las capas de rutas por su método HTTP.
   * @type {HashMapRouters}
   */
  protected routes: HashMapRouters = Object.create(null) as HashMapRouters;

  /**
   * Inicializa el router creando un contenedor vacío (array) para cada
   * método HTTP definido en el enum {@link HttpMethods}.
   */
  constructor() {
    for (const method of Object.values(HttpMethods)) {
      this.routes[method] = [];
    }
  }

  /**
   * Busca y retorna la capa (`Layer`) que coincida con la URL y el método de la petición.
   * @param {Request} request - El objeto de la solicitud entrante.
   * @returns {Layer} La capa que coincide con la ruta solicitada.
   * @throws {HttpNotFoundException} Si no se encuentra ninguna coincidencia para la URL y el método.
   */
  public resolve(request: Request): Layer {
    const routes = this.routes[request.getMethod];

    for (const route of routes) {
      if (route.matches(request.getUrl)) {
        return route;
      }
    }

    throw new HttpNotFoundException("Route not found");
  }

  /**
   * Registra internamente una nueva ruta creando una instancia de {@link Layer}.
   * @param {HttpMethods} method - El método HTTP (GET, POST, etc.).
   * @param {string} path - El patrón de la URL.
   * @param {RouteHandler} action - La función que manejará la petición.
   */
  private registerRoute(
    method: HttpMethods,
    path: string,
    action: RouteHandler,
  ): void {
    this.routes[method].push(new Layer(path, action));
  }

  /**
   * Registra una ruta para el método GET.
   * @param {string} path - Patrón de la URL.
   * @param {RouteHandler} action - Controlador de la ruta.
   */
  public get(path: string, action: RouteHandler): void {
    this.registerRoute(HttpMethods.get, path, action);
  }

  /**
   * Registra una ruta para el método POST.
   * @param {string} path - Patrón de la URL.
   * @param {RouteHandler} action - Controlador de la ruta.
   */
  public post(path: string, action: RouteHandler): void {
    this.registerRoute(HttpMethods.post, path, action);
  }

  /**
   * Registra una ruta para el método PATCH.
   * @param {string} path - Patrón de la URL.
   * @param {RouteHandler} action - Controlador de la ruta.
   */
  public patch(path: string, action: RouteHandler): void {
    this.registerRoute(HttpMethods.patch, path, action);
  }

  /**
   * Registra una ruta para el método PUT.
   * @param {string} path - Patrón de la URL.
   * @param {RouteHandler} action - Controlador de la ruta.
   */
  public put(path: string, action: RouteHandler): void {
    this.registerRoute(HttpMethods.put, path, action);
  }

  /**
   * Registra una ruta para el método DELETE.
   * @param {string} path - Patrón de la URL.
   * @param {RouteHandler} action - Controlador de la ruta.
   */
  public delete(path: string, action: RouteHandler): void {
    this.registerRoute(HttpMethods.delete, path, action);
  }
}
