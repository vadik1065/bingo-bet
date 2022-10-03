import React from 'react';
import { IonModal, IonRippleEffect } from '@ionic/react';
import i18next from "i18next";
import { ReactComponent as Cross } from '../../images/cross.svg';
import { useAtom } from 'jotai';
import { liveChatRulesModal } from '../../state';
import "../../css/promo.css";

const LiveChatRulesModal = () => {
  const [modal, setModal] = useAtom(liveChatRulesModal);

  const closeModal = () => {
    setModal(false)
  }

  return (
    <IonModal 
      isOpen={modal}
      cssClass='mod-window premium-modal how-to-charge-modal live-chat-rules-modal auto-height'
      onDidDismiss={closeModal}
    >
      <div className="mod-container mod-confirm">
        <div className="modal-data">
          <div className="modal-header flex">
            {i18next.t('Rules')}
            <div onClick={closeModal} className="absolute-close-modal flex">
              <Cross />
            </div>
          </div>

          <div className="modal-body flex">
            <div className={`modal-block flex`}>
              <div className="promo-modal-title">
                🔴 {i18next.t('No offensive language or racism')}
              </div>
              <div className="promo-modal-text">
                ✍️ {i18next.t('200 characters max message')}
              </div>
              <div className="promo-modal-text">
                🔗 {i18next.t('No links')}
              </div>
              <div className="promo-modal-text">
                🎁 {i18next.t('No self advertising promo code')}
              </div>
              <div className="promo-modal-text">
                🕘 {i18next.t('No spam (5sec cooldown between messages)')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonModal>
  )
}

export default LiveChatRulesModal;
