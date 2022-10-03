import {
  IonItem,
  IonPopover,
  IonRippleEffect,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/react";

import bg from "../../images/unknown.png";
import gift from "../../images/gift.png";
import wallet from "../../images/wallet-small.png";
import { ReactComponent as Pause } from "../../images/pause-circle.svg";
import { ReactComponent as Cross } from "../../images/cross.svg";
import { ReactComponent as Statistics } from "../../images/user-menu/statistics.svg";
import { ReactComponent as Balance } from "../../images/user-menu/balance.svg";
import { ReactComponent as Details } from "../../images/user-menu/user.svg";
import { ReactComponent as Help } from "../../images/user-menu/help.svg";
import { ReactComponent as MHistory } from "../../images/user-menu/history.svg";
import { ReactComponent as Affiliate } from "../../images/user-menu/affiliate.svg";
import { ReactComponent as Logout } from "../../images/logout-new.svg";

import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import ProgressBar from "../ui/ProgressBar.js";
import { Link } from "react-router-dom";
import url from "../../axios.js";
import i18next from "i18next";

import { getPlayerStatusIcon, getPromoVipRankClass, thousandSeparator } from "../../utils/utils.js";
import MyBonusesCard from "./MyBonusesCard";
import { logoutModal } from "../../state";
import { useAtom } from "jotai";
import ChangeLanguage from "../ui/ChangeLanguage";

const UserPopover = (props) => {
  const popoverState = useMemo(() => props.popoverState, [props.popoverState]);

  const [openLogout, setOpenLogout] = useAtom(logoutModal);

  const hist = useHistory();

  const USDbalanceObj = useMemo(
    () => props.data.balance.find((item) => item.currency_id == 840),
    [props.data.balance]
  );

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <>
      <IonPopover
        cssClass="user-popover user-menu"
        mode={"md"}
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => props.setShowPopover({ showPopover: false, event: undefined })}
      >
        <div className="user-menu-popover">
          <div className="user-menu-popover-header flex">
            <div
              className="user-menu-popover-header-left flex"
              onClick={() => hist.push("/account")}
            >
              <div
                className="userpic"
                style={{
                  backgroundImage:
                    props.data.userData.avatar === null
                      ? `url(${bg})`
                      : `url(${props.data.userData.avatar})`,
                }}
              ></div>
              <div className="username">{props.data.userData.login}</div>
            </div>
            <div
              className="absolute-close-modal flex"
              onClick={() => {
                setTimeout(
                  () =>
                    props.setShowPopover({
                      showPopover: false,
                      event: undefined,
                    }),
                  50
                );
                // props.setShowPopover({ showPopover: false, event: undefined });
              }}
            >
              <Cross />
            </div>
          </div>
          <div className="user-menu-popover-body">
            <div className="user-menu-popover-body-top flex">
              <ChangeLanguage lang={props.lang} changeLan={props.changeLan} />
              <IonToggle
                onClick={props.changeColor}
                checked={props.color}
                className={`daymode-toggle ${props.data.token === null ? "mr-a" : ""}`}
                mode={"md"}
              />
            </div>

            {props.statusProgress?.current_status_id && (
              <div
                className={`user-menu-popover-body-item flex level-${
                  props.statusProgress.current_status_id - 1
                }`}
              >
                <div className={getPromoVipRankClass(props.statusProgress.current_status_id - 1)}>
                  <div className="promo-vip-rank-pic">
                    <img
                      src={getPlayerStatusIcon(props.statusProgress.current_status_id)}
                      alt="bingoCoin"
                    />
                  </div>
                </div>
                <div className="user-menu-popover-progress-container flex">
                  <ProgressBar
                    completed={props.statusProgress.percent_next}
                    // bgcolor={"#6a1b9a"}
                  >
                    <div className="premium-vip-progress-top flex">
                      <span>
                        {i18next.t("Level")} {props.statusProgress.current_status_id - 1}
                      </span>
                      <span className={`percent`}>{props.statusProgress.percent_next}%</span>
                    </div>
                  </ProgressBar>
                </div>
              </div>
            )}

            {props.data.width < 768 && (
              <div className={`user-menu-popover-body-item column flex`}>
                <div className="user-menu-popover-body-item-title">{i18next.t("My Balance")}</div>
                {props.isGamePage ? (
                  <div className="balance-div flex bonus second">
                    <img src={`${url}/${props.balanceActive.image_url}`} alt="currency" />
                    <p>{i18next.t("In game")}</p>
                    <Pause />
                  </div>
                ) : (
                  <IonItem lines="none" className="header-balance">
                    {props.balanceActive?.image_url && (
                      <img src={`${url}/${props.balanceActive.image_url}`} alt="currency" />
                    )}
                    <IonSelect
                      value={props.balanceActive?.currency_id}
                      onIonChange={(e) => {
                        props.setBalanceActive(
                          props.data.balance.find((el) => el.currency_id == e.detail.value)
                        );
                        props.changeCurrency(e.detail.value);
                      }}
                      interface={"popover"}
                      mode={"md"}
                      className="balance-select"
                    >
                      {props.data.balance.map((el) => (
                        <IonSelectOption
                          key={el.currency_id}
                          value={el.currency_id}
                          className={`balance-select-option ${el.entity}`}
                        >
                          {thousandSeparator(el.ob)}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                )}

                <Link className="balance-btn flex ion-activatable" to="/balance">
                  <img src={wallet} alt="wallet" className="btn-wallet" />
                  <IonRippleEffect />
                  <p onClick={() => hist.push("/balance")}>{i18next.t("Deposit")}</p>
                </Link>
              </div>
            )}

            <MyBonusesCard // TODO
              color={props.color}
              dataRakeback={{
                statusRakeback: props.data.userData.statusRakeback,
              }}
              dataBonusFreeSpeen={{
                freespinBalance: props.freespinBalance,
              }}
              isGamePage={props.isGamePage}
              data={{
                width: props.data.width,
                balance: USDbalanceObj,
              }}
            />

            <div
              className={`user-menu-popover-body-item promo-item flex`}
              onClick={() => props.setPromoModalOpen(true)}
            >
              <img className="gift-img" src={gift} alt="gift" />
              <div className="user-menu-popover-body-item-label">
                {i18next.t("Do you have a promo code?")}
              </div>
            </div>

            <div className={`user-menu-popover-body-item grid`}>
              <p>
                <Statistics />
                <Link to="/statistics">{i18next.t("Statistics")}</Link>
              </p>
              <p>
                <Details />
                <Link to="/account">{i18next.t("Account Settings")}</Link>
              </p>
              <p>
                <Balance />
                <Link to="/balance">{i18next.t("Balance")}</Link>
              </p>
              <p>
                <Affiliate />
                <Link to="/affiliate">{i18next.t("Affiliate Program")}</Link>
              </p>
              <p>
                <MHistory />
                <Link to="/history">{i18next.t("History")}</Link>
              </p>
              <p>
                <Help />
                <Link to="/documents/help">{i18next.t("Help & Info")}</Link>
              </p>
            </div>

            <div
              className={`user-menu-popover-body-item logout-item flex`}
              onClick={() => setOpenLogout(!openLogout)}
            >
              <Logout className="logout-img" />
              <div className="user-menu-popover-body-item-label">{i18next.t("Logout")}</div>
            </div>
          </div>
        </div>
      </IonPopover>
    </>
  );
};

export default UserPopover;
