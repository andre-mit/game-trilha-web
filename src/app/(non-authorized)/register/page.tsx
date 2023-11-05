"use client";
import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUser } from "@/app/(non-authorized)/register/create-user";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import Link from "next/link";
import FormButton from "@/components/ui/FormButton";

const schema = z
  .object({
    name: z
      .string()
      .min(3, "O nome deve ter no mínimo 3 caracteres")
      .max(100, "O nome deve ter no máximo 100 caracteres"),
    email: z.string().email("Digite um email válido"),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .max(50, "A senha deve ter no máximo 50 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormProps = z.infer<typeof schema>;

const UserRegister = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading, isValid },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const handleFormSubmit: SubmitHandler<FormProps> = async (data) => {
    const { user, error } = await createUser(data);

    if (user) {
      toast({ title: "Usuário cadastrado com sucesso", variant: "success" });
      router.push("/login");
    } else {
      toast({ title: error, variant: "error" });
    }
  };

  async function handle(formData: FormData) {
    console.log(formData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">
          Cadastro de Usuário
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-black text-sm font-medium mb-2"
            >
              Nome
            </label>
            <input
              {...register("name")}
              type="text"
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite seu nome"
              required
            />
            {errors.name?.message && (
              <span className="text-red-500 text-sm">
                {errors.name?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              required
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite seu email"
            />
            {errors.email?.message && (
              <span className="text-red-500 text-sm">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-black text-sm font-medium mb-2"
            >
              Senha
            </label>
            <input
              {...register("password")}
              type="password"
              required
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Digite sua senha"
            />
            {errors.password?.message && (
              <span className="text-red-500 text-sm">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-black text-sm font-medium mb-2"
            >
              Confirmar Senha
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              required
              className="w-full p-2 border text-white bg-purple-600 rounded-md"
              placeholder="Confirme sua senha"
            />
            {errors.confirmPassword?.message && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
          <FormButton disabled={!isValid}>Cadastrar</FormButton>
        </form>
        <Link
          href="/login"
          className="w-full rounded-md bottom-1 text-red-500 p-2 hover:bg-red-500 hover:text-white underline text-center mt-2 transition-colors"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
};

export default UserRegister;
