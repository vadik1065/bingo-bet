import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import PremiumModalHowToChargeBody from '../components/premium-modal-how-to-charge/PremiumModalHowToChargeBody.js';
import Footer from '../components/Footer.js';
import i18next from "i18next";
import { getPlayerStatusIcon, thousandSeparator, аchieves } from '../utils/utils.js';
import oval from '../images/bg/levels/oval.svg';
import flash from '../images/flash.png';
import gift from '../images/gift.png';
import crown from '../images/crown.png';
import { ReactComponent as Done } from '../images/done.svg';
import bingoCoin from '../images/crypto-logos/bcoin.svg';
import '../css/levels.css';

SwiperCore.use([Navigation]);

const Levels = ({ data, currency, token, balance, updateUser, width, statusProgress }) => {
  const location = useLocation();
  const ovalTextRef = useRef(null);

  return (
    <IonPage >
      <IonContent className={"page"}>
        {location.pathname === '/levels' && 
          <div className="homepage levels-page flex">
            <div className="width-container">
              <div className="levels-main-info-container">
                {width > 767 && 
                  <>
                    <div className="small-ring-bg"></div>
                    <div className="big-ring-bg"></div>
                  </>
                }

                <div className="levels-main-info-container-title">
                  {i18next.t('Advance your Premium Level and Receive Incredible')} <span className="oval-text" ref={ovalTextRef}>{i18next.t('Rewards!')} <img src={oval} alt="oval" style={{ minWidth: ovalTextRef && ovalTextRef.current && ovalTextRef.current.offsetWidth * 1.14 }} /></span>
                </div>

                <div className="levels-main-info-container-body">
                  <div className="levels-main-info-container-body-item flex">
                    <img src={flash} alt="flash" className="body-item-image" />
                    <div className="body-item-labels">
                      <div className="body-item-title">
                        {i18next.t('Personalised Promotions')}
                      </div>
                      <div className="body-item-description">
                        {i18next.t('Receive exclusive bonus offers, monthly rewards and take part in giveaways as you level up!')}
                      </div>
                    </div>
                  </div>
                  <div className="levels-main-info-container-body-item flex">
                    <img src={gift} alt="gift" className="body-item-image" />
                    <div className="body-item-labels">
                      <div className="body-item-title">
                        {i18next.t('Endless Bonuses')}
                      </div>
                      <div className="body-item-description">
                        {i18next.t('Benefit from increasing cashback at every new level! get endless rakeback and monthly top ups!')}
                      </div>
                    </div>
                  </div>
                  <div className="levels-main-info-container-body-item flex">
                    <img src={crown} alt="crown" className="body-item-image" />
                    <div className="body-item-labels">
                      <div className="body-item-title">
                        {i18next.t('Become a VIP')}
                      </div>
                      <div className="body-item-description">
                        {i18next.t('Take your game to the next level and join the VIP club! a sensational world of gambling opportunities awaits!')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="levels-second-info-container-title">
                🤔 {i18next.t("How it Works")}
              </div>
              <PremiumModalHowToChargeBody 
                width={width}
                currency={currency}
                token={token}
                balance={balance}
                updateUser={updateUser}
              />

              <div className="levels-carousel-container">
                <div className="levels-carousel-top flex">
                  <div className="levels-carousel-title">
                    🎉 {i18next.t('Levels')}
                  </div>
                  <div className="levels-carousel-arrows flex">
                    <div className="levels-carousel-arrow prev-slide swiper-button-prev"></div>
                    <div className="levels-carousel-arrow next-slide swiper-button-next"></div>
                  </div>
                </div>
                <div className="levels-carousel-description">
                  {i18next.t('Bingo.bet Levels system allows players to achieve higher rewards and bonuses by wagering!')}
                </div>

                <Swiper
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 20
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20
                    },
                    1025: {
                      slidesPerView: 3,
                      spaceBetween: 20
                    },
                    3400: {
                      slidesPerView: 3,
                      spaceBetween: 36
                    }
                  }}
                  watchOverflow={true}
                  observer={true}
                  observeParents={true}
                  observeSlideChildren={true}
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                >
                  {аchieves.map((level, i) => 
                    <SwiperSlide key={i}>
                      <div key={i} className={`modal-data level-${level.status - 1}`}>
                        {statusProgress?.current_status_id === level.status && <div className="my-level">{i18next.t("My Level")}</div>}
                        <div className="promo-modal-title big-modal-title flex">
                          <div className="promo-modal-title-pic">
                            <img src={getPlayerStatusIcon(level.status)} alt="bingoCoin"/>
                          </div>
                          <div className="promo-modal-title-text">
                            {i18next.t("Level")} {level.status - 1}
                          </div>
                          <div className="promo-modal-title-info">
                            {level.status === 1 ? 
                              <span>{i18next.t("New Player")}</span>
                              :
                              <>
                                <span>{i18next.t("Wager")}</span>
                                <img src={bingoCoin} alt="bingoCoin" className="bc-icon"/>
                                <span className="green">
                                  {thousandSeparator(level.coins)}
                                </span>
                                <span className="bold">{i18next.t("Coins")}</span>
                              </>
                            }
                          </div>
                        </div>

                        <div className="promo-modal-аchieves">
                          {level.list.map(el => 
                            <div key={el} className="аchieves-item flex">
                              <Done />
                              {i18next.t(el)}
                            </div>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>

              <div className="levels-terms">
                <div className="levels-terms-title">📄 {i18next.t('Terms & Conditions')}</div>
                <ul>
                  <li>
                    {i18next.t('One offer per player! We have the right to suspend any and all new accounts created in an attempt to abuse the bonus system and receive more than one per user.')}
                  </li>
                  <li>
                  {i18next.t('At level 5 or above identity must be verified via KYC in order to start accessing new benefits of the level.')}
                  </li>
                  <li>
                  {i18next.t("To be eligible for the end of month giveaways and bonus top-ups, the user must've deposited or wagered during that calendar month.")}
                  </li>
                  <li>
                  {i18next.t('The cashback bonus is based on wagering activity and loses during the month, that carries over to next month until claimed or cancelled out by a win.')}
                  </li>
                  <li>
                  {i18next.t('Upon reaching a new level, you retain the unique previous rewards of each level below.')}
                  </li>
                  <li>
                  {i18next.t('Game types contribute differently to wagering requirements needed to progress your level.')}
                  </li>
                </ul>
              </div>
            </div>
            <Footer data={data} />
          </div>
        }
      </IonContent>
    </IonPage>
  )
}

export default Levels;
