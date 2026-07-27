const API_URL = import.meta.env.VITE_API_URL;

/**
 * Erro de comunicacao com a API.
 * status 0 = nao foi possivel conectar (backend fora do ar, rede, CORS).
 * status > 0 = o servidor respondeu, mas com erro HTTP.
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, init);
  } catch {
    throw new ApiError(
      0,
      "Nao foi possivel conectar ao servidor. Verifique se o backend esta rodando."
    );
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `O servidor respondeu com erro ${response.status}.`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

function jsonRequest<T>(
  path: string,
  method: "POST" | "PUT",
  body?: unknown
): Promise<T> {
  return request<T>(path, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export function apiGet<T>(path: string): Promise<T> {
  return request<T>(path);
}

export function apiPost<T>(path: string, body?: unknown): Promise<T> {
  return jsonRequest<T>(path, "POST", body);
}

export function apiPut<T>(path: string, body?: unknown): Promise<T> {
  return jsonRequest<T>(path, "PUT", body);
}

export function apiDelete<T = void>(path: string): Promise<T> {
  return request<T>(path, {
    method: "DELETE",
  });
}

export function apiPatch<T = void>(path: string): Promise<T> {
  return request<T>(path, {
    method: "PATCH",
  });
}
