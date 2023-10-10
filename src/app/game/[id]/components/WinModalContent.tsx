import { Dispatch, SetStateAction } from "react";
import Modal from "@/app/components/modal";
import { Player } from "@lottiefiles/react-lottie-player";

export default function WinModalContent() {
  return (
    <Modal.Content>
      <Player
        autoplay
        loop
        src="/popper-animation.json"
        style={{ height: "300px", width: "300px" }}
      />
    </Modal.Content>
  );
}
