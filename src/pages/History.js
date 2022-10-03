import React, { useState,useEffect } from 'react';
import { IonContent, IonPage, useIonViewWillLeave,IonSelect,IonSelectOption, IonItem } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer.js';
import Header from '../components/Header';
import moment from 'moment';
import Pie from '../components/PieChart';
import { ReactComponent as SortBtnUp } from '../images/sort-btn-up.svg';
import { ReactComponent as SortBtnDown } from '../images/sort-btn-down.svg';
import TransactionsChart from '../components/TransactionsChart';
import DayPicker from '../components/DayPicker';
import i18next from "i18next";
import { getTempCurrency, pButtons, thousandSeparator } from '../utils/utils.js';
// import { Redirect } from 'react-router-dom';
import '../css/history.css';
import chip from '../images/crypto-logos/chip.png';

const History = (props) => {
  const location = useLocation();
  const [tab, setTab] = useState(1);
  const [tPeriod, setTPeriod] = useState('period');
  const [propFrom, setPropFrom] = useState(new Date(moment().subtract(30, 'days')));
  const [propTo, setPropTo] = useState(new Date());

  useEffect(() => {
    setTPeriod('period');
    setPropFrom(new Date(moment().subtract(30, 'days')));
    setPropTo(new Date());
  },[tab]);

  useIonViewWillLeave(() => {
    setTab(1);
  });

  function changePeriod(prop,value) {
    setTPeriod(prop);
    if (value !== 0 && value !== null) {
      props.getHistoryTransactions(value, props.data.token);
    }
    if (pButtons.filter(el => el.title === prop)[0].value !== 0 && value === null) {
      props.getHistoryTransactions(pButtons.filter(el => el.title === prop)[0].value, props.data.token);
    }
  }
  function changePeriodGames(prop,value) {
    setTPeriod(prop);
    if (value !== 0 && value !== null) {
      props.getHistoryBets(value, props.data.token);
    };
    if (pButtons.filter(el => el.title === prop)[0].value !== 0 && value === null) {
      props.getHistoryBets(pButtons.filter(el => el.title === prop)[0].value, props.data.token);
    }
  }
  function showExactGames() {
    props.getExactGames(propFrom, propTo, props.data.token)
  }
  function showExact() {
    props.getExactTransactions(propFrom, propTo, props.data.token)
  }
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <IonPage >
      {/* <Header 
        setColor={props.setColor}
        color={props.color} 
        data={props.data} 
        updateUser={props.updateUser} 
      /> */}
      <IonContent className={"page"}>
        {location.pathname==='/history' && <div className="homepage flex account-page">

          <div className="width-container">
            <p className="page-title top-of-the-page">{i18next.t('History')}</p>
            <div className="account-container-header flex hist-header">
              <div onClick={() => setTab(1)} className={"account-header-tab " + (tab === 1 ? 'active' : '')}>
                <div className="img-center-history trans"></div>
                <p>{i18next.t('Transactions')}</p>
              </div>
              <div onClick={() => setTab(2)} className={"account-header-tab " + (tab === 2 ? 'active' : '')}>
                <div className="img-center-history c-games"></div>
                <p>{i18next.t('Casino & Games')}</p>
              </div>
            </div>
            <div className="account-container">
              <div className="account-container-body">
                {tab === 1 &&
                  <div className="transactions-page-container">
                    <div className="buttons-container flex">
                      {
                        pButtons.map((el,i) => {
                          return (
                            <div
                              key={i}
                              onClick={() => changePeriod(el.title.toLowerCase(), el.value)}
                              className={"history-button " + (tPeriod === el.title.toLowerCase() ? 'current' : '')}>
                              {capitalize(el.title)}
                            </div>
                          )
                        })
                      }
                      <IonItem lines="none" className="ion-item-select">
                        <IonSelect
                          mode={'md'} 
                          // mode='ios'
                          interface={'popover'} 
                          // interface='action-sheet'
                          onIonChange={(e) => changePeriod(e.detail.value, null)}
                          value={tPeriod}
                          className={"history-button-mobile field"}>
                          {
                            pButtons.map((el,i) => {
                              return (
                                <IonSelectOption
                                  key={i}
                                  value={el.title}
                                  custom={el.value}
                                  >
                                  {capitalize(el.title)}
                                </IonSelectOption>
                              )
                            })
                          }
                        </IonSelect>
                      </IonItem>
                    </div>
                    <div className="daypicker-btns-ovrl flex">
                      <DayPicker
                        propFrom={propFrom}
                        period={tPeriod}
                        propTo={propTo}
                        setPropTo={setPropTo}
                        setPropFrom={setPropFrom}
                        />
                      <div onClick={() => showExact()} className="showbtn flex">{i18next.t('Show')}</div>
                    </div>

                    {/*graph container*/}
                    {props.data.transactions.length > 0 &&
                      <div className="transaction-graph-container">
                       <TransactionsChart topGames={props.data.transactions} is4k={props.data.width >= 3400} />
                      </div>
                    }
                    {/*no transactions*/}
                    {props.data.transactions.length === 0 &&
                      <p className={'notransactions'}>{i18next.t('No transactions during this period.')}</p>
                    }
                    {props.data.transactions.length > 0 && props.data.width < 767 &&
                      <div className="account-table hist-table">
                        <table>
                          <thead>
                            <tr>
                              <th>
                                {i18next.t('Operation & Date')}
                                <div className="flex">
                                  <div className="sort-btns">

                                    <div className="sort-btn-up">
                                      <SortBtnUp></SortBtnUp>
                                    </div>
                                    <div className="sort-btn-down active">
                                      <SortBtnDown></SortBtnDown>
                                    </div>
                                  </div>

                                </div>
                              </th>
                              <th>{i18next.t('Amount')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              props.data.transactions.map((el, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="address-title color_3">
                                      <span className={"upper curId " + (el.operation === 'withdrawal' ? 'orange': '')}>{el.operation}</span> <br/>
                                      {el.created_at}
                                    </td>
                                    <td className="address-title color_2">
                                      <span>{thousandSeparator(el.amount)}</span> <span className="curId">{getTempCurrency(el.currency_id)}</span>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>

                    }
                    {props.data.transactions.length > 0 && props.data.width > 767 &&
                      <div className="account-table hist-table">
                        <table>
                          <thead>
                            <tr>
                              <th>
                                <div className="flex">
                                  <div className="sort-btns">
                                    <div className="sort-btn-up">
                                      <SortBtnUp></SortBtnUp>
                                    </div>
                                    <div className="sort-btn-down active">
                                      <SortBtnDown></SortBtnDown>
                                    </div>
                                  </div>
                                {i18next.t('Date & Time')}
                                </div>
                              </th>
                              <th>{i18next.t('Operation')}</th>
                              <th>{i18next.t('Amount')}</th>
                              <th>{i18next.t('From/To')}</th>
                              <th>{i18next.t('Status')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              props.data.transactions.map((el, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="address-title color_1">
                                      {el.created_at}
                                    </td>
                                    <td className="address-title color_2">{el.operation}</td>
                                    <td className="current-device color_3">
                                      <span className="amount">{thousandSeparator(el.amount)}</span> <span className="curId">{getTempCurrency(el.currency_id)}</span>
                                    </td>
                                    <td className="address-title color_3">
                                      {el.payment_system_name}
                                    </td>
                                    <td className="address-title color_3">
                                      {el.status}
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    }
                  </div>
                }
                
                {tab === 2 &&
                  <div className="transactions-page-container">
                    <div className="buttons-container flex">
                      {
                        pButtons.map((el,i) => {
                          return (
                            <div
                              key={i}
                              onClick={() => changePeriodGames(el.title.toLowerCase(), el.value)}
                              className={"history-button " + (tPeriod === el.title.toLowerCase() ? 'current' : '')}>
                              {el.title}
                            </div>
                          )
                        })
                      }
                      <IonItem lines="none" className="ion-item-select">
                        <IonSelect
                          mode={'md'} 
                          // mode='ios'
                          interface={'popover'} 
                          // interface='action-sheet'
                          onIonChange={(e) => changePeriodGames(e.detail.value, null)}
                          value={tPeriod}
                          className={"history-button-mobile field"}>
                          {
                            pButtons.map((el,i) => {
                              return (
                                <IonSelectOption
                                  key={i}
                                  value={el.title}
                                  custom={el.value}
                                  >
                                  {capitalize(el.title)}
                                </IonSelectOption>
                              )
                            })
                          }
                        </IonSelect>
                      </IonItem>
                    </div>
                    <div className="daypicker-btns-ovrl flex">
                      <DayPicker
                        propFrom={propFrom}
                        period={tPeriod}
                        propTo={propTo}
                        setPropTo={setPropTo}
                        setPropFrom={setPropFrom}
                        />
                      <div onClick={() => showExactGames()} className="showbtn flex">{i18next.t('Show')}</div>
                    </div>

                    {/*graph container*/}
                    {props.data.games_history.length > 0 &&
                      <div className="transaction-graph-container with-pie">
                        <div className="pie">
                          <Pie
                            bg1='#FEA85A'
                            bg2='#FDDFC4'
                            bg3='#DD6F0C'
                            title1={i18next.t('Total win')}
                            title2={i18next.t('Total bets')}
                            header={i18next.t('Total')}
                            currency={props.data.userData.currency_id}
                            value1={props.data.wins}
                            value2={props.data.bets}
                            value1_count={props.data.wins_count}
                            value2_count={props.data.bets_count}
                          />
                        </div>
                      </div>
                    }

                    {/*no transactions*/}
                    {props.data.games_history.length === 0 &&
                      <p className={'notransactions'}>{i18next.t('No games history during this period.')}</p>
                    }
                    {props.data.games_history.length > 0 && props.data.width < 767 &&
                      <div className="account-table hist-table">
                        <table>
                          <thead>
                            <tr>
                              <th>
                                {i18next.t('Game & Date')}
                                <div className="flex">
                                  <div className="sort-btns">
                                    <div className="sort-btn-up">
                                      <SortBtnUp></SortBtnUp>
                                    </div>
                                    <div className="sort-btn-down active">
                                      <SortBtnDown></SortBtnDown>
                                    </div>
                                  </div>

                                </div>
                              </th>
                              <th>{i18next.t('Amount')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              props.data.games_history.map((el, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="address-title color_3">
                                      {el.game_name} <span className={"curId " + (el.operation === 'Bet' ? 'orange': '')}>({el.operation})</span> <br/>
                                      {el.created_at}
                                    </td>
                                    <td className="address-title color_2">
                                      <span>{thousandSeparator(el.amount)}</span> <span className="curId">{getTempCurrency(el.currency_id)}</span>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    }

                    {props.data.games_history.length > 0 && props.data.width > 767 &&
                      <div className="account-table hist-table">
                        <table>
                          <thead>
                            <tr>
                              <th>
                                <div className="flex">
                                  <div className="sort-btns">
                                    <div className="sort-btn-up">
                                      <SortBtnUp></SortBtnUp>
                                    </div>
                                    <div className="sort-btn-down active">
                                      <SortBtnDown></SortBtnDown>
                                    </div>
                                  </div>
                                  {i18next.t('Game')}
                                </div>
                              </th>
                              <th>{i18next.t('Operation')}</th>
                              <th>{i18next.t('Amount')}</th>
                              <th>{i18next.t('Date & Time')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              props.data.games_history.map((el, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="address-title color_3">
                                      {el.game_name}
                                    </td>
                                    <td className="address-title color_2">
                                      {el.operation}
                                    </td>
                                    <td className="current-device color_3">
                                      <span>{thousandSeparator(el.amount)}</span> <span className="curId">{getTempCurrency(el.currency_id)}</span>
                                    </td>
                                    <td className="address-title  color_1">
                                      {el.created_at}
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
          <Footer data={props.data} />
        </div>}
      </IonContent>
    </IonPage>
  )
}

export default History;
