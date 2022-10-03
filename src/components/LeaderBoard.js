import { useIonViewWillLeave } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import i18next from "i18next";
import { getCurrencyIconFromEntity, thousandSeparator } from '../utils/utils';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Swiper, SwiperSlide } from "swiper/react";
// import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay, Virtual } from "swiper";
import { useLocation } from 'react-router';

SwiperCore.use([Autoplay, Virtual]);

const TableSwiper = ({ leaderBoard, width }) => {
  // const [swiper, setSwiper] = useState({});

  const params = {
    className: "table-swiper",
    direction: "vertical",
    spaceBetween: 0,
    slidesPerView: 10,
    // loop: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
      // reverseDirection: true,
    },
    allowTouchMove: false,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    virtual: true,
  }

  return (
    <Swiper {...params} >
      {leaderBoard.length > 0 && leaderBoard.map((el, i) => 
        <SwiperSlide key={el.id} className={`flex ${i % 2 === 0 ? 'colored' : ''}`} >
          <div className="address-title twenty">
            <span>{el.game_name ?? '-'}</span>
          </div>
          {width > 767 && 
            <div className={`address-title twenty ${width <= 1024 ? 'center' : ''}`}>
              <span className={`${el.player_name === 'hidden' ? 'disabled' : ''}`}>{el.player_name ?? '-'}</span>
            </div>
          }
          {width > 1024 && 
            <div className="address-title twenty">
              <span>{el.created_at && moment(el.created_at).format('YYYY-MM-DD HH:mm')}</span>
            </div>
          }
          {width > 1024 && 
            <div className="address-title twenty">
              <div className="with-img first-img flex">
                <img src={getCurrencyIconFromEntity(el.currency_id)} alt="currency" className="bc-icon"/>
                <span>${thousandSeparator((+el.wager).toFixed(2))}</span>
              </div>
            </div>
          }
          {width > 1024 && 
            <div className="address-title ten">
              <div className="flex">
                <span className={`${el.mult?.split('x')[0] > 0 ? 'green' : ''}`}>{el.mult ?? '-'}</span>
              </div>
            </div>
          }
          <div className="address-title twenty">
            <div className="with-img last-img flex">
              <span className={`${el.payout > 0 ? 'green' : ''}`}>${thousandSeparator((+el.payout).toFixed(2))}</span>
              <img src={getCurrencyIconFromEntity(el.currency_id)} alt="currency" className="bc-icon"/>
            </div>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  )
}

const LeaderBoard = ({ data, width }) => {
  const location = useLocation();
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [tab, setTab] = useState('all');

  const tabs = [
    { value: 'all', name: 'All'},
    { value: 'high', name: 'High Wins'},
    { value: 'lucky', name: 'Lucky Wins'},
  ];

  useEffect(() => {
    if (data.length && location.pathname === '/home') {
      let arr = data;
      switch (tab) {
        case 'all':
          arr = data;
          break;
        case 'high':
          arr = data.filter(el => +el.payout > 0).sort((a, b) => b.payout - a.payout);
          break;
        case 'lucky':
          arr = data.filter(el => +el.payout > 0).sort((a, b) => b.mult?.split('x')[0] - a.mult?.split('x')[0]);
          break;
        default:
          arr = data;
          break;
      }
      setLeaderBoard(arr);
    }
  }, [data, tab, location]);

  useIonViewWillLeave(() => {
    setLeaderBoard([]);
    setTab('all');
  });

  return (
    <div className="account-table affiliate-table leader-board-container">
      <div className="leader-board-header flex">
        {tabs.map(t => 
          <div 
            key={t.value}
            className={`leader-board-header-tab ${tab === t.value ? 'current' : ''}`} 
            onClick={() => setTab(t.value)}
          >
            {i18next.t(t.name)}
          </div>
        )}
      </div>
      <div className="leader-board-table">
        <div className="leader-board-table-head flex">
          <div>{i18next.t('Game')}</div>
          {width > 767 && <div className={`${width <= 1024 ? 'center' : ''}`}>{i18next.t('User')}</div>}
          {width > 1024 && <div>{i18next.t('Time')}</div>}
          {width > 1024 && <div>{i18next.t('Wager')}</div>}
          {width > 1024 && <div className="small">{i18next.t('Mult')}</div>}
          <div className="align-right">{i18next.t('Payout')}</div>
        </div>
        {leaderBoard.length > 0 && 
          <TableSwiper 
            leaderBoard={leaderBoard} 
            width={width}
          />
        }
      </div>
    </div>
  )
}

export default LeaderBoard;
