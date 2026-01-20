import { Request } from "../src/http/request";
import { HttpMethods } from "../src/enums/methods";

describe("RequestTest", () => {
  let request: Request;

  const url = "/test/route";
  const method = HttpMethods.post;
  const params = { id: 1 };
  const headers = { "content-type": "application/json" };
  const data = { search: "gemini" };
  beforeEach(() => {
    request = new Request()
      .setUrl(url)
      .setMethod(method)
      .setQueryParameters(params)
      .setHeaders(headers)
      .setData(data);
  });

  it("should request return data obtained from server correctly", () => {
    expect(url).toBe(request.getUrl);
    expect(method).toBe(request.getMethod);
    expect(params).toEqual(request.getParams);
    expect(headers).toEqual(request.getHeaders);
    expect(data).toEqual(request.getData);
  });
});
