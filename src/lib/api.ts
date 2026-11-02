const API_URL = "http://localhost:9090/api";

export type AuthUser = {
  id: number;
  fullName: string;
  username: string;
  email: string | null;
  designation: "STUDENT" | "TEACHER";
};

type AuthResponse = {
  token: string;
  tokenType: string;
  expiresInMs: number;
  user: AuthUser;
};

const TOKEN_KEY = "ecanteen_token";
const USER_KEY = "ecanteen_user";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export function saveSession(data: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function post<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const fieldMessage = data?.fieldErrors ? Object.values(data.fieldErrors)[0] : null;
    throw new Error((fieldMessage as string) ?? data?.message ?? "Something went wrong");
  }
  return data as T;
}

export const register = (fullName: string, username: string, password: string) =>
  post<AuthResponse>("/auth/register", { fullName, username, password });

export const login = (username: string, password: string) =>
  post<AuthResponse>("/auth/login", { username, password });