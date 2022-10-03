import { IonPopover } from "@ionic/react";
import React from "react";

import imgRosket from "../../../../images/header/myAccaunt/itemBonus/raketWitchBackgound.png";
import imgTicket from "../../../../images/header/myAccaunt/itemBonus/ticketWitchbackgound.png";
import imgFreespin from "../../../../images/header/myAccaunt/itemBonus/freespinWitchBackground.png";

import "../../../../css/less/header/userAccountPopover/css/bonusPopover.css";
import PopoverVip from "./PopoverVip";
import PopoverTickets from "./PopoverTickets";
import PopoverFreespin from "./PopoverFreespin";

const ItemPopover = (props) => {
  const objectSwiftItem = {
    VIP: { id: "vip-popover", img: imgRosket },
    Ticket: { id: "bonus-popover", img: imgTicket },
    Freespin: { id: "freespin-popover", img: imgFreespin },
  };

  const currentObject = objectSwiftItem[props.parrent];
  // console.log(currentObject.id);
  return (
    <IonPopover
      trigger={`${props.isGamePage ? undefined : currentObject.id}`}
      size="cover"
      cssClass={`user-popover bonuses-popover `}
      mode={"md"}
      arrow={false}
    >
      <div className={`info-content flex column  small`}>
        <div className="img-conrainer">
          <img src={currentObject.img} />
        </div>
        {currentObject.id === "vip-popover" && (
          <PopoverVip statusRakeback={props.statusRakeback} />
        )}
        {currentObject.id === "bonus-popover" && (
          <PopoverTickets countTicket={props.countTicket} />
        )}
        {currentObject.id === "freespin-popover" && (
          <PopoverFreespin countFreespin={props.freespinBalance} />
        )}
      </div>
    </IonPopover>
  );
};

export default ItemPopover;
