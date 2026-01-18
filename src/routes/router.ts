import { HashMapRouters, RouteHandler } from "../utils/types";
import { HttpMethods } from "../enums/methods";
import { Layer } from "./layer";
export class Router {
  protected routes: HashMapRouters = Object.create(null) as HashMapRouters;

  constructor() {
    for (const method of Object.values(HttpMethods)) {
      this.routes[method] = [];
    }
  }

  public resolve(method: HttpMethods, path: string): Layer {
    const routes = this.routes[method];

    for (const route of routes) {
      if (route.matches(path)) {
        return route;
      }
    }

    throw new Error("Route not found");
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
