import React from 'react';
import { IonModal } from '@ionic/react';
import i18next from "i18next";
import { ReactComponent as Cross } from '../images/cross.svg';
import { useAtom } from 'jotai';
import { premiumModalHowToCharge } from '../state';
import PremiumModalHowToChargeBody from './premium-modal-how-to-charge/PremiumModalHowToChargeBody.js';
import "../css/promo.css";

const PremiumModalHowToCharge = ({ currency, token, balance, updateUser, width }) => {
  const [openModal, setOpenModal] = useAtom(premiumModalHowToCharge);

  return (
    <IonModal 
      isOpen={openModal}
      cssClass='mod-window premium-modal how-to-charge-modal auto-height'
      onDidDismiss={() => setOpenModal(false)}
    >
      <div className="mod-container mod-confirm">
        <div className={`modal-data`}>
          <div className="modal-header flex">
            🤔 {i18next.t("How it Works")}
            <div onClick={() => setOpenModal(false)} className="absolute-close-modal flex">
              <Cross />
            </div>
          </div>

          <PremiumModalHowToChargeBody 
            width={width}
            currency={currency}
            token={token}
            balance={balance}
            updateUser={updateUser}
            setOpenModal={setOpenModal}       
          />
        </div>
      </div>
    </IonModal>
  )
}

export default PremiumModalHowToCharge;
