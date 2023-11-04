import Modal from "@/app/components/modal";
import { Player } from "@lottiefiles/react-lottie-player";

export default function DrawModalContent() {
  return (
    <Modal.Content>
      <Player
        autoplay
        loop
        src="/boring-animation.json"
        style={{ height: "300px", width: "300px" }}
      />
    </Modal.Content>
  );
}
