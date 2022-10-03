import { useAtom } from "jotai";
import { authModal, kycModal, mainLoading, userId } from "../state";
import url from "../axios.js";
import axios from "axios";
import FP from "@fingerprintjs/fingerprintjs-pro";
const { v4: uuidv4 } = require("uuid");

const useCheckRegister = () => {
  const [auth, setAuth] = useAtom(authModal);
  const [openKycModal, setOpenKycModal] = useAtom(kycModal);
  const [loading, setLoading] = useAtom(mainLoading);
  const [usId, setUserId] = useAtom(userId);

  function checkRegister() {
    setLoading(true);
    var uuid = uuidv4();
    let requestMetadata = { UUID: uuid };
    async function sendInfo() {
      let fp = await FP.load({ token: "UCmjTCW278UaQTDLjsMJ", region: "eu" });
      let response = await fp.get({ tag: requestMetadata, callbackData: true });
      return response;
    }
    sendInfo();
    setUserId(uuid);

    axios({
      method: "post",
      url: url + "/api/check-register",
      data: { uuid },
    })
      .then(() => {
        setLoading(false);
        setAuth({
          isOpen: true,
          type: "register",
          closeModal: auth?.closeModal,
          successModal: auth?.successModal,
        });
      })
      .catch((error) => {
        if (error.response.status === 333) {
          setAuth({ isOpen: false, type: "" });
          setOpenKycModal(true);
        } else {
          console.log(error.response.data.error);
        }
        setLoading(false);
      });
  }

  return { checkRegister };
};

export default useCheckRegister;
