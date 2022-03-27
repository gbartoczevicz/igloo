import { HttpMiddleware } from "~/adapters/http";

export function commonRequest(): HttpMiddleware {
  return (req, _res, next) => {
    const now = new Date();

    const { method, url, ip } = req;

    console.log(`${ip} [${now.toISOString()}] ${method} ${url}`);

    next();
  };
}
