import React from 'react';
import { IonModal } from '@ionic/react';
import { ReactComponent as Cross } from '../images/cross.svg';
import { useAtom } from 'jotai';
import { kycModal } from '../state';
import kyc from '../images/kyc.png';
import logo from '../images/logo-link-header.svg';
import { ReactComponent as Instagram } from '../images/socials/instagram.svg';
import { ReactComponent as Facebook } from '../images/socials/facebook.svg';
import { ReactComponent as Twitter } from '../images/socials/twitter.svg';
import { ReactComponent as Telegram } from '../images/socials/telegram.svg';
import { ReactComponent as Twitch } from '../images/socials/twitch.svg';
import { ReactComponent as Youtube } from '../images/socials/youtube.svg';
import { ReactComponent as Tiktok } from '../images/socials/tiktok.svg';
import "../css/promo.css";

const KYCModal = () => {
  const [openModal, setOpenModal] = useAtom(kycModal);

  return (
    <IonModal 
      isOpen={openModal}
      cssClass='mod-window kyc-window auto-height'
      onDidDismiss={() => setOpenModal(false)}
    >
      <div className="mod-container mod-confirm">
        <div className="modal-data">
          <div onClick={() => setOpenModal(false)} className="flex absolute-close-modal">
            <Cross />
          </div>
          <img className="forbidden-modal-logo" src={logo} alt="logo" />
          <p className="forbidden-modal-title">Connection from Restricted Jurisdiction Detected</p>
          <p className="forbidden-modal-description">Due to our igaming license, Bingo.Bet cannot accept players from your region.  Contact us via support@bingo.bet if you require further assistance.</p>
          <div className="footer-container-socials flex">
            <a href="https://www.twitch.tv/bingo_bet" target="_blank" rel="noopener noreferrer">
              <Twitch />
            </a>
            <a href="https://youtube.com/channel/UCQHLc5mnVhhBEWQhMKijgbQ" target="_blank" rel="noopener noreferrer">
              <Youtube />
            </a>
            <a href="https://www.instagram.com/bingo.eu/" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
            <a href="https://www.facebook.com/bingo.eu/" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
            <a href="https://twitter.com/bingo_ai" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href="https://t.me/bb_casino" target="_blank" rel="noopener noreferrer">
              <Telegram />
            </a>
            <a href="https://www.tiktok.com/@bingo_vip" target="_blank" rel="noopener noreferrer">
              <Tiktok />
            </a>
          </div>
        </div>
      </div>
    </IonModal>
  )
}

export default KYCModal;
