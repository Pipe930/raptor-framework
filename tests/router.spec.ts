import { Router } from "../src/routes/router";
import { HttpMethods } from "../src/enums/methods";
import { CreateServer } from "../src/app/createServer";
import { Request } from "../src/http/request";

describe("RouterTest", () => {
  let router: Router;
  const createServer = (url: string, method: HttpMethods): Request => {
    const mockCreateServer = {
      requestUrl: jest.fn().mockReturnValue(url),
      requestMethod: jest.fn().mockReturnValue(method),
      requestHeaders: jest.fn().mockReturnValue({ host: "localhost" }),
      queryParams: jest.fn().mockReturnValue({}),
      postData: jest.fn().mockResolvedValue({}),
    } as unknown as jest.Mocked<CreateServer>;

    return Request.from(mockCreateServer);
  };

  beforeEach(() => {
    router = new Router();
  });

  it("should resolve basic route with callback action", () => {
    const url = "/test";
    const action = jest.fn();
    router.get(url, action);

    const routerResolve = router.resolve(createServer(url, HttpMethods.get));

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
        router.resolve(createServer(route.url, HttpMethods.get)).getAction,
      );

      expect(route.url).toBe(
        router.resolve(createServer(route.url, HttpMethods.get)).getUrl,
      );
    });
  });

  it("should throw if route does not exist", () => {
    expect(() =>
      router.resolve(createServer("/not-found", HttpMethods.get)),
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
      router.resolve(createServer(url, HttpMethods.get)).getAction,
    ).toEqual(getHandler);
    expect(
      router.resolve(createServer(url, HttpMethods.post)).getAction,
    ).toEqual(postHandler);
    expect(
      router.resolve(createServer(url, HttpMethods.put)).getAction,
    ).toEqual(putHandler);
    expect(
      router.resolve(createServer(url, HttpMethods.patch)).getAction,
    ).toEqual(pathHandler);
    expect(
      router.resolve(createServer(url, HttpMethods.delete)).getAction,
    ).toEqual(deleteHandler);
  });
});
