import Link, { LinkProps } from "next/link";

interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
  className?: string | undefined;
}

const defaultClassName =
  "button text-center bg-purple-700 hover:bg-purple-600 text-white transition-colors p-8 rounded-full min-w-[200px]";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { children, className, ...rest } = props;
  return (
    <button className={`${defaultClassName} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink(props: LinkButtonProps) {
  const { className, children, ...rest } = props;
  return (
    <Link className={`${defaultClassName} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
