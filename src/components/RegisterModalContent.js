import docs from "../images/docs.png";
import moment from "moment";

import { Link } from "react-router-dom";
import useInput from "../hooks/useInput.js";
import useFocus from "../hooks/useFocus.js";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  FinalModalRegGL,
  GiveawaysGL,
  kycModal,
  mainLoading,
  promo,
  RequestLinkGL,
  SteamLinkGL,
  userId,
} from "../state";
import axios from "axios";
import url from "../axios";
import { notify } from "../utils/utils";
import i18next from "i18next";

import { ReactComponent as EyeShow } from "../images/eye-show.svg";
import { ReactComponent as EyeHide } from "../images/eye-hide.svg";
import { IonCheckbox, IonItem, IonRippleEffect, IonSelect, IonSelectOption } from "@ionic/react";

const RegisterModalContent = ({
  setAuth,
  authIsOpen,
  setRegisterStep,
  registerStep,
  isBlack,
  modalFocus,
  width,
  yourParametr,
}) => {
  const username = useInput("", { isEmpty: true });
  const password = useInput("", { isEmpty: true });
  const email = useInput("", { isEmpty: true, isEmail: true });
  const [showPass, setShowPass] = useState(false);
  const [openKycModal, setOpenKycModal] = useAtom(kycModal);
  const [usId, setUserId] = useAtom(userId);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [promocode, setPromocode] = useAtom(promo);
  const [customPromo, setCustomPromo] = useState("");
  const [loading, setLoading] = useAtom(mainLoading);
  const [errors, setErrors] = useState("");
  const [errorToast, setErrorToast] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [emailInUse, setEmailInUse] = useState(false);
  const [emailFailure, setEmailFailure] = useState("");
  const [usernameInUse, setUsernameInUse] = useState(false);
  const [usernameFailure, setUsernameFailure] = useState("");
  const [steamlink, setSteamLink] = useAtom(SteamLinkGL);
  const [curSteamLink, setCurSteamLink] = useState("");
  const [requestLinkGiveaways, setRequestLinkGiveaways] = useAtom(RequestLinkGL);
  const [giveaways, setGiveaways] = useAtom(FinalModalRegGL);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [inputRef, setInputFocus] = useFocus();
  const options = {
    cssClass: "auth-select",
    // alignment: 'start'
  };

  useEffect(() => {
    if (modalFocus && width > 1024) {
      setInputFocus();
    }
  }, [modalFocus, width]);

  useEffect(() => {
    if (!authIsOpen) {
      username.setValue("");
      password.setValue("");
      email.setValue("");
      setErrors("");
      setCustomPromo("");
      setDay("");
      setMonth("");
      setYear("");
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setPromocode("");
    }
  }, [authIsOpen]);

  const register = () => {
    checkError([day, month, year, "GB"]);
    checkCheckboxes([checked1, checked2]);

    if (checked1 && checked2) {
      const data = {
        login: username.value,
        password: password.value,
        email: email.value,
        uuid: usId,
        subscription: Number(checked3),
        promo: promocode ? promocode : customPromo,
        birth_date:
          day && month && year
            ? moment(moment(month + "/" + day + "/" + year).format("L")).unix()
            : null,
      };

      if (yourParametr) {
        data.your_parameter = yourParametr;
      }

      setLoading(true);
      setErrors([]);
      axios({
        method: "post",
        url: url + "/api/register",
        data: data,
      })
        .then((res) => {
          localStorage.setItem("token", res.data.data.token);
          window.location.reload();
        })
        .catch((error) => {
          if (error.response.status === 333) {
            // console.log(error.response.data.error);
            setAuth({ isOpen: false, type: "" });
            setOpenKycModal(true);
          } else {
            notify({ message: error.response.data.error });
            // setErrorText(error.response.data.error);
            // setErrorToast(true);
          }
          setRegisterStep(1);
          setLoading(false);
        });
    }
  };

  const checkError = (arr) => {
    setErrors(
      arr.map((el, i) => {
        if (!el) {
          return i + 1;
        }
        return false;
      })
    );
  };

  const checkCheckboxes = (arr) => {
    setBoxes(
      arr.map((el, i) => {
        if (!el) {
          return i + 1;
        }
        return false;
      })
    );
  };

  const checkEmail = () => {
    if (username.value && password.value && email.value && !email.emailError) {
      axios({
        method: "post",
        url: url + "/api/checkemail",
        data: {
          email: email.value,
        },
      })
        .then(() => {
          setUsernameInUse(false);
          axios({
            method: "post",
            url: url + "/api/checkusername",
            data: {
              login: username.value,
            },
          })
            .then(() => {
              setUsernameInUse(false);
              if (!emailInUse && !usernameInUse) {
                // setErrors([]);
                setRegisterStep(2);
              }
            })
            .catch((error) => {
              /*422*/
              notify({ message: error.response.data.error });
              // setUsernameFailure(error.response.data.error);
              setUsernameInUse(true);
            });
        })
        .catch((error) => {
          /*422*/
          notify({ message: error.response.data.error });
          // setEmailFailure(error.response.data.error);
          setEmailInUse(true);
        });
    } else {
      if (!username.value) {
        username.setCheckSubmit(true);
      }
      if (!password.value) {
        password.setCheckSubmit(true);
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

  // const checkNick = () => {
  //   if (username.trim()) {
  //     axios({
  //       method: 'post',
  //       url: url + '/api/checkusername',
  //       data: {
  //         login: username
  //       }
  //     })
  //       .then(res => {
  //         setUsernameInUse(false);
  //       }).catch(error => {
  //         /*422*/
  //         setUsernameFailure(error.response.data.error);
  //         setUsernameInUse(true);
  //       })
  //   }
  // }

  return (
    <>
      {registerStep === 1 && (
        <>
          <div className="auth-modal-inputs-container">
            <div className="input-container flex">
              <div className="input-container-label">
                <span>{i18next.t("Username")}</span>
                <span className="red">*</span>
              </div>
              <input
                value={username.value}
                onChange={(e) => {
                  username.onChange(e);
                  setUsernameInUse(false);
                }}
                onBlur={(e) => username.onBlur(e)}
                className={
                  "field " +
                  (usernameInUse || (username.isEmpty && username.checkSubmit) ? "field-error" : "")
                }
                type="text"
                autoComplete="username"
                ref={inputRef}
              />
              {username.isEmpty && username.checkSubmit && (
                <div className="error-message-block">{i18next.t("Fill the input")}</div>
              )}
            </div>

            <div className="input-container password flex">
              <div className="input-container-label">
                <span>{i18next.t("Password")}</span>
                <span className="red">*</span>
              </div>
              <input
                value={password.value}
                onChange={(e) => password.onChange(e)}
                onBlur={(e) => password.onBlur(e)}
                className={
                  "field " + (password.checkSubmit && password.isEmpty ? "field-error" : "")
                }
                type={`${showPass ? "text" : "password"}`}
                autoComplete="new-password"
              />
              {showPass ? (
                <EyeHide className="eye" onClick={() => setShowPass(false)} />
              ) : (
                <EyeShow className="eye" onClick={() => setShowPass(true)} />
              )}
              {password.isEmpty && password.checkSubmit && (
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
                  onChange={(e) => {
                    setCurSteamLink(e.target.value);
                  }}
                  className={"field "}
                  type="text"
                />
              </div>
            )}

            <div className="input-container flex select">
              <div className="input-container-label">
                <span>{i18next.t("Date of birth")}</span>
              </div>
              <div className="date-container flex">
                <IonItem lines="none" className="ion-item-select">
                  <IonSelect
                    value={day}
                    onIonChange={(e) => setDay(e.detail.value)}
                    interfaceOptions={options}
                    placeholder={i18next.t("Day")}
                    interface={"popover"}
                    mode={"md"}
                    className={"field " + (errors.indexOf(4) !== -1 ? "field-error" : "")}
                  >
                    {Array.from(new Array(31), (val, index) => ++index).map((el, i) => {
                      return (
                        <IonSelectOption key={i} value={el}>
                          {el}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                <IonItem lines="none" className="ion-item-select">
                  <IonSelect
                    value={month}
                    onIonChange={(e) => setMonth(e.detail.value)}
                    interfaceOptions={options}
                    placeholder={i18next.t("Month")}
                    interface={"popover"}
                    mode={"md"}
                    className={"field " + (errors.indexOf(5) !== -1 ? "field-error" : "")}
                  >
                    {months.map((el, i) => {
                      return (
                        <IonSelectOption key={i} value={++i + ""}>
                          {i18next.t(el)}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                <IonItem lines="none" className="ion-item-select">
                  <IonSelect
                    value={year}
                    onIonChange={(e) => setYear(e.detail.value)}
                    interfaceOptions={options}
                    placeholder={i18next.t("Year")}
                    interface={"popover"}
                    mode={"md"}
                    className={"field years " + (errors.indexOf(6) !== -1 ? "field-error" : "")}
                  >
                    {Array.from(
                      new Array(63),
                      (val, index) => new Date().getFullYear() - 17 - index
                    ).map((el, i) => {
                      return (
                        <IonSelectOption key={i} value={el}>
                          {el}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
              </div>
            </div>

            <div className="input-container promo-field flex">
              <div className="input-container-label">
                <span>
                  {i18next.t("Your Promocode")} ({i18next.t("optional")})
                </span>
              </div>
              {promocode && (
                <input
                  disabled
                  value={promocode}
                  onChange={(e) => setPromocode(e.target.value)}
                  // placeholder={i18next.t('Paste your code here')}
                  className="field"
                  type="text"
                />
              )}
              {!promocode && (
                <input
                  value={customPromo}
                  onChange={(e) => setCustomPromo(e.target.value)}
                  // placeholder={i18next.t('Your promo code if you have one')}
                  className="field"
                  type="text"
                />
              )}
            </div>
          </div>

          <div className="modal-buttons flex">
            <div onClick={checkEmail} className="cancel-btn flex ion-activatable">
              <IonRippleEffect />
              <p>{i18next.t("Next")}</p>
            </div>
          </div>
        </>
      )}

      {registerStep === 2 && (
        <>
          <div className="doc-container">
            <img src={docs} alt="docs" />
          </div>

          <div className="policy-checkbox first flex">
            <IonCheckbox
              className={boxes.indexOf(1) !== -1 ? "checkbox-error" : ""}
              value={checked1}
              onIonChange={(e) => setChecked1(e.detail.checked)}
            />
            <span className="require-field">*</span>
            <span className="policy-label">
              {i18next.t("I accept the")}{" "}
              <Link to="/documents/data-protection">{i18next.t("Data Protection Policy")}</Link>,{" "}
              <Link to="/documents/cookie-policy">{i18next.t("Cookie Policy")}</Link>,{" "}
              <Link to="/documents/disclaimer">{i18next.t("Disclaimer")}</Link>,{" "}
              <Link to="/documents/welcome-bonus">
                {i18next.t("Welcome Bonus Terms and Conditions")}
              </Link>
            </span>
          </div>
          <div className="policy-checkbox flex">
            <IonCheckbox
              className={boxes.indexOf(2) !== -1 ? "checkbox-error" : ""}
              value={checked2}
              onIonChange={(e) => setChecked2(e.detail.checked)}
            />
            <span className="require-field">*</span>
            <span className="policy-label">
              {i18next.t("I am of legal age to gamble and I accept the")}{" "}
              <Link to="/documents/terms">{i18next.t("Terms and Conditions")}</Link>,{" "}
              <Link to="/documents/responsible-policy">
                {i18next.t("Responsible Gambling policy")}
              </Link>
              , {i18next.t("Contributions")}, {i18next.t("and")}{" "}
              <Link to="/documents/kyc-policy">{i18next.t("KYC Policy")}</Link>
            </span>
          </div>
          <div className="policy-checkbox flex">
            <IonCheckbox value={checked3} onIonChange={(e) => setChecked3(e.detail.checked)} />
            <span className="policy-label not-require">
              {i18next.t(
                "I want to recieve the latest promotions and exclusive offers from Bingo Bet, and the brands managed by Ridotto entertainment."
              )}
            </span>
          </div>

          <div className="modal-buttons second-step flex">
            <div
              className="cancel-btn flex ion-activatable"
              onClick={() => setRegisterStep((prev) => prev - 1)}
            >
              <p>{i18next.t("Back")}</p>
            </div>
            <div
              onClick={() => {
                register();
                setSteamLink(curSteamLink);
              }}
              className="save-btn flex ion-activatable"
            >
              <IonRippleEffect />
              <p>{i18next.t("Sign up")}</p>
            </div>
          </div>
        </>
      )}

      {/* <IonToast
        cssClass={`toast ${emailInUse ? 'toast-animation-open' : ''}`}
        isOpen={emailInUse}
        onDidDismiss={() => setEmailInUse(false)}
        message={emailFailure}
        duration={3000}
        icon={info}
        buttons={[
          {
            icon: isBlack ? cancelBlack : cancelWhite,
            role: 'cancel',
          }
        ]}
      /> */}

      {/* <IonToast
        cssClass={`toast ${usernameInUse ? 'toast-animation-open' : ''}`}
        isOpen={usernameInUse}
        // onDidDismiss={() => setUsernameInUse(false)}
        message={usernameFailure}
        duration={3000}
        icon={info}
        buttons={[
          {
            icon: isBlack ? cancelBlack : cancelWhite,
            role: 'cancel',
          }
        ]}
      /> */}

      {/* <IonToast
        cssClass={`toast ${errorToast ? 'toast-animation-open' : ''}`}
        isOpen={errorToast}
        onDidDismiss={() => { 
          setEmailInUse(false); 
          setErrorToast(false);
        }}
        message={errorText}
        duration={3000}
        icon={info}
        buttons={[
          {
            icon: isBlack ? cancelBlack : cancelWhite,
            role: 'cancel',
          }
        ]}
      /> */}
    </>
  );
};
export default RegisterModalContent;
