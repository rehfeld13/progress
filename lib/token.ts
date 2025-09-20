"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setAuthToken(token: string) {
  const cookie = await cookies();
  cookie.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function getAuthToken(): Promise<string | null> {
  const cookie = await cookies();
  return cookie.get("token")?.value ?? null;
}

export async function clearAuthToken(): Promise<void> {
  const cookie = await cookies();
  cookie.delete("token");
}

export async function requireAuth() {
  const token = await getAuthToken();
  if (!token) {
    redirect("/login");
  }
  return token;
}
