import { IonHeader, IonModal } from "@ionic/react";
import i18next from "i18next";
import { useAtom } from "jotai";
import { useState } from "react";
import {
  currentedGiveawaysGL,
  openJoinedUserGL,
  OpenToastJoinedGiveawaysGL,
  reloadListGiveawaysGL,
  SteamLinkGL,
} from "../../../state";
import RotateClose from "../../ui/RotateClose";
import { ReactComponent as GiftGiveaways } from "../../../images/giveaways/gift-giveaways.svg";
import { postSteamLink } from "../../../api";
import { useHistory, useLocation } from "react-router";

const RequirementModal = (props) => {
  const FindTickets = props.data.balance.find((el) => el.currency_id == "840");
  const [clickJoined, setClickJoined] = useAtom(OpenToastJoinedGiveawaysGL);
  const [open, setOpen] = useState(props.open);
  const [steamlink, setSteamLink] = useAtom(SteamLinkGL);
  const [reloadListGiveaways, setReloadListGiveaways] = useAtom(reloadListGiveawaysGL);
  const [openJoinedUser, setOpenJoinedUser] = useAtom(openJoinedUserGL);
  const [currentedGiveaways, setCurrentedGiveaways] = useAtom(currentedGiveawaysGL);
  const location = useLocation();
  const history = useHistory();

  const GoToEvent = () => {
    if (setCurrentedGiveaways) setCurrentedGiveaways(props.currentGiveaways);
    setOpenJoinedUser((prev) => !prev);
    if (props.currentGiveaways) {
      let newPath = location.pathname + `?id="${props.currentGiveaways.id}"`;
      history.push(newPath);
    } else {
      history.push(location.pathname);
    }
  };

  const JoinGiveaway = () => {
    if (props.currentGiveaways.request_link === 1) {
      const data = { id: props.currentGiveaways.id, link: steamlink };
      postSteamLink(props.token, data)
        .then((e) => {
          setReloadListGiveaways((prev) => !prev);
          return;
        })
        .catch((e) => {});
    } else {
      const data = { id: props.currentGiveaways.id };
      postSteamLink(props.token, data)
        .then((e) => {
          return;
        })
        .catch((e) => {});
    }
  };

  return (
    <>
      <div className="conteiner-for-delete-modals">
        <IonModal
          cssClass={`premium-modal  modal-requirement`}
          isOpen={open}
          onIonModalWillDismiss={() => {
            setOpen(false);
            props.closeModal();
          }}
        >
          <IonHeader className="header-requirement-modal">
            <span className="title-header-requirement-modal">{i18next.t("Requirement")}</span>
            <RotateClose
              close={() => {
                setOpen(false);
              }}
            />
          </IonHeader>
          {FindTickets.ob_tickets > props.currentGiveaways.sum_tickets ? (
            <div className="requirement-modal-cont">
              <div className="requirement-modal-info">
                <GiftGiveaways className="img-requirement-modal" />
                <span className="title-requirement-modal">
                  {i18next.t("Want to Join the Giveaway?")}
                </span>
                <span className="text-requirement-modal">
                  {i18next.t(`Spend ${props.currentGiveaways.sum_tickets} tickets to join`)}
                </span>
                <button
                  onClick={() => {
                    // JoinGiveaway();

                    if (!props.noRedirect) {
                      GoToEvent();
                    }
                    setClickJoined((prev) => ({ data: props.headerMes, open: true }));
                    setOpen(false);
                    props.closeModal();
                  }}
                  className="button-requirement-modal"
                >
                  <span className="text-btn-requirement">{i18next.t("Join")}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="requirement-modal-no-tickets-cont">
              <div className="requirement-modal-no-tickets-info">
                <GiftGiveaways className="img-requirement-modal" />
                <span className="title-requirement-no-tickets-modal">
                  {i18next.t("You don’t have enough tickets to join the giveaway")}
                </span>

                <div className="requirement-modal-no-tickets-conteiner">
                  <div className="requirement-modal-no-tickets-first-yarus">
                    <span>🤔{i18next.t("How to receive?")}</span>
                    <span>{i18next.t("Make a bet on any slot 🎮game!")}</span>
                  </div>
                  <div className="requirement-modal-no-tickets-second-yarus">
                    <button
                      onClick={() => {
                        history.push("/games");
                        setOpen(false);
                        props.closeModal();
                      }}
                    >
                      {i18next.t("Play Games")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </IonModal>
      </div>
    </>
  );
};

export default RequirementModal;
