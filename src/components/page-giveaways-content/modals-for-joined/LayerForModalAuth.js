import { useAtom } from "jotai";
import { useEffect } from "react";
import { authModal } from "../../../state";

const LayerForModalAuth = (props) => {
  const [auth, setAuth] = useAtom(authModal);

  useEffect(() => {
    setAuth({
      isOpen: true,
      type: "login",
      closeModal: props.closeModal,
      successModal: props.successModal,
    });
  }, []);
  return <div></div>;
};

export default LayerForModalAuth;
