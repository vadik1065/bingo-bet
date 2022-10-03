import React, { useEffect, useState } from 'react';
import { IonModal } from '@ionic/react';
import i18next from "i18next";
import { ReactComponent as Cross } from '../images/cross.svg';
import { ReactComponent as Done } from '../images/done.svg';
import { useAtom } from 'jotai';
import { premiumModal, premiumModalHowToCharge } from '../state';
import { useHistory } from 'react-router';
import { getHLColor, getPlayerStatusIcon, thousandSeparator, аchieves } from '../utils/utils.js';
import bingoCoin from '../images/crypto-logos/bcoin.svg';
import "../css/promo.css";

const PremiumModal = (props) => {
  const history = useHistory();
  const [openModal, setOpenModal] = useAtom(premiumModal);
  const [openPremiumHowToChargeModal, setOpenPremiumHowToChargeModal] = useAtom(premiumModalHowToCharge);
  const [curAchieves, setCurAchieves] = useState([]);

  useEffect(() => {
    setCurAchieves(аchieves.find(a => a.status === props.statusProgress.current_status_id).list);
  }, []);

  const toPremiumHowToChargeModal = () => {
    setOpenModal(false);
    setOpenPremiumHowToChargeModal(true);
  }

  const toLevels = () => {
    history.push('/levels');
    setOpenModal(false);
  }

  return (
    <IonModal 
      isOpen={openModal}
      cssClass='mod-window premium-modal auto-height'
      onDidDismiss={() => setOpenModal(false)}
    >
      <div className="mod-container mod-confirm">
        <div className={`modal-data level-${props.statusProgress.current_status_id - 1}`}>
          <div onClick={() => setOpenModal(false)} className="absolute-close-modal flex">
            <Cross />
          </div>
          <div className="promo-modal-title big-modal-title flex">
            <div className="promo-modal-title-pic">
              <img src={getPlayerStatusIcon(props.statusProgress.current_status_id)} alt="bingoCoin"/>
            </div>
            <div className="promo-modal-title-text">
              {i18next.t("Your Level")}: {props.statusProgress.current_status_id - 1}
            </div>
            <div className="promo-modal-title-info">
              {props.statusProgress.current_status_id === 1 ? 
                <span>{i18next.t("New Player")}</span>
                :
                <>
                  <span>{i18next.t("Wagered")}</span>
                  <img src={bingoCoin} alt="bingoCoin" className="bc-icon"/>
                  <span className="green">
                    {thousandSeparator(props.statusProgress.current_status_points)}
                  </span>
                  <span className="bold">{i18next.t("Coins")}</span>
                </>
              }
            </div>
          </div>

          <div className="promo-modal-аchieves">
            {curAchieves.map(el => 
              <div key={el} className="аchieves-item flex">
                <Done />
                {i18next.t(el)}
              </div>
            )}
          </div>

          <div className="promo-modal-hl">{getHLColor(props.statusProgress.current_status_id)}</div>

          <div className="promo-modal-bottom">
            {props.statusProgress.current_status_id === 1 &&
              <p onClick={toPremiumHowToChargeModal}>
                {i18next.t("How To Charge Coins")}
              </p>
            }
            <p onClick={toLevels}>
              {i18next.t("More About Levels")}
            </p>
          </div>
        </div>
      </div>
    </IonModal>
  )
}

export default PremiumModal;
