import React from 'react';
import { IonItem, IonRippleEffect, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { useHistory } from 'react-router';
import i18next from "i18next";
import url from '../../axios.js';
import useChangeCurrency from '../../hooks/useChangeCurrency';
import wallet from '../../images/how-to-charge/wallet.png';
import coin from '../../images/how-to-charge/coin.png';
import done from '../../images/how-to-charge/done.png';
import btnWallet from '../../images/wallet-small.png';
import { thousandSeparator } from '../../utils/utils';
import useCheckRegister from '../../hooks/useCheckRegister.js';

const PremiumModalHowToChargeBody = ({ width, currency, token, balance, updateUser, setOpenModal }) => {
  const history = useHistory();
  const { changeCurrency, balanceActive, setBalanceActive } = useChangeCurrency({
    currency_id: currency, 
    token, 
    balance, 
    updateUser
  });
  // const { checkRegister } = useCheckRegister();

  const toBalance = () => {
    if (token) {
      history.push('/balance');
      if (setOpenModal) {
        setOpenModal(false);
      }
    } else {
      history.push('/register');
      // checkRegister();
    }
  }

  const toGames = () => {
    history.push('/games');
    if (setOpenModal) {
      setOpenModal(false);
    }
  }

  return (
    <div className="modal-body flex">
      <div className="modal-block flex">
        {width > 767 && 
          <div className="modal-block-top flex">
            <img src={wallet} alt="big wallet" className="modal-block-top-img" />
            {width > 1024 && <span className="gradient-number">01</span>}
          </div>
        }
        <div className="modal-block-bottom flex">
          {width <= 1024 && <span className="gradient-number">01</span>}
          <div className="modal-block-bottom-title flex">
            {width <= 767 && <img src={wallet} alt="big wallet" className="modal-block-top-img" />}
            {i18next.t("Deposit")}
          </div>
          <div className="modal-block-bottom-description">
            {i18next.t("Click on the Button below or on the header of the site. Select your currency and send the transaction to the provided deposit address")}
          </div>
          <button 
            className="btn btn-with-icon green flex ion-activatable"
            onClick={toBalance}
          >
            <img src={btnWallet} alt="wallet"/>
            <IonRippleEffect/>
            <span>{i18next.t('Deposit')}</span>
          </button>
        </div>
      </div>
      <div className="modal-block flex">
        {width > 767 && 
          <div className="modal-block-top flex">
            <img src={coin} alt="coin" className="modal-block-top-img" />
            {width > 1024 && <span className="gradient-number">02</span>}
          </div>
        }
        <div className="modal-block-bottom flex">
          {width <= 1024 && <span className="gradient-number">02</span>}
          <div className="modal-block-bottom-title flex">
            {width <= 767 && <img src={coin} alt="coin" className="modal-block-top-img" />}
            {i18next.t("Select Your Currency")}
          </div>
          <div className="modal-block-bottom-description">
            {i18next.t("Click on the wallet below or on the header of the site. Select the currency you want to use before heading into any games")}
          </div>
          <IonItem 
            lines="none" 
            className="header-balance"
            button={!token}
            onClick={() => {
              if (!token) {
                history.push('/register');
                // checkRegister()
              }
            }}
          >
            {!token &&
              <>
                <img src={`https://admin.bingo.bet/images/currencies/chip.svg`} alt="currency" />
                <IonSelect
                  value={'base'} 
                  interface={'popover'} 
                  mode={'md'} 
                  className='balance-select'
                  disabled={true}
                >
                  <IonSelectOption
                    value={'base'}
                    className={`balance-select-option`}
                  >
                    0
                  </IonSelectOption>
                </IonSelect>
              </>
            }
            {token && 
              <>
                {balanceActive?.image_url && <img src={`${url}/${balanceActive.image_url}`} alt="currency" />}
                <IonSelect
                  value={balanceActive?.currency_id} 
                  onIonChange={e => {
                    setBalanceActive(balance.find(el => el.currency_id == e.detail.value));
                    changeCurrency(e.detail.value);
                  }}
                  interface={'popover'} 
                  mode={'md'} 
                  className='balance-select'
                  disabled={!token}
                >
                  {balance.map(el => 
                    <IonSelectOption
                      key={el.currency_id} 
                      value={el.currency_id}
                      className={`balance-select-option ${el.entity}`}
                    >
                      {thousandSeparator(el.ob)}
                    </IonSelectOption>
                  )}
                </IonSelect>
              </>
            }
          </IonItem>
        </div>
      </div>
      <div className="modal-block flex">
        {width > 767 && 
          <div className="modal-block-top flex">
            <img src={done} alt="done" className="modal-block-top-img" />
            {width > 1024 && <span className="gradient-number">03</span>}
          </div>
        }
        <div className="modal-block-bottom flex">
          {width <= 1024 && <span className="gradient-number">03</span>}
          <div className="modal-block-bottom-title flex">
            {width <= 767 && <img src={done} alt="done" className="modal-block-top-img" />}
            {i18next.t("Wager in Any Game")}
          </div>
          <div className="modal-block-bottom-description">
            {i18next.t("Your progress is a sum accumulated through your wager on both casino and sportsbook! Increase your Level to receive bigger rewards and exclusive VIP treatment")}
          </div>
          <button 
            className="btn green flex ion-activatable"
            onClick={toGames}
          >
            <IonRippleEffect/>
            <span>{i18next.t("Play Game")}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PremiumModalHowToChargeBody;
