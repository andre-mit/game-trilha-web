import Modal from "@/app/components/modal";
import { FaHandshake } from "react-icons/fa";
import DrawModalContent from "./DrawModalContent";
import LoseModalContent from "./LoseModalContent";
import WinModalContent from "./WinModalContent";
import { VariantProps, tv } from "tailwind-variants";

const header = tv({
  base: "flex justify-between items-center p-2 text-white",
  variants: {
    type: {
      draw: "bg-blue-700",
      lose: "bg-red-700",
      win: "bg-green-700",
    },
  },
  defaultVariants: {
    type: "draw",
  },
});

export type MatchModalContentProps = VariantProps<typeof header> & {
  handleClose?: () => void;
  showRematch: boolean;
};

export default function MatchModalContent({
  handleClose,
  type = "draw",
  showRematch = true,
}: MatchModalContentProps) {
  const children = (() => {
    switch (type) {
      case "draw":
        return <DrawModalContent />;
      case "lose":
        return <LoseModalContent />;
      case "win":
        return <WinModalContent />;
    }
  })();

  const title = (() => {
    switch (type) {
      case "draw":
        return "Empate";
      case "lose":
        return "Derrota";
      case "win":
        return "Vitória";
    }
  })();

  return (
    <>
      <Modal.Header
        className={header({ type, className:"justify-center" })}
      >
        <h2 className="text-xl font-bold">{title}</h2>
      </Modal.Header>
      {children}
      <Modal.Footer>
        <button className="bg-red-700 py-2 px-4 rounded" onClick={handleClose}>
          Sair
        </button>
        {/* //temporary removal// {showRematch && (
          <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded flex gap-2 items-center justify-center">
            Revanche <FaHandshake />
          </button>
        )} */}
      </Modal.Footer>
    </>
  );
}
