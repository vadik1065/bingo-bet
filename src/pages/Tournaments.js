import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer.js';
import '../css/tournaments.css';
import { IonContent, IonPage, IonSpinner, useIonViewWillLeave } from '@ionic/react';
import Header from '../components/Header';
import moment from 'moment';
import GameCard from '../components/GameCard';
import { useLocation } from 'react-router-dom';
import i18next from "i18next";
import axios from 'axios';
import url from '../axios.js';
import { getCurrencyIcon, getTempCurrency, thousandSeparator } from '../utils/utils.js';
require('moment-countdown');
// import tournamentPrev from '../images/tournament-prev.png';

const Tournaments = (props) => {
  let location = useLocation();
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [showGames, setShowGames] = useState(null);
  const [showPlayers, setShowPlayers] = useState(false);
  const [timer2, setTimer2] = useState([]);
  const [showGamesCount, setShowGamesCount] = useState(16);
  const [winners, setWinners] = useState([]);

  useIonViewWillLeave(() => {
    setShowGamesCount(16);
  });

  useEffect(() => {
    if (location.pathname !== '/tournaments') {
      clearInterval(timer2);
      setCurrentCard({});
      setShowGames(null);
      setShowPlayers(false);
    }
    if (location.pathname === '/tournaments') {
      tickThis();
    }
  }, [location.pathname, props.data.tournaments]);

  useEffect(() => {
    setShowGames(null);
  }, [currentCard]);

  useEffect(() => {
    if (time.length) {
      setLoading(false);
    }
  }, [time]);

  function tickThis() {
    setLoading(true);
    if (props.data.tournaments.length !== 0) {
      setTimer2(setInterval(() => {
        let temp = [];

        props.data.tournaments.forEach((el, i) => {
          //время до начала турнира
          if (moment.unix(el.start) > moment().utc()) {
            temp.push({
              id: el.tournament_id,
              tick: moment(moment.unix(el.start).format('YYYY-MM-DD').toString()).countdown()
            })
          }
          //время до конца турнира
          if (moment.unix(el.start) < moment().utc() && moment.unix(el.end) > moment().utc()) {
            temp.push({
              id: el.tournament_id,
              tick: moment(moment.unix(el.end).format('YYYY-MM-DD').toString()).countdown()
            })
          }
          //турнир окончен
          if (moment.unix(el.end) < moment().utc()) {
            temp.push({
              id: el.tournament_id,
              tick: null
            });
          }
        });
        setTime(temp);
      }, 1000));
    }
  }

  function showTournament(tournament) {
    setCurrentCard(tournament);
    getWinners(tournament.tournament_id);
    moveUp();
  }

  function hideTournament() {
    setShowGames(null);
    setCurrentCard({});
    setShowPlayers(false);
  }

  function moveUp() {
    document.getElementById('tournaments-page').scrollToPoint(0, 0);
  }

  function getWinners(id) {
    const fetchUrl = `${url}${props.data.token ? '/api/get-list-winners-tournament-auth' : '/api/get-list-winners-tournament'}`;
    const fetchData = {
      method: 'post',
      url: fetchUrl,
      headers: props.data.token ? {'Authorization': `Bearer ${props.data.token}`} : null,
      data: {
        tournament_id: id,
      }
    }

    axios(fetchData)
      .then(res => {
        setWinners(res.data.data);
      })
      .catch(error => {
        console.log(error.response.data.error);
      })
  }

  // function moveDown() {
  //   let yOffset = document.getElementById('mhere').offsetTop;
  //   document.getElementById('tournaments-page').scrollToPoint(0, yOffset, 1500);
  // }

  return (
    <IonPage >
      {/* <Header 
        setColor={props.setColor}
        color={props.color} 
        data={props.data} 
        updateUser={props.updateUser} 
      /> */}
      <IonContent id={"tournaments-page"} className={"page"}>
          <div className="homepage flex">
            <div className="width-container">
              {!currentCard.tournament_id && 
                <>
                  <p className="page-title top-of-the-page">{i18next.t('Tournaments')}</p>
                  {loading ? 
                    <IonSpinner className="spinner-loader center" name="lines"/>
                    :
                    <div className="tournaments-container">
                      {props.data.tournaments.map((el, i) => {
                        if (time.length > 0) {
                          return (
                            <div key={el.tournament_id} className="tournament-card flex">
                              <div className="tournament-top">
                                <div className="btn-container flex">
                                  <div 
                                    onClick={() => showTournament(el)} 
                                    className="read-more flex"
                                  >
                                    {i18next.t('Read more')}
                                  </div>
                                </div>
                                <img className="tournament-preview" alt="tournament preview" src={el.image} />
                              </div>
                              {time.find(t => t.id === el.tournament_id).tick !== null &&
                                <div className="tournament-count">
                                  <span>{moment(time.find(t => t.id === el.tournament_id).tick).format('DD')} {i18next.t('days')} <strong>{moment(time.find(t => t.id === el.tournament_id).tick).format('hh:mm:ss')}</strong></span>
                                </div>
                              }
                              {time.find(t => t.id === el.tournament_id).tick === null &&
                                <div className="tournament-count">
                                  <span>{i18next.t('Tournament has been ended')}</span>
                                </div>
                              }
                              <div className="tournament-info flex">
                                <p>{el.name}</p>
                                <p className="tournament-date flex">
                                  <span className="tournament-start">{i18next.t('From')} <strong>{moment.unix(el.start).format('DD.MM.YYYY')}</strong></span>
                                  <span className="tournament-end">{i18next.t('Till')} <strong>{moment.unix(el.end).format('DD.MM.YYYY')}</strong></span>
                                </p>
                                <p className="prize-block flex">
                                  <span className="prize-title">{i18next.t('Prize Fund')}</span>
                                  <span className="prize-btn">{thousandSeparator(el.prizeFund)} <img src={getCurrencyIcon(el.currency.id)} alt="currency" className="bc-icon"/></span>
                                </p>
                              </div>
                            </div>
                          )
                        }
                      })}
                    </div>
                  }
                </>
              }

              {/* <div id='mhere'></div> */}
              {currentCard.tournament_id &&
                <>
                  <button className="back-button" onClick={hideTournament}>
                    &lt; {i18next.t('Back to all Tournaments')}
                  </button>
                  <div className="tournament-single-header">
                    <p className="page-title top-of-the-page">{currentCard.name}</p>
                    <p className="tournament-date flex">
                      <span className="tournament-start">{i18next.t('From')} <strong>{moment.unix(currentCard.start).format('DD.MM.YYYY')}</strong></span>
                      <span className="tournament-end">{i18next.t('Till')} <strong>{moment.unix(currentCard.end).format('DD.MM.YYYY')}</strong></span>
                    </p>
                  </div>
                  <div className="tournament-single-btns-container">
                    <div className="tournament-single-prize-block flex">
                      <span className="prize-title">{i18next.t('Prize Fund')}</span>
                      <span className="prize-btn">{thousandSeparator(currentCard.prizeFund)} <img src={getCurrencyIcon(currentCard.currency.id)} alt="currency" className="bc-icon"/></span>
                    </div>
                    {time.find(t => t.id === currentCard.tournament_id).tick !== null && 
                      <div className="tournament-single-count tournament-count">
                        <span>{moment(time.find(t => t.id === currentCard.tournament_id).tick).format('DD')} {i18next.t('days')} <strong>{moment(time.find(t => t.id === currentCard.tournament_id).tick).format('hh:mm:ss')}</strong></span>
                      </div>
                    }
                    {time.find(t => t.id === currentCard.tournament_id).tick === null && 
                      <div className="tournament-single-count tournament-count">
                        <span>{i18next.t('Tournament has been ended')}</span>
                      </div>
                    }
                  </div>
                  <div className="tournament-description flex">
                    <div className="account-table tournament-table">
                      {showPlayers && 
                        <>
                          {winners.length > 0 && 
                            <table>
                              <thead>
                                <tr>
                                  <th>{i18next.t('Results')}</th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                </tr>
                              </thead>
                              <thead className='actual-head'>
                                <tr>
                                  <th>{i18next.t('Rank')}</th>
                                  <th>{i18next.t('Name')}</th>
                                  <th>{i18next.t('Result')}</th>
                                  <th>{i18next.t('Gain')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {winners
                                  .sort((a, b) => a.npp - b.npp)
                                  .map((el, i) => {
                                    return (
                                      <tr 
                                        key={i}
                                        className={`${props.data.userData.login === el.name ? 'user-rankings' : ''}`}
                                      >
                                        <td className="device-title">
                                          <div className={
                                            (el.npp === 1 ? 'first-place' : '') +
                                            (el.npp === 2 ? 'second-place' : '') +
                                            (el.npp === 3 ? 'third-place' : '') +
                                            (el.npp > 3 ? 'empty-place' : '')
                                          }></div>
                                          <div>{el.npp}</div>
                                        </td>
                                        <td>{el.name}</td>
                                        <td>{el.s}</td>
                                        <td className="address-title">
                                          {currentCard.places.find((place, i) => {
                                            if (i + 1 === el.npp) {
                                              return place;
                                            }
                                          }) || 0}
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </table>
                          }

                          {winners.length === 0 && <div className="no-results">{i18next.t('There are no participants')}</div>}
                        </>
                      }

                      {!showPlayers && 
                        <table>
                          <thead>
                            <tr>
                              <th>{i18next.t('Top places')}</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentCard.places.map((el, i) => {
                              return (
                                <tr key={i}>
                                  <td className="device-title">
                                    <div className={
                                      (i === 0 ? 'first-place' : '') +
                                      (i === 1 ? 'second-place' : '') +
                                      (i === 2 ? 'third-place' : '') +
                                      (i > 2 ? 'empty-place' : '')
                                    }>
                                    </div>
                                    <div>{++i}</div>
                                  </td>
                                  <td className="address-title">{thousandSeparator(el)}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      }
                    </div>
                    <div className="tournament-detail-cms flex">
                      <div dangerouslySetInnerHTML={{ 
                        __html: JSON.parse(currentCard.description)[0]?.contents !== null 
                        ? 
                        JSON.parse(currentCard.description)[0]?.contents 
                        : 
                        JSON.parse(currentCard.description)[1]?.contents
                      }}>
                      </div>
                      {!showPlayers && <div onClick={() => setShowPlayers(!showPlayers)} className="read-more flex">{i18next.t('Show results')}</div>}
                      {showPlayers && <div onClick={() => setShowPlayers(!showPlayers)} className="read-more flex">{i18next.t('Show top places')}</div>}
                      <div onClick={() => setShowGames(currentCard.tournament_id)} className="read-more flex">{i18next.t('Show games list')}</div>
                    </div>

                  </div>
                </>
              }

              {showGames !== null &&
                <>
                  <div className="games-container">
                    {props.data.games
                      .filter(g => currentCard.games.includes(g.id))
                      .sort((a, b) => a.forbidden - b.forbidden || b.cnt_likes - a.cnt_likes)
                      .map((item, index) => {
                        while (index < showGamesCount) {
                          return (
                            <GameCard 
                              setFav={props.setFav} 
                              updateGames={props.data.updateGames} 
                              lang={props.data.lang} 
                              currency={props.data.userData.currency_id} 
                              token={props.data.token} 
                              data={item} 
                              key={item.id} 
                              providers={props.data.providersList}
                            />
                          )
                        }
                      })
                    }
                  </div>
                  {showGamesCount <= currentCard.games.length && 
                    <div onClick={() => setShowGamesCount(prev => prev + 24)} className="more-games flex">
                      <p>{i18next.t('more games')}</p>
                    </div>
                  }
                </>
              }
            </div>

            <Footer data={props.data} />
          </div>
      </IonContent>
    </IonPage>
  )
}

export default Tournaments;
