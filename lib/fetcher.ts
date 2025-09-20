import { clearAuthToken, getAuthToken } from "@/lib/token";
import { redirect } from "next/navigation";

export async function fetchProtected(url: string, options: RequestInit = {}) {
  const token = await getAuthToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    await clearAuthToken();
    redirect("/login"); 
  }

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
