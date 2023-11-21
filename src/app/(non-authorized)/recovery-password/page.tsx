import Link from "next/link";
import Form from "./components/Form";

const RecoveryPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-slate-600 p-8 rounded shadow-md w-96 flex flex-col">
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-200 mb-4">
          Recuperar senha
        </h2>
        <Form />
        <Link
          href="/login"
          className="w-full rounded-md bottom-1 text-purple-500 p-2 mt-2 bg-zinc-200 hover:bg-zinc-500 hover:text-white transition-colors text-center underline"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
};

export default RecoveryPassword;
