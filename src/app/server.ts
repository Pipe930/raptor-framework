import { HttpMethods } from "enums/methods";
import { Headers } from "../utils/types";

export interface Server {
  requestUrl: () => string;
  requestMethod: () => HttpMethods;
  requestHeaders: () => Headers;
  postData(): Record<string, any>;
  queryParams: () => Record<string, any>;
}
