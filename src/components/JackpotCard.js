import React, { useEffect, useState } from 'react';
import '../css/gamecard.css';
import { useAtom } from "jotai";
import { openGameId, defGameUrl,defHtml, gameModal, mainLoading, defGameError, registerModal, authModal} from "../state.js";
import axios from 'axios';
import url from '../axios.js';
import i18next from "i18next";
import { useHistory } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import notAvailable from '../images/not-available.png';
import { thousandSeparator } from '../utils/utils';
import useProviderLogo from '../hooks/useProviderLogo';
import chip from '../images/crypto-logos/bcoin.png';

const JackpotCard = (props) => {
  const history = useHistory();
  const [register, setRegister] = useAtom(registerModal);
  const [auth, setAuth] = useAtom(authModal);
  const [showLoading, setShowLoading] = useAtom(mainLoading);
  const [openGame, setOpenGame] = useAtom(openGameId);
  const [gameUrl, setGameUrl]  = useAtom(defGameUrl);
  const [html, setHtml]  = useAtom(defHtml);
  const [gameError, setGameError] = useAtom(defGameError);
  const [isOpen, setIsOpen]  = useAtom(gameModal);
  const [toggle, setToggle] = useState(false);
  const { providerLogo } = useProviderLogo({ providers: props.providers, curId: props.data.merchant_id });

  useEffect(() => {
    if (toggle) {
      setTimeout(() => setToggle(false), 500);
    }
  }, [toggle]);

  function showDemoGame(id) {
    history.push(`/game/${id}_demo`);
  }

  function showGame(id) {
    history.push(`/game/${id}`);
  }

  function sendFavs(id, fav) {
    let newFavValue = fav === 1 ? 0 : 1;
    props.setFav(id, newFavValue);
    axios({
      method: "post",
      url: url + "/api/set-favorite",
      headers: {
        Authorization: `Bearer ${props.token}`
      },
      data: {
        id: id,
        favorite: newFavValue
      }
    }).then(res => {
      // props.updateGames(true, props.token)
    });
  }

  return (
    <div className={`game-card flex ${!!props.data.forbidden ? 'not-available' : ''}`}>
      {!!!props.data.forbidden && props.token !== null &&
        <div 
          onClick={() => {
            sendFavs(props.data.id, props.data.favorite);
            setToggle(true);
          }}
          className={"fav-block " + (toggle ? 'switch' : '')}
        >
          <div className={"fav " + (props.data.favorite === 1 ? 'isfav' : '' ) }></div>
        </div>
      }

      {!!props.data.forbidden ?
        <div className="not-available-text flex">
          <img src={notAvailable} alt="not-available" />
          <span>{i18next.t('Not available in your country')}</span>
        </div> :
        <>
          <div className="jackpot-btn-container">
            <p className="flex">
              {thousandSeparator(props.jackPotValue)}
              <img src={chip} alt="chip" className="chip-icon"/>
            </p>
          </div>
          <div className="btn-container flex">
            {props.token !== null && <div onClick={()=> showGame(props.data.id)} className="play flex">{i18next.t('play')}</div>}
            {props.data.hasDemo === '1' && <div onClick={()=> showDemoGame(props.data.id)} className="demo flex">{i18next.t('demo')}</div>}
            {props.data.hasDemo !== '1' && props.token === null && 
              <div 
                onClick={() => history.push('/register')}
                // onClick={() => setAuth({ isOpen: true, type: 'register' })} 
                className="demo flex"
              >
                {i18next.t('Register')}
              </div>
            }
          </div>
        </>
      }

      <LazyLoadImage
        className='game-preview'
        alt={props.data.name}
        effect="blur"
        src={`${props.data.banner_url}`}
        wrapperClassName='game-preview'
      />

      <div className="game-info flex">
        <p>{props.data.name}</p>
        <span>{props.data.tags.map(el => {
          var variable = '';
          el.tag.forEach(el=>{
            if(el !== null) {
              variable = el
            }
          });
          return variable
        })}</span>
        {providerLogo && <img src={providerLogo} alt={props.data.name} className="provider-logo"/>}
        {/* <img src={`${process.env.PUBLIC_URL}/assets/provider-logos/${props.data.provider}.png`} alt='Provider logo' className="provider-logo"></img> */}
      </div>

    </div>
  )
}

export default JackpotCard;
