import { Router } from "../src/routes/router";
import { HttpMethods } from "../src/enums/methods";

describe("RouterTest", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router();
  });

  it("should resolve basic route with callback action", () => {
    const url = "/test";
    const action = () => "test";
    router.get(url, action);

    expect(action).toEqual(router.resolve(HttpMethods.get, url));
  });

  it("should resolve multiple basic routees with callback actions", () => {
    const routes = [
      {
        url: "/posts",
        action: () => "posts",
      },
      {
        url: "/products",
        action: () => "products",
      },
      {
        url: "/users",
        action: () => "users",
      },
      {
        url: "/categories",
        action: () => "categories",
      },
    ];

    routes.forEach((route) => {
      router.get(route.url, route.action);
    });

    routes.forEach((route) => {
      expect(route.action).toEqual(router.resolve(HttpMethods.get, route.url));
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

    expect(router.resolve(HttpMethods.get, "/posts")).toBe(getHandler);
    expect(router.resolve(HttpMethods.post, "/posts")).toBe(postHandler);
    expect(router.resolve(HttpMethods.put, "/posts")).toBe(putHandler);
    expect(router.resolve(HttpMethods.patch, "/posts")).toBe(pathHandler);
    expect(router.resolve(HttpMethods.delete, "/posts")).toBe(deleteHandler);
  });
});
