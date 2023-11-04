"use client";
import ModalContainer from "./ModalContainer";
import ModalContent from "./ModalContent";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";

type ModalType = typeof ModalContainer & {
  Content: typeof ModalContent;
  Header: typeof ModalHeader;
  Footer: typeof ModalFooter;
};

const Modal = ModalContainer as ModalType;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

export default Modal;