import { HttpMethods } from "../enums/methods";
import { CreateServer } from "../app/createServer";
import { Headers } from "../utils/types";

export class Request {
  constructor(
    protected readonly url: string,
    protected readonly headers: Headers,
    protected readonly method: HttpMethods,
    protected readonly data: Record<string, any>,
    protected readonly query: Record<string, any>,
  ) {}

  public static from(server: CreateServer): Request {
    return new Request(
      server.requestUrl(),
      server.requestHeaders(),
      server.requestMethod(),
      server.postData(),
      server.queryParams(),
    );
  }

  get getUrl(): string {
    return this.url;
  }

  get getMethod(): HttpMethods {
    return this.method;
  }

  get getHeaders(): Headers {
    return this.headers;
  }

  public getData(): Record<string, any> {
    return this.data;
  }
}
