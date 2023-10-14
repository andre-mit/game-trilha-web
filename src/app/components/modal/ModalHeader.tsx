"use client";
import { tv } from "tailwind-variants";

const modalHeader = tv({
  base: "flex justify-between items-center p-2",
});

export type ModalHeaderProps = React.ComponentProps<"header"> & {
  children?: React.ReactNode;
  showCloseButton?: boolean;
  handleClose?: () => void;
};

export default function ModalHeader({
  children,
  className,
  showCloseButton = false,
  handleClose = undefined,
  ...rest
}: ModalHeaderProps) {
  if (showCloseButton && handleClose === undefined) {
    throw new Error("handleClose function is required when showCloseButton is true");
  }

  return (
    <header className={modalHeader({className})} {...rest}>
      {children}

      {showCloseButton && (
        <button
          className="bg-slate-100 hover:bg-slate-300 rounded-full px-2 justify-self-end text-black"
          onClick={handleClose}
        >
          X
        </button>
      )}
    </header>
  );
}
