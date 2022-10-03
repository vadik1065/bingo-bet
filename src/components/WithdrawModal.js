import React, { useState } from 'react';
import { IonModal, IonRippleEffect } from '@ionic/react';
import i18next from "i18next";
import { ReactComponent as Cross } from '../images/cross.svg';

const WithdrawModal = (props) => {
  function clean() {
    props.setIsOpen(false);
    props.setConfirmCode('');
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
          <div className="promo-modal-title">{i18next.t('Withdrawal')}</div>
          
          <form 
            className="promo-modal-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (props.confirmCode) {
                props.withdrawMoney();
              }
            }}
          >
            <div className="input-container">
              <span>{i18next.t('Confirmation code')}</span>
              <input 
                value={props.confirmCode} 
                onChange={(e) => props.setConfirmCode(e.target.value)} 
                placeholder={i18next.t('Enter the confirmation code sent to your email')}
                className='field' 
                type="text" 
              />
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
                className={`save-btn ${props.confirmCode ? 'ion-activatable' : 'disabled'}`}
                type="submit"
              >
                <IonRippleEffect/>
                {i18next.t('Withdrawal')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </IonModal>
  )
}

export default WithdrawModal;
