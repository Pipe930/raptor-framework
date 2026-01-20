import { NodeNativeServer } from "../src/app/createServer";
import { Request } from "../src/http/request";
import { HttpMethods } from "../src/enums/methods";
import { IncomingMessage, ServerResponse } from "node:http";

export const createRequestMock = (
  url: string,
  method: HttpMethods,
): Request => {
  const mockReq = {
    url: url,
    method: method,
    headers: {
      host: "localhost:3000",
    },
  };

  const mockRes = {
    statusCode: 200,
    setHeader: jest.fn(),
    removeHeader: jest.fn(),
    end: jest.fn(),
  };

  const server = new NodeNativeServer(
    mockReq as IncomingMessage,
    mockRes as unknown as ServerResponse,
  );

  return server.getRequest();
};
