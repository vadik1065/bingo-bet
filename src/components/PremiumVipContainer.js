import React, { useEffect, useState } from 'react';
import i18next from "i18next";
import { useIonViewWillLeave } from '@ionic/react';
import { getPlayerStatusIcon, getPromoVipRankClass } from '../utils/utils';
import { useHistory, useLocation } from 'react-router';
import { useAtom } from 'jotai';
import { playerInfoModal, premiumModal, premiumModalHowToCharge } from '../state';
import bingoCoin from '../images/crypto-logos/bcoin.png';
import bg from '../images/unknown.png';
import { ReactComponent as Info } from '../images/info-icon.svg';
import ProgressBar from './ui/ProgressBar';

const PremiumVipContainer = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [openPremiumLevelModal, setOpenPremiumLevelModal] = useAtom(premiumModal);
  const [openPremiumHowToChargeModal, setOpenPremiumHowToChargeModal] = useAtom(premiumModalHowToCharge);
  const [openPlayerInfoModal, setOpenPlayerInfoModal] = useAtom(playerInfoModal);
  const [progress, setProgress] = useState(0);
  const [progressNum, setProgressNum] = useState(0);

  useIonViewWillLeave(() => {
    setProgress(0);
    setProgressNum(0);
  });

  useEffect(() => {
    if (location.pathname === '/home' || location.pathname === '/levels') {
      let percentage = 0;
      const interval = setInterval(() => {
        percentage += props.statusProgress.percent_next / 10;
        if (percentage.toFixed(3) > +props.statusProgress.percent_next) {
          clearInterval(interval);
        } else {
          setProgressNum(percentage.toFixed(2));
        }
      }, 1000 / 25);
    }
  }, [location.pathname])

  return (
    <div 
      className={`premium-vip-container flex ${location.pathname === '/home' ? 'home-page' : ''} level-${props.statusProgress.current_status_id - 1}`}
    >
      {props.width >= 767 && 
        <div className={getPromoVipRankClass(props.statusProgress.current_status_id - 1)}>
          <div className="promo-vip-rank-pic">
            <img src={getPlayerStatusIcon(props.statusProgress.current_status_id)} alt="bingoCoin"/>
          </div>
          <div className="promo-vip-rank-label flex">
            {/* {i18next.t(props.statusProgress.current_status_name)} */}
            {i18next.t("Level")} {props.statusProgress.current_status_id - 1}
            <Info 
              className="info-icon" 
              onClick={() => setOpenPremiumLevelModal(true)}
            />
          </div>
        </div>
      }
      <div className="premium-vip-content premium">
        {props.width >= 767 && 
          <div 
            className="premium-vip-content-top flex"
            onClick={() => setOpenPlayerInfoModal(true)}
          >
            <div 
              className='userpic'
              style={{backgroundImage: props.avatar === null ? `url(${bg})` : `url(${props.avatar})`}}
            ></div>
            <p className="premium-vip-title">{i18next.t("Welcome back")}, {props.name}!</p>
          </div>
        }

        {props.width < 767 && 
          <div className='mobile-wrapper-premium-vip-content-top flex'>
            <div 
              className="premium-vip-content-top flex"
              onClick={() => setOpenPlayerInfoModal(true)}
            >
              <div 
                className='userpic'
                style={props.avatar === null ? {backgroundImage: `url(${bg})`} : {backgroundImage: `url(${props.avatar})`}}
              ></div>
              <p className="premium-vip-title">{i18next.t("Welcome back")}, {props.name}!</p>
            </div>
            <div className={getPromoVipRankClass(props.statusProgress.current_status_id - 1)}>
              <div className="promo-vip-rank-pic">
                <img src={getPlayerStatusIcon(props.statusProgress.current_status_id)} alt="bingoCoin"/>
              </div>
              <div className="promo-vip-rank-label flex">
                {i18next.t("Level")} {props.statusProgress.current_status_id - 1}
                <Info 
                  className="info-icon" 
                  onClick={() => setOpenPremiumLevelModal(true)}
                />
              </div>
            </div>
          </div>
        }
        <div className="premium-vip-progress-container flex">
          {props.statusProgress.next_status_id !== null &&
            <>
              {/* <div className="premium-vip-progress-top flex">
                <span>{i18next.t("Your Progress")}</span>
                <span className={`percent`}>
                  {props.statusProgress.percent_next}%
                </span>
              </div> */}

              <ProgressBar 
                completed={progressNum} 
                bgcolor={"#6a1b9a"}
              >
                <div className="premium-vip-progress-top flex">
                  <span>{i18next.t("Your Progress")}</span>
                  <span className={`percent`}>
                    {progressNum}%
                  </span>
                </div>
              </ProgressBar>

              {/* <IonProgressBar
                mode="ios"
                className={`premium-vip-progress-bar`} 
                value={progress}
                // value={props.statusProgress.percent_next / 100}
              ></IonProgressBar> */}

              <div className="premium-vip-progress-center">
                <div className="premium-vip-progress-center-item flex">  
                  <img src={bingoCoin} alt="bingoCoin" className="bc-icon"/>            
                  <span className="green">
                    {(props.statusProgress.next_status_points - props.statusProgress.current_points).toFixed(2)}
                  </span>
                  <span className="bold">{i18next.t("Coins for Level")} {props.statusProgress.next_status_id - 1}</span>
                </div>
              </div>
            </>
          }
          {props.statusProgress.next_status_id === null && 
            <div className="premium-vip-progress-top greetings flex">
              <span className={`percent`}>{i18next.t("Congratulations!")}</span>
              <span className={`percent`}>{i18next.t("You are achieving Level")} 6!</span>
            </div>
          }

          <div className="premium-vip-progress-bottom flex">
            {props.statusProgress.next_status_id !== null &&
              <>
                <div 
                  onClick={() => setOpenPremiumHowToChargeModal(true)}
                  className="premium-vip-progress-bottom-item flex"
                >
                  <span className="premium-vip-progress-bottom-item-link">
                    {i18next.t("How To Charge Coins")}
                  </span>
                </div>
                <div 
                  onClick={() => history.push('/levels')}
                  className="premium-vip-progress-bottom-item flex"
                >
                  <span className="premium-vip-progress-bottom-item-link">
                    {i18next.t("More About Levels")}
                  </span>
                </div>
              </>
            }
            {props.statusProgress.next_status_id === null &&
              <div 
                onClick={() => setOpenPremiumLevelModal(true)}
                className="premium-vip-progress-bottom-item flex"
              >
                <span className="premium-vip-progress-bottom-item-link">{i18next.t("See Your Benefits")}</span>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="premium-vip-bg-image"></div>
    </div>
  )
}

export default PremiumVipContainer;
