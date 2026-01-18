import { HttpMethods } from "../enums/methods";
import { IncomingMessage } from "node:http";
import { Headers } from "../utils/types";
import { Server } from "./server";

export class CreateServer implements Server {
  private request: IncomingMessage;
  private urlHost: URL;

  constructor(request: IncomingMessage) {
    this.request = request;
    this.urlHost = new URL(
      this.request.url || "",
      `http://${this.request.headers.host}`,
    );
  }

  public requestUrl(): string {
    return this.urlHost.pathname;
  }

  public requestMethod(): HttpMethods {
    return (this.request.method as HttpMethods) || HttpMethods.get;
  }

  public requestHeaders(): Headers {
    return this.request.headers;
  }

  public async postData(): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      let body = "";
      this.request.on("data", (chunk) => {
        const buffer: Buffer = chunk as Buffer;
        body += buffer.toString("utf-8");
      });
      this.request.on("end", () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch (e) {
          reject(new Error("Invalid JSON"));
        }
      });
    });
  }

  public queryParams(): Record<string, any> {
    return Object.fromEntries(this.urlHost.searchParams.entries());
  }
}
