import i18next from "i18next";
import { useHistory, useLocation } from "react-router";
import { ReactComponent as IconBackBtn } from "../../../images/giveaways/back-btn-joined-giveaways.svg";

const JoinedBackToGiveaways = (props) => {
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div
      className="back-btn-joined"
      onClick={() => {
        console.log("f");
        props.setOpenJoinedUser(false);
        history.push(pathname);
      }}
    >
      <IconBackBtn />

      <span className="text-back-btn-joined">{i18next.t("Back to Giveaways")}</span>
    </div>
  );
};

export default JoinedBackToGiveaways;
