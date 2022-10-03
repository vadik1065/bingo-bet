import React from 'react';
import { IonModal, IonRippleEffect, IonSpinner } from '@ionic/react';
import i18next from "i18next";
import useActivatePromo from '../hooks/useActivatePromo.js';
import { ReactComponent as Cross } from '../images/cross.svg';
import "../css/promo.css";

const PromoModal = (props) => {
  const { promo, setPromo, activatePromo, error, loadingActivatePromo, setConfirmRequest, confirmRequest } = useActivatePromo({
    token: props?.token,
    updateUser: props?.updateUser,
    setPromoModal: props?.setIsOpen
  });

  function clean() {
    props.setIsOpen(false);
    setPromo('');
    setConfirmRequest(false);
  }

  return (
    <IonModal 
      isOpen={props.isOpen}
      cssClass='mod-window promo-window'
      onDidDismiss={() => clean()}
    >
      <div className="mod-container mod-confirm">
        <div className="modal-data">
          <div onClick={() => props.setIsOpen(false)} className="flex absolute-close-modal">
            <Cross />
          </div>
          <div className="promo-modal-label">Bingo.Bet</div>
          <div className="promo-modal-title">{i18next.t('Referral program')}</div>
          
          {confirmRequest 
            ?
            <>
              <div className="promo-modal-text">
                <p>{i18next.t('You have already activated another user as your partner!')}</p>
                <p>{i18next.t('Are you sure you would like to switch to another one and cancel your current partner?')}</p>
              </div>
              <div className="promo-modal-form-buttons flex">
                <button 
                  onClick={() => props.setIsOpen(false)}
                  className="cancel-btn ion-activatable"
                >
                  <IonRippleEffect/>
                  {i18next.t('Cancel')}
                </button>
                <button 
                  onClick={(e) => activatePromo(e, true)}
                  className="save-btn ion-activatable"
                >
                  <IonRippleEffect/>
                  {loadingActivatePromo ? <IonSpinner /> : 'Switch Affiliate'}
                </button>
              </div>
            </>
            :
            <form 
              className="promo-modal-form"
              onSubmit={(e) => activatePromo(e)}
            >
              <div className="input-container">
                <span>{i18next.t('Promo code')}</span>
                <input 
                  value={promo} 
                  onChange={(e) => setPromo(e.target.value)} 
                  placeholder={i18next.t('Enter your promo code')}
                  className='field' 
                  type="text" 
                />
                {error && <div className="error-message">{error}</div>}
              </div>
              <div className="promo-modal-form-buttons flex">
                <button 
                  onClick={() => props.setIsOpen(false)}
                  className="cancel-btn ion-activatable" 
                  type="button"
                >
                  <IonRippleEffect/>
                  {i18next.t('Cancel')}
                </button>
                <button 
                  className="save-btn ion-activatable"
                  type="submit"
                >
                  <IonRippleEffect/>
                  {loadingActivatePromo ? <IonSpinner /> : i18next.t('Claim')}
                </button>
              </div>
            </form>
          }
        </div>
      </div>
    </IonModal>
  )
}

export default PromoModal;
