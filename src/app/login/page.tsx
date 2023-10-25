"use client";
import React, { useState, FormEvent, useCallback } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { fetchWrapper } from "@/services/fetchWrapper";
import { useUser } from "@/context/userContext";

const Login = () => {
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const router = useRouter();

  async function handleLogin() {
    var success = await user?.signIn(email, password);
    if (success) {
      router.push("/");
    } else {
      alert('Error');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-300">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-400"
          >
            Login
          </button>
        </form>
        <button className="w-full rounded-md bottom-1 text-purple-500 p-2 hover:bg-red-500 hover:text-white">
          <u>Cadastrar</u>
        </button>
      </div>
    </div>
  );
};

export default Login;
