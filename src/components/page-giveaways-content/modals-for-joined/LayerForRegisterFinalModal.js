import { useAtom } from "jotai";
import { useEffect } from "react";
import { registerFinalModal } from "../../../state";

const LayerForRegisterFinalModal = (props) => {
  const [dataModal, setDataModal] = useAtom(registerFinalModal);

  useEffect(() => {
    setDataModal((prev) => ({ ...prev, isOpen: true }));
  }, []);
  return <div></div>;
};

export default LayerForRegisterFinalModal;
