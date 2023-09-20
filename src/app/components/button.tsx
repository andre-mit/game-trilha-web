import { ComponentProps } from 'react'
import Link, { LinkProps } from "next/link";
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base: "flex items-center justify-center text-center bg-purple-700 hover:bg-purple-600 text-white transition-colors rounded-full min-w-[200px]",
  variants: {
    size: {
      default: "text-base p-2",
      sm: "text-sm p-1",
      md: "p-8",
      lg: "text-lg p-12",
    }
  },
  defaultVariants: {
    size: "default"
  }
});

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>;

export type LinkButtonProps = LinkProps & VariantProps<typeof button> & {
  children: React.ReactNode;
  className?: string | undefined;
}

export default function Button(
  { children, className, size, ...rest }: ButtonProps
) {
  return (
    <button className={button({size, className})} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink(props: LinkButtonProps) {
  const { className, children, size, ...rest } = props;
  return (
    <Link className={button({size, className})} {...rest}>
      {children}
    </Link>
  );
}
