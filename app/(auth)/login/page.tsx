"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // chamada de login futura
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-16 gap-12 bg-gray-800/50">
      {/* Hero Section */}
      <div className="text-center md:text-left md:flex-1 max-w-lg">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
          Metas claras no presente
          <br />
          <span className="text-purple-600">Transformam-se em progresso no futuro</span>
        </h1>
        <p className="mt-6 text-lg text-gray-300">
          Conquiste seu progresso diário com nossa plataforma de desenvolvimento pessoal baseada em metas.
        </p>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex justify-center w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-900/40 backdrop-blur p-8 rounded-lg w-full shadow-lg"
        >
          {/* Logo */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="mx-auto h-20 w-auto"
            />
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-bold tracking-tight text-white">
            Entre na sua conta
          </h2>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                Senha
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Esqueceu a senha?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Entrar
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm/6 text-gray-400">
            Não possue uma conta?{" "}
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Registrar
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
