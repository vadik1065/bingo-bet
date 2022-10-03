import React from "react";
import { IonModal, IonRippleEffect } from "@ionic/react";
import i18next from "i18next";
import { ReactComponent as Cross } from "../images/cross.svg";
import { ReactComponent as CashbackArrow } from "../images/cashback-arrow.svg";
import { useAtom } from "jotai";
import { cashbackSuccessModal } from "../state";
import "../css/promo.css";
import { bcIcon } from "../utils/utils";

const CashbackSuccessModal = () => {
  const [modal, setModal] = useAtom(cashbackSuccessModal);

  const closeModal = () => {
    setModal({
      isOpen: false,
      cashback: null,
    });
  };

  return (
    <IonModal
      isOpen={modal.isOpen}
      cssClass="mod-window cashback-success-modal auto-height"
      onDidDismiss={closeModal}
    >
      <div className="mod-container mod-confirm">
        <div className="modal-data">
          <div onClick={closeModal} className="flex absolute-close-modal">
            <Cross />
          </div>
          <div className="cashback-success-modal-content flex">
            <div className="cashback-success-modal-left flex">
              <CashbackArrow />
              <div className="cashback-amount">
                <div className="cashback-amount-top flex">
                  {bcIcon} {modal.cashback}
                </div>
                <div className="cashback-amount-bottom">
                  {i18next.t("Your Cashback")}
                </div>
              </div>
            </div>
            <div className="cashback-success-modal-right flex">
              <div className="promo-modal-title">
                {i18next.t("Congratulations!")}
              </div>
              <div className="promo-modal-text">
                {i18next.t(
                  "You have claimed your Cashback. Your Bonus will be added to the Main Balance."
                )}
              </div>
              <div className="promo-modal-form-buttons flex">
                <button
                  onClick={closeModal}
                  className="save-btn ion-activatable"
                >
                  <IonRippleEffect />
                  {i18next.t("receive")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonModal>
  );
};

export default CashbackSuccessModal;
