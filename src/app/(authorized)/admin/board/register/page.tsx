"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import registerBoard from "./page.actions";
import Board from "./components/board";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

const Register = () => {
  const [lineColor, setLineColor] = useState("#ffffff");
  const [borderLineColor, setBorderLineColor] = useState("#ffffff");
  const [bulletColor, setBulletColor] = useState("#ffffff");

  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const [image, setImage] = useState<string>(""); // base64 encoded image

  const [preview, setPreview] = useState<string | undefined>(undefined);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    setImageBase64(selectedImage);
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }

    setSelectedImage(e.target.files[0]);
  };

  function setImageBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result as string);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  async function handleRegister(formData: FormData) {
    const { success, error } = await registerBoard(formData);
    if (success) {
      toast({
        title: "Tabuleiro adicionado com sucesso",
        description: "Sucesso",
        variant: "success",
      });
      setPreview(undefined);
      setSelectedImage(undefined);
      setImage("");
      if (formRef.current) formRef.current.reset();
    } else {
      toast({
        title: "Falha ao adicionar tabuleiro",
        description: error as string,
        variant: "error",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">
          Cadastro de Tabuleiros
        </h2>
        <form
          ref={formRef}
          action={handleRegister}
          encType="multipart/form-data"
        >
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Nome da Skin *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite o nome da skin para cadastro"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Descrição
            </label>
            <textarea
              name="description"
              className="w-full p-2 border text-white bg-purple-600 rounded-md resize-none"
              placeholder="Digite a descrição"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Preço *
            </label>
            <input
              name="price"
              type="number"
              required
              min={1}
              className="w-full p-2 border text-white bg-purple-600 rounded-md resize-none"
              placeholder="Digite o preço"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Imagem *
            </label>
            <input
              type="file"
              required
              accept="image/*"
              name="backgroundImage"
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Anexe a imagem"
              onChange={onSelectFile}
            />
            <input type="hidden" name="image" value={image} />
          </div>

          <div className="flex flex-col items-center justify-between">
            <label htmlFor="bullet" className="text-black">
              Pontos: {bulletColor}
            </label>
            <input
              type="color"
              name="bulletColor"
              className="text-black border-1"
              value={bulletColor}
              onChange={(e) => setBulletColor(e.target.value)}
            />

            <label htmlFor="lineColor" className="text-black">
              Linha: {lineColor}
            </label>
            <input
              type="color"
              name="lineColor"
              className="text-black border-1"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
            />
            <label htmlFor="borderLineColor" className="text-black">
              Borda: {borderLineColor}
            </label>
            <input
              type="color"
              name="borderLineColor"
              className="text-black border-1"
              value={borderLineColor}
              onChange={(e) => setBorderLineColor(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-400 mt-8"
          >
            Cadastrar
          </button>
        </form>
        <Link
          href="/"
          className="w-full rounded-md bottom-1 text-red-500 p-2 hover:bg-red-500 hover:text-white underline text-center mt-2 transition-colors"
        >
          Cancelar
        </Link>
      </div>
      <Board
        bulletColors={bulletColor}
        lineColor={lineColor}
        borderLineColor={borderLineColor}
        backgroundImage={preview}
      />
    </div>
  );
};

export default Register;
