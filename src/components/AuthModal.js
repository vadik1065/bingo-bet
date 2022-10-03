import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  IonModal,
  IonCheckbox,
  IonRippleEffect,
  IonSpinner,
  IonLabel,
  IonItem,
} from "@ionic/react";
import { useAtom } from "jotai";
import {
  restoreModal,
  kycModal,
  userId,
  authModal,
  promo,
  registerFinalModal,
  switchModalForJoinGL,
  FinalModalRegGL,
} from "../state.js";
import { ReactComponent as Cross } from "../images/cross.svg";
import { ReactComponent as Telegram } from "../images/socials/telegram-login.svg";
import { ReactComponent as Google } from "../images/socials/google-login.svg";
import { ReactComponent as Facebook } from "../images/socials/facebook-login.svg";
import { ReactComponent as EyeShow } from "../images/eye-show.svg";
import { ReactComponent as EyeHide } from "../images/eye-hide.svg";
import axios from "axios";
import url from "../axios.js";
import i18next from "i18next";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import TelegramLoginButton from "react-telegram-login";
import "../css/auth-modal.css";
import FP from "@fingerprintjs/fingerprintjs-pro";
import useCheckRegister from "../hooks/useCheckRegister.js";
import { useHistory, useLocation } from "react-router";
import { Redirect } from "react-router-dom";
import useFocus from "../hooks/useFocus.js";
import { notify } from "../utils/utils.js";
import RegisterModalContent from "./RegisterModalContent.js";
import CusIonRouterOutlet from "../CusIonRouterOutlet.js";
const { v4: uuidv4 } = require("uuid");

const LoginModalContent = ({ setAuth, setToken, setUuid, modalFocus, width }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [openRestore, setOpenRestore] = useAtom(restoreModal);
  const [btnLoading, setBtnLoading] = useState(false);
  const [openKycModal, setOpenKycModal] = useAtom(kycModal);
  const [finalModalReg, setFinalModalReg] = useAtom(FinalModalRegGL);
  const [usId, setUserId] = useAtom(userId);
  const [inputRef, setInputFocus] = useFocus();
  // console.log(finalModalReg);
  useEffect(() => {
    if (modalFocus && width > 1024) {
      setInputFocus();
    }
  }, [modalFocus, width]);

  const login = () => {
    setBtnLoading(true);
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error, response) {
        if (error.response.status === 422 || error.response.status === 403) {
          notify({ message: i18next.t(error.response.data.error) });
          // notify({ message: i18next.t("Incorrect login or password") });
          // toast(<ToastContent message={i18next.t("Incorrect login or password")} />, { toastId: "Incorrect login or password" });
        }

        if (error.response.status === 333) {
          // некорректная страна
          setAuth({ isOpen: false, type: "" });
          setOpenKycModal(true);
        }
        return Promise.reject(error);
      }
    );

    let uuid = uuidv4();
    let requestMetadata = { UUID: uuid };
    async function sendInfo() {
      let fp = await FP.load({ token: "UCmjTCW278UaQTDLjsMJ", region: "eu" });
      let response = await fp.get({ tag: requestMetadata, callbackData: true });
      return response;
    }

    axios({
      method: "post",
      url: url + "/api/login",
      data: {
        password: password,
        login: username,
        uuid: uuid,
      },
    })
      .then((res) => {
        if (res.data.data.token) {
          setToken(res.data.data.token);
          setAuth({ isOpen: false, type: "" });
          setUsername("");
          setPassword("");
          setUuid(uuid);
          setUserId(uuid);
        }
        return res.data;
      })
      .finally(() => setBtnLoading(false));
    sendInfo(); // я не понял почему это не в then`e но трогать не стал
  };

  const forgetHandler = () => {
    setAuth({ isOpen: false, type: "" });
    setOpenRestore(true);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!btnLoading) {
          login();
        }
      }}
    >
      <div className="auth-modal-inputs-container">
        <div className="input-container flex">
          <div className="input-container-label">
            <span>{i18next.t("Username")}</span>
          </div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="field"
            type="text"
            ref={inputRef}
          />
        </div>
        <div className="input-container password flex">
          <div className="input-container-label">
            <span>{i18next.t("Password")}</span>
          </div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field"
            type={`${showPass ? "text" : "password"}`}
          />
          {showPass ? (
            <EyeHide className="eye" onClick={() => setShowPass(false)} />
          ) : (
            <EyeShow className="eye" onClick={() => setShowPass(true)} />
          )}
        </div>
      </div>

      <div className="remember-me flex">
        <IonItem lines="none">
          <IonCheckbox />
          <IonLabel className="remember-me-label">{i18next.t("Remember Me")}</IonLabel>
        </IonItem>
        <p onClick={forgetHandler} className="forgot-password">
          {i18next.t("Forgot password?")}
        </p>
      </div>

      <button type="submit" className="btn login-btn flex ion-activatable">
        <IonRippleEffect />
        {btnLoading ? <IonSpinner /> : i18next.t("Login")}
      </button>

      {/* <div 
        onClick={() => {
          if (!btnLoading) {
            login()
          }
        }} 
        className="btn login-btn flex ion-activatable"
      >
        <IonRippleEffect />
        {btnLoading ? <IonSpinner /> : i18next.t('Login')}
      </div> */}
    </form>
  );
};

