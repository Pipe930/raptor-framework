import { RouteHandler } from "utils/types";

export class Layer {
  protected url: string;
  protected regex: RegExp;
  protected parameters: string[];
  protected action: RouteHandler;

  constructor(url: string, action: RouteHandler) {
    const paramRegex = /\{([a-zA-Z]+)\}/g;
    const regexSource = url.replace(paramRegex, "([a-zA-Z0-9]+)");

    this.url = url;
    this.regex = new RegExp(`^${regexSource}/?$`);
    this.parameters = [...url.matchAll(paramRegex)].map((m) => m[1]);
    this.action = action;
  }

  get getUrl(): string {
    return this.url;
  }

  get getAction(): RouteHandler {
    return this.action;
  }

  public matches(url: string): boolean {
    return this.regex.test(url);
  }

  public hasParameters(): boolean {
    return this.parameters.length > 0;
  }

  public parseParameters(url: string): Record<string, string> {
    const match = this.regex.exec(url);
    if (!match) return {};

    const params: Record<string, string> = {};

    this.parameters.forEach((name, index) => {
      params[name] = match[index + 1];
    });

    return params;
  }
}
