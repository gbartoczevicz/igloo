import fetch from "node-fetch";

import { Method } from "~/contracts/http";

type Params = {
  route: string;
  token?: string;
  method: Method;
};

export function makeHttpClient(params: Params) {
  const { method, route, token } = params;

  const url = `http://localhost:3333${route}`;

  return async (body?: unknown) => {
    const response = await fetch(url, {
      body: body ? JSON.stringify(body) : undefined,
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
    });

    return {
      json: await response.json(),
      status: response.status,
    };
  };
}
