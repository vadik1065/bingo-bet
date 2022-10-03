import React, { useState } from "react";

import slots from "../../../images/slots.png";

import { ReactComponent as Pause } from "../../../images/pause-circle.svg";
import { ReactComponent as Dropdown } from "../../../images/header/myAccaunt/ArrowRight.svg";

import i18next from "i18next";
import { useIonViewWillLeave } from "@ionic/react";
import ItemPopover from "./itemPopover/ItemPopover";
import ItemModal from "./itemModal/ItemModal";

const BonusFreeSpeen = (props) => {
  const [popoverFreespinState, setShowPopoverFreespin] = useState({
    showPopover: false,
    event: undefined,
  });
  const [openModal, setOpenModal] = useState(false);

  useIonViewWillLeave(() => {
    setShowPopoverFreespin({ showPopover: false, event: undefined });
  });

  return (
    <div
      className={`user-menu-popover-bonus-item flex ${
        props.isGamePage ? "disabled" : ""
      }`}
      id="freespin-popover"
      onClick={() => setOpenModal(true)}

      // onClick={(e) => {
      //   if (!isGamePage) {
      //     e.persist();
      //     setShowPopoverFreespin({ showPopover: true, event: e });
      //   }
      // }}
    >
      <img className="freespin-img" src={slots} alt="slots" />
      <span className="balance-div-label">
        {props.isGamePage ? (
          i18next.t("In game")
        ) : (
          <span className="title-item">
            {i18next.t("Free Spins")}{" "}
            <span className="count-item">({props.freespinBalance})</span>
          </span>
        )}
      </span>
      {props.isGamePage ? (
        <Pause className="pause" />
      ) : (
        <Dropdown className={`dropdown ${false ? "rotate90" : "rotate0"}`} />
      )}

      {/* <PopoverFreeSpins
        // popoverState={popoverFreespinState}
        // setShowPopover={setShowPopoverFreespin}
        isDark={props.color}
        width={props.data.width}
        balance={props.data.balance}
        isGamePage={props.isGamePage}
      /> */}

      {/* <ItemPopover
        width={props.data.width}
        isGamePage={props.isGamePage}
        parrent={"Freespin"}
        freespinBalance={props.freespinBalance}
      /> */}

      <ItemModal
        open={openModal}
        setOpen={setOpenModal}
        width={props.data.width}
        isGamePage={props.isGamePage}
        parrent={"Freespin"}
        freespinBalance={props.freespinBalance}
      />
    </div>
  );
};

export default BonusFreeSpeen;
