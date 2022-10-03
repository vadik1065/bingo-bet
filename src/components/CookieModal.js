import React from "react";
import { IonModal } from "@ionic/react";
import "../css/cookie.css";
import { Link } from "react-router-dom";
import i18next from "i18next";
const CookieModal = (props) => {
  /*eslint-disable*/
  function setCookies() {
    props.setIsOpen(false);
    localStorage.setItem("cookie", "accepted");
  }
  return (
    <IonModal
      isOpen={props.isOpen}
      cssClass="mod-window cookie-window"
      backdropDismiss={false}
    >
      <div className="mod-confirm-wrapper">
        <div className="mod-container mod-confirm">
          <div className="modal-data">
            <div
              className="flex absolute-close-modal"
              onClick={(e) => props.setIsOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.21321 7.78061L12.715 13.2839L13.7834 12.2171L8.28008 6.71375L13.7834 1.21193L12.7165 0.143555L7.21321 5.64688L1.7114 0.143555L0.644531 1.21193L6.14635 6.71375L0.644531 12.2156L1.7114 13.2839L7.21321 7.78061Z"
                ></path>
              </svg>
            </div>
            <p className="modal-title">{i18next.t("Accepting Rules")}</p>
            <p className="modal-description">
              {i18next.t("Confirm your age & rules")}
            </p>
            <div className="modal-content">
              {i18next.t("By entering the site, you accept our")}{" "}
              <Link to="/documents/data-protection">
                {i18next.t("Data Protection Policy")}
              </Link>
              ,{" "}
              <Link to="/documents/cookie-policy">
                {i18next.t("Cookie Policy")}
              </Link>{" "}
              {i18next.t("and")}{" "}
              <Link to="/documents/disclaimer">{i18next.t("Disclaimer")}</Link>{" "}
              {i18next.t("and confirm you are at least 18 years of age.")}
            </div>
            <div
              onClick={() => setCookies()}
              className="btn flex ion-activatable"
            >
              {i18next.t("Accept")}
            </div>
          </div>
        </div>
      </div>
    </IonModal>
  );
};

export default CookieModal;
