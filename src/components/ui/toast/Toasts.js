import CloseBtn from "../../../images/icon-share/close-buttn.svg";
import Checkmark from "../../../images/icon-share/checkmark-green.svg";
import { useAtom } from "jotai";
import { OpenToastJoinedGiveawaysGL } from "../../../state";
import { IonToast } from "@ionic/react";

const Toasts = () => {
  const [clickJoined, setClickJoined] = useAtom(OpenToastJoinedGiveawaysGL);

  return (
    <IonToast
      isOpen={clickJoined.open}
      onWillDismiss={() => setClickJoined((prev) => ({ ...prev, open: false }))}
      header={clickJoined.data?.header}
      message={clickJoined.data?.message}
      cssClass="toast-joined"
      icon={Checkmark}
      buttons={[{ icon: CloseBtn }]}
      duration={5000}
    />
  );
};

export default Toasts;
