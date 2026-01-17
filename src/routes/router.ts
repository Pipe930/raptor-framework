import { HashMapRouters, RouteHandler } from "../utils/types";
import { HttpMethods } from "../enums/methods";

export class Router {
  protected routes: HashMapRouters = Object.create(null) as HashMapRouters;

  constructor() {
    for (const method of Object.values(HttpMethods)) {
      this.routes[method] = {};
    }
  }

  public resolve(method: HttpMethods, path: string): RouteHandler {
    const action = this.routes[method][path];

    if (!action) throw new Error("Route not found");

    return action;
  }

  public get(path: string, action: RouteHandler): void {
    this.routes[HttpMethods.get][path] = action;
  }

  public post(path: string, action: RouteHandler): void {
    this.routes[HttpMethods.post][path] = action;
  }

  public patch(path: string, action: RouteHandler): void {
    this.routes[HttpMethods.patch][path] = action;
  }

  public put(path: string, action: RouteHandler): void {
    this.routes[HttpMethods.put][path] = action;
  }

  public delete(path: string, action: RouteHandler): void {
    this.routes[HttpMethods.delete][path] = action;
  }
}
