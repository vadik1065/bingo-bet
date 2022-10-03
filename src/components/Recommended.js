import React, { useState, useEffect } from 'react';
import { useAtom } from "jotai";
import { authModal, registerModal } from "../state.js";
import i18next from "i18next";
import { useHistory } from 'react-router';
import { IonSpinner } from '@ionic/react';

const RecCard = (props) => {
  const history = useHistory();
  const [register, setRegister] = useAtom(registerModal);
  const [auth, setAuth] = useAtom(authModal);

  function playHandler() {
    if (props.token === null && props.data.hasDemo === '1') {
      showDemoGame(props.data.id);
    }

    if (props.token === null && props.data.hasDemo !== '1') {
      history.push('/register');
      // setAuth({ isOpen: true, type: 'register' });
    }

    if (props.token !== null) {
      showGame(props.data.id);
    }
  }
  
  function showDemoGame(id) {
    history.push(`/game/${id}_demo`);
  }

  function showGame(id) {
    history.push(`/game/${id}`);
  }

  return (
    <div className={`rec-card flex ${!!props.data.forbidden ? 'not-available' : ''}`}>
      {!!props.data.forbidden &&
        <div className="btn-container not-available-text">{i18next.t('Not available in your country')}</div>
      }

      <img src={props.data.banner_url} alt='logo' className="rec-card-img" />
      <p className="rec-card-name">{props.data.name}</p>
      <span className="rec-card-provider">{props.provider}</span>
      <div 
        onClick={() => {
          if (!!!props.data.forbidden) {
            playHandler();
          }
        }}
        className='playnow-btn'
      >
        {!!!props.data.forbidden && 
          <>
            {props.token !== null && <p>{i18next.t('Play now')}</p>}
            {props.token === null && props.data.hasDemo === '1' && <p>{i18next.t('demo')}</p>}
            {props.token === null && props.data.hasDemo !== '1' && <p>{i18next.t('Register')}</p>}
          </>
        }
      </div>
    </div>
  )
}

const Recommended = (props) => {
  const [recommendedIndex, setRecommendedIndex] = useState(0);
  const [quantityViewCards, setQuantityViewCards] = useState(4);

  useEffect(() => {
    if (props.width > 767 && props.width < 1025) {
      setQuantityViewCards(3);
    }
  }, [props.width]);

  return (
    <div className="recommended-block flex">
      <div className="flex center">
        <p className="page-title">{i18next.t('Recommended to you')}</p>
        <div className="arrows flex">
          <div 
            onClick={() => recommendedIndex > 0 && setRecommendedIndex(recommendedIndex - quantityViewCards)} 
            className={"left flex center " + (recommendedIndex > 0 ? 'green' : '')}
          >
            <span></span>
          </div>
          <div 
            onClick={() => recommendedIndex + quantityViewCards < props.recommended.length && setRecommendedIndex(recommendedIndex + quantityViewCards)} 
            className={"right flex center " + (recommendedIndex + quantityViewCards < props.recommended.length ? 'green' : '')}
          >
            <span></span>
          </div>
        </div>
      </div>
      {props.loading && <IonSpinner className="spinner-loader center" name="lines"/>}
      {!props.loading && 
        <div className="rec-games-block flex">
          {props.width > 767 && 
            props.recommended
              .sort((a, b) => a.forbidden - b.forbidden)
              .map((el, i) => {
                if (i >= recommendedIndex && i < recommendedIndex + quantityViewCards) {
                  return (
                    <RecCard 
                      key={i} 
                      token={props.token} 
                      data={el} 
                      provider={props.providers?.find(p => p.id === el.merchant_id).name}
                      lang={props.lang} 
                      currency={props.currency} 
                    />
                  )
                }
              })
          }
          
          {props.width <= 767 && 
            props.recommended
              .sort((a, b) => a.forbidden - b.forbidden)
              .map((el, i) => 
                <RecCard 
                  key={i} 
                  token={props.token} 
                  data={el} 
                  lang={props.lang} 
                  currency={props.currency}
                />
              )
          }
        </div>
      }
    </div>
  );
}

export default Recommended;
