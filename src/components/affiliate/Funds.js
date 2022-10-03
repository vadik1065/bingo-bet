import React, { useState } from "react";
import i18next from "i18next";
import axios from "axios";
import url from "../../axios";
import { IonSpinner } from "@ionic/react";
import { notify, thousandSeparator } from "../../utils/utils";
import moment from "moment";
import chip from "../../images/crypto-logos/bcoin.png";
import info from "../../images/info.png";

const TableDesktop = ({ funds }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>{i18next.t("Available")}</th>
          <th>{i18next.t("Total Commission")}</th>
          <th>{i18next.t("Withdrawn")}</th>
        </tr>
      </thead>
      <tbody>
        <tr className={"colored"}>
          <td className="address-title">
            <div className="flex center">
              <span>{thousandSeparator(funds.available)}</span>
              <img src={chip} alt="chip" className="chip-icon" />
            </div>
          </td>
          <td className="address-title">
            <div className="flex center">
              <span>{thousandSeparator(funds.total_commission)}</span>
              <img src={chip} alt="chip" className="chip-icon" />
            </div>
          </td>
          <td className="address-title">
            <div className="flex center">
              <span>{thousandSeparator(funds.withdrawn)}</span>
              <img src={chip} alt="chip" className="chip-icon" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const TableMobile = ({ funds }) => {
  return (
    <div className="table-adaptive">
      <div className="table-adaptive-row center">
        <div className="table-adaptive-row-item">
          <div className="table-adaptive-row-item-value flex center">
            {thousandSeparator(funds.available)}
            <img src={chip} alt="chip" className="chip-icon" />
          </div>
          <div className="table-adaptive-row-item-title">
            {i18next.t("Available")}
          </div>
        </div>
      </div>
      <div className="table-adaptive-row center">
        <div className="table-adaptive-row-item">
          <div className="table-adaptive-row-item-value flex center">
            {thousandSeparator(funds.total_commission)}
            <img src={chip} alt="chip" className="chip-icon" />
          </div>
          <div className="table-adaptive-row-item-title">
            {i18next.t("Total Commission")}
          </div>
        </div>
      </div>
      <div className="table-adaptive-row center">
        <div className="table-adaptive-row-item">
          <div className="table-adaptive-row-item-value flex center">
            {thousandSeparator(funds.withdrawn)}
            <img src={chip} alt="chip" className="chip-icon" />
          </div>
          <div className="table-adaptive-row-item-title">
            {i18next.t("Withdrawn")}
          </div>
        </div>
      </div>
    </div>
  );
};

const Funds = (props) => {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [disableBtn, setDisableBtn] = useState(false);

  const withdrawReferralCommission = () => {
    setDisableBtn(true);
    if (!!props.funds.enable_button_withdraw && !loadingBtn) {
      setLoadingBtn(true);
      axios({
        method: "post",
        url: url + "/api/withdraw-referral-commission",
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        data: {
          summa_commission: props.funds.available,
        },
      })
        .then((res) => {
          if (res.data.status === 1) {
            props.updateUser(props.token);
            props.getFunds();
            notify({
              message: i18next.t("Success"),
              description: i18next.t(
                "Funds have been successfully credited to your balance."
              ),
              icon: "success",
            });
          }
        })
        .catch((error) => console.log(error.response.data))
        .finally(() => setLoadingBtn(false));
    }
  };

  return (
    <div className="balance-fields-container affiliate-fields-container">
      <div className="balance-title affiliate-title">{i18next.t("Funds")}</div>
      {props.loading ? (
        <IonSpinner className="spinner-loader center" name="lines" />
      ) : (
        <>
          <div className="affiliate-content-top funds-content-top flex">
            <button
              disabled={disableBtn}
              className={`funds-withdraw-btn cancel-btn ${
                !!props.funds.enable_button_withdraw && !disableBtn
                  ? ""
                  : "disabled"
              }`}
              onClick={withdrawReferralCommission}
            >
              <p>
                {loadingBtn ? <IonSpinner /> : i18next.t("Request Commission")}
              </p>
            </button>

            <div className="section-info-message flex">
              <img src={info} alt="info" />
              <div className="section-info-message-text">
                <p>
                  {i18next.t("Referral commission available")}:{" "}
                  {i18next.t("1st-6th of every month")}
                </p>
                {props.funds.date_start_next_withdrawn && (
                  <p>
                    {i18next.t("Next commission request")}:{" "}
                    {moment
                      .utc(props.funds.date_start_next_withdrawn, "YYYY-MM-DD")
                      .local()
                      .fromNow(true)}
                  </p>
                )}
                {!props.funds.date_start_next_withdrawn && (
                  <p>{i18next.t("Claim now!")}</p>
                )}
              </div>
            </div>

            {props.funds.date_end_current_withdrawn && (
              <div className="section-message">
                <p className="section-message-normal-text">
                  {i18next.t("Claim this month’s affiliate cash-out until")}
                </p>
                <p className="section-message-big-text">
                  {moment
                    .utc(props.funds.date_end_current_withdrawn, "YYYY-MM-DD")
                    .local()
                    .fromNow(true)}
                </p>
              </div>
            )}
          </div>

          {props.funds.available && (
            <div className="account-table affiliate-table">
              {props.width > 767 ? (
                <TableDesktop funds={props.funds} />
              ) : (
                <TableMobile funds={props.funds} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Funds;
