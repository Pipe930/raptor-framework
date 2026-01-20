import { Request } from "../src/http/request";
import { HttpMethods } from "../src/enums/methods";
import { createServerMock } from "./utils";
import { CreateServer } from "../src/app/createServer";

describe("RequestTest", () => {
  let mockServer: jest.Mocked<CreateServer>;
  let request: Request;

  const url = "/test/route";
  const method = HttpMethods.post;
  const params = { id: 1 };
  const headers = { "content-type": "application/json" };
  const data = { search: "gemini" };
  beforeEach(() => {
    jest.clearAllMocks();
    mockServer = createServerMock(url, method, headers, params, data);
    request = Request.from(mockServer);
  });

  it("should create an instance from a CreateServer provider using the static 'from' method", () => {
    const request = Request.from(mockServer);

    expect(request).toBeInstanceOf(Request);
    expect(mockServer.requestUrl).toHaveBeenCalledTimes(2);
    expect(mockServer.requestMethod).toHaveBeenCalledTimes(2);
  });
  it("should request return data obtained from server correctly", () => {
    expect(url).toBe(request.getUrl);
    expect(method).toBe(request.getMethod);
    expect(params).toEqual(request.getParams);
    expect(headers).toEqual(request.getHeaders);
    expect(data).toEqual(request.getData());
  });
});
