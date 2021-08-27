import Modal from "react-modal";
import { ExposureLocation } from "./App";
import NzCovidTracerQrCode from "./nzCovidTracerQrCode";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: '#bde4f2'
  }
};

interface Props {
  exposureLocation: ExposureLocation | null;
  closeModal: () => void;
}
export function QRCodeModal({ exposureLocation, closeModal }: Props) {
  return (
    <Modal
      isOpen={!!exposureLocation}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={exposureLocation?.event}
    >
      <NzCovidTracerQrCode exposureLocation={exposureLocation} />
    </Modal>
  );
}