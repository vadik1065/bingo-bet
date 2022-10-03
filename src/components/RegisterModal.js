import React, { useState } from 'react';
import { IonModal, IonCheckbox, IonRippleEffect, IonToast, IonSelect, IonSelectOption } from '@ionic/react';
import { useAtom } from "jotai";
import ReactFlagsSelect from 'react-flags-select';
// import 'react-flags-select/css/react-flags-select.css';
import { registerModal, loginModal, mainLoading, promo, kycModal, userId } from "../state.js";
import { ReactComponent as Cross } from '../images/cross.svg';
import axios from 'axios';
import moment from 'moment';
import url from '../axios.js';
import '../css/registermodal.css';
import i18next from "i18next";
import FP from '@fingerprintjs/fingerprintjs-pro'

const { v4: uuidv4 } = require('uuid');


const RegisterModal = (props) => {
  const [openRegister, setOpenRegister] = useAtom(registerModal);
  const [openKycModal, setOpenKycModal] = useAtom(kycModal);
  /*eslint-disable*/
  const [loading, setLoading] = useAtom(mainLoading);
  const [openLogin, setOpenLogin] = useAtom(loginModal);
  /*eslint-enable*/
  const [errorToast, setErrorToast] = useState(false);
  const [promocode, setPromocode] = useAtom(promo);
  const [errorText, setErrorText] = useState('');
  const [customPromo, setCustomPromo] = useState('');
  const [registerStep, setRegisterStep] = useState(1);
  const [emailInUse, setEmailInUse] = useState(false);
  const [emailFailure, setEmailFailure] = useState('');
  const [usernameInUse, setUsernameInUse] = useState(false);
  const [usernameFailure, setUsernameFailure] = useState('');
  const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  /*register variables*/
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [gender, setGender] = useState('');
  // const [postcode, setPostcode] = useState('');
  // const [currency, setCurrency] = useState('');
  // const [monthly, setMonthly] = useState('');
  // const [weekly, setWeekly] = useState('');
  // const [daily, setDaily] = useState('');
  // const [name, setName] = useState('');
  // const [sirName, setSirName] = useState('');
  // const [mobile, setMobile] = useState('');
  // const [mobileCode, setMobileCode] = useState('');
  // const [city, setCity] = useState('');
  // const [addressLine, setAddressLine] = useState('');
  // const [stateRegion, setStateRegion] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  // const [country, setCountry] = useState('');
  // const [language, setLanguage] = useState('GB');
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [usId, setUserId] = useAtom(userId);

  /*register variables*/
  const options = {
    cssClass: 'custom-select'
  }


  function register() {
    // var uuid = uuidv4();

    // checkError([day, month, year, country, 'GB']);
    checkError([day, month, year, 'GB']);
    checkCheckboxes([checked1, checked2])
    if (checked1 !== false && checked2 !== false) {
      let data = {
        login: username,
        password: password,
        email: email,
        uuid: usId,
        // country: country,
        // language: language,
        subscription: Number(checked3),
        promo: promocode !== '' ? promocode : customPromo,
        birth_date: (day && month && year) ? moment(moment(month + "/" + day + "/" + year).format('L')).unix() : null
        // birth_date: moment(moment(month + "/" + day + "/" + year).format('L')).unix()
      };


      // let requestMetadata = { UUID: uuid };
      // async function sendInfo() {
      //   let fp = await FP.load({ token: "UCmjTCW278UaQTDLjsMJ", region: "eu" });
      //   let response = await fp.get({ tag: requestMetadata, callbackData: true });
      //   // await window.location.reload();
      //   return response;
      // }

      setLoading(true);
      // sendInfo();
      setErrors([]);
      axios({
        method: 'post',
        url: url + '/api/register',
        data: data
      })
        .then(res => {
          localStorage.setItem("token", res.data.data.token);
          // props.setUuid(uuid);
          window.location.reload();
          // sendInfo();
        }).catch(error => {
          if (error.response.status === 333) {
            console.log(error.response.data.error);
            setOpenRegister(false);
            setOpenKycModal(true);
          } else {
            /*422*/
            setErrorText(error.response.data.error);
            setErrorToast(true);
          }
          setRegisterStep(1);
          setLoading(false);
        })
    }
  }
  // function secondStep() {
  //   checkError([name, sirName, day, month, year, country, mobileCode, mobile]);
  //   if (country !== '' &&
  //     gender !== '' &&
  //     name !== '' &&
  //     sirName !== '' &&
  //     day !== '' &&
  //     year !== '' &&
  //     month !== '' &&
  //     mobile !== '' &&
  //     mobileCode !== "") {
  //     setErrors([]);
  //     setRegisterStep(3)
  //   }
  // }
  // function thirdStep() {
  //   checkError([mobileCode, mobile, stateRegion, city, addressLine]);
  //   if (city !== '' &&
  //     stateRegion !== '' &&
  //     mobile !== '' &&
  //     mobileCode !== "" &&
  // postcode !== '' &&
  //     addressLine !== '') {
  //     setErrors([]);
  //     setRegisterStep(4)
  //   }
  // }
  // function register() {
  //   checkError(['GB', currency, daily, weekly, monthly]);
  //   checkCheckboxes([checked1, checked2])
  //   if (checked1 !== false && checked2 !== false) {
  //     let data = {
  //       login: username,
  //       password: password,
  //       email: email,
  //       title: gender,
  //       first_name: name,
  //       last_name: sirName,
  //       country: country,
  //       address_line: addressLine,
  //       city: city,
  //       postcode: postcode,
  //       state: stateRegion,
  //       phone: mobile,
  //       country_code: mobileCode,
  //       language: language,
  //       currency_id: currency,
  //       subscription: checked3,
  //       day_limit: daily,
  //       week_limit: weekly,
  //       month_limit: monthly,
  //       promo: promocode !== '' ? promocode : customPromo,
  //       birth_date: moment(moment(month + "/" + day + "/" + year).format('L')).unix()
  //     };
  //     setLoading(true);
  //     setErrors([]);
  //     axios({
  //       method: 'post',
  //       url: url + '/api/register',
  //       data: data
  //     })
  //       .then(res => {
  //         localStorage.setItem("token", res.data.data.token);
  //         window.location.reload();
  //       }).catch(error => {
  //         /*422*/
  //         setErrorText(error.response.data.error);
  //         setErrorToast(true);
  //         setLoading(false);
  //       })
  //   }
  // }
  function checkError(arr) {
    setErrors(arr.map((el, i) => {
      if (el === '') {
        return i + 1;
      }
      return false;
    }))
  }

  function checkCheckboxes(arr) {
    setBoxes(arr.map((el, i) => {
      if (el !== true) {
        return i + 1
      }
      return false;
    }))
  }

  function checkEmail() {
    checkError([username, password]);
    
    if (email) {
      axios({
        method: 'post',
        url: url + '/api/checkemail',
        data: {
          email: email
        }
      })
        .then(() => {
          setEmailInUse(false);
          if (username !== undefined && username !== '') {
            axios({
              method: 'post',
              url: url + '/api/checkusername',
              data: {
                login: username
              }
            })
              .then(() => {
                setUsernameInUse(false);
                if (username !== ''
                  && email !== ''
                  && emailInUse === false
                  && usernameInUse === false
                  && password !== ''
                ) {
                  setErrors([]);
                  setRegisterStep(2);
                }
              }).catch(error => {
                /*422*/
                setUsernameFailure(error.response.data.error);
                setUsernameInUse(true);
              })
          }

        }).catch((error) => {
          /*422*/
          setEmailFailure(error.response.data.error);
          setEmailInUse(true);

        })
    }

    if (!email) {
      setEmailInUse(false);
      if (username !== undefined && username !== '') {
        axios({
          method: 'post',
          url: url + '/api/checkusername',
          data: {
            login: username
          }
        })
          .then(() => {
            setUsernameInUse(false);
            if (username !== '' && !usernameInUse && password !== '') {
              setErrors([]);
              setRegisterStep(2);
            }
          }).catch(error => {
            /*422*/
            setUsernameFailure(error.response.data.error);
            setUsernameInUse(true);
          })
      }
    }
  }

  function checkNick() {
    if (username !== undefined && username !== '') {
      axios({
        method: 'post',
        url: url + '/api/checkusername',
        data: {
          login: username
        }
      })
        .then(res => {
          setUsernameInUse(false);
        }).catch(error => {
          /*422*/
          setUsernameFailure(error.response.data.error);
          setUsernameInUse(true);
        })
    }
  }

  function clearAll() {
    setOpenRegister(false);
    setRegisterStep(1);
    setUsername('');
    setErrors('');
    setEmail('');
    setPassword('');
    setCustomPromo('');
    setDay('');
    setYear('');
    setMonth('');
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
    setPromocode('')
  }

  return (
    <IonModal isOpen={openRegister}
      cssClass='mod-window register-modal auto-height'
      onDidDismiss={clearAll}
    >
      <div className="mod-container flex">
        <div className="img-container">
          <div className="modal-question">
            {i18next.t('Already have an account?')} <a href="/" onClick={(e) => { e.preventDefault(); setOpenRegister(false); setOpenLogin(true) }} className="login-now">{i18next.t('Login now')}</a>
          </div>
          {/* <div className="modal-attention">
            {i18next.t('Attention On the grounds of legal')}
          </div> */}
        </div>
        <div className="modal-data flex">
          <div onClick={() => setOpenRegister(false)} className="flex absolute-close-modal">
            <Cross />
          </div>

          {/*step1*/}
          {registerStep === 1 && <>
            <p className="modal-title">{i18next.t('Create new account')}</p>
            <p className="modal-description">{i18next.t('Account information')}</p>
            <div className="progress-bar">
              <ul>
                <li className="progress-active"></li>
                <li></li>
              </ul>
            </div>
            <div className="input-container flex">
              <span>{i18next.t('Username')}<span className="require-field">*</span></span>
              <input
                value={username.replace('ошибка')}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => checkNick()}
                placeholder={i18next.t('Username')}
                className={'field ' + (usernameInUse === true ? 'field-error' : '') +
                  (errors.indexOf(1) !== -1 ? 'field-error' : '')}
                type="text" />
            </div>
            <div className="input-container flex">
              <span>{i18next.t('Email')}</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={i18next.t('Email')}
                className={'field ' + (emailInUse === true ? 'field-error' : '') +
                  (errors.indexOf(2) !== -1 ? 'field-error' : '')}
                type="email" />
            </div>
            <div className="input-container flex">
              <span>{i18next.t('Password')}<span className="require-field">*</span></span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={i18next.t('Password')}
                className={'field ' + (errors.indexOf(3) !== -1 ? 'field-error' : '')}
                type="password" />
            </div>
            {/* <div className="input-container flex">
              <span>{i18next.t('Repeat Password')}<span className="require-field">*</span></span>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={i18next.t('Repeat Password')}
                className={'field ' + (errors.indexOf(4) !== -1 ? 'field-error' : '')}
                type="password" />
            </div> */}
            <div className="input-container promo-field flex">
              <span>{i18next.t('Promo code')}</span>
              {promocode !== '' && <input disabled value={promocode} onChange={(e) => setPromocode(e.target.value)} placeholder={i18next.t('Paste your code here')} className='field' type="text" />}
              {promocode === '' && <input value={customPromo} onChange={(e) => setCustomPromo(e.target.value)} placeholder={i18next.t('Your promo code if you have one')} className='field' type="text" />}
            </div>
            <div className="modal-buttons flex">
              <div onClick={() => checkEmail()} className="bit only-btn btn flex ion-activatable">
                <IonRippleEffect />
                {i18next.t('Next')}
              </div>
            </div>
          </>
          }

          {/*step2*/}
          {registerStep === 2 &&
            <>
              <p className="modal-title">{i18next.t('Create new account')}</p>
              <p className="modal-description">{i18next.t('Personal Details')}</p>
              <div className="progress-bar">
                <ul>
                  <li></li>
                  <li className="progress-active"></li>
                </ul>
              </div>
              {/* <div className="input-container flex select">
                <span>{i18next.t('Gender')}<span className="require-field">*</span></span>
                <IonSelect value={gender}
                  onIonChange={e => setGender(e.detail.value)}
                  interfaceOptions={options}
                  placeholder={i18next.t('Select gender')}
                  interface={'popover'}
                  mode={'md'}
                  className={('field gender ' + (errors.indexOf(1) !== -1 ? 'field-error' : ''))}>
                  <IonSelectOption value={'mr'}>{i18next.t('Mr')}</IonSelectOption>
                  <IonSelectOption value={'ms'}>{i18next.t('Ms')}</IonSelectOption>
                </IonSelect>
              </div> 
              <div className="input-container flex">
                <span>{i18next.t('First Name')}<span className="require-field">*</span></span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={i18next.t('First Name')}
                  className={('field ' + (errors.indexOf(2) !== -1 ? 'field-error' : ''))}
                  type="text" />
              </div>
              <div className="input-container flex">
                <span>{i18next.t('Last Name')}<span className="require-field">*</span></span>
                <input value={sirName} onChange={(e) => setSirName(e.target.value)}
                  placeholder={i18next.t('Last Name')}
                  className={('field ' + (errors.indexOf(3) !== -1 ? 'field-error' : ''))}
                  type="text" />
              </div>
              */}
              <div className="input-container flex select">
                <span>{i18next.t('Date of birth')}</span>
                <div className="date-container flex">
                  <IonSelect value={day} onIonChange={e => setDay(e.detail.value)}
                    interfaceOptions={options} placeholder={i18next.t('Day')} interface={'popover'}
                    mode={'md'}
                    className={('field ' + (errors.indexOf(4) !== -1 ? 'field-error' : ''))}>
                    {
                      Array.from(new Array(31), (val, index) => ++index).map((el, i) => {
                        return (
                          <IonSelectOption key={i} value={el}>{el}</IonSelectOption>
                        )
                      })
                    }
                  </IonSelect>
                  <IonSelect value={month} onIonChange={e => setMonth(e.detail.value)}
                    interfaceOptions={options} placeholder={i18next.t('Month')} interface={'popover'}
                    mode={'md'} className={('field ' + (errors.indexOf(5) !== -1 ? 'field-error' : ''))}>
                    {months.map((el, i) => {
                      return (
                        <IonSelectOption key={i} value={++i + ""}>{i18next.t(el)}</IonSelectOption>
                      )
                    })}
                  </IonSelect>
                  <IonSelect value={year} onIonChange={e => setYear(e.detail.value)} interfaceOptions={options} placeholder={i18next.t('Year')} interface={'popover'} mode={'md'} className={('field years ' + (errors.indexOf(6) !== -1 ? 'field-error' : ''))}>
                    {Array.from(new Array(63), (val, index) => (new Date()).getFullYear() - 17 - index).map((el, i) => {
                      return (
                        <IonSelectOption key={i} value={el}>{el}</IonSelectOption>
                      )
                    })}
                  </IonSelect>
                </div>
              </div>
              {/* <div className="input-container flex select">
                <span>{i18next.t('Country')}<span className="require-field">*</span></span>
                <ReactFlagsSelect
                  className={('field country ' + (errors.indexOf(6) !== -1 ? 'field-error' : ''))}
                  searchable={true}
                  onSelect={e => { setCountry(e) }}
                  selected={country}
                  countries={props.countries}
                  blackList={true}
                  searchPlaceholder={i18next.t('Search for a country')} />
              </div> */}
              {/* <div className="input-container input-lang flex select">
                <span>{i18next.t('Preffered Language')}<span className="require-field">*</span></span>
                <ReactFlagsSelect
                  className={'field country lang '}
                  selected={language}
                  customLabels={{ "GB": "English", "ES": "Spanish", "IT": "Italian", "DE": "German", "NL": 'Dutch', "PL": "Polish", "PT": "Portuguese", "RU": "Russian", "TR": "Turkish", "FR": "French", "CN": "Chinese", "JP": "Japanese", "AE": "Arabic" }}
                  countries={["GB", "ES", "IT", "DE", "NL", "PL", "PT", "RU", "TR", "FR", "CN", "JP", "AE"]}
                  onSelect={e => setLanguage(e)} />
              </div> */}

              <div className="policy-checkbox flex">
                <IonCheckbox value={checked1} className={(boxes.indexOf(1) !== -1 ? 'checkbox-error' : '')} onIonChange={e => setChecked1(e.detail.checked)} />
                <span className="require-field">*</span>
                <span>{i18next.t('I accept the')} <a href="/">{i18next.t('Data Protection Policy')}</a>, <a href="/">{i18next.t('Cookie Policy')}</a>, <a href="/">{i18next.t('Disclaimer')}</a>, <a href="/">{i18next.t('Welcome Bonus Terms and Conditions')}</a></span>
              </div>
              <div className="policy-checkbox flex">
                <IonCheckbox value={checked2} className={(boxes.indexOf(2) !== -1 ? 'checkbox-error' : '')} onIonChange={e => setChecked2(e.detail.checked)} />
                <span className="require-field">*</span>
                <span>
                  {i18next.t('I am of legal age to gamble and I accept the')} <a href="/">{i18next.t('Terms and Conditions')}</a>, <a href="/">{i18next.t('Responsible Gambling policy')}</a>, <a href="/">{i18next.t('Contributions')}</a>, {i18next.t('and')} <a href="/">{i18next.t('KYC Policy')}</a>
                </span>
              </div>
              <div className="policy-checkbox flex">
                <IonCheckbox value={checked3} onIonChange={e => setChecked3(e.detail.checked)} />
                <span>{i18next.t('I want to recieve the latest promotions and exclusive offers from Bingo Bet, and the brands managed by Ridotto entertainment.')}</span>
              </div>

              <div className="modal-buttons deposite-buttons flex">
                <div onClick={() => setRegisterStep(registerStep - 1)} className="btn-back">
                  <span>{i18next.t('Back')}</span>
                </div>
                <div onClick={() => register()} className="btn flex ion-activatable">
                  <IonRippleEffect />
                  {i18next.t('Sign up')}
                </div>
              </div>
            </>
          }
          {/*step3*/}
          {/* {
            registerStep === 3 &&
            <>
              <p className="modal-title">{i18next.t('Create new account')}</p>
              <p className="modal-description">{i18next.t('Contact Details')}</p>
              <div className="progress-bar">
                <ul>
                  <li></li>
                  <li></li>
                  <li className="progress-active"></li>
                </ul>
              </div>
              <div className="input-container flex select">
                <span>{i18next.t('Mobile Number')}<span className="require-field">*</span></span>
                <div className="number-container flex">
                  <input value={mobileCode} onChange={(e) => setMobileCode(e.target.value)} placeholder={i18next.t('Code')} className={('field ccode ' + (errors.indexOf(1) !== -1 ? 'field-error' : ''))} />
                  <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder={i18next.t('Number')} className={('field ' + (errors.indexOf(2) !== -1 ? 'field-error' : ''))} type="text" />
                </div>
              </div>
              <div className="input-container flex">
                <span>{i18next.t('State/Region')}<span className="require-field">*</span></span>
                <input value={stateRegion} onChange={(e) => setStateRegion(e.target.value)} placeholder={i18next.t('State/Region')} className={('field ' + (errors.indexOf(3) !== -1 ? 'field-error' : ''))} type="text" />
              </div>
              <div className="input-container flex">
                <span>{i18next.t('City')}<span className="require-field">*</span></span>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder={i18next.t('City')} className={('field ' + (errors.indexOf(4) !== -1 ? 'field-error' : ''))} type="text" />
              </div>
              <div className="input-container flex">
                <span>{i18next.t('Address')}<span className="require-field">*</span></span>
                <input value={addressLine} onChange={(e) => setAddressLine(e.target.value)} placeholder={i18next.t('Address')} className={('field ' + (errors.indexOf(5) !== -1 ? 'field-error' : ''))} type="text" />
              </div>
              <div className="input-container flex">
                <span>{i18next.t('Zip Code')}<span className="require-field">*</span></span>
                <input value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder='7542' className={('field zcode ' + (errors.indexOf(6) !== -1 ? 'field-error' : ''))} type="text" />
              </div>
            </>
          } */}
          {/*step4*/}
          {/* {
            registerStep === 4 &&
            <>
              <p className="modal-title">{i18next.t('Logout')}Create new account</p>
              <p className="modal-description">{i18next.t('Deposit limits')} </p>
              <div className="progress-bar">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li className="progress-active"></li>
                </ul>
              </div>
              <div className="deposite-container flex select">
                <div className="input-container input-lang flex select">
                  <span>{i18next.t('Preffered Language')}<span className="require-field">*</span></span>
                  <ReactFlagsSelect
                    className={'field country lang '}
                    selected={language}
                    customLabels={{ "GB": "English", "ES": "Spanish", "IT": "Italian", "DE": "German", "NL": 'Dutch', "PL": "Polish", "PT": "Portuguese", "RU": "Russian", "TR": "Turkish", "FR": "French", "CN": "Chinese", "JP": "Japanese", "AE": "Arabic" }}
                    countries={["GB", "ES", "IT", "DE", "NL", "PL", "PT", "RU", "TR", "FR", "CN", "JP", "AE"]}
                    onSelect={e => setLanguage(e)} />
                </div>
                <div className="input-container flex select deposit-currency">
                  <span>{i18next.t('Currency')}<span className="require-field">*</span></span>
                  <IonSelect value={currency} onIonChange={e => setCurrency(e.detail.value)} interfaceOptions={options} placeholder={i18next.t('Set')} interface={'popover'} mode={'md'} className={('field ' + (errors.indexOf(2) !== -1 ? 'field-error' : ''))}>
                    {props.currencies.map((el, i) => {
                      return <IonSelectOption key={i} value={el.id}>{el.full_name}</IonSelectOption>
                    })}
                  </IonSelect>
                </div>
                <div className="input-container flex select deposit-daily">
                  <span>{i18next.t('Daily Limit')}<span className="require-field">*</span></span>
                  <IonSelect value={daily} onIonChange={e => setDaily(e.detail.value)} interfaceOptions={options} placeholder={i18next.t('Set')} interface={'popover'} mode={'md'} className={('field ' + (errors.indexOf(3) !== -1 ? 'field-error' : ''))}>
                    <IonSelectOption value={'20'}>20 ($)</IonSelectOption>
                    <IonSelectOption value={'40'}>40 ($)</IonSelectOption>
                    <IonSelectOption value={'60'}>60 ($)</IonSelectOption>
                    <IonSelectOption value={'80'}>80 ($)</IonSelectOption>
                  </IonSelect>
                </div>
                <div className="input-container flex select">
                  <span>{i18next.t('Weekly Limit')}<span className="require-field">*</span></span>
                  <IonSelect value={weekly} onIonChange={e => setWeekly(e.detail.value)} interfaceOptions={options} placeholder={i18next.t('Set')} interface={'popover'} mode={'md'} className={('field ' + (errors.indexOf(4) !== -1 ? 'field-error' : ''))}>
                    <IonSelectOption value={'50'}>50 ($)</IonSelectOption>
                    <IonSelectOption value={'100'}>100 ($)</IonSelectOption>
                    <IonSelectOption value={'200'}>200 ($)</IonSelectOption>
                    <IonSelectOption value={'300'}>300 ($)</IonSelectOption>
                  </IonSelect>
                </div>
                <div className="input-container flex select">
                  <span>{i18next.t('Monthly Limit')}<span className="require-field">*</span></span>
                  <IonSelect value={monthly} onIonChange={e => setMonthly(e.detail.value)} interfaceOptions={options} placeholder={i18next.t('Set')} interface={'popover'} mode={'md'} className={('field ' + (errors.indexOf(5) !== -1 ? 'field-error' : ''))}>
                    <IonSelectOption value={'200'}>200 ($)</IonSelectOption>
                    <IonSelectOption value={'400'}>400 ($)</IonSelectOption>
                    <IonSelectOption value={'600'}>600 ($)</IonSelectOption>
                    <IonSelectOption value={'800'}>800 ($)</IonSelectOption>
                  </IonSelect>
                </div>
              </div>
              <div className="policy-checkbox flex">
                <IonCheckbox value={checked1} className={(boxes.indexOf(1) !== -1 ? 'checkbox-error' : '')} onIonChange={e => setChecked1(e.detail.value)} />
                <span>{i18next.t('I accept the')} <a href="/">{i18next.t('Data Protection Policy')}</a>, <a href="/">{i18next.t('Cookie Policy')}</a>, <a href="/">{i18next.t('Disclaimer')}</a>, <a href="/">{i18next.t('Welcome Bonus Terms and Conditions')}</a></span>
              </div>
              <div className="policy-checkbox flex">
                <IonCheckbox value={checked2} className={(boxes.indexOf(2) !== -1 ? 'checkbox-error' : '')} onIonChange={e => setChecked2(e.detail.value)} />
                <span>{i18next.t('I am of legal age to gamble and I accept the')} <a href="/">{i18next.t('Terms and Conditions')}</a>, <a href="/">{i18next.t('Responsible Gambling policy')}</a>, <a href="/">{i18next.t('Contributions')}</a>, {i18next.t('and')} <a href="/">{i18next.t('KYC Policy')}</a></span>
              </div>
              <div className="policy-checkbox flex">
                <IonCheckbox value={checked3} onIonChange={e => setChecked3(e.detail.value)} />
                <span>{i18next.t('I want to recieve the latest promotions and exclusive offers from Bingo Bet, and the brands managed by Ridotto entertainment.')}</span>
              </div>
              <div className="modal-buttons deposite-buttons flex">
                <div onClick={() => setRegisterStep(3)} className="btn-back">
                  <span>{i18next.t('Back')}</span>
                </div>
                <div onClick={() => register()} className="btn flex ion-activatable">
                  <IonRippleEffect />
                  {i18next.t('Sign up')}
                </div>
              </div>
            </>
          } */}
        </div>
        <div className="modal-question-mob">
          {i18next.t('Already have an account?')} <a href="/" onClick={(e) => { e.preventDefault(); setOpenRegister(false); setOpenLogin(true) }} className="login-now">{i18next.t('Login now')}</a>
        </div>
      </div>
      {/* <div className="modal-attention-mob">
        {i18next.t('Attention On the grounds of legal')}
      </div> */}
      <IonToast
        isOpen={emailInUse}
        onDidDismiss={() => setEmailInUse(false)}
        message={emailFailure}
        color='danger'
        duration={5000}
      />
      <IonToast
        isOpen={usernameInUse}
        onDidDismiss={() => setUsernameInUse(false)}
        message={usernameFailure}
        color='danger'
        duration={5000}
      />
      <IonToast
        isOpen={errorToast}
        onDidDismiss={() => { setEmailInUse(false); setErrorToast(false) }}
        message={errorText}
        color='danger'
        duration={5000}
      />
    </IonModal>
  )
}

export default RegisterModal
