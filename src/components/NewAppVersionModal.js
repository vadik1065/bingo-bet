import React from 'react';
import { IonModal } from '@ionic/react';
import i18next from "i18next";
import { ReactComponent as Cross } from '../images/cross.svg';
import logo from '../images/logo-link-header.svg';
import "../css/promo.css";

const NewAppVersionModal = ({ isOpen, setOpen }) => {
  return (
    <IonModal 
      isOpen={isOpen}
      cssClass='mod-window kyc-window auto-height'
      onDidDismiss={() => setOpen(false)}
    >
      <div className="mod-container mod-confirm">
        <div className="modal-data">
          <div 
            onClick={() => setOpen(false)} 
            className="flex absolute-close-modal"
          >
            <Cross />
          </div>
          <img className="forbidden-modal-logo" src={logo} alt="logo" />
          <p className="forbidden-modal-title">{i18next.t('New version of the Bingo.Bet app is available')}</p>
          <a 
            onClick={() => setOpen(false)}
            className="update-link" 
            href="https://bingo.bet/assets/Bingo-bet.apk" 
            download 
            rel="noreferrer"
          >
            {i18next.t('Update')}
          </a>
        </div>
      </div>
    </IonModal>
  )
}

export default NewAppVersionModal;
