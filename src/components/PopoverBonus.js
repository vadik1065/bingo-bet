import { IonPopover } from '@ionic/react';
import React from 'react';
import i18next from "i18next";
import chip from '../images/crypto-logos/bcoin.png';
import bigSafeDark from '../images/bg/big-safe-dark.png';
import bigSafeLight from '../images/bg/big-safe-light.png';

const PopoverBonus = (props) => {
  return (
    <IonPopover
      trigger={`${props.isGamePage ? undefined : 'bonus-popover'}`}
      size="cover"
      cssClass='user-popover bonus-popover'
      // showBackdrop={false}
      // dismissOnSelect={true}
      mode={'md'}
      // event={props.popoverState.event}
      // isOpen={props.popoverState.showPopover}
      // onDidDismiss={() => props.setShowPopover({ showPopover: false, event: undefined })}
      // animated={false}
    >
      <div className={`info-content flex ${props.width < 1600 ? 'column' : ''} ${props.width < 768 ? 'small' : ''}`}>
        <div className="info-content-left">
          <div className="info-content-top-label">
            {i18next.t('Rakeback Bonus Balance')}
          </div>
          <div className="info-content-title">
            {i18next.t('Current Rakeback Balance')}
          </div>
          <div className="info-content-balance-item first flex">
            <div className="info-content-balance-left">
              {i18next.t('Current Rakeback Balance')}
            </div>
            <div className="info-content-balance-right flex">
              <img src={chip} alt="chip" className="bc-icon"/>
              <div className="info-content-value">{props?.balance?.ob_b || 0}</div>
            </div>
          </div>
          <div className="info-content-balance-item second flex">
            <div className="info-content-balance-left">
              {i18next.t('Total Lifetime Bonus')}
            </div>
            <div className="info-content-balance-right flex">
              <img src={chip} alt="chip" className="bc-icon"/>
              <div className="info-content-value">{props?.balance?.ob_b_total || 0}</div>
            </div>
          </div>
          <div className="info-content-balance-item third flex">
            <div className="info-content-balance-left">
              {i18next.t('Lifetime Rakeback Returns')}
            </div>
            <div className="info-content-balance-right flex">
              <img src={chip} alt="chip" className="bc-icon"/>
              <div className="info-content-value">{(props?.balance?.ob_b_total - props?.balance?.ob_b).toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className={`info-content-right bonus`}>
          <img src={props.isDark ? bigSafeDark : bigSafeLight} alt="safe" className="big-safe-img"/>
        </div>
      </div>
    </IonPopover>
  )
}

export default PopoverBonus;
