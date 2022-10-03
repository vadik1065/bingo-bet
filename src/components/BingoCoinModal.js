import React, { useEffect, useState } from 'react';
import { IonModal } from '@ionic/react';
import i18next from "i18next";
import axios from 'axios';
import { ReactComponent as Cross } from '../images/cross.svg';
import { useAtom } from 'jotai';
import { bingoCoinModal } from '../state';
// import Lottie from 'react-lottie';
// import animationData from '../lotties/bitcoin-550x550.json';
import safe from '../images/bingocoin-modal/safe.png';
import earth from '../images/bingocoin-modal/earth.png';
import gift from '../images/bingocoin-modal/gift.png';
import like from '../images/bingocoin-modal/like.png';
import oval from '../images/bingocoin-modal/oval-small.svg';
import "../css/promo.css";

const BingoCoinModal = ({ width }) => {
  const [openModal, setOpenModal] = useAtom(bingoCoinModal);
  const [isErrorGif, setErrorGif] = useState(false);
  // const [animationData, setAnimationData] = useState(null);
  // const [defaultLottieOptions, setDefaultLottieOptions] = useState({});

  // useEffect(() => {
  //   if (openModal) {
  //     axios({
  //       // method: 'post',
  //       // url: "https://bingo.bet/bitcoin-550x550.json",
  //       url: "../bitcoin-550x550.json",
  //       // headers: {
  //       //   'Authorization': `Bearer ${props.token}`,
  //       // },
  //     })
  //       .then(res => {
  //         setAnimationData(res.data);
  //         setDefaultLottieOptions({
  //           loop: false,
  //           autoplay: true, 
  //           animationData: res.data,
  //           rendererSettings: {
  //             preserveAspectRatio: 'xMidYMid slice'
  //           },
  //         })
  //         // setSuccessText(i18next.t('Your campaign has been deleted.'));
  //         // setSuccess(true);
  //         // setLoading(false);
  //         // if (res.data.data.rows) {
  //         //   props.setCampaigns(res.data.data.rows);
  //         // }
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       })
  //   }
  // }, [openModal]);

  // const getSize = () => {
  //   let size = {};
  //   if (width <= 767) {
  //     size.width = 200;
  //     size.height = 200;
  //   } else if (width <= 1024) {
  //     size.width = 220;
  //     size.height = 220;
  //   } else if (width < 3400) {
  //     size.width = 300;
  //     size.height = 300;
  //   } else {
  //     size.width = 550;
  //     size.height = 550;
  //   }
  //   return size;
  // }

  // const defaultLottieOptions = {
  //   loop: false,
  //   autoplay: true, 
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice'
  //   },
  // };

  return (
    <IonModal 
      isOpen={openModal}
      cssClass='mod-window premium-modal how-to-charge-modal bingo-coin-modal auto-height'
      onDidDismiss={() => setOpenModal(false)}
    >
      <div className="mod-container mod-confirm">
        <div className="modal-data">
          <div className="modal-header flex">
            BingoCoin
            <div onClick={() => setOpenModal(false)} className="absolute-close-modal flex">
              <Cross />
            </div>
          </div>

          <div className="modal-body flex">
            <div className="modal-block flex">
              {!isErrorGif && 
                <div className="modal-block-top flex">
                  <img 
                    сlass="bingocoin-gif"
                    src={"https://admin.bingo.bet/images/bingocoin.gif"} 
                    alt="bingo coin" 
                    onError={() => setErrorGif(true)}
                  />
                  {/* <Lottie 
                    options={defaultLottieOptions}
                    width={getSize().width}
                    height={getSize().height}
                  /> */}
                </div>
              }
              <div className="modal-block-bottom flex">
              <div className="modal-block-bottom-title gradient flex">
                <span>BingoCoin</span>
              </div>
              <div className="modal-block-bottom-description align-center">
                {i18next.t('Comfortable solution for managing your iGaming finances')}
              </div>
              </div>
            </div>
            <div className="modal-block labels flex">
              <div className="modal-block-labels">
                <div className="modal-block-bottom-title flex">
                  <img src={safe} alt="safe" className="modal-block-top-img" />
                  {i18next.t('Safe and Secure')} 
                </div>
                <div className="modal-block-bottom-description">
                  {i18next.t('Built on the')}
                  {' '}
                  <span className="oval-text">
                    ERC20 
                    {' '}
                    <img src={oval} alt="oval" />
                  </span> 
                  {' '}
                  {i18next.t('blockchain, a reliable crypto asset to assist in your gambling!')}
                  {' '}
                  <a href="https://bcoin.gg" target="_blank" rel="noopener noreferrer">{i18next.t('Link')}</a>
                </div>
              </div>
              <div className="modal-block-labels">
                <div className="modal-block-bottom-title flex">
                  <img src={earth} alt="earth" className="modal-block-top-img" />
                  {i18next.t('Expanding Use')}
                </div>
                <div className="modal-block-bottom-description">
                  {i18next.t('BingoCoin is soon to be implemented into multiple partner platforms, with great benefits presented to its users')}
                </div>
              </div>
              <div className="modal-block-labels">
                <div className="modal-block-bottom-title flex">
                  <img src={gift} alt="gift" className="modal-block-top-img" />
                  {i18next.t('Great Bonuses')}
                </div>
                <div className="modal-block-bottom-description">
                  {i18next.t('Users who opt to use bingo coin will be rewarded with additional bonuses such as lower commission fees and higher withdraw and deposit amounts')}
                </div>
              </div>
              <div className="modal-block-labels">
                <div className="modal-block-bottom-title flex">
                  <img src={like} alt="like" className="modal-block-top-img" />
                  {i18next.t('Best User Experience')}
                </div>
                <div className="modal-block-bottom-description">
                  {i18next.t('To ensure that our players make the most out of their time on the site, bingo coin provides an easy to understand financing system for all of our deposits and balances')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonModal>
  )
}

export default BingoCoinModal;
