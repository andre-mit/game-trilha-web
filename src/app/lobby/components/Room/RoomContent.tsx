import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

const content = tv({
  base: "flex-1 flex justify-between",
});

type RoomContentProps = ComponentProps<"div"> & VariantProps<typeof content>;

export const RoomContent = ({
  children,
  className,
  ...rest
}: RoomContentProps) => {
  return (
    <div className={content(className)} {...rest}>
      {children}
    </div>
  );
};
