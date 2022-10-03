import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer.js';
import Header from '../components/Header';
import { IonContent, IonToast, IonPage, useIonViewWillLeave, IonSelectOption, IonSelect, IonLoading, IonSpinner, IonRippleEffect, IonItem } from '@ionic/react';
import '../css/account.css';
import '../css/balance.css';
import i18next from "i18next";
import visa from '../images/visa.png';
import mastercard from '../images/mastercard.png';
import { ReactComponent as Copy } from '../images/copy.svg';
import chip from '../images/crypto-logos/bcoin.svg';
import axios from 'axios';
import { mainLoading,globalFalseText,globalFalse,globalSuccess,globalSuccessText } from "../state.js";
import { useAtom } from "jotai";
import url from '../axios.js';
import moment from 'moment';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { getTempCurrency, notify, thousandSeparator } from '../utils/utils.js';
import useCopyText from '../hooks/useCopyText.js';
import NumberFormat from 'react-number-format';
import WithdrawModal from '../components/WithdrawModal.js';

const Balance = (props) => {
  /*eslint-disable*/
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useAtom(mainLoading);
  const [errorToast, setErrorToast] = useAtom(globalFalse);
  const [goodToast, setGoodToast] = useAtom(globalSuccess);
  const [goodToastText, setGoodToastText] = useAtom(globalSuccessText);
  const [errorMessage, setErrorMessage] = useAtom(globalFalseText);
  /*eslint-enable*/
  const [tab, setTab] = useState(1);

  useIonViewWillLeave(() => {
    setTab(1);
  });

  /*eslint-disable*/
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawXRPTag, setWithdrawXRPTag] = useState('');
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast2Text, setShowToast2Text] = useState(false);
  const [currencyDeposit, setCurrencyDeposit] = useState('');
  const [amountDeposit, setAmountDeposit] = useState('');
  const [currencyWithdraw, setCurrencyWithdraw] = useState('');
  const [amountWithdraw, setAmountWithdraw] = useState('');
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');
  const [balanceTotal, setBalanceTotal] = useState(0);
  const [bonusTotal, setBonusTotal] = useState(0);
  const [currentBalance, setCurrentBalance] = useState({});
  const [cryptoBalanceList, setCryptoBalanceList] = useState([]);
  const [transferFrom, setTransferFrom] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferValue, setTransferValue] = useState('');
  const [calculate, setCalculate] = useState({});
  const [isLoan, setIsLoan] = useState(false);
  const [date, setDate] = useState('');
  const [hasLoan, setHasLoan] = useState(false);
  const [loanPendingValue, setLoanPendingValue] = useState(0);
  const [loanBalanceValue, setLoanBalanceValue] = useState(0);
  // const [moneyValue, setMoneyValue] = useState(0);
  const [loanValue, setLoanValue] = useState('');
  const [maturity, setMaturity] = useState('3 days');
  const [btcPrice, setBtcPrice] = useState(0);
  const [btcWallet, setBtcWallet] = useState('');
  const [currency_name, setCurrencyName] = useState('');
  const [loadingSmall, setLoadingSmall] = useState(false);
  // const [userCurrency, setUserCurrency] = useState(props.data.userData.currency_id);
  const { isNotSupportCopyText, copyText } = useCopyText();
  const [depositComission, setDepositComission] = useState('');
  const [withdrawComission, setWithdrawComission] = useState('');
  const [confirmations, setConfirmations] = useState('');
  const [currencyRates, setCurrencyRates] = useState([]);

  useEffect(() => {
    if (location.pathname === '/balance') {
      setCurrencyDeposit('bitcoin');
    } else {
      setCurrencyWithdraw('');
      setWithdrawAddress('');
      setWithdrawXRPTag('');
      setAmountWithdraw('');
    }
  }, [location.pathname]);
  
  useEffect(() => {
    let balance = 0;
    if (props.data.balance.length > 0) {
      props.data.balance.forEach((item, i) => {
        balance += +item.ob_priv;
      });
      setBalanceTotal(balance.toFixed(2));

      setCurrentBalance(props.data.balance.find(el => el.currency_id == 840));
      setCryptoBalanceList(props.data.balance.filter(el => el.currency_id != 840));
    }
  }, [props.data.balance]);
  
  useEffect(() => {
    if (props.data.currencies.some(el => el.id === props.data.userData.currency_id)) {
      setCurrencyName(props.data.currencies.find(el => el.id === props.data.userData.currency_id).name);
    }
  }, [props.data.userData.currency_id, props.data.currencies]);

  function getBtcWallet() {
    setLoadingSmall(true);
    axios({
      method: 'post',
      url: url + "/api/get-address-payment",
      headers: {
        'Authorization': `Bearer ${props.data.token}`,
      },
      data: {
        payment_system_id: currencyDeposit
      }
    }).then(res => {
        if (res.data.status === 1) {
          setBtcWallet(res.data.data.address);
          setLoadingSmall(false);
        }
      }
    ).catch(error => {
      if (error.response.data.status === 422) {
        notify({ message: error.response.data.error });
        // setErrorMessage(error.response.data.error);
        // setErrorToast(true);
      }
      if (error.response.data.status === 403) {
        notify({ message: error.response.data.error });
        // setErrorMessage(error.response.data.error);
        // setErrorToast(true);
      }
    })
  };

  useEffect(() => {
    if (props.data.listPaymentSystem.some(e => e.payment_system_id === currencyDeposit)) {
      setDepositComission(props.data.listPaymentSystem.find(e => e.payment_system_id === currencyDeposit).percent_depozit);
      setConfirmations(props.data.listPaymentSystem.find(e => e.payment_system_id === currencyDeposit).confirmations);
      axios({
        method: 'post',
        url: url + "/api/get-curs-crypto",
        headers: {
          'Authorization': `Bearer ${props.data.token}`,
        },
        data: {
          payment_system_id: currencyDeposit,
          currency_entity: currency_name
        }
      }).then(res => {
        setBtcPrice(res.data.curs.price);
      }).then(() => deposit()).catch(error => {
        if (error.response.data.status === 403) {
          notify({ message: error.response.data.error });
          // setErrorMessage(error.response.data.error);
          // setErrorToast(true);
        }
      })
    };
    setBtcWallet('');
  }, [currencyDeposit]);

  useEffect(() => {
    props.data.balance.forEach((item) => {
      if (item.currency_id === props.data.userData.currency_id) {
        switch (item.credit_status) {
          case 0:
            setIsLoan(false);
            setHasLoan(false);
            break;
          case 1:
            setIsLoan(true);
            // setMoneyValue(item.credit_ost);
            setLoanPendingValue(item.credit_value);
            setHasLoan(false);
            break;
          case 2:
            setIsLoan(false);
            // setMoneyValue(item.credit_ost);
            setLoanBalanceValue(item.credit_ost);
            setDate(item.credit_time);
            setHasLoan(true);
            break;
        }
      }
    });
  }, [props.data.balance]);

  useEffect(() => {
    if (tab === 2) {
      getExchangeRate();
    }
  }, [tab]);

  useEffect(() => {
    if (transferFrom && transferTo && transferValue && transferValue > 0) {
      calculateTransfer();
    } else {
      setCalculate({});
    }
  }, [transferFrom, transferTo, transferValue]);

  function getExchangeRate() {
    // setLoading(true);
    axios({
      method: 'post',
      url: url + "/api/currency-rates",
      headers: {
        'Authorization': `Bearer ${props.data.token}`,
      }
    })
      .then(res => {
        setCurrencyRates(res.data.data.currencyRates);
        // setLoading(false);
      })
      .catch(error => {
        if (error.response.data.status === 403) {
          notify({ message: error.response.data.error });
          // setErrorMessage(error.response.data.error);
          // setErrorToast(true);
        }
        console.log(error.response.data.error);
        // setLoading(false);
      });
  }

  function calculateTransfer() {
    // setLoading(true);
    axios({
      method: 'post',
      url: url + "/api/calculate-transfer",
      headers: {
        'Authorization': `Bearer ${props.data.token}`,
      },
      data: {
        currency_from: transferFrom,
        currency_to: transferTo,
        amount: transferValue,
      }
    })
      .then(res => {
        console.log(res.data.data);
        setCalculate(res.data.data);
        // setLoading(false);
      })
      .catch(error => {
        console.log(error.response.data.error);
        // setLoading(false);
      });
  }

  function filterCurrencyFrom(el) {
    // пока так, если кроме 840 добавится еще не крипто, то нужно будет добавить в проверку
    if (transferTo && transferTo == 840) {
      return el.iscrypto == 1;
    }
    if (transferTo && transferTo != 840) {
      return el.iscrypto == 0;
    }
    if (!transferTo) {
      return el;
    }
  }

  function filterCurrencyTo(el) {
    // пока так, если кроме 840 добавится еще не крипто, то нужно будет добавить в проверку
    if (transferFrom && transferFrom == 840) {
      return el.iscrypto == 1;
    }
    if (transferFrom && transferFrom != 840) {
      return el.iscrypto == 0;
    }
    if (!transferFrom) {
      return el;
    }
  }

  function verifyCode() {
    if (!loadingCode && currencyWithdraw && withdrawAddress && amountWithdraw) {
      axios({
        method: 'post',
        url: url + '/api/user',
        headers: {
          'Authorization': `Bearer ${props.data.token}`,
        }
      }).
        then((res) => {
          if (res.data.data.player.suspicious === 1) {
            props.setVerifyError();
            history.push('/account');
          } else {
            setLoadingCode(true);
            axios({
              method: 'post',
              url: url + "/api/request-out-crypto-kod",
              headers: {
                'Authorization': `Bearer ${props.data.token}`,
              }
            })
              .then(res => {
                if (res.data.status === 1) {
                  // setGoodToastText('Enter the confirmation code that has been sent to your email');
                  // setGoodToast(true);
                  setWithdrawModalOpen(true);
                  setLoadingCode(false);
                }
              })
              .catch(error => {
                notify({ message: error.response.data.error });
                setLoadingCode(false);
              })
          }
        })
        .catch(error => {
          if (error.message === 'Request failed with status code 401') {
            localStorage.removeItem("token");
            window.location.reload();
          }
        })
    }
  }
  
  function withdrawMoney() {
    setLoading(true);
    // вывод обычной валюты
    if (!props.data.listPaymentSystem.some(e => e.payment_system_id === currencyWithdraw)) {
      if (currencyWithdraw && amountWithdraw) {
        axios({
          method: 'post',
          url: url + "/api/withdraw-money",
          headers: {
            'Authorization': `Bearer ${props.data.token}`,
          },
          data: {
            currency: currencyWithdraw,
            amount: amountWithdraw,
          }
        })
          .then(res => {
            props.updateUser(props.data.token);
            setAmountWithdraw('');
            if (res.data.error) {
              notify({ message: i18next.t('Your amount is less than 10 USD.') });
            }
            if (res.data.status === 1) {
              notify({ 
                message: i18next.t("Success"),
                description: i18next.t("Operation has been submitted. "),
                icon: "success",
              });
              setWithdrawModalOpen(false);
            }
            setLoading(false);
          })
          .catch(error => {
            /*422*/
            setLoading(false);
            notify({ message: error.response.data.error });
          });
        // setLoading(false)
      }
    }
    // вывод крипты
    if (props.data.listPaymentSystem.some(e => e.payment_system_id === currencyWithdraw)) {
      const data = {
        payment_system_id: currencyWithdraw,
        currency_entity: currency_name,
        summa_out: amountWithdraw,
        address_out: withdrawAddress,
        iscrypto: 1,
        confirmation_code: confirmCode
      }
      if (currencyWithdraw === 'ripple' && withdrawXRPTag) {
        data.destination_tag = withdrawXRPTag;
      }

      axios({
        method: 'post',
        url: url + "/api/request-out-crypto",
        headers: {
          'Authorization': `Bearer ${props.data.token}`,
        },
        data
      })
      .then(res => {
        setLoading(false);
        if(!res.data.error) {
          setAmountWithdraw('');
          notify({ 
            message: i18next.t("Success"),
            description: i18next.t("Your request has been sent"),
            icon: "success",
          });
          setWithdrawModalOpen(false);
        } else {
          notify({ message: i18next.t('Your amount is less than 20 EUR.') });
        }
      })
      .catch(error => {
        setLoading(false);
        if (error.response.data.status === 403) {
          notify({ message: error.response.data.error });
        }
        if (error.response.data.status === 422) {
          notify({ message: error.response.data.error });
        }
      })
    }
  }
  
  function transferMoney() {
    if (transferTo !== undefined &&
      transferTo !== '' && transferFrom !== undefined &&
      transferFrom !== '' && transferValue !== undefined &&
      transferValue !== '') {
      setLoading(true);
      axios({
        method: 'post',
        url: url + "/api/transfer-money",
        headers: {
          'Authorization': `Bearer ${props.data.token}`,
        },
        data: {
          currency_from: transferFrom,
          currency_to: transferTo,
          amount: transferValue,
        }
      })
        .then(res => {
          if (res.data.status === 1) {
            props.updateUser(props.data.token);
            setTransferTo('');
            setTransferFrom('');
            setTransferValue('');
            notify({ 
              message: i18next.t("Success"),
              description: i18next.t("Operation has been submitted. "),
              icon: "success",
            });
            setLoading(false);
          }
          if (res.data.error) {
            setLoading(false);
            notify({ message: res.data.error });
          }
        })
        .catch(error => {
          /*422*/
          console.log(error.response.data.error);
          if (error.response.data.status === 403) {
            notify({ message: error.response.data.error });
          }
          setLoading(false);
        })
    }
  }

  function deposit() {
    if (props.data.listPaymentSystem.some(e => e.payment_system_id === currencyDeposit)) {
      getBtcWallet();
    }

    if (!props.data.listPaymentSystem.some(e => e.payment_system_id === currencyDeposit)) {
      if (currencyDeposit !== undefined && currencyDeposit !== '') {
        setLoading(true);
        axios({
          method: 'post',
          url: url + "/api/deposit-money",
          headers: {
            'Authorization': `Bearer ${props.data.token}`,
          },
          data: {
            currency: currencyDeposit,
            // amount: amountDeposit,
          }
        })
          .then(res => {
            props.updateUser(props.data.token);
            setAmountDeposit('');
            if (res.data.error) {
              notify({ message: i18next.t('Your amount is less than 10 USD.') });
            }
            if (res.data.status === 1) {
              notify({ 
                message: i18next.t("Success"),
                description: i18next.t("Operation has been submitted. "),
                icon: "success",
              });
            }
            setLoading(false);
          })
          .catch(error => {
            /*422*/
            setLoading(false);
            notify({ message: error.response.data.error });
          });
        setLoading(false)
      }
    };
  }

  function payOff() {
    if (loanValue !== undefined && loanValue !== '') {
      setLoading(true);
      axios({
        method: 'post',
        url: url + "/api/pay-credit",
        headers: {
          'Authorization': `Bearer ${props.data.token}`,
        },
        data: {
          value: Math.ceil(loanValue),
        }
      })
      .then(res => {
        props.updateUser(props.data.token);
        setLoading(false);
        notify({ 
          message: i18next.t("Success"),
          description: i18next.t("Operation has been submitted. "),
          icon: "success",
        });
        setIsLoan(true);
        // setMoneyValue('');
      })
      .catch(error => {
        /*422*/
        setLoading(false);
        notify({ message: error.response.data.error });
      });
    }
  }

  function loan() {
    if (loanValue !== undefined && loanValue !== '') {
      setLoading(true);
      axios({
        method: 'post',
        url: url + "/api/get-credit",
        headers: {
              'Authorization': `Bearer ${props.data.token}`,
          },
        data: {
          value: Math.ceil(loanValue),
          time: maturity
        }
      })
      .then(res => {
        props.updateUser(props.data.token);
        notify({ 
          message: i18next.t("Success"),
          description: i18next.t("Operation has been submitted. "),
          icon: "success",
        });
        setIsLoan(true);
        // setMoneyValue('');
        setLoading(false);
      })
      .catch(error => {
        /*422*/
        setLoading(false);
        notify({ message: error.response.data.error });
      });
      // props.setShowLoading(false)
    }
  }

  useIonViewWillLeave(() => {
    setTransferTo('');
    setTransferFrom('');
    setTransferValue('');
    setCalculate({});
  })

  return (
    <IonPage >
      {props.data.token === null &&
        <Redirect to="/home" />
      }

      <IonContent className={"page"}>
        {location.pathname==='/balance' && <div className="homepage flex account-page">
          <div className="width-container">
            <p className="page-title top-of-the-page">{i18next.t('Balance')}</p>
            <div className="account-container-header flex">
              <div onClick={() => setTab(1)} className={"account-header-tab " + (tab === 1 ? 'active' : '')}>
                <div className="img-center-balance"></div>
                <p>{i18next.t('Deposit Money')}</p>
              </div>
                <div onClick={() => setTab(2)} className={"account-header-tab " + (tab === 2 ? 'active' : '')}>
                <div className="img-center-balance"></div>
                <p>{i18next.t('Exchange Money')}</p>
              </div>
              <div onClick={() => setTab(3)} className={"account-header-tab " + (tab === 3 ? 'active' : '')}>
                <div className="img-center-balance"></div>
                <p>{i18next.t('Withdraw Money')}</p>
              </div>
              <div onClick={() => setTab(4)} className={"account-header-tab " + (tab === 4 ? 'active' : '')}>
                <div className="img-center-balance"></div>
                <p>{i18next.t('Personal Balance')}</p>
              </div>
              <div onClick={() => setTab(5)} className={"account-header-tab " + (tab === 5 ? 'active' : '')}>
                <div className="img-center-balance"></div>
                <p>{i18next.t('Loan request')}</p>
              </div>
              <div onClick={() => setTab(6)} className={"account-header-tab " + (tab === 6 ? 'active' : '')}>
                <div className="img-center-balance"></div>
                <p>{i18next.t('Funds Security')}</p>
              </div>
            </div>
            <div className="account-container">
              <div className="account-container-body">
                {tab === 1 &&
                  <div className="balance-fields-container">
                    <div className="balance-fields-wrapper">
                      <div className="input-container flex select">
                        <span>{i18next.t('Currency')}</span>
                        <IonItem lines="none" className="ion-item-select">
                          <IonSelect 
                            value={currencyDeposit} 
                            onIonChange={(e) => setCurrencyDeposit(e.detail.value)}
                            placeholder={i18next.t("Set")} 
                            interface={'popover'} 
                            mode={'md'} 
                            className={`field ${currencyDeposit ? 'currency' : ''} ${currencyDeposit}`}
                          >
                            {props.data.listPaymentSystem.map((el, i) => 
                              <IonSelectOption 
                                key={i} 
                                value={el.payment_system_id} 
                                className={`currency-item ${el.payment_system_id}`}
                              >
                                {el.name}
                              </IonSelectOption>
                            )}
                          </IonSelect>
                        </IonItem>
                      </div>
                      {!loadingSmall && btcWallet && 
                        <div className="input-container flex comission">
                          <span>{i18next.t('Comission')}</span>
                          <div className={`body-field`}>
                            <span>{depositComission}%</span>
                          </div>
                        </div>
                      }
                    </div>

                    {loadingSmall && <IonSpinner className="spinner-loader center" name="lines" /> }

                    {!loadingSmall && btcWallet && 
                      <>
                        {currencyDeposit === 'ethereum' &&
                          <div className="balance-fields-wrapper text-container-wrapper">
                            <div className="text-container">
                              {i18next.t('Bingo.Bet only supports ERC20 addresses on the Ethereum blockchain. We ask you to not deposit or withdraw to anything other than an Ethereum address. Bingo.Bet is currently unable to process Ethereum deposits of less than')} {thousandSeparator(props.data.listPaymentSystem.find(el => el.payment_system_id === 'ethereum').min_depozit)} {i18next.t('and above')} {thousandSeparator(props.data.listPaymentSystem.find(el => el.payment_system_id === 'ethereum').max_depozit)}.
                            </div>
                          </div>
                        }
                        <div className="balance-fields-wrapper">
                          <div className="input-container flex address">
                            <span>{i18next.t('Your')} {getTempCurrency(currencyDeposit)} {i18next.t('deposit address')}</span>
                            <div 
                              onClick={() => {
                                if (!isNotSupportCopyText) {
                                  copyText(btcWallet);
                                }
                              }}
                              className={`body-field ${!isNotSupportCopyText ? 'ion-activatable' : ''}`}
                            >
                              <IonRippleEffect />
                              <span>{btcWallet}</span>
                              {!isNotSupportCopyText && <Copy />}
                            </div>
                          </div>
                          <QRCode renderAs={'svg'} className='qr' value={btcWallet}/>
                          <div className='qr-label'>
                            {i18next.t('Only send')}
                            {' '}
                            {getTempCurrency(currencyDeposit)}
                            {' '}
                            {i18next.t('to this address,')}                          
                            {' '}
                            {confirmations}
                            {' '}
                            {i18next.t('confirmation(s) required.')}                          
                          </div>
                        </div>
                      </>
                    }

                    {/* <div className="input-container flex">
                      <span>{i18next.t('Value')}</span>
                      <input value={amountDeposit} onChange={e => setAmountDeposit(e.target.value)} placeholder={i18next.t('Value')} className='field value-field' type="number" />
                    </div> */}

                    {/* {props.data.listPaymentSystem.some(e => e.payment_system_id === currencyDeposit) &&
                      amountDeposit !== '' &&
                      <>
                        <p className='balance-content'>
                          <span className='green'>{amountDeposit}</span> <span className='crypto'>{currencyDeposit}</span> {i18next.t('is approximately')} <span className='green'>{(amountDeposit * btcPrice).toFixed(2)}</span> {currency_name}.
                        </p>
                        <p className='balance-content'>{i18next.t('The exchange rate will be specified at the time of enrollment')}</p>
                      </>
                    } */}
                  </div>
                }

                {tab === 2 &&
                  <div className="balance-fields-container">
                    <div className="balance-fields-deposites-container flex">
                      <div className="deposites-container exchange">
                        {props.data.balance.map((el, i) => {
                          return (
                            <div key={i} className="deposite-line flex">
                              <div className="deposite-line-value flex">
                                {i18next.t('Deposit in')} {el.image_url ? <img src={`${url}/${el.image_url}`} alt="currency" className="chip-icon"/>  : el.entity}
                              </div>
                              <div className="deposite-line-value flex">
                                {el.ob} {el.image_url ? <img src={`${url}/${el.image_url}`} alt="currency" className="chip-icon"/> : el.entity}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="rates-container">
                        <div className="rates-title">Cryptocurrency rate</div>
                        <div className="rates-body">
                          {currencyRates.map(el => {
                            if (JSON.parse(el.add_data).isCrypto == 1) {
                              const pic = JSON.parse(el.add_data).image_url;
                              const rate = Number(el.rate).toFixed(2);
                              return (
                                <div key={el.id} className="rates-body-item">
                                  {pic && <img src={`${url}/${pic}`} alt="currency" className="chip-icon"/>}
                                  <div className="rates-body-item-name">
                                    {el.eng_name} ({el.entity})
                                  </div>
                                  <div className="rates-body-item-value flex">
                                    {thousandSeparator(rate)}
                                    <img src={chip} alt="chip" className="bc-icon"/>
                                  </div>
                                </div>
                              )
                            }
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="input-container flex select">
                      <span>{i18next.t('Transfer From')}</span>
                      <IonItem lines="none" className="ion-item-select">
                        <IonSelect 
                          onIonChange={e => setTransferFrom(e.detail.value)} 
                          value={transferFrom} 
                          placeholder={i18next.t('Set')} 
                          interface={'popover'} 
                          mode={'md'} 
                          className={`field ${transferFrom ? 'currency' : ''} ${transferFrom == 840 ? 'USD' : transferFrom}`}
                        >
                          {props.data.balance
                            .filter(filterCurrencyFrom)
                            .map(el => {
                              return (
                                <IonSelectOption 
                                  key={el.currency_id} 
                                  value={el.currency_id}
                                  className={`currency-item ${el.entity}`}
                                >
                                  {el.currency_id == 840 ? 'BingoCoin' : el.currency_id}
                                </IonSelectOption>
                              )
                          })}
                        </IonSelect>
                      </IonItem>
                    </div>
                    <div className="input-container flex select">
                      <span>{i18next.t('Transfer To')}</span>
                      <IonItem lines="none" className="ion-item-select">
                        <IonSelect 
                          onIonChange={e => setTransferTo(e.detail.value)} 
                          value={transferTo} 
                          placeholder={i18next.t('Set')} 
                          interface={'popover'} 
                          mode={'md'} 
                          className={`field ${transferTo ? 'currency' : ''} ${transferTo == 840 ? 'USD' : transferTo}`}
                        >
                          {props.data.balance
                            .filter(filterCurrencyTo)
                            .map(el => {
                              return (
                                <IonSelectOption 
                                  key={el.currency_id} 
                                  value={el.currency_id}
                                  className={`currency-item ${el.entity}`}
                                >
                                  {el.currency_id == 840 ? 'BingoCoin' : el.currency_id}
                                </IonSelectOption>
                              )
                          })}
                        </IonSelect>
                      </IonItem>
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('Amount')}</span>
                      <input value={transferValue} onChange={e => setTransferValue(e.target.value)} placeholder={i18next.t('Enter amount')} className='field' type="text" />
                    </div>

                    {props.data.width <= 767 && calculate.summaTo && 
                      <div className="calculated">
                        <div className="calculated-item">
                          <span>{i18next.t('Pre-calculated amount')} ≈</span> {thousandSeparator(calculate.summaTo)} {getTempCurrency(transferTo)}
                        </div>
                        <div className="calculated-item">
                          <span>{i18next.t('Percent comission')}:</span> {calculate.persentComission}%
                        </div>
                      </div>
                    }
                  </div>
                }

                {tab === 3 &&
                  <div className="balance-fields-container">
                    <div className="balance-fields-wrapper">
                      <div className="input-container flex select">
                        <span>{i18next.t('Currency')}</span>
                        <IonItem lines="none" className="ion-item-select">
                          <IonSelect 
                            value={currencyWithdraw} 
                            onIonChange={(e) => {
                              setCurrencyWithdraw(e.detail.value);
                              setWithdrawComission(props.data.listPaymentSystem.find(el => el.payment_system_id === e.detail.value).percent_withdrawals);
                            }}
                            placeholder={i18next.t('Set')} 
                            interface={'popover'} 
                            mode={'md'} 
                            className={`field ${currencyWithdraw ? 'currency' : ''} ${currencyWithdraw}`}
                          >
                            {props.data.listPaymentSystem.map((el, i) => 
                              <IonSelectOption 
                                key={i} 
                                value={el.payment_system_id}
                                className={`currency-item ${el.payment_system_id}`}
                              >
                                {el.name}
                              </IonSelectOption>
                            )}
                          </IonSelect>
                        </IonItem>
                      </div>
                      {!loadingSmall && currencyWithdraw && 
                        <div className="input-container flex comission">
                          <span>{i18next.t('Comission')}</span>
                          <div className={`body-field`}>
                            <span>{withdrawComission}%</span>
                          </div>
                        </div>
                      }
                    </div>
                    {props.data.listPaymentSystem.some(e => e.payment_system_id === currencyWithdraw) && 
                      <>
                        <div className="input-container flex">
                          <span>{getTempCurrency(currencyWithdraw)} {i18next.t('Address')}</span>
                          <input 
                            value={withdrawAddress} 
                            onChange={e => setWithdrawAddress(e.target.value)} 
                            placeholder={i18next.t('Enter')} 
                            className='field value-field' 
                            type="text"
                          />
                        </div>
                        
                        {currencyWithdraw === 'ripple' && 
                          <div className="input-container flex">
                            <span>XRP Tag</span>
                            <input 
                              value={withdrawXRPTag} 
                              onChange={e => setWithdrawXRPTag(e.target.value)} 
                              placeholder={i18next.t('Enter')} 
                              className='field value-field' 
                              type="text"
                            />
                          </div>
                        }

                        {/* <div className="input-container flex amount-input-container">
                          <span>{i18next.t('Amount')}</span>
                          <input value={amountWithdraw} onChange={e => setAmountWithdraw(e.target.value)} placeholder={i18next.t('Set amount')} className='field value-field' type="text" />
                        </div> */}

                        <div className={`input-container flex`}>
                          <span>
                            {i18next.t('Amount')}
                            {' '}
                            ({i18next.t('Min')} {thousandSeparator(props.data.listPaymentSystem.find(e => e.payment_system_id === currencyWithdraw).min_withdrawals)},
                            {' '}
                            {i18next.t('Max')} {thousandSeparator(props.data.listPaymentSystem.find(e => e.payment_system_id === currencyWithdraw).max_withdrawals)})
                          </span>

                          <div className="input-container-item flex">
                            {props.data.listPaymentSystem.find(e => e.payment_system_id === currencyWithdraw).image_url &&
                              <img 
                                src={`${url}/${props.data.listPaymentSystem.find(e => e.payment_system_id === currencyWithdraw).image_url}`} 
                                alt="currency" 
                                className="bc-icon"
                              />
                            }
                            {currencyWithdraw == 'bitcoin'
                              ?
                              <NumberFormat
                                value={amountWithdraw} 
                                decimalScale = {'8'}
                                onChange={(e) => setAmountWithdraw(e.target.value)} 
                                className='amount-input' 
                                placeholder={i18next.t('Set amount')} 
                              />
                              :
                              <input 
                                value={amountWithdraw} 
                                onChange={(e) => setAmountWithdraw(e.target.value)} 
                                className='amount-input' 
                                placeholder={i18next.t('Set amount')} 
                                type="text" 
                              />
                            }
                            <div 
                              onClick={() => setAmountWithdraw(props.data.listPaymentSystem.find(e => e.payment_system_id === currencyWithdraw).max_withdrawals)} 
                              className={`max-btn flex ion-activatable`}
                            >
                              <IonRippleEffect />
                              {i18next.t('Max')}
                            </div>
                          </div>
                        </div>

                        {/* {currencyWithdraw && props.data.userData.verified_status === 0 && 
                          <div className="warning-message verify-message">
                            <div className="warning-icon flex"></div>
                            <div className="warning-message-content flex">
                              <div className="warning-message-left">
                                <p>{i18next.t('Confirmation Required!')}</p>
                                <p>{i18next.t('You must verify your email at Your Personal Info before you can withdraw')}</p>
                              </div>
                              <div className="warning-message-btn save-btn">
                                <p>{i18next.t('Verify email')}</p>
                              </div>
                            </div>
                          </div>
                        } */}
                      </>
                    }
                  </div>
                }

                {tab === 4 &&
                  <div className="balance-fields-container">
                    <div className="balance-fields-deposites-container flex">
                      <div className="balance-fields-deposites-item">
                        <div className="balance-title personal-balance-title">{i18next.t('Current balance')}</div>
                        <div className="deposites-container">
                          <div className="deposite-line flex">
                            <div>{i18next.t('Current')}</div>
                            <div className="deposite-line-value flex">
                              {thousandSeparator(currentBalance.ob)}
                              <img src={chip} alt="chip" className="chip-icon"/>
                            </div>
                          </div>
                          <div className="deposite-line flex">
                            <div>{i18next.t('Total balance')}</div>
                            <div className="deposite-line-value flex">
                              {thousandSeparator(balanceTotal)}
                              <img src={chip} alt="chip" className="chip-icon"/>
                            </div>
                          </div>
                          <div className="deposite-line flex">
                            <div>{i18next.t('Total bonuses')}</div>
                            <div className="deposite-line-value flex">
                              {thousandSeparator(currentBalance.ob_b)}
                              <img src={chip} alt="chip" className="chip-icon"/>
                            </div>
                          </div>
                          <div className="deposite-line flex">
                            <div>{i18next.t('Cashback')}</div>
                            <div className="deposite-line-value flex">
                              {thousandSeparator(currentBalance.cashback_total)}
                              <img src={chip} alt="chip" className="chip-icon"/>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="text-container">
                        {i18next.t('Bingo.Bet presents you with a unique wallet system to manage and overview your finances on our site while you play! With the help of our own ‘Bingo Token’, the user will be able to easily and quickly assess their current balance! Please note that the approximation of 1 ‘Bingo Token’ is the equivalent of 1USD of fiat. With this feature the user is able to see his current total balance across all of his cryptocurrency deposits based on their market values, that are regularly checked and updated!')}
                      </div> */}
                    </div>

                    <div className="balance-fields-deposites-container flex">
                      {cryptoBalanceList.length > 0 && 
                        <div className="balance-fields-deposites-item">
                          <div className="balance-title personal-balance-title">{i18next.t('Deposit balance')}</div>
                          <div className="deposites-container">                          
                            {cryptoBalanceList.map(el => 
                              <div key={el.currency_id} className="deposite-line flex">
                                <div>{el.currency_id}</div>
                                <div className="deposite-line-value flex">
                                  {thousandSeparator(el.ob)}
                                  {el.image_url && <img src={`${url}/${el.image_url}`} alt="currency" className="chip-icon"/>}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      }

                      {loanBalanceValue != 0 &&
                        <div className="balance-fields-deposites-item loan">
                          <div className="balance-title personal-balance-title">{i18next.t('Loan balance')}</div>
                          <div className="deposites-container">
                            <div className={"deposite-line flex "+ (date !== null && (+date < moment().unix()) ? "red" : "")}>
                              <div>
                                {i18next.t('Loan')}
                                {' '}
                                {date !== null && <span className={'before-loan green'}>({i18next.t('before')} {moment.unix(date).format('MM-DD-YYYY')})</span >}
                              </div>
                              <div className="deposite-line-value flex">
                                {thousandSeparator(loanBalanceValue)} 
                                {' '}
                                <img src={chip} alt="chip" className="chip-icon"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }

                {tab === 5 &&
                  <div className="balance-fields-container">
                    {isLoan &&
                      <div className="loan-request-header">
                        {i18next.t('Your')} {thousandSeparator(loanPendingValue)}{getTempCurrency(props.data.userData.currency_id)} {i18next.t('loan is pending.')}
                      </div>
                    }
                    {hasLoan &&
                      <div className="loan-request-header">
                        {i18next.t('You need to repay the')} {thousandSeparator(loanBalanceValue)}{getTempCurrency(props.data.userData.currency_id)} 
                        {' '}
                        {date !== null && 
                          <>
                            {i18next.t('loan before')} <strong>{moment.unix(date).format('MM-DD-YYYY')}</strong>
                          </>
                        }
                      </div>
                    }
                    {hasLoan &&
                      <div className="input-container flex">
                        <span>{i18next.t('Value')}</span>
                        <input value={loanValue} onChange={e => setLoanValue(e.target.value)} placeholder={i18next.t('Value')} className='field value-field' type="text" />
                      </div>
                    }
                    {!isLoan && !hasLoan && 
                      <div className="input-container flex">
                        <span>{i18next.t('Value')}</span>
                        <input value={loanValue} onChange={e => setLoanValue(e.target.value)} placeholder={i18next.t('Value')} className='field value-field' type="text" />
                      </div>
                    }
                    {!isLoan && !hasLoan && 
                      <div className="input-container flex select">
                        <span>{i18next.t('Loan maturity')}</span>
                        <IonItem lines="none" className="ion-item-select">
                          <IonSelect value={maturity} onIonChange={e => setMaturity(e.detail.value)} placeholder={i18next.t('Set')} interface={'popover'} mode={'md'} className='field'>
                            <IonSelectOption value={'3 days'}>3 {i18next.t('Days')}</IonSelectOption>
                            <IonSelectOption value={'week'}>7 {i18next.t('Days')}</IonSelectOption>
                            <IonSelectOption value={'month'}>30 {i18next.t('Days')}</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </div>
                    }
                  </div>
                }

                {tab === 6 &&
                  <div className="balance-fields-container">
                    <div className="balance-fund-top flex">
                      <div className="balance-funds-security">
                        <div className="balance-title">{i18next.t('Funds Security')}</div>
                        <div className="balance-content">
                          <p>{i18next.t('Your online security is very important to us.')}</p>
                          <p>{i18next.t('We provide the same levels of security when transferring your funds as banks do and you can be reassured that we have complied with all online regulations and implemented the best in online security.')}</p>
                        </div>
                      </div>
                      <div className="balance-level-compliance">
                        <div className="balance-title">{i18next.t('Encryption')}</div>
                        <div className="balance-content">
                          <p>{i18next.t('After logging in, all information sent to and from the site is encrypted using 128-bit Secure Socket Layer (SSL) technology. The SSL certificate used is issued and verified by Trustwave. This means that any information going through our site cannot be intercepted by a third party.')}</p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="balance-fund-bottom">
                      <div className="balance-title">{i18next.t('PCI DSS Level 1 Compliance')}</div>
                      <div className="balance-content">
                        <p>{i18next.t('This payment system has been certified as PCI-DSS Level 1 Compliant. This PCI-DSS level is the highest level of certification available and means that we follow all of the security requirements from Visa and MasterCard.')}</p>
                        <p>{i18next.t('For some transactions, we may need to ask you for documentation that proves your identity, address, account details or the integrity of your credit card. We do so to ensure maximum security of transactions and to comply with our license requirements. We will contact you directly via email if this is needed.')}</p>
                      </div>
                    </div>
                    <div className="balance-cards flex">
                      <img src={visa} alt="Visa" />
                      <img src={mastercard} alt="Mastercard" />
                    </div> */}
                  </div>
                }
              </div>

              {tab !== 1 && tab !== 4 && tab !== 6 &&
                <div className="account-container-footer">
                  {/* {
                    tab === 1 &&
                    <div className="account-footer-btns balance flex">
                      <div onClick={() => deposit()} className="save-btn">
                        <p>{i18next.t('Deposit')}</p>
                      </div>
                    </div>
                  } */}
                  {tab === 2 &&
                    <div className="account-footer-btns balance flex">
                      {props.data.width > 767 && calculate.summaTo && 
                        <div className="calculated">
                          <div className="calculated-item">
                            <span>Pre-calculated amount ≈</span> {thousandSeparator(calculate.summaTo)} {getTempCurrency(transferTo)}
                          </div>
                          <div className="calculated-item">
                            <span>Percent comission:</span> {calculate.persentComission}%
                          </div>
                        </div>
                      }
                      <div onClick={transferMoney} className="save-btn">
                        <p>{i18next.t('Submit')}</p>
                      </div>
                    </div>
                  }

                  {tab === 3 &&
                    <div className="account-footer-btns balance flex">
                      <div 
                        onClick={verifyCode}
                        className={`save-btn justify-center ${loading || !currencyWithdraw || !withdrawAddress || !amountWithdraw || (currencyWithdraw === 'ripple' && !withdrawXRPTag) ? 'disabled' : ''}`}
                      >
                        {loadingCode ? <IonSpinner /> : <p>{i18next.t('Withdraw')}</p>}
                      </div>
                    </div>
                  }

                  {tab === 5 && !hasLoan && !isLoan &&
                    <div className="account-footer-btns balance flex">
                      <div 
                        onClick={() => {
                          if (!loading) {
                            loan();
                          }
                        }}
                        className={`save-btn ${loading ? 'disabled' : ''}`}
                      >
                        <p>{i18next.t('Submit')}</p>
                      </div>
                    </div>
                  }

                  {tab === 5 && hasLoan &&
                    <div className="account-footer-btns balance flex">
                      <div 
                        onClick={() => {
                          if (!loading) {
                            payOff();
                          }
                        }}
                        className={`save-btn ${loading ? 'disabled' : ''}`}
                      >
                        <p>{i18next.t('Submit')}</p>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
          {/* <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message={i18next.t("Operation has been submitted. ")}
            color='primary'
            duration={3000}
          /> */}
          {/* <IonToast
            isOpen={showToast2}
            onDidDismiss={() => setShowToast2(false)}
            message={showToast2Text}
            color='danger'
            duration={3000}
          /> */}
          <WithdrawModal 
            setIsOpen={setWithdrawModalOpen} 
            isOpen={isWithdrawModalOpen} 
            token={props.data.token}
            withdrawMoney={withdrawMoney}
            confirmCode={confirmCode}
            setConfirmCode={setConfirmCode}
          />
          <Footer data={props.data} />
        </div>}
      </IonContent>
    </IonPage>
  )
}

export default Balance;
