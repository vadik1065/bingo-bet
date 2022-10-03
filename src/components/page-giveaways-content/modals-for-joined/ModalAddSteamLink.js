import { IonHeader, IonModal } from "@ionic/react";
import i18next from "i18next";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { ReactComponent as SteamLink } from "../../../images/giveaways/steam-link.svg";
import { SteamLinkGL } from "../../../state";
import RotateClose from "../../ui/RotateClose";

const ModalAddSteamLink = (props) => {
  const [steamlink, setSteamLink] = useAtom(SteamLinkGL);
  const FinalModalSteamLink = localStorage.getItem("steamlink");
  const LastSteamLink = useMemo(() => props.LastSteamLink, [props.LastSteamLink]);
  const [curSteamlink, setCurSteamLink] = useState(
    LastSteamLink || steamlink || FinalModalSteamLink || ""
  );
  const [open, setOpen] = useState(props.open || false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [nextModal, setNextModal] = useState(false);
  return (
    <div className="conteiner-for-delete-modal">
      <IonModal
        cssClass={`premium-modal  modal-steam-link`}
        isOpen={open}
        onIonModalDidDismiss={() => {
          setOpen(false);
          setAutoFocus(false);
          if (nextModal) {
            props.succesModal();
          } else {
            props.closeModal();
          }
        }}
        onIonModalDidPresent={(e) => setAutoFocus(true)}
      >
        <IonHeader className="header-steam-link-modal">
          <span className="text-header-steam">{i18next.t("Requirement")}</span>
          <RotateClose
            close={() => {
              setOpen(false);
              props.closeModal();
            }}
          />
        </IonHeader>
        <div className="steam-link-modal-info">
          <SteamLink className="img-steam-link-modal" />
          <span className="title-steam-link-modal">{i18next.t("Want to Join the Giveaway?")}</span>
          <span className="text-steam-link-modal">
            {i18next.t(
              "Enter your active STEAM trade link to be qualified to receive any steam related prizes in case of a win"
            )}
          </span>
          <div className="steam-link-input-cont">
            <div className="text-upper-input-cont">
              <span className="text-upper-input">{i18next.t("Steam Trade Link")}</span>
            </div>
            {autoFocus && (
              <input
                autoFocus={true}
                value={curSteamlink}
                onChange={(e) => {
                  setCurSteamLink(e.target.value);
                }}
                className="input-steam-link"
              />
            )}
            {!autoFocus && (
              <input
                autoFocus={true}
                value={curSteamlink}
                onChange={(e) => {
                  setCurSteamLink(e.target.value);
                }}
                className="input-steam-link"
              />
            )}
          </div>
          <button
            onClick={() => {
              setNextModal(true);
              setSteamLink(curSteamlink);
              localStorage.removeItem("steamlink");
              setOpen(false);
              props.succesModal();
            }}
            className="btn-steam-link"
            disabled={curSteamlink.length < 70}
          >
            <span className="text-in-btn-steam-link">{i18next.t("Join to the Giveaway")}</span>
          </button>
        </div>
      </IonModal>
    </div>
  );
};

export default ModalAddSteamLink;
