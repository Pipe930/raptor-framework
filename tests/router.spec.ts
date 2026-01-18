import { Router } from "../src/routes/router";
import { HttpMethods } from "../src/enums/methods";

describe("RouterTest", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router();
  });

  it("should resolve basic route with callback action", () => {
    const url = "/test";
    const action = jest.fn();
    router.get(url, action);

    const routerResolve = router.resolve(HttpMethods.get, url);

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
        router.resolve(HttpMethods.get, route.url).getAction,
      );

      expect(route.url).toBe(router.resolve(HttpMethods.get, route.url).getUrl);
    });
  });

  it("should throw if route does not exist", () => {
    expect(() => router.resolve(HttpMethods.get, "/not-found")).toThrow(
      "Route not found",
    );
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

    expect(router.resolve(HttpMethods.get, "/posts").getAction).toEqual(
      getHandler,
    );
    expect(router.resolve(HttpMethods.post, "/posts").getAction).toEqual(
      postHandler,
    );
    expect(router.resolve(HttpMethods.put, "/posts").getAction).toEqual(
      putHandler,
    );
    expect(router.resolve(HttpMethods.patch, "/posts").getAction).toEqual(
      pathHandler,
    );
    expect(router.resolve(HttpMethods.delete, "/posts").getAction).toEqual(
      deleteHandler,
    );
  });
});
