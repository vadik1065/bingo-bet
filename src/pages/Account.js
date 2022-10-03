import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer.js';
import Header from '../components/Header';
import Avatar from '../components/Avatars.js'
import Verify from '../components/Verify';
import { IonContent, IonPage, useIonViewWillLeave, IonSelect, IonCheckbox, IonSelectOption, IonRippleEffect, IonSpinner, IonItem } from '@ionic/react';
import '../css/account.css';
import i18next from "i18next";
import moment from 'moment';
import { useLocation, Link } from 'react-router-dom';
import { ReactComponent as SortBtnUp } from '../images/sort-btn-up.svg';
import { ReactComponent as SortBtnDown } from '../images/sort-btn-down.svg';
import ReactFlagsSelect from 'react-flags-select';
// import 'react-flags-select/css/react-flags-select.css';
import { ReactComponent as Crown } from '../images/crown.svg';
import { ReactComponent as Edit } from '../images/edit.svg';
import chip from '../images/crypto-logos/bcoin.png';
// import {ReactComponent as Balance} from '../images/menu-balance.svg';
// import {ReactComponent as Details} from '../images/menu-details.svg';
// import {ReactComponent as Help} from '../images/menu-help.svg';
// import {ReactComponent as MHistory} from '../images/menu-history.svg';
// import {ReactComponent as Statistics} from '../images/menu-statistics.svg';
import { useDropzone } from 'react-dropzone';
import bg from '../images/unknown.png';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Resizer from "react-image-file-resizer";
import {
  mainLoading,
  globalSuccess,
  globalSuccessText,
  globalFalse,
  globalFalseText
} from "../state.js";
import { useAtom } from "jotai";
import url from '../axios.js';
import useCopyText from '../hooks/useCopyText.js';
import useActivatePromo from '../hooks/useActivatePromo.js';
import CustomSelect from '../components/ui/CustomSelect.js';
import { getHeaderPlayerStatusIcon, notify } from '../utils/utils.js';

