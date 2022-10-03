import { IonHeader, IonModal, IonPopover, IonToast } from "@ionic/react";
import { ReactComponent as Facebook } from "../../images/icon-share/Facebook.svg";
import { ReactComponent as Discord } from "../../images/icon-share/discord.svg";
import { ReactComponent as Twitter } from "../../images/icon-share/Twitter.svg";
import { ReactComponent as Telegram } from "../../images/icon-share/telegram.svg";
import { ReactComponent as Instagram } from "../../images/icon-share/Inst.svg";
import { ReactComponent as Copy } from "../../images/icon-share/copy.svg";
import Checkmark from "../../images/icon-share/checkmark-green.svg";
import CloseBtn from "../../images/icon-share/close-buttn.svg";
import i18next from "i18next";
import "../../css/ui/css/ModalShare.css";
import RotateClose from "./RotateClose";
import { useState } from "react";
import { search, trendingUp } from "ionicons/icons";
import useCopyText from "../../hooks/useCopyText";
import { useLocation } from "react-router";

const ModalShare = (props) => {
  const [clickCopyLink, setClickCopyLink] = useState(false);
  const { isNotSupportCopyText, copyText } = useCopyText();
  const location = useLocation();

  async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  const circles = [
    {
      icon: <Facebook />,
      cssClass: "fk",
      name: "facebook",
      handler: () => {
        window.open(
          `https://www.facebook.com/sharer.php?u=http://localhost:8100${location.pathname}?id="${props.currentGiveaways.id}"`
        );
      },
    },
    {
      icon: <Discord />,
      cssClass: "dd",
      name: "discord",
      handler: async () => {
        setClickCopyLink(true);
        copyText(
          `http://localhost:8100${location.pathname}?id="${props.currentGiveaways.id}"`
          // `https://bingo.bet${location.pathname}?id=${props.currentGiveaways.id}`
        );
        await sleep(50);
        window.open(`https://discord.com/channels/@me`);
      },
    },
    {
      icon: <Twitter />,
      cssClass: "tr",
      name: "twitter",
      handler: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=Bingo-bet Giveaways.&url=http://localhost:8100${location.pathname}?id="${props.currentGiveaways.id}"`
        );
      },
    },
    {
      icon: <Telegram />,
      cssClass: "tm",
      name: "telegram",
      handler: () => {
        window.open(
          `https://telegram.me/share/url?url=http://localhost:8100${location.pathname}?id="${props.currentGiveaways.id}"&text=Bingo-bet Giveaways`
        );
      },
    },
    {
      icon: <Instagram />,
      cssClass: "im",
      name: "instagram",
      handler: async () => {
        setClickCopyLink(true);
        copyText(
          `http://localhost:8100${location.pathname}?id="${props.currentGiveaways.id}"`
          // `https://bingo.bet${location.pathname}?id=${props.currentGiveaways.id}`
        );
        await sleep(50);
        window.open(`https://www.instagram.com/direct/`);
      },
    },
    {
      icon: <Copy />,
      cssClass: "cy",
      name: "copy link",
      handler: () => {
        setClickCopyLink(true);
        copyText(
          `http://localhost:8100${location.pathname}?id="${props.currentGiveaways.id}"`
          // `https://bingo.bet${location.pathname}?id=${props.currentGiveaways.id}`
        );
      },
    },
  ];

  return (
    <>
      <IonModal
        cssClass={` premium-modal  modal-share`}
        isOpen={props.open}
        onWillDismiss={() => props.setOpen(false)}
      >
        <IonHeader className="modal-share-header">
          <span className="title-header-share">{i18next.t("Share")} </span>
          <RotateClose close={() => props.setOpen(false)} />
        </IonHeader>
        <div className="basic-info-cont">
          <span className="share-basic-text">{i18next.t("Share the Giveaway")}</span>
          <div className="circles-share">
            {circles.map((icon) => (
              <div key={icon.name} className={`circl-cont-el ${icon.cssClass}`}>
                <span className="text-circles">{icon.name}</span>
                <div className="circles" onClick={() => icon.handler()}>
                  {icon.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonModal>
      <IonToast
        isOpen={clickCopyLink}
        onWillDismiss={() => setClickCopyLink(false)}
        message={i18next.t("Link copied successfully")}
        cssClass="toast-copy"
        icon={Checkmark}
        buttons={[{ icon: CloseBtn }]}
        duration={2000}
      ></IonToast>
    </>
  );
};

export default ModalShare;
