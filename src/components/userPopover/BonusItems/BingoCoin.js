import { useAtom } from "jotai";
import React from "react";
import { bingoCoinModal } from "../../../state";
import chip from "../../../images/crypto-logos/bcoin.png";
import i18next from "i18next";

const BingoCoin = (props) => {
  const [openBingoCoinModal, setOpenBingoCoinModal] = useAtom(bingoCoinModal);
  return (
    <div
      className="user-menu-popover-bonus-item flex"
      onClick={() => setOpenBingoCoinModal(true)}
    >
      <img src={chip} alt="chip" />
      <span>Bingo Coin</span>
      <div className="badge">{i18next.t("New")}</div>
    </div>
  );
};

export default BingoCoin;
