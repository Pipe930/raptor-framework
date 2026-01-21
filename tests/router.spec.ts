import { Router } from "../src/routes/router";
import { HttpMethods } from "../src/http/httpMethods";
import { createRequestMock } from "./utils";

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

    const routerResolve = router.resolve(
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
        router.resolve(createRequestMock(route.url, HttpMethods.get)).getAction,
      );

      expect(route.url).toBe(
        router.resolve(createRequestMock(route.url, HttpMethods.get)).getUrl,
      );
    });
  });

  it("should throw if route does not exist", () => {
    expect(() =>
      router.resolve(createRequestMock("/not-found", HttpMethods.get)),
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
      router.resolve(createRequestMock(url, HttpMethods.get)).getAction,
    ).toEqual(getHandler);
    expect(
      router.resolve(createRequestMock(url, HttpMethods.post)).getAction,
    ).toEqual(postHandler);
    expect(
      router.resolve(createRequestMock(url, HttpMethods.put)).getAction,
    ).toEqual(putHandler);
    expect(
      router.resolve(createRequestMock(url, HttpMethods.patch)).getAction,
    ).toEqual(pathHandler);
    expect(
      router.resolve(createRequestMock(url, HttpMethods.delete)).getAction,
    ).toEqual(deleteHandler);
  });
});
