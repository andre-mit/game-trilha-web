"use client";
import React, { useState } from "react";

const CadastroTabuleiro: React.FC = () => {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [bulletColor, setBulletColor] = useState("");
  const [strokeColor1, setStrokeColor1] = useState("");
  const [strokeColor2, setStrokeColor2] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui você pode adicionar a lógica para enviar os dados do usuário para o servidor ou fazer qualquer outra coisa necessária.

    console.log("Dados do usuário cadastrado:", {
      nome,
      imagem,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-300">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">
          Cadastro de Tabuleiros
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Nome da Skin
            </label>
            <input
              type="text"
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite o nome da skin para cadastro"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Imagem
            </label>
            <input
              type="file"
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Anexe a imagem"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center justify-between">
            <label htmlFor="bullet" className="text-black">Bullet: {bulletColor}</label>
            <input
              type="color"
              name="bullet"
              className="text-black border-1"
              value={bulletColor}
              onChange={(e) => setBulletColor(e.target.value)}
            />

            <label htmlFor="stroke1" className="text-black">Stroke1: {strokeColor1}</label>
            <input
              type="color"
              name="stroke"
              className="text-black border-1"
              value={strokeColor1}
              onChange={(e) => setStrokeColor1(e.target.value)}
            />
            <label htmlFor="stroke2" className="text-black">Stroke2: {strokeColor2}</label>
            <input
              type="color"
              name="stroke2"
              className="text-black border-1"
              value={strokeColor2}
              onChange={(e) => setStrokeColor2(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-400 mt-8"
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

export default CadastroTabuleiro;
