import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { fetchWrapper } from "@/services/fetchWrapper";

const Login = () => {
  const handleSubmit = async (formaData: FormData) => {
    "use server";
    const email = formaData.get("email");
    const password = formaData.get("password");

    const result = await fetchWrapper<string>("users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      cache: "no-cache",
    }, null, "text");

    if (result.success) {
      cookies().set("auth_token", result.data as string);
      redirect("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-300">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Login</h2>
        <form action={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-400 transition-colors"
          >
            Login
          </button>
        </form>
        <Link
          href="/register"
          className="w-full rounded-md bottom-1 text-purple-500 p-2 mt-2 bg-zinc-200 hover:bg-zinc-500 hover:text-white transition-colors text-center underline"
        >
          Cadastrar
        </Link>
      </div>
    </div>
  );
};

export default Login;