const AuthModal = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [auth, setAuth] = useAtom(authModal);
  const [modalFocus, setModalFocus] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { checkRegister } = useCheckRegister();
  const [registerStep, setRegisterStep] = useState(1);
  const [usId, setUserId] = useAtom(userId);
  const [dataRegisterFinalModal, setDataRegisterFinalModal] = useAtom(registerFinalModal);
  const [promocode, setPromocode] = useAtom(promo);
  const [switchModalForJoin, setSwitchModalForJoin] = useAtom(switchModalForJoinGL);
  const [finalModalReg, setFinalModalReg] = useAtom(FinalModalRegGL);

  // const openFromGiveAways = useMemo(() => props.open, [props.open]);

  // const [openModalFromGw, setOpenModalFromGw] = useState(openFromGiveAways);

  // console.log(openModalFromGw);

  // useEffect(() => {
  //   if (openModalFromGw) {
  //     console.log("11111");
  //     setAuth({ isOpen: true, type: "login" });
  //   }
  // }, [openModalFromGw]);

  useEffect(() => {
    // setAuth({ isOpen: false, type: '' });
    if (location.pathname === "/login") {
      setAuth({ isOpen: true, type: "login" });
    }

    if (location.pathname === "/register") {
      checkRegister();
    }

    // if (location.pathname === '/home') {
    //   closeAll();
    // }
  }, [location.pathname]);

  const handleTelegramResponse = (res) => {
    // console.log(res);
    if (res.id) {
      axios({
        method: "post",
        url: url + "/api/callback/socialite/telegram",
        data: res,
      }).then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAuth({ isOpen: false, type: "" });
          props.setUuid(usId);

          if (res.data.requestLoginEmail) {
            setDataRegisterFinalModal({
              isOpen: true,
              tempToken: res.data.token,
            });
          } else {
            props.setToken(res.data.token);
          }
        } else {
          notify({ message: res.data.error });
        }
      });
    }
  };

  const responseGoogle = (res) => {
    // console.log(res);
    if (res.accessToken) {
      axios({
        method: "post",
        url: url + "/api/callback/socialite/google",
        data: {
          accessToken: res.accessToken,
        },
      }).then((res) => {
        if (res.data.success) {
          if (auth.type == "register") {
            setFinalModalReg(true);
            setDataRegisterFinalModal({
              isOpen: true,
              tempToken: res.data.token,
            });
          }

          setAuth({ isOpen: false, type: "" });
          props.setUuid(usId);

          if (res.data.requestLoginEmail) {
            setDataRegisterFinalModal({
              isOpen: true,
              tempToken: res.data.token,
            });
          } else {
            props.setToken(res.data.token);
          }
        } else {
          notify({ message: res.data.error });
        }
      });
    }
  };

  const responseFacebook = (res) => {
    // console.log(res);
    if (res.accessToken) {
      axios({
        method: "post",
        url: url + "/api/callback/socialite/facebook",
        data: {
          accessToken: res.accessToken,
        },
      }).then((res) => {
        if (res.data.success) {
          setAuth({ isOpen: false, type: "" });
          props.setUuid(usId);

          if (res.data.requestLoginEmail) {
            setDataRegisterFinalModal({
              isOpen: true,
              tempToken: res.data.token,
            });
          } else {
            props.setToken(res.data.token);
          }
        } else {
          notify({ message: res.data.error });
        }
      });
    }
  };

  const toLogin = () => {
    if (location.pathname != "/giveaways") {
      history.push("/login");
    } else {
      setAuth({
        isOpen: true,
        type: "login",
        closeModal: auth?.closeModal,
        successModal: auth?.successModal,
      });
    }
    // setAuth({ isOpen: true, type: 'login' });
  };

  const toRegister = () => {
    // setAuth({ isOpen: true, type: 'register' });

    if (location.pathname != "/giveaways") {
      history.push("/register");
    } else {
      checkRegister();
    }
    // checkRegister();
    setRegisterStep(1);
  };

  const closeAll = () => {
    if (location.pathname == "/giveaways") {
      setAuth({
        isOpen: false,
        type: "",
        closeModal: auth?.closeModal,
        successModal: auth?.successModal,
      });
      setSwitchModalForJoin(0);
      if (!finalModalReg) {
        auth?.closeModal?.();
      }
      // setOpenModalFromGw(false);
      // setModalFocus(false);
      // setAuth({ isOpen: false, type: "" });
      // setShowPass(false);
      // setPromocode("");
      return;
    }

    console.log(props);
    console.log("ffffffffffffffffffffffffffffffffffffffffffffffffffff");

    history.push("/home");
    setModalFocus(false);
    setAuth({ isOpen: false, type: "" });
    setShowPass(false);
    setRegisterStep(1);
    setPromocode("");
    if (props.closeModal) {
      props.closeModal();
    }
  };

  return (
    <>
      {props.token ? (
        <CusIonRouterOutlet cusThis={props.this} />
      ) : (
        <IonModal
          isOpen={auth.isOpen}
          cssClass="auth-modal mod-window auto-height"
          onDidDismiss={closeAll}
          onFocus={() => setModalFocus(true)}
        >
          <div className={`mod-container flex ${auth.type === "login" ? "login" : "register"}`}>
            <div className={`auth-modal-left`}></div>

            <div className={`auth-modal-right flex`}>
              <div className="auth-modal-header flex">
                <div
                  className={`auth-modal-header-btn ${auth.type === "login" ? "active" : ""}`}
                  onClick={toLogin}
                >
                  {i18next.t("Log In")}
                </div>
                <div
                  className={`auth-modal-header-btn ${auth.type === "register" ? "active" : ""}`}
                  onClick={toRegister}
                >
                  {i18next.t("Sign Up")}
                </div>
                <div
                  onClick={() => {
                    if (!finalModalReg) {
                      auth?.closeModal?.();
                    }
                    setAuth({
                      isOpen: false,
                      type: "",
                      closeModal: auth?.closeModal,
                      successModal: auth?.successModal,
                    });
                  }}
                  className="flex absolute-close-modal"
                >
                  <Cross />
                </div>
              </div>
              <div
                className={`auth-modal-body flex ${
                  registerStep === 1 ? "first-step" : "second-step"
                }`}
              >
                {(auth.type === "login" || registerStep === 1) && (
                  <>
                    <div className="auth-modal-socials-container">
                      <div className="auth-modal-socials flex">
                        <span>
                          {auth.type === "login"
                            ? i18next.t("Log In with")
                            : i18next.t("Sign Up with")}{" "}
                        </span>

                        <div className="auth-modal-social-btn light-blue flex" tabIndex="1">
                          <Telegram />
                          <TelegramLoginButton
                            className="tlg-iframe-container"
                            dataOnauth={handleTelegramResponse}
                            botName="RealBingoBetBot"
                          />
                        </div>

                        <GoogleLogin
                          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                          buttonText="Login"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          render={(renderProps) => (
                            <div
                              className="auth-modal-social-btn red flex"
                              onClick={() => {
                                renderProps.onClick();
                              }}
                              tabIndex="2"
                              // disabled={renderProps.disabled}
                            >
                              <Google />
                            </div>
                          )}
                        />

                        <FacebookLogin
                          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                          fields="name,email,picture"
                          callback={responseFacebook}
                          render={(renderProps) => (
                            <div
                              className="auth-modal-social-btn blue flex"
                              onClick={renderProps.onClick}
                              tabIndex="3"
                              // disabled={renderProps.disabled}
                            >
                              <Facebook />
                            </div>
                          )}
                        />
                      </div>
                    </div>
                    <div className="auth-modal-hl-container flex">
                      <span className="line"></span>
                      <span className="auth-modal-hl-label">{i18next.t("or")}</span>
                      <span className="line"></span>
                    </div>
                  </>
                )}

                {auth.type === "login" ? (
                  <LoginModalContent
                    setAuth={setAuth}
                    modalFocus={modalFocus}
                    setToken={props.setToken}
                    setUuid={props.setUuid}
                    isBlack={props.color}
                    width={props.width}
                  />
                ) : (
                  <RegisterModalContent
                    setAuth={setAuth}
                    authIsOpen={auth.isOpen}
                    modalFocus={modalFocus}
                    setRegisterStep={setRegisterStep}
                    registerStep={registerStep}
                    isBlack={props.color}
                    width={props.width}
                    yourParametr={props.yourParametr}
                  />
                )}
              </div>
            </div>
          </div>
        </IonModal>
      )}
    </>
  );
};

export default AuthModal;
