import React from 'react';
import i18next from "i18next";
import useCopyText from '../../hooks/useCopyText';
import affiliateBanner from '../../images/bg/banner-affiliate.png';
import { IonRippleEffect } from '@ionic/react';
import { ReactComponent as Copy } from '../../images/copy.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Overview = (props) => {
  const { isNotSupportCopyText, copyText } = useCopyText();

  return (
    <div className="balance-fields-container affiliate-fields-container">
      <div className="balance-title affiliate-title">{i18next.t('Overview')}</div>
      <div className="affiliate-content small">
        <div className="affiliate-iframe-container">
          <LazyLoadImage
            alt="affiliate"
            effect="blur"
            src={affiliateBanner}
          />
        </div>
        <p className="no-opacity">
          {i18next.t('Bingo.bet offers an exciting affiliate program for its users! When promoting our services to others through our referral system, you will receive commission rewards from every user that registers and plays on the site from your invite link!')}
        </p>
        {props.promo_url && props.promo_url !== null &&
          <>
            <p className="refferal-link-label">
              {i18next.t('Referral link')}
            </p>
            <div 
              onClick={() => {
                if (!isNotSupportCopyText) {
                  copyText(props.promo_url);
                }
              }}
              className={`refferal-link-field ${!isNotSupportCopyText ? 'ion-activatable' : ''}`}
            >
              <IonRippleEffect />
              <span>{props.promo_url}</span>
              {!isNotSupportCopyText && <Copy />}
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Overview;
