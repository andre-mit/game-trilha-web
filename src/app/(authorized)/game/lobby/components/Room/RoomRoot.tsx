import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const room = tv({
  base: "room flex flex-col gap-4 p-4 min-w-[250px] rounded-xl",
  variants: {
    color: {
      running: "bg-blue-400 text-white",
      waiting: "bg-slate-500 text-white",
      ready: "bg-green-400 text-white",
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
  ...rest
}: RoomRootProps) => {
  return (
    <div className={room({ color: "running", className })} {...rest}>
      {children}
    </div>
  );
}
