import { IonToast } from "@ionic/react";
import axios from "axios";
import i18next from "i18next";
import { useAtom } from "jotai";
import moment from "moment";
import { useMemo, useState } from "react";
import url from "../../../axios";
import { cashbackSuccessModal } from "../../../state";
import "../../../css/media.css";

const ClaimInfo = (props) => {
  const cashbackInfo = useMemo(() => props.cashbackInfo, [props.cashbackInfo]);

  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const cashbackInfo = props.cashbackInfo;

  const [openСashbackSuccessModal, setOpenСashbackSuccessModal] =
    useAtom(cashbackSuccessModal);

  function withdrawCashback() {
    axios({
      method: "post",
      url: url + "/api/withdraw-cashback",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      data: {
        summa_сashback: cashbackInfo.summa_cashback,
      },
    })
      .then((res) => {
        if (res.data.status === 1) {
          setOpenСashbackSuccessModal({
            isOpen: true,
            cashback: cashbackInfo.summa_cashback,
          });
          props.getCashbackInfo();
          props.updateUser(props.token);
        }
      })
      .catch((error) => {
        let msg = error?.response?.data?.error || "error";
        setErrorMessage(msg);
        setLoginError(true);
        console.log(error?.response?.data?.error);
      });
  }

  return (
    <>
      <div className="bonus-description-text-bottom flex">
        <button
          onClick={() => {
            if (!!cashbackInfo.enable_button) {
              withdrawCashback();
            }
          }}
          className={`save-btn ${
            !!cashbackInfo.enable_button ? "" : "disabled"
          }`}
        >
          <p>{i18next.t("Claim Cashback")}</p>
        </button>
        {cashbackInfo?.next_cashback && (
          <p className="pale">
            {i18next.t("Next Cashback")}{" "}
            {moment
              .utc(cashbackInfo.next_cashback, "YYYY-MM-DD")
              .local()
              .fromNow()}
          </p>
        )}
      </div>
      {cashbackInfo?.date_left && (
        <div className="bonus-description-alert-container flex">
          <span className="bonus-description-alert-container-top">
            {i18next.t("Claim this month’s cashback until")}
          </span>
          <span className="bonus-description-alert-container-bottom">
            {moment
              .utc(cashbackInfo.date_left, "YYYY-MM-DD HH:mm:ss")
              .local()
              .fromNow(true)}
            {/* {getMoment(props.lang).utc(cashbackInfo.date_left, 'YYYY-MM-DD HH:mm:ss').local().fromNow(true)} */}
          </span>
        </div>
      )}
      {loginError && (
        <IonToast
          isOpen={loginError}
          onDidDismiss={() => setLoginError(false)}
          message={errorMessage}
          className="toast"
          color="danger"
          duration={5000}
        />
      )}
    </>
  );
};

export default ClaimInfo;
