import React from 'react';
import { IonModal } from '@ionic/react';
import i18next from "i18next";
import { ReactComponent as Cross } from '../images/cross.svg';
import logo from '../images/logo-link-header.svg';
import "../css/forbidden.css";

const ForbiddenModal = (props) => {
  return (
    <IonModal 
      isOpen={props.isOpen}
      cssClass='mod-window forbidden-window'
      onDidDismiss={() => props.setIsOpen(false)}
    >
      <div className="mod-container mod-confirm">
        <div className="modal-data">
          <div onClick={() => props.setIsOpen(false)} className="flex absolute-close-modal">
            <Cross />
          </div>
          <img className="forbidden-modal-logo" src={logo} alt="logo" />
          <p className="forbidden-modal-title">{i18next.t("Some games are not available in your country")}</p>
          <p className="forbidden-modal-description">{i18next.t("If you're using a proxy service or VPN to access bingo.bet, try to load your VPN from one of our supported countries and reload the page.")}</p>
        </div>
      </div>
    </IonModal>
  )
}

export default ForbiddenModal;
