import { Layer } from "routes/layer";
import { HttpMethods } from "../http/httpMethods";
import { IncomingHttpHeaders } from "node:http";

export type RouteHandler = (...args: any[]) => any;
export type HashMapRouters = Partial<Record<HttpMethods, Layer[]>>;
export type Headers = IncomingHttpHeaders;
export type HttpValue = Record<string, any> | string | null;
