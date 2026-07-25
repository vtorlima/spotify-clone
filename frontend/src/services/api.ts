const API_URL = import.meta.env.VITE_API_URL;

/**
 * Erro de comunicação com a API.
 * status 0 = não foi possível conectar (backend fora do ar, rede, CORS).
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

export async function apiGet<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`);
  } catch {
    throw new ApiError(0, "Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
  }

  if (!response.ok) {
    throw new ApiError(response.status, `O servidor respondeu com erro ${response.status}.`);
  }

  return (await response.json()) as T;
}
