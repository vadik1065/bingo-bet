import { IonPopover } from '@ionic/react';
import React from 'react';
import i18next from "i18next";
import freespin from '../images/freespin.png';
import slotMachineDark from '../images/bg/slot-machine-dark.png';
import slotMachineLight from '../images/bg/slot-machine-light.png';

const PopoverFreeSpins = (props) => {
  return (
    <IonPopover
      trigger={`${props.isGamePage ? undefined : 'freespin-popover'}`}
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
            {i18next.t('Spins')}
          </div>
          <div className="info-content-title">
            {i18next.t('Bonus Free Spins')}
          </div>
          <div className="info-content-balance-item first flex">
            <div className="info-content-balance-left">
              {i18next.t('Current Free Spins')}
            </div>
            <div className="info-content-balance-right flex">
              <img src={freespin} alt="freespin" className="freespin"/>
              <div className="info-content-value">{props?.balance?.ob_fs || 0}</div>
            </div>
          </div>
          <div className="info-content-balance-item second flex">
            <div className="info-content-balance-left">
              {i18next.t('Total Lifetime Free Spins')}
            </div>
            <div className="info-content-balance-right flex">
              <img src={freespin} alt="freespin" className="freespin"/>
              <div className="info-content-value">{props?.balance?.ob_fs_total || 0}</div>
            </div>
          </div>
          <div className="info-content-balance-item third flex">
            <div className="info-content-balance-left">
              {i18next.t('Lifetime Free Spins Used')}
            </div>
            <div className="info-content-balance-right flex">
              <img src={freespin} alt="freespin" className="freespin"/>
              <div className="info-content-value">{props?.balance?.ob_fs_total - props?.balance?.ob_fs}</div>
            </div>
          </div>
        </div>
        <div className={`info-content-right spins`}>
          <img src={props.isDark ? slotMachineDark : slotMachineLight} alt="slot machine" className="slot-machine" />
        </div>
      </div>
    </IonPopover>
  )
}

export default PopoverFreeSpins;
