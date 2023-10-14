import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

const actions = tv({
  base: "flex-1 flex justify-center items-center gap-4",
});

type RoomActionsProps = ComponentProps<"div"> & VariantProps<typeof actions>;

export const RoomActions = ({
  children,
  className,
  ...rest
}: RoomActionsProps) => {
  return (
    <div className={actions(className)} {...rest}>
      {children}
    </div>
  );
};
