"use client";

import { useState } from "react";
import {
  requestCode,
  requestRecovery,
} from "@/app/(non-authorized)/recovery-password/components/Form.actions";
import FormButton from "@/components/ui/FormButton";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useCountdown } from "@/hooks/useCountdown";
import { addMinutes } from "@/helpers/time";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    code: z.string().length(6, "O código deve conter 6 caracteres"),
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

const delay = (delayInms: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};
const Form: React.FC = () => {
  const [email, setEmail] = useState("");
  const [countDown, setCountDown] = useState<Date>(new Date(Date.now()));

  const { minutes, seconds } = useCountdown(countDown);

  const router = useRouter();

  const { toast } = useToast();

  const enabledCountDown = !!email && minutes != "00" || seconds != "00";

  async function handleGenerateCode(formData: FormData) {
    const email = formData.get("email");
    const { error } = await requestCode(email as string);
    if (!error) {
      toast({
        title: "Código enviado com sucesso",
        description: "Verifique seu email e a caixa de spam",
      });
    } else {
      toast({
        title: "Falha ao enviar código",
        description: ("Tente novamente mais tarde! " + error) as string,
        variant: "error",
      });
    }

    await delay(1000);

    setCountDown(addMinutes(new Date(Date.now()), 5));

    toast({ title: "Código enviado com sucesso", description: "Sucesso" });
    setEmail(email as string);
  }

  const handleResetSubmit: SubmitHandler<FormProps> = async (data) => {
    const { success, error } = await requestRecovery<null>(
      email,
      data.code,
      data.password,
      data.confirmPassword
    );

    if (success) {
      toast({
        title: "Senha alterada com sucesso",
        description: "Faça login e se divirta 😊",
      });
      router.push("/login");
    } else {
      toast({
        title: "Falha ao enviar alteração de senha",
        description: ("Tente novamente mais tarde! " + error) as string,
        variant: "error",
      });
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading, isValid },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <>
      <form action={handleGenerateCode} className="flex flex-col w-full">
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
        <FormButton disabled={enabledCountDown}>
          {!enabledCountDown
            ? !email
              ? "Enviar código"
              : "Reenviar código"
            : `Espere ${minutes}:${seconds} para enviar outro código`}
        </FormButton>
      </form>
      <form
        onSubmit={handleSubmit(handleResetSubmit)}
        className={`flex flex-col w-full ${!email ? "hidden" : ""}`}
      >
        <div className="my-4">
          <label className="block text-black text-sm font-medium mb-2">
            Código
          </label>
          <input
            {...register("code")}
            type="text"
            className="w-full p-2 border text-white bg-purple-600 rounded-md"
            placeholder="Digite o código enviado por email"
          />
          {errors.code?.message && (
            <span className="text-red-500 text-sm">{errors.code?.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-medium mb-2">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
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
          <label className="block text-black text-sm font-medium mb-2">
            Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="w-full p-2 border text-white bg-purple-600 rounded-md"
            placeholder="Digite sua senha"
          />
          {errors.confirmPassword?.message && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
        <Link
          href="/recovery-password"
          className="text-black underline mb-2 hover:opacity-50 hover:transition-opacity"
        >
          Esqueci minha senha
        </Link>
        <FormButton disabled={!isValid || isLoading}>Validar Senha</FormButton>
      </form>
    </>
  );
};

export default Form;
