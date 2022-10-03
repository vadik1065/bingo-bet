import React, { useState, useEffect } from 'react';
import '../css/providers.css';
import Footer from '../components/Footer.js';
import { IonContent, IonPage, IonSpinner, useIonViewWillLeave } from '@ionic/react';
import Header from '../components/Header.js';
import GameCard from '../components/GameCard';
import i18next from "i18next";
import { useHistory, useParams } from 'react-router';
import { useAtom } from 'jotai';
import { mainLoading } from '../state';

const ProviderSingle = (props) => {
  const history = useHistory();
  const { name } = useParams();
  const [list, setList] = useState([]);
  const [showGamesCount, setShowGamesCount] = useState(16);
  // const [loading, setLoading] = useAtom(mainLoading);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (name && props.providers.length) {
      const current = props.providers.find(p => p.name === name);
      if (current) {
        setProviderGames(current.id);
      } else {
        setLoading(false);
      }
    }
  }, [name, props.providers]);

  // useEffect(() => {
  //   setLoading(true);
  //   if (list.length) {
  //     setLoading(false);
  //   }
  // }, [list]);

  function setProviderGames(id) {
    console.log(123, id);
    setShowGamesCount(16);
    setList(props.games.filter(el => el.merchant_id === id));
    setLoading(false);
  }

  useIonViewWillLeave(() => {
    setShowGamesCount(16);
  });

  return (
    <IonPage >
      {/* <Header 
        setColor={props.setColor}
        color={props.color} 
        data={props.data} 
        updateUser={props.updateUser} 
      /> */}
      <IonContent className={"page"}>
        <div className="homepage flex providers-page">
          <div className="width-container">
            {name && 
              <>
                <button 
                  className="back-button" 
                  onClick={() => history.push('/providers')}
                >
                  &lt; {i18next.t('Back to all Providers')}
                </button>
                <div className="page-title providers-games-title">
                  {name}
                  {/* {props.providers?.some(p => p.name === name) && name} */}
                  {/* {!loading && !props.providers?.some(p => p.name === name) && 'This provider does not have games'} */}
                  {/* {props.providers?.some(p => p.name === name) ? name : 'This provider does not have games'} */}
                </div>
                {loading && <IonSpinner className="spinner-loader center" name="lines"/>}
                <div className="games-container list-provs">
                  {!loading && list.map((el, i) => {
                      while (i < showGamesCount) {
                        return (
                          <GameCard 
                            setFav={props.setFav} 
                            updateGames={props.data.updateGames} 
                            lang={props.data.lang} 
                            currency={props.data.userData.currency_id} 
                            token={props.data.token} 
                            data={el} 
                            key={el.id}
                            providers={props.data.providersList}
                          />
                        )
                      }
                      return false;
                    })
                  }
                </div>
                {!loading && list.length === 0 && <div>{i18next.t('No games')}</div>}
                {!loading && showGamesCount <= list.length && 
                  <div onClick={() => setShowGamesCount(showGamesCount + 24)} className="more-games flex">
                    <p>{i18next.t('more games')}</p>
                  </div>
                }
              </>
            }
          </div>

          <Footer data={props.data} />
        </div>
      </IonContent>
    </IonPage >
  )
}

export default ProviderSingle;
