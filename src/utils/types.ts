import { Layer } from "routes/layer";
import { HttpMethods } from "../enums/methods";

export type RouteHandler = (...args: any[]) => any;
export type HashMapRouters = Partial<Record<HttpMethods, Layer[]>>;
