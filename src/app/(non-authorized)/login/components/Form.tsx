"use client";

import { login } from "@/app/(non-authorized)/login/components/Form.actions";
import FormButton from "@/components/ui/FormButton";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Form: React.FC = () => {
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    const { error } = await login(formData);
    if (!error) {
      toast({
        title: "Login efetuado com sucesso",
        description: "Sucesso",
      });
      router.push("/");
    } else {
      toast({
        title: "Falha ao efetuar login",
        description: error as string,
        variant: "error",
      });
    }
  }

  const { toast } = useToast();
  return (
    <form action={handleLogin}>
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
      <FormButton>Entrar</FormButton>
    </form>
  );
};

export default Form;
