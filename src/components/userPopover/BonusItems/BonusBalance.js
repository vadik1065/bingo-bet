import React, { useMemo, useState } from "react";

import PopoverBonus from "../../PopoverBonus";
import imgTickets from "../../../images/header/myAccaunt/Tickets.png";
import { ReactComponent as Pause } from "../../../images/pause-circle.svg";
import { ReactComponent as Dropdown } from "../../../images/header/myAccaunt/ArrowRight.svg";

import i18next from "i18next";
import { useIonViewWillLeave } from "@ionic/react";
import ItemPopover from "./itemPopover/ItemPopover";
import ItemModal from "./itemModal/ItemModal";

const BonusBalance = (props) => {
  const countTicket = props.data.balance.ob_tickets;

  const [popoverBonusState, setShowPopoverBonus] = useState({
    showPopover: false,
    event: undefined,
  });

  const [openModal, setOpenModal] = useState(false);

  useIonViewWillLeave(() => {
    setShowPopoverBonus({ showPopover: false, event: undefined });
  });

  return (
    <div
      className={`user-menu-popover-bonus-item flex tickets-container ${
        props.isGamePage ? "disabled" : ""
      }`}
      id="bonus-popover"
      // onClick={(e) => {
      //   if (!isGamePage) {
      //     e.persist();
      //     setShowPopoverBonus({ showPopover: true, event: e });
      //   }
      // }}
      onClick={() => setOpenModal(true)}
    >
      <img className="imgTickets-img" src={imgTickets} alt="imgTickets" />
      <span className="balance-div-label">
        {props.isGamePage ? (
          i18next.t("In game")
        ) : (
          <span className="title-item">
            {i18next.t("Tickets")}{" "}
            <span className="count-item">({countTicket})</span>
          </span>
        )}
      </span>
      {props.isGamePage ? (
        <Pause className="pause" />
      ) : (
        <Dropdown className={`dropdown ${false ? "rotate90" : "rotate0"}`} />
      )}

      {/* <PopoverBonus
        // popoverState={popoverBonusState}
        // setShowPopover={setShowPopoverBonus}
        isDark={props.color}
        width={props.data.width}
        balance={props.data.balance}
        isGamePage={props.isGamePage}
      /> */}

      {/* <ItemPopover
        width={props.data.width}
        isGamePage={props.isGamePage}
        parrent={"Ticket"}
        countTicket={countTicket}
      /> */}

      <ItemModal
        open={openModal}
        setOpen={setOpenModal}
        width={props.data.width}
        isGamePage={props.isGamePage}
        parrent={"Ticket"}
        countTicket={countTicket}
      />
    </div>
  );
};

export default BonusBalance;
