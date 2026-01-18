import { Layer } from "routes/layer";
import { HttpMethods } from "../enums/methods";
import { IncomingHttpHeaders } from "node:http";

export type RouteHandler = (...args: any[]) => any;
export type HashMapRouters = Partial<Record<HttpMethods, Layer[]>>;
export type Headers = IncomingHttpHeaders;
