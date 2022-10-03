import i18next from "i18next";
import React, { useEffect } from "react";
import "../../css/less/header/userAccountPopover/css/myBonuses.css";

import VipItem from "./BonusItems/VipItem";
import BingoCoin from "./BonusItems/BingoCoin";
import BonusBalance from "./BonusItems/BonusBalance";
import BonusFreeSpeen from "./BonusItems/BonusFreeSpeen";

const MyBonusesCard = (props) => {
  return (
    <div className={`user-menu-popover-body-item column flex`}>
      <div className="user-menu-popover-body-item-title">
        {i18next.t("My Bonuses")}
      </div>
      <BingoCoin />

      <VipItem
        statusRakeback={props.dataRakeback.statusRakeback}
        data={props.data}
        isGamePage={props.isGamePage}
      />

      <BonusBalance data={props.data} isGamePage={props.isGamePage} />
      <BonusFreeSpeen
        freespinBalance={props.dataBonusFreeSpeen.freespinBalance}
        data={props.data}
        color={props.color}
        isGamePage={props.isGamePage}
      />
    </div>
  );
};

export default MyBonusesCard;
