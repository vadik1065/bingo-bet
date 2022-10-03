import { useAtom } from "jotai";
import { switchModalForJoinGLWitchParam } from "../../state";

import LayerForModalAuth from "./modals-for-joined/LayerForModalAuth";
import ModalAddSteamLink from "./modals-for-joined/ModalAddSteamLink";
import RequirementModal from "./modals-for-joined/RequirementModal";

const SwutchModalForGW = (props) => {
  const [switchModalForJoin, setSwitchModalForJoin] = useAtom(switchModalForJoinGLWitchParam);

  const modalsJoinClick = [
    "",
    <LayerForModalAuth
      closeModal={switchModalForJoin?.param?.onClose}
      successModal={switchModalForJoin?.param?.onSuccess}
    />,
    <ModalAddSteamLink
      open={switchModalForJoin.open == 2}
      closeModal={switchModalForJoin?.param?.onClose}
      succesModal={switchModalForJoin?.param?.onSuccess}
      setSwitchModalForJoin={setSwitchModalForJoin}
      token={props.token}
      currentGiveaways={switchModalForJoin?.param?.currentGiveaways}
      LastSteamLink={switchModalForJoin?.param?.LastSteamLink}
    />,
    <RequirementModal
      headerMes={switchModalForJoin.param.headerMes}
      noRedirect={switchModalForJoin.param.noRedirect}
      token={props.token}
      balance={switchModalForJoin?.param?.data?.balance}
      open={switchModalForJoin.open == 3}
      closeModal={switchModalForJoin?.param?.onClose}
      data={switchModalForJoin?.param?.data}
      currentGiveaways={switchModalForJoin?.param?.currentGiveaways}
    />,
  ];

  return (
    <div style={{ position: "absolute" }}>
      {switchModalForJoin.open > 0 && modalsJoinClick[switchModalForJoin.open]}
    </div>
  );
};

export default SwutchModalForGW;
