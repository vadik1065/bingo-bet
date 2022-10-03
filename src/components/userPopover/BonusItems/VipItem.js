import React, { useState } from "react";

import RoketBang from "../../../images/header/myAccaunt/RakeBack.png";
import { ReactComponent as Dropdown } from "../../../images/header/myAccaunt/ArrowRight.svg";
import { ReactComponent as Pause } from "../../../images/pause-circle.svg";
import i18next from "i18next";
import ItemModal from "./itemModal/ItemModal";

const VipItem = (props) => {
  const CHECK_RAKEBACK = props.statusRakeback.is_active;

  const [openVipItem, setOpenVipItem] = useState(false);

  return (
    <>
      <div
        className="user-menu-popover-bonus-item flex vip-container"
        // onClick={() => setOpenVipItem((prev) => !prev)}
        onClick={() => setOpenVipItem(true)}
        id="vip-popover"
      >
        <div className="item-right">
          <img src={RoketBang} />
          <span className="vip-item">
            {"VIP "}
            {CHECK_RAKEBACK ? (
              <span className="vip-active">{i18next.t("Active")}</span>
            ) : (
              <span className="vip-no-active">{i18next.t("Inactive")}</span>
            )}
          </span>
        </div>
        {props.isGamePage ? (
          <Pause className="pause" />
        ) : (
          <Dropdown className={`dropdown ${false ? "rotate90" : "rotate0"}`} />
        )}
        {/* <ItemPopover
          width={props.data.width}
          isGamePage={props.isGamePage}
          parrent={"VIP"}
          statusRakeback={props.statusRakeback}
        /> */}
        <ItemModal
          open={openVipItem}
          setOpen={setOpenVipItem}
          width={props.data.width}
          isGamePage={props.isGamePage}
          parrent={"VIP"}
          statusRakeback={props.statusRakeback}
        />
        {/* {setInfoItemPopover({
          open: true,
          param: {
            width: props.data.width,
            isGamePage: props.isGamePage,
            parrent: "VIP",
            statusRakeback: props.statusRakeback,
          },
        })} */}
      </div>
    </>
  );
};

export default VipItem;
