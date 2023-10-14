"use client";
import { tv } from "tailwind-variants";

const modalContent = tv({
  base: "sm:flex sm:items-start sm:justify-items-start",
});

export type ModalContentProps = React.ComponentProps<"main"> & {
  children: React.ReactNode;
};

export default function ModalContent({
  children,
  className,
  ...rest
}: ModalContentProps) {
  return (
    <main className={modalContent({className})} {...rest}>
      {children}
    </main>
  );
}
