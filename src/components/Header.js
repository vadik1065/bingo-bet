import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { gl_notifications } from "../state.js";
import {
  IonMenuButton,
  IonRippleEffect,
  IonSelectOption,
  IonSelect,
  IonToggle,
  useIonViewWillLeave,
  IonItem,
  IonBadge,
} from "@ionic/react";
import "../css/header.css";
import { useHistory, useLocation } from "react-router-dom";
import { menuController } from "@ionic/core";
import wallet from "../images/wallet-small.png";

import { Link } from "react-router-dom";
import i18next from "i18next";
import url from "../axios.js";

import { ReactComponent as Pause } from "../images/pause-circle.svg";
import { ReactComponent as Alert } from "../images/alert.svg";
import bg from "../images/unknown.png";
import { thousandSeparator } from "../utils/utils.js";
import PromoModal from "./PromoModal.js";
import useChangeCurrency from "../hooks/useChangeCurrency.js";
import Notifications from "./header/Notifications.js";
import UserPopover from "./userPopover/UserPopover.js";
import ChangeLanguage from "./ui/ChangeLanguage.js";

const Header = (props) => {
  const hist = useHistory();
  const location = useLocation();
  const [freespinBalance, setFreespinBalance] = useState(0);
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  const [popoverNotiicationsState, setShowPopoverNotiications] = useState({
    showPopover: false,
    event: undefined,
  });
  const [isPromoModalOpen, setPromoModalOpen] = useState(false);
  const [isGamePage, setIsGamePage] = useState(false);
  const { changeCurrency, balanceActive, setBalanceActive } = useChangeCurrency(
    {
      currency_id: props.data.userData.currency_id,
      token: props.data.token,
      balance: props.data.balance,
      updateUser: props.updateUser,
    }
  );
  const [progressNum, setProgressNum] = useState(0);
  const [notifications, setNotifications] = useAtom(gl_notifications);

  useIonViewWillLeave(() => {
    setShowPopover({ showPopover: false, event: undefined });
    setShowPopoverNotiications({ showPopover: false, event: undefined });
    setIsGamePage(false);
    setProgressNum(0);
  });

  useEffect(() => {
    if (location.pathname.includes("/game/")) {
      setIsGamePage(true);
    } else {
      setIsGamePage(false);
    }

    setShowPopover({ showPopover: false, event: undefined });
  }, [location.pathname]);

  useEffect(() => {
    if (props.data.userData.currency_id) {
      // let balance = props.data.balance.find(item => item.currency_id === props.data.userData.currency_id);
      // setBalanceActive(balance);

      let obj = props.data.balance.find((item) => item.currency_id == 840);

      setFreespinBalance(obj.ob_fs);
    }
  }, [props.data.balance, props.data.userData.currency_id]);

  function changeColor() {
    if (props.color === true) {
      props.setColor(false);
    }
    if (props.color === false) {
      props.setColor(true);
    }
  }

  function backFilter() {
    if (location.pathname === "/home") {
      props.mainPageFilter("all");
    }
  }

  return (
    <div className="header-container">
      <div className="menu-btn-container">
        <IonMenuButton mode={"ios"} className="no-ripple" menu="main-menu" />
      </div>

      <Link onClick={backFilter} className="logo-link" to="/home" />

      {props.data.token === null && (
        <>
          {props.data.width >= 768 && (
            <IonToggle
              onClick={changeColor}
              checked={props.color}
              className={`daymode-toggle ${
                props.data.token === null ? "mr-a" : ""
              }`}
              mode={"md"}
            />
          )}

          {props.data.width < 768 && (
            <ChangeLanguage
              currentLang={props.data.lang}
              changeLan={props.data.changeLan}
            />
          )}

          <div className="unlogged flex">
            <ChangeLanguage
              currentLang={props.data.lang}
              changeLan={props.data.changeLan}
            />
            <div
              onClick={() => {
                // setAuth({ isOpen: true, type: 'login' });
                hist.push("/login");
                menuController.close();
              }}
              className="login-btn flex ion-activatable"
            >
              <IonRippleEffect />
              {i18next.t("Login")}
            </div>
            <div
              onClick={() => {
                hist.push("/register");
                // checkRegister();
                menuController.close();
              }}
              className="register-btn flex ion-activatable"
            >
              <IonRippleEffect />
              {i18next.t("Sign Up")}
            </div>
          </div>
        </>
      )}

      {props.data.token !== null && (
        <div className="logged flex">
          <div className="balance-block flex">
            {isGamePage ? (
              <div className="balance-div flex bonus second">
                <img src={`${url}/${balanceActive.image_url}`} alt="currency" />
                <p>{i18next.t("In game")}</p>
                <Pause />
              </div>
            ) : (
              <IonItem lines="none" className="header-balance">
                {balanceActive?.image_url && (
                  <img
                    src={`${url}/${balanceActive.image_url}`}
                    alt="currency"
                  />
                )}
                <IonSelect
                  value={balanceActive?.currency_id}
                  onIonChange={(e) => {
                    setBalanceActive(
                      props.data.balance.find(
                        (el) => el.currency_id == e.detail.value
                      )
                    );
                    changeCurrency(e.detail.value);
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

            <Link className="flex ion-activatable" to="/balance">
              <img src={wallet} alt="wallet" className="btn-wallet" />
              <IonRippleEffect />
              <p onClick={() => hist.push("/balance")}>
                {i18next.t("Deposit")}
              </p>
            </Link>
          </div>
          <div
            className="userpic header-userpic"
            style={{
              backgroundImage:
                props.data.userData.avatar === null
                  ? `url(${bg})`
                  : `url(${props.data.userData.avatar})`,
            }}
            onClick={(e) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}
          />

          <UserPopover
            setShowPopover={setShowPopover}
            changeLan={props.data.changeLan}
            popoverState={popoverState}
            lang={props.data.lang}
            changeColor={changeColor}
            color={props.color}
            isGamePage={isGamePage}
            setBalanceActive={setBalanceActive}
            balanceActive={balanceActive}
            changeCurrency={changeCurrency}
            freespinBalance={freespinBalance}
            setPromoModalOpen={setPromoModalOpen}
            data={{
              userData: props.data.userData,
              token: props.data.token,
              width: props.data.width,
              balance: props.data.balance,
            }}
          />
          {/* TODO */}

          <div className="hline" />
          <div
            className="notification-container flex"
            onClick={(e) => {
              e.persist();
              setShowPopoverNotiications({ showPopover: true, event: e });
            }}
          >
            <Alert />
            {notifications.filter((n) => n.isread === 0).length > 0 && (
              <IonBadge mode="ios">
                {notifications.filter((n) => n.isread === 0).length}
              </IonBadge>
            )}
          </div>
          <Notifications
            popoverState={popoverNotiicationsState}
            setShowPopover={setShowPopoverNotiications}
            token={props.data.token}
            color={props.color}
            userId={props.data.userData.user_id}
          />
        </div>
      )}

      <PromoModal
        setIsOpen={setPromoModalOpen}
        isOpen={isPromoModalOpen}
        token={props.data.token}
        updateUser={props.updateUser}
      />
    </div>
  );
};

export default Header;
