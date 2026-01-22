import { Router } from "../src/routes/router";
import { HttpMethods } from "../src/http/httpMethods";
import { createRequestMock } from "./utils";
import { NextFunction } from "../src/utils/types";
import { Request } from "../src/http/request";
import { Response } from "../src/http/response";

describe("RouterTest", () => {
  let router: Router;

  beforeEach(() => {
    jest.clearAllMocks();
    router = new Router();
  });

  it("should resolve basic route with callback action", () => {
    const url = "/test";
    const action = jest.fn();
    router.get(url, action);

    const routerResolve = router.resolveLayer(
      createRequestMock(url, HttpMethods.get),
    );

    expect(action).toEqual(routerResolve.getAction);
    expect(url).toBe(routerResolve.getUrl);
  });

  it("should resolve multiple basic routees with callback actions", () => {
    const routes = [
      {
        url: "/posts",
        action: jest.fn(),
      },
      {
        url: "/products",
        action: jest.fn(),
      },
      {
        url: "/users",
        action: jest.fn(),
      },
      {
        url: "/categories",
        action: jest.fn(),
      },
    ];

    routes.forEach((route) => {
      router.get(route.url, route.action);
    });

    routes.forEach((route) => {
      expect(route.action).toEqual(
        router.resolveLayer(createRequestMock(route.url, HttpMethods.get))
          .getAction,
      );

      expect(route.url).toBe(
        router.resolveLayer(createRequestMock(route.url, HttpMethods.get))
          .getUrl,
      );
    });
  });

  it("should throw if route does not exist", () => {
    expect(() =>
      router.resolveLayer(createRequestMock("/not-found", HttpMethods.get)),
    ).toThrow("Route not found");
  });

  it("should not mix routes between methods", () => {
    const url = "/posts";

    const getHandler = jest.fn();
    const postHandler = jest.fn();
    const putHandler = jest.fn();
    const pathHandler = jest.fn();
    const deleteHandler = jest.fn();

    router.get(url, getHandler);
    router.post(url, postHandler);
    router.put(url, putHandler);
    router.patch(url, pathHandler);
    router.delete(url, deleteHandler);

    expect(
      router.resolveLayer(createRequestMock(url, HttpMethods.get)).getAction,
    ).toEqual(getHandler);
    expect(
      router.resolveLayer(createRequestMock(url, HttpMethods.post)).getAction,
    ).toEqual(postHandler);
    expect(
      router.resolveLayer(createRequestMock(url, HttpMethods.put)).getAction,
    ).toEqual(putHandler);
    expect(
      router.resolveLayer(createRequestMock(url, HttpMethods.patch)).getAction,
    ).toEqual(pathHandler);
    expect(
      router.resolveLayer(createRequestMock(url, HttpMethods.delete)).getAction,
    ).toEqual(deleteHandler);
  });

  it("should valid run middlewares", () => {
    const middleware1 = class {
      public handle(request: Request, next: NextFunction): Response {
        const response = next(request);
        response.setHeader("x-test-one", "one");
        return response;
      }
    };

    const middleware2 = class {
      public handle(request: Request, next: NextFunction): Response {
        const response = next(request);
        response.setHeader("x-test-two", "two");
        return response;
      }
    };

    const responseExcepted = Response.text("hola");
    const url = "/test/hola";

    router
      .get(url, (request: Request) => responseExcepted)
      .setMiddlewares([middleware1, middleware2]);

    const response = router.resolve(createRequestMock(url, HttpMethods.get));

    expect(responseExcepted).toBe(response);
    expect(response.getHeaders["x-test-one"]).toBe("one");
    expect(response.getHeaders["x-test-two"]).toBe("two");
  });
});
