import React, { useEffect, useState } from "react";
import { IonModal, IonRippleEffect } from "@ionic/react";
import { useAtom } from "jotai";
import {
  registerFinalModal,
  mainLoading,
  switchModalForJoinGL,
  RequestLinkGL,
  SteamLinkGL,
  GiveawaysGL,
  switchModalForJoinGLWitchParam,
  FinalModalRegGL,
} from "../state.js";
import { ReactComponent as Cross } from "../images/cross.svg";
import hand from "../images/hand.png";
import axios from "axios";
import url from "../axios.js";
import i18next from "i18next";
import useInput from "../hooks/useInput.js";
import { notify } from "../utils/utils.js";
import "../css/auth-modal.css";

const RegisterFinalModal = (props, { isBlack }) => {
  const [dataModal, setDataModal] = useAtom(registerFinalModal);
  const username = useInput(props.data.userData.login || "", { isEmpty: true });
  const email = useInput("", { isEmpty: true, isEmail: true });
  const [steamlink, setSteamLink] = useAtom(SteamLinkGL);
  const [curSteamLink, setCurSteamLink] = useState("");
  const [usernameInUse, setUsernameInUse] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);
  const [loading, setLoading] = useAtom(mainLoading);
  // const [steamlink, setSteamLink] = useState("");
  // const [switchModalForJoin, setSwitchModalForJoin] = useAtom(switchModalForJoinGL);
  const [requestLinkGiveaways, setRequestLinkGiveaways] = useAtom(RequestLinkGL);
  const [fianalModal, setFinalModal] = useAtom(FinalModalRegGL);
  const [switchModalForJoin, setSwitchModalForJoin] = useAtom(switchModalForJoinGLWitchParam);

  const submitData = () => {
    if (username.value || email.value) {
      register();
    }

    if (username.value && email.value && !email.emailError) {
      axios({
        method: "post",
        url: url + "/api/checkusername",
        data: {
          login: username.value,
        },
      })
        .then(() => {
          setUsernameInUse(false);
          axios({
            method: "post",
            url: url + "/api/checkemail",
            data: {
              email: email.value,
            },
          })
            .then(() => {
              if (!emailInUse && !usernameInUse) {
                register();
              }
              setEmailInUse(false);
            })
            .catch((error) => {
              /*422*/
              notify({ message: error.response.data.error });
              setEmailInUse(true);
            });
        })
        .catch((error) => {
          /*422*/
          notify({ message: error.response.data.error });
          setUsernameInUse(true);
        });
    } else {
      if (!username.value) {
        username.setCheckSubmit(true);
      }
      if (!email.value) {
        email.setCheckSubmit(true);
      }
      if (email.emailError) {
        email.setCheckSubmit(true);
        email.setEmailError(true);
      }
    }
  };

  const register = () => {
    setLoading(true);
    console.log(steamlink);
    const data = {
      login: username.value,
      email: email.value,
    };

    console.log(dataModal.tempToken);

    axios({
      method: "post",
      url: url + "/api/update-profile",
      headers: { Authorization: `Bearer ${dataModal.tempToken}` },
      data: data,
    })
      .then((res) => {
        if (res.data.status === 1) {
          localStorage.setItem("token", dataModal.tempToken);
          window.location.reload();
        }
      })
      .catch((error) => {
        /*422*/
        setLoading(false);
        notify({ message: error.response.data.error });
      });
  };

  const closeModal = (props) => {
    setDataModal({
      isOpen: false,
      tempToken: "",
      closeModal: dataModal?.switchModalForJoin?.param?.onClose,
      successModal: dataModal?.switchModalForJoin?.param?.onSuccess,
    });
    console.log("fff");
    dataModal?.closeModal?.();
    username.setValue("");
    email.setValue("");
  };
  return (
    <>
      <IonModal
        isOpen={dataModal.isOpen}
        cssClass="auth-modal reg-final-modal mod-window auto-height"
        onDidDismiss={closeModal}
        // onFocus={() => setModalFocus(true)}
      >
        <div className={`mod-container flex`}>
          <div className="modal-data">
            <div onClick={closeModal} className="flex absolute-close-modal" tabIndex="1">
              <Cross />
            </div>

            <div className="reg-final-modal-top flex">
              <img src={hand} alt="hand" />
              <div className="reg-final-modal-title">{i18next.t("Almost Done")}</div>
              {requestLinkGiveaways !== true ? (
                <div className="reg-final-modal-description">
                  {i18next.t("Fill in the 2 fields below so that we can identify you if necessary")}
                </div>
              ) : (
                <div className="reg-final-modal-description">
                  {i18next.t("Fill in the 3 fields below so that we can identify you if necessary")}
                </div>
              )}
            </div>

            <div className="auth-modal-inputs-container">
              <div className="input-container flex">
                <div className="input-container-label">
                  <span>{i18next.t("Username")}</span>
                  <span className="red">*</span>
                </div>
                <input
                  value={
                    props.data.userData.login
                      ? (() => {
                          username.value = props.data.userData.login;
                          return props.data.userData.login;
                        })()
                      : username.value
                  }
                  // value={username.value}
                  onChange={(e) => {
                    username.onChange(e);

                    setUsernameInUse(false);
                  }}
                  onBlur={(e) => username.onBlur(e)}
                  className={
                    "field " +
                    (usernameInUse || (username.isEmpty && username.checkSubmit)
                      ? "field-error"
                      : "")
                  }
                  type="text"
                  autoComplete="username"
                  // ref={inputRef}
                />
                {username.isEmpty && username.checkSubmit && (
                  <div className="error-message-block">{i18next.t("Fill the input")}</div>
                )}
              </div>

              <div className="input-container flex">
                <div className="input-container-label">
                  <span>{i18next.t("Email")}</span>
                  <span className="red">*</span>
                </div>
                <input
                  value={email.value}
                  onChange={(e) => {
                    email.onChange(e);
                    setEmailInUse(false);
                  }}
                  onBlur={(e) => email.onBlur(e)}
                  className={
                    "field " +
                    (emailInUse || (email.checkSubmit && (email.isEmpty || email.emailError))
                      ? "field-error"
                      : "")
                  }
                  type="email"
                />
                {email.checkSubmit && email.isEmpty && (
                  <div className="error-message-block">{i18next.t("Fill the input")}</div>
                )}
                {email.checkSubmit && email.emailError && !email.isEmpty && (
                  <div className="error-message-block">{i18next.t("Incorrect email")}</div>
                )}
              </div>
              {requestLinkGiveaways === true && (
                <div className="input-container flex">
                  <div className="input-container-label">
                    <span>{i18next.t("Steam Trade Link")}</span>
                    <span className="red">*</span>
                  </div>
                  <input
                    value={curSteamLink}
                    onChange={(e) => setCurSteamLink(e.target.value)}
                    className={"field "}
                    type="text"
                    // autoComplete="username"
                    // ref={inputRef}
                  />
                  {/* {username.isEmpty && username.checkSubmit && (
                    <div className="error-message-block">{i18next.t("Fill the input")}</div>
                  )} */}
                </div>
              )}
            </div>
            <div
              onClick={() => {
                // setFinalModal(true);
                submitData();
                setSteamLink(curSteamLink);
                localStorage.setItem("steamlink", curSteamLink);
              }}
              className={`save-btn flex ${
                !username.value || !email.value || email.emailError ? "disabled" : "ion-activatable"
              }`}
              tabIndex="0"
            >
              <IonRippleEffect />
              <p>{i18next.t("Confirm")}</p>
            </div>
          </div>
        </div>
      </IonModal>
    </>
  );
};

export default RegisterFinalModal;
