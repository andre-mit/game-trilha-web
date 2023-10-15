"use client"
import React, { useState } from "react";

const CadastroUsuario: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui você pode adicionar a lógica para enviar os dados do usuário para o servidor ou fazer qualquer outra coisa necessária.

    console.log("Dados do usuário cadastrado:", {
      nome,
      email,
      senha,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-300">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite seu username"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
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
              Senha
            </label>
            <input
              type="password"
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-400"
          >
            Cadastrar
          </button>
        </form>
        <button className="w-full rounded-md bottom-1 text-red-500 p-2 hover:bg-red-500 hover:text-white">
                <u>Cancelar</u>
        </button>
      </div>
    </div>
  );
};

export default CadastroUsuario;
