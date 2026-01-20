import { CreateServer } from "../src/app/createServer";
import { Request } from "../src/http/request";
import { HttpMethods } from "../src/enums/methods";

export const createRequestMock = (
  url: string,
  method: HttpMethods,
): Request => {
  const mockCreateServer = {
    requestUrl: jest.fn().mockReturnValue(url),
    requestMethod: jest.fn().mockReturnValue(method),
    requestHeaders: jest.fn().mockReturnValue({ host: "localhost" }),
    queryParams: jest.fn().mockReturnValue({}),
    postData: jest.fn().mockReturnValue({}),
  } as unknown as jest.Mocked<CreateServer>;

  return Request.from(mockCreateServer);
};

export const createServerMock = (
  url: string,
  method: HttpMethods,
  headers: Record<string, any>,
  queryParams: Record<string, any>,
  postData: Record<string, any>,
): jest.Mocked<CreateServer> => {
  return {
    requestUrl: jest.fn().mockReturnValue(url),
    requestMethod: jest.fn().mockReturnValue(method),
    requestHeaders: jest.fn().mockReturnValue(headers),
    queryParams: jest.fn().mockReturnValue(queryParams),
    postData: jest.fn().mockReturnValue(postData),
  } as unknown as jest.Mocked<CreateServer>;
};
