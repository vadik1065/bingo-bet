import React, { useState } from 'react';
import Footer from '../components/Footer.js';
import Header from '../components/Header';
import Pie from '../components/PieChart';
import ApexChart from '../components/GamesChart';
// import { mainLoading } from "../state.js";
// import { useAtom } from "jotai";
import '../css/statistics.css';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { IonContent, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import i18next from "i18next";
import { thousandSeparator } from '../utils/utils.js';

const Statistics = (props) => {
  const location = useLocation();
  const options = {
    cssClass: 'custom-select'
  };
  // const [loading, setLoading] = useAtom(mainLoading);
  const [bets, setBets] = useState(30);
  const [games, setGames] = useState(10);
  const [deposits, setDeposits] = useState(30);
  const history = useHistory();
  function changeBets(e) {
    setBets(e)
    props.getHistoryBets(e, props.data.token)
  }
  function changeDeposits(e) {
    setDeposits(e)
    props.getHistoryDeposits(e, props.data.token)
  }
  function changeGames(e) {
    setGames(e)
    props.getTopGames(e, props.data.token)
  }
  return (
    <IonPage >
      {props.data.token === null &&
        <Redirect to="/home" />
      }
      {/* <Header 
        setColor={props.setColor}
        color={props.color} 
        data={props.data} 
        updateUser={props.updateUser} 
      /> */}
      <IonContent className={"page"}>
        {location.pathname==='/statistics' && <div className="homepage flex account-page">
          <div className="width-container">
            <p className="page-title top-of-the-page">{i18next.t('Statistics')}</p>
            <div className="account-container">
              <div className="account-container-body statistics-page">
                <div className="flex stats">
                  <p>{i18next.t('Overall Statistics')}</p>
                  <div onClick={() => history.push('/history')} className="save-btn">
                    <p>{i18next.t('History')}</p>
                  </div>
                </div>
                <div className="pies-container flex">
                  <div className="pie-container">
                    <IonSelect 
                      onIonChange={(e) => changeDeposits(e.detail.value)} 
                      value={deposits} 
                      interfaceOptions={options} 
                      interface={'popover'} 
                      mode={'md'}
                      className="pie-select-days"
                    >
                      <IonSelectOption value={90}>{i18next.t('Last 90 days')}</IonSelectOption>
                      <IonSelectOption value={60}>{i18next.t('Last 60 days')}</IonSelectOption>
                      <IonSelectOption value={30}>{i18next.t('Last 30 days')}</IonSelectOption>
                      <IonSelectOption value={10}>{i18next.t('Last 10 days')}</IonSelectOption>
                      <IonSelectOption value={3}>{i18next.t('Last 3 days')}</IonSelectOption>
                      <IonSelectOption value={1}>{i18next.t('Last 1 day')}</IonSelectOption>
                    </IonSelect>
                    <div className="pie">
                      <Pie
                        bg1='#A6D997'
                        bg2='#DFEEDB'
                        title1={i18next.t('Withdrawal')}
                        title2={i18next.t('Deposit')}
                        header={i18next.t('Balance')}
                        currency={props.data.userData.currency_id}
                        value1={props.data.withdrawals}
                        value2={props.data.deposits}
                        value1_count={props.data.withdrawal_count}
                        value2_count={props.data.deposits_count}
                      />
                    </div>
                  </div>
                  <div className="pie-container">
                    <IonSelect 
                      onIonChange={(e) => changeBets(e.detail.value)} 
                      value={bets} 
                      interfaceOptions={options} 
                      interface={'popover'} 
                      mode={'md'}
                      className="pie-select-days"
                    >
                      <IonSelectOption value={90}>{i18next.t('Last 90 days')}</IonSelectOption>
                      <IonSelectOption value={60}>{i18next.t('Last 60 days')}</IonSelectOption>
                      <IonSelectOption value={30}>{i18next.t('Last 30 days')}</IonSelectOption>
                      <IonSelectOption value={10}>{i18next.t('Last 10 days')}</IonSelectOption>
                      <IonSelectOption value={3}>{i18next.t('Last 3 days')}</IonSelectOption>
                      <IonSelectOption value={1}>{i18next.t('Last 1 day')}</IonSelectOption>
                    </IonSelect>
                    <div className="pie">
                      <Pie
                        bg1='#FEA85A'
                        bg2='#FDDFC4'
                        bg3='##DD6F0C'
                        title1={i18next.t('Wins')}
                        title2={i18next.t('Bets')}
                        header={i18next.t('Global')}
                        currency={props.data.userData.currency_id}
                        value1={props.data.wins}
                        value2={props.data.bets}
                        value1_count={props.data.wins_count}
                        value2_count={props.data.bets_count}
                        // value1_count={thousandSeparator(props.data.wins_count)}
                        // value2_count={thousandSeparator(props.data.bets_count)}
                      />
                    </div>
                  </div>


                </div>
                <div className="games-chart-container">
                  <IonSelect 
                    onIonChange={(e) => changeGames(e.detail.value)} 
                    value={games} 
                    interfaceOptions={options} 
                    interface={'popover'} 
                    mode={'md'}
                    className="pie-select-days"
                  >
                    <IonSelectOption value={10}>{i18next.t('Last 10 days')}</IonSelectOption>
                    <IonSelectOption value={7}>{i18next.t('Last 7 days')}</IonSelectOption>
                    <IonSelectOption value={3}>{i18next.t('Last 3 days')}</IonSelectOption>
                    <IonSelectOption value={1}>{i18next.t('Last 1 day')}</IonSelectOption>
                  </IonSelect>
                  {props.data.topGames.length !== 0 && <div className="games-chart">
                    <ApexChart topGames={props.data.topGames} is4k={props.data.width >= 3400} />
                  </div>}
                  {props.data.topGames.length === 0 && 
                    <div className="games-chart">
                      {i18next.t('No games history during this period.')}
                    </div>
                  }
                </div>

              </div>
            </div>
          </div>

          <Footer data={props.data} />
        </div>}
      </IonContent>
    </IonPage>
  )
}

export default Statistics;
