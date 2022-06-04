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
        "content-type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
    });

    const text = await response.text();

    return {
      body: text.length > 0 ? JSON.parse(text) : null,
      status: response.status,
    };
  };
}

export function createUserClient() {
  return makeHttpClient({
    method: Method.post,
    route: "/users",
  });
}

export function createUserSessionClient() {
  return makeHttpClient({
    method: Method.post,
    route: "/sessions",
  });
}

export function createUpdateUserClient(token: string) {
  return makeHttpClient({
    method: Method.put,
    route: "/profile",
    token,
  });
}

export function createCreateInstitutionClient(token: string) {
  return makeHttpClient({
    method: Method.post,
    route: "/institutions",
    token,
  });
}
