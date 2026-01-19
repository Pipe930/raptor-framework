import { HashMapRouters, RouteHandler } from "../utils/types";
import { HttpMethods } from "../enums/methods";
import { Request } from "../http/request";
import { Layer } from "./layer";
import { HttpNotFoundException } from "../exceptions/httpNotFoundException";
export class Router {
  protected routes: HashMapRouters = Object.create(null) as HashMapRouters;

  constructor() {
    for (const method of Object.values(HttpMethods)) {
      this.routes[method] = [];
    }
  }

  public resolve(request: Request): Layer {
    const routes = this.routes[request.getMethod];

    for (const route of routes) {
      if (route.matches(request.getUrl)) {
        return route;
      }
    }

    throw new HttpNotFoundException("Route not found");
  }

  protected registerRoute(
    method: HttpMethods,
    path: string,
    action: RouteHandler,
  ): void {
    this.routes[method].push(new Layer(path, action));
  }

  public get(path: string, action: RouteHandler): void {
    this.registerRoute(HttpMethods.get, path, action);
  }

  public post(path: string, action: RouteHandler): void {
    this.registerRoute(HttpMethods.post, path, action);
  }

  public patch(path: string, action: RouteHandler): void {
    this.registerRoute(HttpMethods.patch, path, action);
  }

  public put(path: string, action: RouteHandler): void {
    this.registerRoute(HttpMethods.put, path, action);
  }

  public delete(path: string, action: RouteHandler): void {
    this.registerRoute(HttpMethods.delete, path, action);
  }
}
