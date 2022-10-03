import { IonButton } from "@ionic/react";
import i18next from "i18next";
import React from "react";
import { useHistory } from "react-router";

const PopoverVip = (props) => {
  const COUNT_HORUS = props.statusRakeback.dat_end;
  // const RAKE_RENURN = (
  //   props?.balance?.ob_b_total - props?.balance?.ob_b
  // ).toFixed(2);
  const RAKE_RENURN = (props?.statusRakeback?.rakebacks_sum ?? 0).toFixed(2);

  const history = useHistory();

  return (
    <div className="popover-conteiner-vip-content">
      <div className="vip-status-conteiner conteiner-item">
        <div className="first-yarus">
          <span className="title">{i18next.t("VIP Status")}</span>
          <span className={`count-horus ${COUNT_HORUS ? " " : "opacity"} `}>
            {COUNT_HORUS ?? 0}
          </span>
        </div>
        <div className="second-yarus">
          {props.statusRakeback.is_active ? (
            <span className="status-background">
              <span className="status active">{i18next.t("Active")}</span>
            </span>
          ) : (
            <span className="status-background">
              <span className="status inactive">{i18next.t("Inactive")}</span>
            </span>
          )}
          <span className="caption">{i18next.t("Hours Remaining")}</span>
        </div>
      </div>

      <div className="vip-rake-return-conteiner conteiner-item">
        <div className="first-columg">
          <span className="vip">{i18next.t("VIP")}</span>
          <span className="rake-return">{i18next.t("Rake Returns")}</span>
        </div>
        <div className="second-columg">
          <span className="count-return">
            {/* $ {props.balance?.cashback_value ?? 0} */}$ {RAKE_RENURN}
          </span>
        </div>
      </div>

      <div className="diposit-button-conteiner conteiner-item">
        <div className="first-yarus">
          <span>🤔{i18next.t("How to receive VIP status?")}</span>
          <span>{i18next.t("Make minimum deposit")}</span>
        </div>
        <div className="second-yarus">
          <IonButton onClick={() => history.push("/balance")}>
            {i18next.t("Deposit")}
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default PopoverVip;
