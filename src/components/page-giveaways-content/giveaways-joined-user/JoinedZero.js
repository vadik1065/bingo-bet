import i18next from "i18next";
import { ReactComponent as Lightning } from "../../../images/giveaways/lightning-giveaways.svg";
import EventGiveawaysBtnJoin from "../EventGiveawaysBtnJoin";

const JoinedZero = (props) => {
  return (
    <div className="joined-zero-conteiner">
      <Lightning className="img-lightning" />
      <div className="text-joined-zero">
        {i18next.t("So far no one has joined. Be the first to join")}
      </div>
      <EventGiveawaysBtnJoin
        headerMes={props.headerMes}
        LastSteamLink={props.LastSteamLink}
        data={props.data}
        token={props.token}
        currentGiveaways={props.currentGiveaways}
        noRedirect={true}
      >
        Join to the Giveaway
      </EventGiveawaysBtnJoin>
    </div>
  );
};

export default JoinedZero;
