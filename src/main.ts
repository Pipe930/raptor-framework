import { createServer } from "node:http";
import { CreateServer } from "./app/createServer";
import { Request } from "./http/request";

const PORT = 3000;

const httpServer = createServer((req, res) => {
  const request = Request.from(new CreateServer(req));

  console.log(`Ruta: ${request.getUrl}`);
  console.log(`Método: ${request.getMethod}`);
  console.log(request.getHeaders);
  request.getData();
  res.end("Request procesado");
});

httpServer.listen(PORT, () =>
  console.log(`Servidor corriendo en puerto ${PORT}`),
);
