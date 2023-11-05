import { Dispatch, SetStateAction } from "react";
import Modal from "@/app/components/modal";
import { Player } from "@lottiefiles/react-lottie-player";
import { FaHandshake } from "react-icons/fa";

export default function LoseModalContent() {
  return (
    <Modal.Content>
      <audio autoPlay>
        <source src="/sons/derrota/derrota.mp3" type="audio/mp3" />
      </audio>
      <Player
        autoplay
        loop
        src="/sad-animation.json"
        style={{ height: "300px", width: "300px" }}
      />
    </Modal.Content>
  );
}
