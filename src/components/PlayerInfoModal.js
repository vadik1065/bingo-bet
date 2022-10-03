import React, { useEffect, useState } from 'react';
import { IonModal } from '@ionic/react';
import i18next from "i18next";
import { ReactComponent as Cross } from '../images/cross.svg';
import { useAtom } from 'jotai';
import { authModal, playerInfoModal, registerModal } from '../state';
import bg from '../images/unknown.png';
import { ReactComponent as Arrow } from '../images/arrow-carousel.svg';
import play from '../images/play.png';
import { getPlayerStatusIcon, thousandSeparator } from '../utils/utils';
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';
import "../css/promo.css";
import { useHistory } from 'react-router';

const PlayerInfoModal = ({ width, playerInfo, token }) => {
  const history = useHistory();
  const [openModal, setOpenModal] = useAtom(playerInfoModal);
  const [isVisibleGames, setVisibleGames] = useState(false);
  const [swiper, setSwiper] = useState({});
  const [register, setRegister] = useAtom(registerModal);
  const [auth, setAuth] = useAtom(authModal);
  const [slidesView, setSlidesView] = useState(3);
  const [arrowsDisable, setArrowsDisable] = useState({ prev: false, next: false });

  useEffect(() => {
    if (width <= 767) {
      setSlidesView(2);
    } else if (width < 3400) {
      setSlidesView(3);
    } else {
      setSlidesView(4);
    }
  }, []);

  const params = {
    className: "player-favorite-games-swiper",
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24
      },
      3400: {
        slidesPerView: 4,
        spaceBetween: 32
      }
    },
    // loop: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    watchOverflow: true,
    onInit: (e) => {
      setSwiper(e);
      if (e.activeIndex === 0) {
        setArrowsDisable({
          prev: true,
          next: false
        })
      }
    },
    onActiveIndexChange: (e) => {
      if (e.activeIndex === 0) {
        setArrowsDisable({
          prev: true,
          next: false
        })
      } else if (e.activeIndex === playerInfo.favorite_games.length - slidesView) {
        setArrowsDisable({
          prev: false,
          next: true
        })
      } else {
        setArrowsDisable({
          prev: false,
          next: false
        })
      }
    }
  }

  const playHandler = (game) => {
    setOpenModal(false);
    if (token === null && game.hasDemo === '1') {
      showDemoGame(game.id);
    }

    if (token === null && game.hasDemo !== '1') {
      history.push('/register');
      // setAuth({ isOpen: true, type: 'register' });
    }

    if (token !== null) {
      showGame(game.id);
    }
  }
  
  const showDemoGame = (id) => {
    history.push(`/game/${id}_demo`);
  }

  const showGame = (id) => {
    history.push(`/game/${id}`);
  }

  const closeModal = () => {
    setVisibleGames(false);
    setOpenModal(false);
  }

  return (
    <IonModal 
      isOpen={openModal}
      cssClass='mod-window premium-modal how-to-charge-modal player-info-modal auto-height'
      onDidDismiss={closeModal}
      onDidPresent={() => setVisibleGames(true)}
    >
      <div className="mod-container mod-confirm">
        <div className="modal-data">
          <div className="modal-header flex">
            {i18next.t('Player Info')}
            <div onClick={() => setOpenModal(false)} className="absolute-close-modal flex">
              <Cross />
            </div>
          </div>

          <div className="modal-body flex">
            <div className={`modal-block player-info-block ${true ? 'level-0' : ''} flex`}>
              <div className="player-info-block-item item-left flex">
                <div 
                  className="player-avatar"
                  style={{backgroundImage: `url(${bg})`}}
                ></div>
                <div className="player-name">{playerInfo.name}</div>
                <div className="player-joined">{playerInfo.joined}</div>
                {width <= 767 && 
                  <div className="player-info-block-item item-right flex">
                    <div className="player-level-pic">
                      <img src={getPlayerStatusIcon(playerInfo.player_level)} alt="ring"/>
                    </div>
                    <div className="promo-modal-title-text">
                      {i18next.t("Level")} {playerInfo.player_level}
                    </div>
                  </div>
                }
                <div className="player-best-win">
                  <span className="standart">{i18next.t('Best Win')}</span> <span className="green">${thousandSeparator(playerInfo.best_wins)}</span>
                </div>
              </div>
              {width > 767 && 
                <div className="player-info-block-item item-right flex">
                  <div className="player-level-pic">
                    <img src={getPlayerStatusIcon(playerInfo.player_level)} alt="ring"/>
                  </div>
                  <div className="promo-modal-title-text">
                    {i18next.t("Level")} {playerInfo.player_level}
                  </div>
                </div>
              }
            </div>

            {playerInfo.favorite_games.length > 0 && 
              <div className="modal-block player-favorite-games-block flex">
                <div className="player-favorite-games-top flex">
                  <div className="player-favorite-games-title">{i18next.t('Favourite Games')}</div>
                  {playerInfo.favorite_games.length > slidesView && 
                    <div className="levels-carousel-arrows flex">
                      <div 
                        onClick={() => !arrowsDisable.prev && swiper.slidePrev()}
                        className={`levels-carousel-arrow left-arrow flex ${arrowsDisable.prev ? 'disabled' : ''}`}
                      >
                        <Arrow />
                      </div>
                      <div 
                        onClick={() => !arrowsDisable.next && swiper.slideNext()}
                        className={`levels-carousel-arrow right-arrow flex ${arrowsDisable.next ? 'disabled' : ''}`}
                      >
                        <Arrow />
                      </div>
                    </div>
                  }
                </div>
                <div className={`player-favorite-games ${isVisibleGames ? 'visible' : 'hidden'}`}>
                  <Swiper {...params}>
                    {playerInfo.favorite_games.map(game => {
                      return (
                        <SwiperSlide key={game.id}>
                          <div 
                            className={`player-favorite-game`} 
                            onClick={() => playHandler(game)}
                          >
                            <div 
                              className="player-favorite-game-pic flex"
                              // style={{ backgroundImage: `url(${game.img})` }}
                            >
                              <img src={game.img} alt="game logo" className="game-logo" />
                              <img src={play} alt="play" className="play-img" />
                            </div>
                            <div className="player-favorite-game-bottom flex">
                              <span className="standart">{i18next.t('Wagered')}</span>
                              <span className="money">${thousandSeparator(game.wagered)}</span>
                            </div>
                          </div> 
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </IonModal>
  )
}

export default PlayerInfoModal;
