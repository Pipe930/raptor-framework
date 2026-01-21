import { Request } from "../src/http/request";
import { Response } from "../src/http/response";
import { App } from "../src/app";

const PORT = 3000;

const app = App.getInstance;

app.router.get("/test/{param}", (request: Request) => {
  return Response.json(request.getlayerParameters());
});

app.router.post("/test", (request: Request) => {
  return Response.json(request.getData());
});

app.router.get("/redirect", (request: Request) => {
  return Response.redirect("/test");
});

app.listen(PORT);
