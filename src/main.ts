import { createServer } from "node:http";
import { CreateServer } from "./app/createServer";
import { Request } from "./http/request";
import { Router } from "./routes/router";
import { Response } from "./http/response";

const PORT = 3000;

const router = new Router();

router.get("/test", (request: Request) => {
  console.log(request.getUrl);
  console.log(request.getMethod);
  return Response.text("GET TEST OK");
});

router.post("/test", (request: Request) => {
  console.log(request.getUrl);
  console.log(request.getMethod);
  return Response.text("POST TEST OK");
});

router.get("/redirect", (request: Request) => {
  console.log(request.getUrl);
  console.log(request.getMethod);
  return Response.redirect("/test");
});

const httpServer = createServer((req, res) => {
  const server = new CreateServer(req);
  const request = Request.from(server);
  const routeResolve = router.resolve(request);
  const action = routeResolve.getAction;
  const response = action(request);
  server.sendResponse(res, response);
});

httpServer.listen(PORT, () =>
  console.log(`Servidor corriendo en puerto ${PORT}`),
);
