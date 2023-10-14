"use client";
import { tv } from "tailwind-variants";

const modalFooter = tv({
  base: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end gap-2",
});

export type ModalFooterProps = React.ComponentProps<"footer"> & {
  children: React.ReactNode;
};

export default function ModalFooter({
  children,
  className,
  ...rest
}: ModalFooterProps) {
  return (
    <footer className={modalFooter({className})} {...rest}>
      {children}
    </footer>
  );
}