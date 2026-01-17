import { Router } from "./routes/router";
import { HttpMethods } from "./enums/methods";
import { createServer } from "node:http";

const router = new Router();

router.get("/home", () => {
  const message = "Welcome to the Home Page!";
  return message;
});

router.post("/home", () => {
  const message = "Created resource on Home Page!";
  return message;
});

const server = createServer((req, res) => {
  try {
    const handler = router.resolve(req.method as HttpMethods, req.url);
    res.statusCode = 200;
    res.end(handler());
  } catch (error) {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
