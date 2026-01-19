import { Headers } from "../utils/types";

export class Response {
  protected status = 200;
  protected headers: Headers = {};
  protected content?: string = null;

  get getStatus(): number {
    return this.status;
  }

  public setStatus(newStatus: number): this {
    this.status = newStatus;
    return this;
  }

  get getHeaders(): Headers {
    return this.headers;
  }

  public setHeader(header: string, value: string): this {
    this.headers[header] = value;
    return this;
  }

  public removeHeader(header: string): void {
    delete this.headers[header];
  }

  public setContentType(value: string): this {
    this.headers["content-type"] = value;
    return this;
  }

  get getContent(): string | null {
    return this.content;
  }

  public setContent(content: string): this {
    this.content = content;
    return this;
  }

  public prepare(): void {
    if (!this.content) {
      this.removeHeader("content-type");
      this.removeHeader("content-length");
    } else {
      this.setHeader("content-length", this.content.length.toString());
    }
  }

  public static json(data: any) {
    return new this()
      .setContentType("application/json")
      .setContent(JSON.stringify(data));
  }

  public static text(data: string) {
    return new this().setContentType("text/plain").setContent(data);
  }

  public static redirect(url: string) {
    return new this().setStatus(302).setHeader("location", url);
  }
}
