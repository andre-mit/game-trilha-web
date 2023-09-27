import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: "bg-black rounded flex-1 p-2 text-white text-center transition-colors disabled:bg-red-500 disabled:cursor-not-allowed",
  variants: {
    action: {
      join: "bg-blue-700 hover:bg-blue-600",
      leave: "bg-red-400 text-white hover:bg-red-700",
      ready: "bg-green-400 text-white hover:bg-green-700",
    },
  },
  defaultVariants: {
    action: "join",
  },
});

type RoomButtonProps = ComponentProps<"button"> & VariantProps<typeof button>;

export const RoomButton = ({
  children,
  action,
  className,
  ...rest
}: RoomButtonProps) => {
  return (
    <button className={button({ action, className })} {...rest}>
      {children}
    </button>
  );
};
