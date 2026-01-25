import { NodeHttpAdapter } from "../src/http/nodeNativeHttp";
import { Request } from "../src/http/request";
import { HttpMethods } from "../src/http/httpMethods";
import { IncomingMessage, ServerResponse } from "node:http";
import { Readable } from "stream";

export const createRequestMock = async (
  url: string,
  method: HttpMethods,
  body: any = null,
): Promise<Request> => {
  const mockReq = new Readable() as IncomingMessage;

  mockReq.url = url;
  mockReq.method = method;
  mockReq.headers = { host: "localhost:3000" };

  if (body) mockReq.push(JSON.stringify(body));

  mockReq.push(null);

  const mockRes = {
    statusCode: 200,
    setHeader: jest.fn(),
    removeHeader: jest.fn(),
    end: jest.fn(),
  } as unknown as ServerResponse;

  const server = new NodeHttpAdapter(mockReq, mockRes);
  return await server.getRequest();
};