function Previews(props) {
  const [files, setFiles] = useState([]);

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  useEffect(() => {
    if (props.defaultAvatar) {
      setFiles([{ preview: props.defaultAvatar.link }]);
      props.getFiles(props.defaultAvatar.id);

      // let file = dataURLtoFile(props.defaultAvatar, 'avatar.png');
      // setFiles([file].map(file => Object.assign(file, {
      //   preview: URL.createObjectURL(file)
      // })));
      // props.getFiles([file]);
    }
  }, [props.defaultAvatar]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      console.log(acceptedFiles);
      props.getFiles(acceptedFiles);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const style = {
    position: 'absolute',
    width: props.is4k ? '172px' : '86px',
    height: props.is4k ? '172px' : '86px',
    borderRadius: '50%'
  };

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  
  return (
    <section className="file-zone-container userpic userpic-container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input  {...getInputProps()} />
        {isDragActive && files !== [] ?
          <div className={'file-zone-active'}>
            <div className={'file-zone-img'}></div>
            {i18next.t('Drop file here')}
          </div> :
          <div className={'file-zone'}>
            <div
              alt="file"
              style={{ background: `url(${props.pic})` }}
              src={props.pic}
              className={'previewImg avatar-prev'}
            />

          </div>
        }
        
        {files !== [] &&
          <div style={style} className={'thumbs-container'}>
            {files.map((file, i) => (
              <div className={"thumb"} key={i}>
                <div
                  alt="file"
                  style={{ backgroundImage: `url(${file.preview})` }}
                  className={'previewImg avatar-prev'}
                />
              </div>
            ))}
          </div>
        }
      </div>
    </section>
  );
}

const Referral = (props) => {
  const { isNotSupportCopyText, copyText } = useCopyText();
  const { promo, setPromo, activatePromo, error, loadingActivatePromo } = useActivatePromo({
    token: props?.token,
    updateUser: props?.updateUser
  });
  const [isEditCode, setEditCode] = useState(false);
  const [editCodeInput, setEditCodeInput] = useState(props.promo);
  const [editCodeInputChangeText, setEditCodeInputChangeText] = useState(props.promo);
  const [editCodeInputIsChange, setEditCodeInputIsChange] = useState(false);
  const [loadingChangeCode, setLoadingChangeCode] = useState(false);

  useEffect(() => {
    if (editCodeInput !== editCodeInputChangeText) {
      setEditCodeInputIsChange(true);
    } else {
      setEditCodeInputIsChange(false);
    }
  }, [editCodeInput]);

  useEffect(() => {
    if (props.promo) {
      setEditCodeInputChangeText(props.promo);
    }
  }, [props.promo]);
  
  function changeRefCode() {
    setLoadingChangeCode(true);
    axios({
      method: 'post',
      url: url + '/api/set-referral-code',
      headers: {
        'Authorization': `Bearer ${props.token}`,
      },
      data: {
        referral_code: editCodeInput
      },
    })
      .then(() => {
        setEditCode(false);
        props.updateUser(props.token);
        notify({ 
          message: i18next.t("Success"),
          description: i18next.t("Your profile was updated."),
          icon: "success",
        });
        setEditCodeInputIsChange(false);
        setLoadingChangeCode(false);
      })
      .catch(error => {
        setEditCode(false);
        notify({ message: error.response.data.error });
        setEditCodeInputIsChange(false);
        setLoadingChangeCode(false);
      })
  }

  useIonViewWillLeave(() => {
    setEditCode(false);
    setEditCodeInput(props.promo);
  });

  return (
    <div className="referral-container">
      <div className="referral-header">
        <div className="referral-title">{i18next.t("Referral program")}</div>
        <Crown />
      </div>
      <div className="referral-body">
        <div className="referral-body-item">
          <div className="referral-body-item-top">{i18next.t("Your referral code")}</div>
          <div className="referral-body-item-bottom">
            <div className={`referral-body-field refcode ${(isNotSupportCopyText && !isEditCode) ? 'big' : ''}`}>
              <input 
                disabled={!isEditCode}
                value={editCodeInput} 
                onChange={(e) => setEditCodeInput(e.target.value)} 
                className='referral-body-field-refcode-input' 
                type="text" 
              />
              <div 
                onClick={() => setEditCode(!isEditCode)} 
                className={`referral-body-field-edit-container ${isEditCode ? 'active' : ''}`}
              >
                <Edit />
              </div>
            </div>

            {isEditCode && 
              <div 
                className={`referral-body-btn green ${editCodeInputIsChange ? 'ion-activatable' : 'disabled'}`}
                onClick={() => {
                  if (editCodeInputIsChange) {
                    changeRefCode();
                  }
                }}
              >
                <IonRippleEffect />
                {loadingChangeCode ? <IonSpinner /> : <span>{i18next.t('Save changes')}</span>}
              </div>
            }
            {!isNotSupportCopyText && !isEditCode &&
              <div 
                className="referral-body-btn ion-activatable"
                onClick={() => copyText(props.promo)}
              >
                <IonRippleEffect />
                {i18next.t("Copy to clipboard")}
              </div>
            }
          </div>
        </div>
        <div className="referral-body-item">
          <div className="referral-body-item-top">{i18next.t("Referral link")}</div>
          <div className="referral-body-item-bottom">
            <div className={`referral-body-field ${isNotSupportCopyText ? 'big' : ''}`}>
              <span className="underline">{props.promo_url}</span>
            </div>
            {!isNotSupportCopyText && 
              <div 
                className="referral-body-btn ion-activatable"
                onClick={() => copyText(props.promo_url)}
              >
                <IonRippleEffect />
                {i18next.t("Copy to clipboard")}
              </div>
            }
          </div>
        </div>
        {props.user_promo_id === null &&
          <div className="referral-body-item">
            <div className="referral-body-item-top">{i18next.t("Promo code")}</div>
            <div className="referral-body-item-bottom">
              <input 
                value={promo} 
                onChange={(e) => setPromo(e.target.value)} 
                placeholder={i18next.t('Enter your promo code')}
                className='referral-body-field input' 
                type="text" 
              />
              <div 
                // className="referral-body-btn ion-activatable"
                className={`referral-body-btn green ${promo ? 'ion-activatable' : 'disabled'}`}
                onClick={() => {
                  if (promo) {
                    activatePromo();
                  }
                }}
              >
                <IonRippleEffect />
                {loadingActivatePromo ? <IonSpinner /> : <span>{i18next.t('Activate')}</span>}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

const Account = (props) => {

  const options = {
    cssClass: 'custom-select'
  };
  const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  const [tab, setTab] = useState(1);
  /*eslint-disable*/
  const [loading, setLoading] = useAtom(mainLoading);

  /*переменные account details*/
  const [gender, setGender] = useState(props.data.userData.title);
  const [name, setName] = useState(props.data.userData.first_name);
  const [sirName, setSirName] = useState(props.data.userData.last_name);
  const [day, setDay] = useState(+moment.unix(props.data.userData.birth_date).format("D"));
  const [year, setYear] = useState(moment.unix(props.data.userData.birth_date).format("YYYY"));
  const [language, setLanguage] = useState(props.data.userData.language);
  const [month, setMonth] = useState(+moment.unix(props.data.userData.birth_date).format("M"));
  const [country, setCountry] = useState(props.data.userData.country);
  const [email, setEmail] = useState(props.data.userData.email);
  const [currency, setCurrency] = useState(props.data.userData.currency_id);
  const [avatar, setAvatar] = useState(props.data.userData.avatar);
  const [avatarsModal, setAvatarsModal] = useState(false);
  const [defaultAvatar, setDefaultAvatar] = useState('');
  /*переменные account details*/
  /*переменные contact info*/
  const [city, setCity] = useState(props.data.userData.city);
  const [postcode, setPostcode] = useState(props.data.userData.postcode);
  const [mobile, setMobile] = useState(props.data.userData.phone);
  const [stateRegion, setStateRegion] = useState(props.data.userData.state);
  const [mobileCode, setMobileCode] = useState(props.data.userData.country_code);
  const [addressLine, setAddressLine] = useState(props.data.userData.address_line);
  const [addressLine2, setAddressLine2] = useState(props.data.userData.address_line2);
  /*переменные contact info*/
  /*переменные games limit*/
  const [monthly, setMonthly] = useState('');
  const [weekly, setWeekly] = useState('');
  const [daily, setDaily] = useState('');
  const [dayLimitDeposit, setDayLimitDeposit] = useState('');
  const [weekLimitDeposit, setWeekLimitDeposit] = useState('');
  const [monthLimitDeposit, setMonthLimitDeposit] = useState('');
  const [dayLimitWithdrawal, setDayLimitWithdrawal] = useState('');
  const [weekLimitWithdrawal, setWeekLimitWithdrawal] = useState('');
  const [monthLimitWithdrawal, setMonthLimitWithdrawal] = useState('');
  /*переменные смены пароля*/
  const [oldPass, setOldPass] = useState('');
  const [newPass1, setNewPass1] = useState('');
  const [newPass2, setNewPass2] = useState('');
  const [vcode, setVcode] = useState('');
  /*eslint-enable*/
  const location = useLocation();

  useIonViewWillLeave(() => {
    setTab(1);
  });

  function closeAccount() {
    setLoading(true);
    axios({
      method: 'post',
      url: url + '/api/close-user',
      headers: {
        'Authorization': `Bearer ${props.data.token}`,
      },
    })
      .then(res => {
        if (res.data.status === 1) {
          localStorage.clear();
          window.location.reload(true);
          setLoading(false);
        }
      })
  }
  
  useEffect(() => {
    if (props.data.verifyErr) {
      setTab(5);
    }
  }, [props.data.verifyErr]);

  useEffect(() => {
    setDefaultAvatar('');

    if (tab === 3) {
      setDaily(props.data.userData.day_limit_bet);
      setWeekly(props.data.userData.week_limit_bet);
      setMonthly(props.data.userData.month_limit_bet);
      setDayLimitDeposit(props.data.userData.day_limit_deposit);
      setWeekLimitDeposit(props.data.userData.week_limit_deposit);
      setMonthLimitDeposit(props.data.userData.month_limit_deposit);
      setDayLimitWithdrawal(props.data.userData.day_limit_withdrawal);
      setWeekLimitWithdrawal(props.data.userData.week_limit_withdrawal);
      setMonthLimitWithdrawal(props.data.userData.month_limit_withdrawal);
    }
  }, [tab]);

  useEffect(() => {
    if (language !== props.data.userData.language) {
      setLanguage(props.data.userData.language)
    }
  }, [props.data.userData.language]);

  useEffect(() => {
    if (language !== props.data.userData.country) {
      setCountry(props.data.userData.country)
    }
  }, [props.data.userData.country]);

  useEffect(() => {
    setCurrency(props.data.userData.currency_id);
  }, [props.data.userData.currency_id]);

  
  function saveDeposits() {
    setLoading(true);
    const data = {
      day_limit_bet: daily.toString(),
      week_limit_bet: weekly.toString(),
      month_limit_bet: monthly.toString(),
      day_limit_deposit: dayLimitDeposit.toString(),
      week_limit_deposit: weekLimitDeposit.toString(),
      month_limit_deposit: monthLimitDeposit.toString(),
      day_limit_withdrawal: dayLimitWithdrawal.toString(),
      week_limit_withdrawal: weekLimitWithdrawal.toString(),
      month_limit_withdrawal: monthLimitWithdrawal.toString(),
    };
    axios({
      method: 'post',
      url: url + '/api/update-profile',
      headers: {
        'Authorization': `Bearer ${props.data.token}`,
      },
      data: data,
    })
      .then(res => {
        if (res.data.status === 1) {
          props.updateUser(props.data.token)
          notify({ 
            message: i18next.t("Success"),
            description: i18next.t("Your profile was updated."),
            icon: "success",
          });
          setLoading(false);
        }
      })
      .catch(error => {
        /*422*/
        console.log(error.response.data);
        // Раскомментить, когда на бэке будет готово
        // notify({ message: error.response.data });
        setLoading(false);
      })
  }

  function saveContact() {
    setLoading(true);
    var data = {
      address_line: addressLine,
      address_line2: addressLine2,
      city: city,
      postcode: postcode,
      state: stateRegion,
      mobile: mobile,
      country_code: mobileCode,
    };
    axios({
      method: 'post',
      url: url + '/api/update-profile',
      headers: {
        'Authorization': `Bearer ${props.data.token}`,
      },
      data: data,
    })
      .then(res => {
        if (res.data.status === 1) {
          props.updateUser(props.data.token)
          // setShowToast1(true);
          notify({ 
            message: i18next.t("Success"),
            description: i18next.t("Your profile was updated."),
            icon: "success",
          });
          setLoading(false);
        }
      })
      .catch(error => {
        /*422*/
        notify({ message: error.response.data });
        setLoading(false);
      })
  }

  function changePassword() {
    axios({
      method: 'post',
      url: url + "/api/restore-password",
      data: {
        restore: email
      }
    })
  }

  function restoreConfirm() {
    if (oldPass !== '' &&
      newPass1 === newPass2 &&
      vcode !== '') {
      setLoading(true);
      axios({
        method: 'post',
        url: url + "/api/restore-confirm",
        data: {
          password: newPass1,
          confirmation: vcode,
          restore: email
        }
      })
        .then(res => {
          if (res.data.errors) {
            notify({ message: res.data.errors });
            setLoading(false);
          };
          if (!res.data.errors) {
            notify({ 
              message: i18next.t("Success"),
              description: i18next.t("Your password was succesfully changed"),
              icon: "success",
            });
            setLoading(false);
            setOldPass('');
            setNewPass1('');
            setNewPass2('');
            setVcode('');
          }
        })
    }
  }

  function update() {
    setLoading(true);
    var data = {
      title: gender,
      first_name: name,
      last_name: sirName,
      birth_date: moment(moment(parseInt(month) + "/" + day + "/" + year).format('L')).unix(),
      country: country,
      language: language,
      currency_id: currency,
    };
    email !== props.data.userData.email ? data.email = email : console.log('email not changed');
    avatar !== props.data.userData.avatar ? data.avatar = avatar : console.log('avatar not changed');
    axios({
      method: 'post',
      url: url + '/api/update-profile',
      headers: {
        'Authorization': `Bearer ${props.data.token}`,
      },
      data: data,
    })
      .then(res => {
        if (res.data.status === 1) {
          props.updateUser(props.data.token);
          notify({ 
            message: i18next.t("Success"),
            description: i18next.t("Your profile was updated."),
            icon: "success",
          });
          setLoading(false);
        }
      })
      .catch(error => {
        /*422*/
        setLoading(false);
        notify({ message: error.response.data.error });
      })
  }

  function setDefault(prop) {
    setDefaultAvatar(prop);
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        128,
        128,
        "JPEG",
        100,
        0,
        (uri) => resolve(uri),
        "base64",
        100,
        100,
      );
    });

  const getFiles = async (data) => {
    if (typeof data === 'object') {
      try {
        const image = await resizeFile(data[0]);
        setAvatar(image);
      } catch (err) {
        console.log(err);
      }
    } else {
      setAvatar(`avatar_id:${data}`);
    }
  };

  // function getFiles(file) {
  //   function getBase64(file) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = function () {
  //       setAvatar(reader.result);
  //     };
  //     reader.onerror = function (error) {
  //       console.log('Error: ', error);
  //     };
  //   }
  //   getBase64(file[0]);
  // }

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
        {location.pathname === '/account' && <div className="homepage flex account-page">

          <div className="width-container">
            <p className="page-title top-of-the-page">{i18next.t('Account Details')}</p>
            <div className="account-container-header flex">
              <div onClick={() => setTab(1)} className={"account-header-tab " + (tab === 1 ? 'active' : '') + (tab === 7 ? 'active' : '')}>
                <div className="img-center-account"></div>
                <p>{i18next.t('Personal info')}</p>
              </div>
              <div onClick={() => setTab(2)} className={"account-header-tab " + (tab === 2 ? 'active' : '')}>
                <div className="img-center-account"></div>
                <p>{i18next.t('Contact info')}</p>
              </div>
              <div onClick={() => setTab(3)} className={"account-header-tab " + (tab === 3 ? 'active' : '')}>
                <div className="img-center-account"></div>
                <p>{i18next.t('Games Limit')}</p>
              </div>
              <div onClick={() => setTab(4)} className={"account-header-tab " + (tab === 4 ? 'active' : '')}>
                <div className="img-center-account"></div>
                <p>{i18next.t('Multiple Logins')}</p>
              </div>
              <div onClick={() => setTab(5)} className={"account-header-tab " + (tab === 5 ? 'active' : '')}>
                <div className="img-center-account"></div>
                <p>{i18next.t('Verify Account')}</p>
              </div>
              <div onClick={() => setTab(6)} className={"account-header-tab " + (tab === 6 ? 'active' : '')}>
                <div className="img-center-account"></div>
                <p>{i18next.t('Close Account')}</p>
              </div>
            </div>

            {/* {tab === 1 && props.data.width <= 767 &&
              <Referral 
                promo={props.data.userData.promo}
                promo_url={props.data.userData.promo_url}
                user_promo_id={props.data.userData.user_promo_id}
                token={props.data.token}
                width={props.data.width}
                updateUser={props.updateUser}
              />
            } */}

            <div className="account-container">
              <div className="account-container-body">
                {tab === 7 &&
                  <div className="account-fields-container flex">
                    <div className="account-title">{i18next.t('Change password')}</div>
                    <div className="input-container flex">
                      <span>{i18next.t('Verification code')}</span>
                      <input value={vcode} onChange={(e) => setVcode(e.target.value)} placeholder={i18next.t('Verification code from e-mail')} className='field password' type="text" />
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('Old password')}</span>
                      <input value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder={i18next.t('Your old password')} className='field password' type="text" />
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('New Password')}</span>
                      <input value={newPass1} onChange={(e) => setNewPass1(e.target.value)} placeholder={i18next.t('New password')} className='field password' type="text" />
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('Repeat New Password')}</span>
                      <input value={newPass2} onChange={(e) => setNewPass2(e.target.value)} placeholder={i18next.t('Repeat password')} className='field password-opened' type="text" />
                      {newPass1 !== newPass2 && <span className="validation-message flex">{i18next.t('Error: Passwords do not match')}</span>}
                    </div>
                  </div>
                }

                {tab === 1 &&
                  <div className="account-fields-container flex">
                    {/* {props.data.width > 767 &&
                      <Referral 
                        promo={props.data.userData.promo}
                        promo_url={props.data.userData.promo_url}
                        user_promo_id={props.data.userData.user_promo_id}
                        token={props.data.token}
                        width={props.data.width}
                        updateUser={props.updateUser}
                      />
                    } */}

                    <div className="input-container flex select">
                      <span>{i18next.t('Gender')}</span>
                      <IonItem lines="none" className="ion-item-select gender">
                        <IonSelect 
                          onIonChange={(e) => setGender(e.detail.value)} 
                          value={gender} 
                          interfaceOptions={options} 
                          placeholder={i18next.t("Select gender")} 
                          interface={'popover'} 
                          mode={'md'} 
                          className='field gender'
                        >
                          <IonSelectOption value={'mr'}>{i18next.t('Mr')}</IonSelectOption>
                          <IonSelectOption value={'ms'}>{i18next.t('Ms')}</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('First Name')}</span>
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder={i18next.t('First Name')} className='field' type="text" />
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('Last Name')}</span>
                      <input value={sirName} onChange={(e) => setSirName(e.target.value)} placeholder={i18next.t('Last Name')} className='field' type="text" />
                    </div>
                    <div className="input-container flex select">
                      <span>{i18next.t('Date of birth')}</span>
                      <div className="date-container flex">
                        <IonItem lines="none" className="ion-item-select">
                          <IonSelect 
                            value={day} 
                            onIonChange={e => setDay(e.detail.value)} 
                            interfaceOptions={options} 
                            placeholder={i18next.t("Day")} 
                            interface={'popover'} 
                            mode={'md'} 
                            className='field'
                          >
                            {Array.from(new Array(31), (val, index) => ++index).map((el, i) => {
                              return (
                                <IonSelectOption key={i} value={el}>{el}</IonSelectOption>
                              )
                            })}
                          </IonSelect>
                        </IonItem>
                        <IonItem lines="none" className="ion-item-select">
                          <IonSelect 
                            value={month} 
                            onIonChange={e => setMonth(e.detail.value)} 
                            interfaceOptions={options} 
                            placeholder={i18next.t("Month")} 
                            interface={'popover'} 
                            mode={'md'} 
                            className='field'
                          >
                            {months.map((el, i) => {
                              return (
                                <IonSelectOption key={i} value={++i}>{i18next.t(el)}</IonSelectOption>
                              )
                            })}
                          </IonSelect>
                        </IonItem>
                        <IonItem lines="none" className="ion-item-select">
                          <IonSelect 
                            value={year} 
                            onIonChange={e => setYear(e.detail.value)} 
                            interfaceOptions={options} 
                            placeholder={i18next.t("Year")} 
                            interface={'popover'} 
                            mode={'md'} 
                            className='field'
                          >
                            {Array.from(new Array(80), (val, index) => (new Date()).getFullYear() - index).map((el, i) => {
                              return (
                                <IonSelectOption key={i} value={el + ""}>{el}</IonSelectOption>
                              )
                            })}
                          </IonSelect>
                        </IonItem>
                      </div>
                    </div>
                    <div className="input-container flex select">
                      <span>{i18next.t('Country')}</span>
                      <CustomSelect 
                        value={country}
                        setValue={e => setCountry(e.value)}
                        options={props.data.countries}
                        isDark={props.color}
                        placeholder={i18next.t("Select a country")} 
                        width={props.data.width}
                      />
                      {/* <ReactFlagsSelect
                        className={'field country '}
                        searchable={true}
                        onSelect={e => setCountry(e)}
                        selected={country}
                        countries={props.data.countries}
                        blackList={true}
                        searchPlaceholder={i18next.t("Select a country")} 
                      /> */}
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('Email')}</span>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='field' type="text" />
                    </div>
                    <div className="deposite-container flex select">
                      <div className="input-container flex select">
                        <span>{i18next.t('Preffered Language')}</span>
                        <CustomSelect 
                          value={language}
                          setValue={e => setLanguage(e.value)}
                          customLabels={{ "GB": "English", "ES": "Spanish", "IT": "Italian", "DE": "German", "NL": 'Dutch', "PL": "Polish", "PT": "Portuguese", "RU": "Russian", "TR": "Turkish", "FR": "French", "CN": "Chinese", "JP": "Japanese", "AE": "Arabic" }}
                          options={["GB", "ES", "IT", "DE", "NL", "PL", "PT", "RU", "TR", "FR", "CN", "JP", "AE"]}
                          isDark={props.color}
                          placeholder={i18next.t('Select Language')}
                          width={props.data.width}
                        />
                        {/* <ReactFlagsSelect
                          className={'field country lang '}
                          placeholder={i18next.t('Select Language')}
                          selected={language}
                          customLabels={{ "GB": "English", "ES": "Spanish", "IT": "Italian", "DE": "German", "NL": 'Dutch', "PL": "Polish", "PT": "Portuguese", "RU": "Russian", "TR": "Turkish", "FR": "French", "CN": "Chinese", "JP": "Japanese", "AE": "Arabic" }}
                          countries={["GB", "ES", "IT", "DE", "NL", "PL", "PT", "RU", "TR", "FR", "CN", "JP", "AE"]}
                          onSelect={e => { setLanguage(e); console.log(e); }} /> */}
                      </div>
                      <div className="input-container flex select">
                        <span>{i18next.t('Currency')}</span>
                        <IonItem lines="none" className="ion-item-select">
                          <IonSelect 
                            value={currency} 
                            onIonChange={e => setCurrency(e.detail.value)} 
                            interfaceOptions={options} 
                            placeholder={i18next.t("Set")} 
                            interface={'popover'} 
                            mode={'md'} 
                            className='field'
                          >
                            {props.data.balance.map((el, i) => {
                              return (
                                <IonSelectOption key={i} value={el.currency_id}>
                                  {el.entity === 'USD' ? 'BingoCoin' : el.entity}
                                </IonSelectOption>
                              )
                            })}
                          </IonSelect>
                        </IonItem>
                      </div>
                    </div>
                    <div className="user-image flex">
                      <span className='avatar-title'>{i18next.t('Avatar')}</span>
                      <Link to="/levels" className='avatar-link'>
                        {getHeaderPlayerStatusIcon(props.data.userData.player_status_id)}
                      </Link>

                      <Previews 
                        defaultAvatar={defaultAvatar} 
                        pic={props.data.userData.avatar === null ? bg : props.data.userData.avatar} 
                        setDefault={setDefault} 
                        getFiles={getFiles} 
                        is4k={props.data.width >= 3400}
                      />
                    </div>
                    <p className='pick-avatar-default' onClick={() => setAvatarsModal(!avatarsModal)}>{i18next.t('Pick default avatar')}</p>
                    <Avatar setDefault={setDefault} avatarsModal={avatarsModal} setAvatarsModal={setAvatarsModal} />
                    {/* <div className="warning-message">
                      <div className="warning-icon flex"></div>
                      <p>{i18next.t('Attention!')}</p>
                      <p>{i18next.t('When you change your preferred currency, your bonuses will also be converted to the new currency')}. {i18next.t('The commission for this operation is')} {props.data.comission}%.</p>
                    </div> */}
                  </div>
                }
                {tab === 2 &&
                  <div className="account-fields-container flex">
                    <div className="input-container flex select">
                      <span>{i18next.t('Mobile Number')}</span>
                      <div className="number-container flex">
                        <input value={mobileCode} onChange={e => setMobileCode(e.target.value)} placeholder={i18next.t('Code')} className='field ccode' type="text" />
                        <input value={mobile} onChange={e => setMobile(e.target.value)} placeholder={i18next.t('Number')} className='field' type="text" />
                      </div>
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('State/Region')}</span>
                      <input value={stateRegion} onChange={e => setStateRegion(e.target.value)} placeholder={i18next.t('State/Region')} className='field' type="text" />
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('City')}</span>
                      <input value={city} onChange={e => setCity(e.target.value)} placeholder={i18next.t('City')} className='field' type="text" />
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('Address')}</span>
                      <input value={addressLine} onChange={e => setAddressLine(e.target.value)} placeholder={i18next.t('Address')} className='field' type="text" />
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('Address Line 2')}</span>
                      <input value={addressLine2} onChange={e => setAddressLine2(e.target.value)} placeholder={i18next.t('Address')} className='field' type="text" />
                    </div>
                    <div className="input-container flex">
                      <span>{i18next.t('Zip Code')}</span>
                      <input value={postcode} onChange={e => setPostcode(e.target.value)} placeholder='7542' className='field' type="text" />
                    </div>
                  </div>
                }

                {tab === 3 &&
                  <div className="account-fields-container games-limit flex">
                    <div className="games-limit-left">
                      <div className="account-title">{i18next.t('Games Limit')}</div>
                      <div className="input-container flex select deposit-daily">
                        <span>{i18next.t('Daily Limit')}</span>
                        <div className="input-container-item flex">
                          <img src={chip} alt="chip" className="bc-icon"/>
                          <input 
                            value={daily} 
                            onChange={e => setDaily(e.target.value)} 
                            placeholder='Set' 
                            className='field with-icon' 
                            type="number"
                          />
                        </div>
                      </div>
                      <div className="input-container flex select">
                        <span>{i18next.t('Weekly Limit')}</span>
                        <div className="input-container-item flex">
                          <img src={chip} alt="chip" className="bc-icon"/>
                          <input 
                            value={weekly} 
                            onChange={e => setWeekly(e.target.value)} 
                            placeholder='Set' 
                            className='field with-icon' 
                            type="number"
                          />
                        </div>
                      </div>
                      <div className="input-container flex select">
                        <span>{i18next.t('Monthly Limit')}</span>
                        <div className="input-container-item flex">
                          <img src={chip} alt="chip" className="bc-icon"/>
                          <input 
                            value={monthly} 
                            onChange={e => setMonthly(e.target.value)} 
                            placeholder='Set' 
                            className='field with-icon' 
                            type="number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="games-limit-right">
                      <div className="games-limit-right-top">
                        <div className="account-title">{i18next.t('Deposit Limit')}</div>
                        <div className="input-container flex">
                          <span>{i18next.t('Daily Limit')}</span>
                          <div className="input-container-item flex">
                            <img src={chip} alt="chip" className="bc-icon"/>
                            <input 
                              value={dayLimitDeposit} 
                              onChange={e => setDayLimitDeposit(e.target.value)} 
                              placeholder='Set' 
                              className='field with-icon' 
                              type="number"
                            />
                          </div>
                        </div>
                        <div className="input-container flex">
                          <span>{i18next.t('Weekly Limit')}</span>
                          <div className="input-container-item flex">
                            <img src={chip} alt="chip" className="bc-icon"/>
                            <input 
                              value={weekLimitDeposit} 
                              onChange={e => setWeekLimitDeposit(e.target.value)} 
                              placeholder='Set' 
                              className='field with-icon' 
                              type="number"
                            />
                          </div>
                        </div>
                        <div className="input-container flex">
                          <span>{i18next.t('Monthly Limit')}</span>
                          <div className="input-container-item flex">
                            <img src={chip} alt="chip" className="bc-icon"/>
                            <input 
                              value={monthLimitDeposit} 
                              onChange={e => setMonthLimitDeposit(e.target.value)} 
                              placeholder='Set' 
                              className='field with-icon' 
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="games-limit-right">
                      <div className="account-title">{i18next.t('Withdraw Limit')}</div>
                      <div className="input-container flex">
                        <span>{i18next.t('Daily Limit')}</span>
                        <div className="input-container-item flex">
                          <img src={chip} alt="chip" className="bc-icon"/>
                          <input 
                            value={dayLimitWithdrawal} 
                            onChange={e => setDayLimitWithdrawal(e.target.value)} 
                            placeholder='Set' 
                            className='field with-icon' 
                            type="number"
                          />
                        </div>
                      </div>
                      <div className="input-container flex">
                        <span>{i18next.t('Weekly Limit')}</span>
                        <div className="input-container-item flex">
                          <img src={chip} alt="chip" className="bc-icon"/>
                          <input 
                            value={weekLimitWithdrawal} 
                            onChange={e => setWeekLimitWithdrawal(e.target.value)} 
                            placeholder='Set' 
                            className='field with-icon' 
                            type="number"
                          />
                        </div>
                      </div>
                      <div className="input-container flex">
                        <span>{i18next.t('Monthly Limit')}</span>
                        <div className="input-container-item flex">
                          <img src={chip} alt="chip" className="bc-icon"/>
                          <input 
                            value={monthLimitWithdrawal} 
                            onChange={e => setMonthLimitWithdrawal(e.target.value)} 
                            placeholder='Set' 
                            className='field with-icon' 
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                }

                {tab === 4 &&
                  <div className="account-table account-table-multiple">
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
                              {i18next.t('Device')}
                            </div>
                          </th>
                          <th>{i18next.t('IP Address')}</th>
                          <th>{i18next.t('Current device')}</th>
                          <th>{i18next.t('Action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          props.data.logins.map((el, i) => {
                            return (
                              <tr key={i}>
                                <td className="device-title">
                                  <div>{el.device === 'Other' ? 'Desktop' : el.device}, {el.os}</div>
                                  {el.current_session === 'yes' && <div className="device-active">{i18next.t('Active')}</div>}
                                  {el.current_session === 'no' && <span className="device-noactive">{i18next.t('Not Active')} </span>}
                                  {el.current_session === 'no' && <span>• {i18next.t('Last active')}: {moment(el.date).format("hh:mm:ss, MM.DD.YYYY")}</span>}

                                </td>
                                <td className="address-title">{el.device_ip}</td>
                                <td className="current-device">
                                  <IonCheckbox disabled={true} checked={el.current_session === 'yes' ? true : false} />
                                </td>
                                <td className="action-btn">
                                  <div>{i18next.t('Logout')}</div>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                }

                {tab === 5 && <Verify data={props.data} updateUser={props.updateUser} />}
                
                {tab === 6 &&
                  <div className="account-closure">
                    <div className="account-title">{i18next.t('Account Closure')}</div>
                    <div className="account-closure-content">
                      <p>{i18next.t('Please be aware, after you deactivate your account')}</p>
                      <p>{i18next.t('You will not be able to log in or open a new account.')}</p>
                      <p>{i18next.t('Pending bets will be settled as normal.')}</p>
                      <p>{i18next.t('You will not be able to withdraw money.')}</p>
                      <p>{i18next.t('You will not be able to deposit money.')}</p>
                      <p>{i18next.t('Make sure you’re happy with your decision before you confirm your account closure. This action cannot be undone')}</p>
                    </div>
                  </div>
                }
              </div>
              {
                tab !== 4 && tab !== 5 && <div className="account-container-footer personal-footer">
                  {
                    tab === 1 &&
                    <div className="account-footer-btns flex">
                      <div onClick={() => { setTab(7); changePassword() }} className="change-password">
                        <p>{i18next.t('Change Password')}</p>
                      </div>
                      <div className="cancel-btn">
                        <p>{i18next.t('Cancel')}</p>
                      </div>
                      <div onClick={() => update()} className="save-btn">
                        <p>{i18next.t('Save')}</p>
                      </div>
                    </div>
                  }
                  {
                    tab === 2 &&
                    <div className="account-footer-btns flex">
                      <div className="cancel-btn left-auto">
                        <p>{i18next.t('Cancel')}</p>
                      </div>
                      <div onClick={() => saveContact()} className="save-btn">
                        <p>{i18next.t('Save')}</p>
                      </div>
                    </div>
                  }
                  {
                    tab === 3 &&
                    <div className="account-footer-btns flex">
                      <div className="cancel-btn left-auto">
                        <p>{i18next.t('Cancel')}</p>
                      </div>
                      <div onClick={() => saveDeposits()} className="save-btn">
                        <p>{i18next.t('Save')}</p>
                      </div>
                    </div>
                  }
                  {
                    tab === 6 &&
                    <div className="account-footer-btns flex">
                      <div onClick={() => closeAccount()} className="save-btn delete">
                        <p>{i18next.t('Confirm Closure')}</p>
                      </div>
                    </div>
                  }
                  {
                    tab === 7 &&
                    <div className="account-footer-btns flex">
                      <div onClick={() => setTab(1)} className="cancel-btn left-auto">
                        <p>{i18next.t('Cancel')}</p>
                      </div>
                      <div onClick={() => restoreConfirm()} className="save-btn save-psword">
                        <p>{i18next.t('Save new password')}</p>
                      </div>
                    </div>
                  }
                </div>}
            </div>
          </div>


          <Footer data={props.data} />
        </div>}
      </IonContent>
    </IonPage>
  )
}

export default Account
