import React from 'react';
import { IonModal, IonRippleEffect } from '@ionic/react';
import i18next from "i18next";
import { ReactComponent as Cross } from '../images/cross.svg';
import { useAtom } from 'jotai';
import { bountySuccessModal } from '../state';
import "../css/promo.css";

const BountySuccessModal = () => {
  const [modal, setModal] = useAtom(bountySuccessModal);

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      cashout: null
    })
  }

  return (
    <IonModal 
      isOpen={modal.isOpen}
      cssClass='mod-window cashback-success-modal auto-height'
      onDidDismiss={closeModal}
    >
      <div className="mod-container mod-confirm">
        <div className="modal-data">
          <div onClick={closeModal} className="flex absolute-close-modal">
            <Cross />
          </div>
          <div className="promo-modal-label">{i18next.t('Cashback')}</div>
          <div className="promo-modal-title">{i18next.t('Congratulations!')}</div>
          <div className="promo-modal-text">
            {i18next.t('You have reached the')} {modal.type} {i18next.t('and earned')} {modal.cashout} {i18next.t('cashout reward.')}
          </div>
          <div className="promo-modal-form-buttons flex">
            <button 
              onClick={closeModal} 
              className="save-btn ion-activatable"
            >
              <IonRippleEffect />
              {i18next.t('Close')}
            </button>
          </div>
        </div>
      </div>
    </IonModal>
  )
}

export default BountySuccessModal;
