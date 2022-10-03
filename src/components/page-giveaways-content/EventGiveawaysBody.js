import { useMemo, useState } from "react";

import { FormatMouth, FormatTime } from "../../utils/utils";
import TimerEventGiveaways from "./TimerEventGiveaways";
import PrizeItem from "./PrizeItem";
import { IonIcon, IonicSafeString } from "@ionic/react";
import { shareOutline } from "ionicons/icons";
import ModalShare from "../ui/ModalShare";
import JoinedUserConteiner from "./giveaways-joined-user/JoinedUserConteiner";
import { useHistory, useLocation } from "react-router";
import EventGiveawaysBtnJoin from "./EventGiveawaysBtnJoin";
import { OpenToastJoinedGiveawaysGL } from "../../state";
import { useAtom } from "jotai";
import i18next from "i18next";

const EventGiveawaysBody = (props) => {
  const DateStartEvent = props.currentGiveaways.date_start.split("T");
  const DateEndEvent = props.currentGiveaways.date_end.split("T");
  const DateEndEventWithoutDash = DateEndEvent[0].split("-");
  const [openShareModal, setOpenShareModal] = useState(false);
  const [clickJoined, setClickJoined] = useAtom(OpenToastJoinedGiveawaysGL);
  const LastSteamLink = useMemo(() => props.LastSteamLink, [props.LastSteamLink]);
  const prizeArr = useMemo(
    () => props.currentGiveaways.prizes ?? [],
    [props.currentGiveaways.prizes]
  );
  const joinedArr = useMemo(
    () => props.currentGiveaways.joined_players ?? [],
    [props.currentGiveaways.joined_players]
  );

  const sumPrize = useMemo(() => props.currentGiveaways.cur_prize, [prizeArr]);

  const location = useLocation();
  const history = useHistory();

  const header = useMemo(() => i18next.t("You have successfully joined"), []);
  const message = useMemo(
    () =>
      new IonicSafeString(
        `${i18next.t("The giveaway will be drawn on")}: <font color='#268A00'>${
          DateEndEventWithoutDash[1]
        }</font>.<font color='#268A00'>${DateEndEventWithoutDash[2]}</font>.<font color='#268A00'>${
          DateEndEventWithoutDash[0]
        }</font>. ${i18next.t("Winners will be notified via notifications. Good luck!")}`,
        [DateEndEventWithoutDash]
      )
  );
  return (
    <>
      <div className="body-event-giveaways">
        <div className="event-left-giveaways">
          <div className="event-info-giveaways">
            <div className="event-time-giveaways">
              {`${FormatTime(DateStartEvent[1].slice(0, -3))}, ${DateStartEvent[0].slice(
                8
              )} ${FormatMouth(DateStartEvent[0].slice(5, 7))}, ${DateStartEvent[0].slice(0, -6)}`}
              <div className="timer-event-giveaways">
                <TimerEventGiveaways currentGiveaways={props.currentGiveaways} />
              </div>
            </div>
            <div className="prize-value-giveaways">
              <span className="text-prize-value">PRIZE VALUE</span>
              <span className="text-prize-value"></span>
              <span className="sum-prize">{`$${sumPrize}`}</span>
            </div>
            <div className="joined-value-giveaways">
              <span className="text-joined-value">JOINED</span>
              <span className="cur-joined">{joinedArr.length}</span>
            </div>
          </div>
          <div className="buttons-and-need-to-join-cont">
            <div className="buttons-event-giveaways">
              <EventGiveawaysBtnJoin
                LastSteamLink={props.LastSteamLink}
                data={props.data}
                headerMes={{ header: header, message: message }}
                token={props.token}
                currentGiveaways={props.currentGiveaways}
                noRedirect={!props.setCurrentedGiveaways}
              >
                Join
              </EventGiveawaysBtnJoin>
              <button className="button-share-giveaways" onClick={() => setOpenShareModal(true)}>
                <IonIcon className="icon-share-giveaways" icon={shareOutline} />
              </button>
            </div>
            <div className="need-to-join-cont">
              <span className="text-need-to-join">TO JOIN YOU NEED TO</span>
              <span className="tickets-value">{`${props.currentGiveaways.sum_tickets} Tickets`}</span>
            </div>
          </div>
        </div>
        <div
          className="onclick-joined"
          onClick={() => {
            if (props.setCurrentedGiveaways) props.setCurrentedGiveaways(props.currentGiveaways);

            props.setOpenJoinedUser((prev) => !prev);

            if (props.setCurrentedGiveaways) {
              let newPath = location.pathname + `?id="${props.currentGiveaways.id}"`;
              history.push(newPath);
            } else {
              history.push(location.pathname);
            }
          }}
        />
        <div className="event-right-giveaways">
          {prizeArr.lenght !== 0 &&
            prizeArr.map((prizeGiveaways, i) => (
              <PrizeItem key={i} prizeGiveaways={prizeGiveaways} />
            ))}
        </div>
      </div>

      <ModalShare
        currentGiveaways={props.currentGiveaways}
        open={openShareModal}
        setOpen={setOpenShareModal}
      />
      {props.openJoinedUser === true && (
        <JoinedUserConteiner
          data={props.data}
          joinedUsers={joinedArr}
          LastSteamLink={props.LastSteamLink}
          token={props.token}
          currentGiveaways={props.currentGiveaways}
          headerMes={{ header: header, message: message }}
        />
      )}
    </>
  );
};

export default EventGiveawaysBody;
