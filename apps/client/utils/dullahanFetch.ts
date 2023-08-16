import { BACKEND_URL } from "../api/NetworkHelper";

export type Response<T> = {
  message?: string;
  status: "ok" | "neutral" | "error";
  data: T;
};

export const dullahanFetch = async <T>(urlSuffix: string) => {
  const response = await fetch(BACKEND_URL + urlSuffix);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<Response<T>>;
};

export const dullahanPost = async <T>(urlSuffix: string, body: T) => {
  const response = await fetch(`${BACKEND_URL}` + urlSuffix, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: { ...body },
    }),
  });
  return await response.json();
};
