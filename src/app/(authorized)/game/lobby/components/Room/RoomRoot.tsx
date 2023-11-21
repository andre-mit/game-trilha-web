import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const room = tv({
  base: "room flex flex-col gap-4 p-4 rounded-xl",
  variants: {
    color: {
      running: "bg-blue-600 text-white",
      waiting: "bg-purple-600 text-white",
      ready: "bg-pink-700 text-white",
    },
  },
  defaultVariants: {
    color: "waiting",
  },
});

type RoomRootProps = ComponentProps<"div"> & VariantProps<typeof room>;

export const RoomRoot = ({
  children,
  className,
  color,
  ...rest
}: RoomRootProps) => {
  return (
    <div className={room({ color, className })} {...rest}>
      {children}
    </div>
  );
}
