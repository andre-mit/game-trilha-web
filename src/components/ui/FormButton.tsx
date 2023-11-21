// @ts-expect-error
import { useFormStatus } from "react-dom";
import Spinner from "./spinner";

export default function FormButton({
  children,
  disabled = false,
}: {
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-400 transition-colors flex items-center justify-center"
    >
      {pending ? <Spinner /> : children}
    </button>
  );
}
