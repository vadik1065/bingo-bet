import React, { useState } from "react";

import imgRosket from "../../../../images/header/myAccaunt/itemBonus/raketWitchBackgound.png";
import imgTicket from "../../../../images/header/myAccaunt/itemBonus/ticketWitchbackgound.png";
import imgFreespin from "../../../../images/header/myAccaunt/itemBonus/freespinWitchBackground.png";

import "../../../../css/less/header/userAccountPopover/css/bonusPopover.css";

import ModalVip from "./ModalVip";
import { IonHeader, IonModal } from "@ionic/react";
import RotateClose from "../../../ui/RotateClose";
import ModalTickets from "./ModalTickets";
import ModalFreespin from "./ModalFreespin";
import i18next from "i18next";

const ItemModal = (props) => {
  const objectSwiftItem = {
    VIP: {
      id: "vip-popover",
      img: imgRosket,
      headerTitle: "Current Rakeback Balance",
    },
    Ticket: {
      id: "bonus-popover",
      img: imgTicket,
      headerTitle: "Raffle Tickets",
      customCssClass: "img-tickets",
    },
    Freespin: {
      id: "freespin-popover",
      img: imgFreespin,
      headerTitle: "Free Spins",
    },
  };

  const currentObject = objectSwiftItem[props.parrent];

  const [impotantClose, setImpotantClose] = useState(false);

  function dismissModal() {
    props.setOpen(false);
  }

  return (
    <IonModal
      isOpen={props.open && !impotantClose}
      onWillDismiss={dismissModal}
      cssClass={`user-popover bonuses-popover `}
    >
      <IonHeader>
        <span className="headers-bonuses-popover">
          {i18next.t(currentObject.headerTitle)}
        </span>
        <RotateClose close={() => props.setOpen(false)} />
      </IonHeader>
      <div className={`info-content info-content-modal  flex column  small`}>
        <div className={`img-conrainer ${currentObject.customCssClass ?? " "}`}>
          <img src={currentObject.img} />
        </div>
        {currentObject.id === "vip-popover" && (
          <ModalVip
            dismissModal={() => setImpotantClose(true)}
            statusRakeback={props.statusRakeback}
          />
        )}
        {currentObject.id === "bonus-popover" && (
          <ModalTickets
            dismissModal={() => setImpotantClose(true)}
            countTicket={props.countTicket}
          />
        )}
        {currentObject.id === "freespin-popover" && (
          <ModalFreespin
            dismissModal={() => setImpotantClose(true)}
            countFreespin={props.freespinBalance}
          />
        )}
      </div>
    </IonModal>
  );
};

export default ItemModal;
