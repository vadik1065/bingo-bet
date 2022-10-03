import React, { useEffect, useState } from 'react';
import { IonModal, IonRippleEffect, IonSpinner } from '@ionic/react';
import { useAtom } from "jotai";
import { mainLoading, restoreModal, confirmation } from "../state.js";
import { toast } from 'react-toastify';
import axios from 'axios';
import url from '../axios.js';
import i18next from "i18next";
import useInput from '../hooks/useInput.js';
import ToastContent from './ui/toast/ToastContent.js';
import { ReactComponent as Cross } from '../images/cross.svg';
import penIcon from '../images/pen.png';
import keyIcon from '../images/key.png';
import timeIcon from '../images/time.png';
import { ReactComponent as EyeShow } from '../images/eye-show.svg';
import { ReactComponent as EyeHide } from '../images/eye-hide.svg';
import '../css/loginmodal.css';
import { notify } from '../utils/utils.js';

const ForgotModal = () => {
  const [openModal, setOpenModal] = useAtom(restoreModal);
  const [showMainLoading, setShowMainLoading] = useAtom(mainLoading);
  const [showLoading, setShowLoading] = useState(false);
  const email = useInput('', { isEmpty: true, isEmail: true });
  const [step, setStep] = useState('start');
  const [vcode, setVcode] = useState('');
  const password = useInput('', { isEmpty: true });
  const rpassword = useInput('', { isEmpty: true });
  const [showPass, setShowPass] = useState(false);
  const [confirm, setConfirm] = useAtom(confirmation);

  useEffect(() => {
    if (confirm.code && confirm.user) {
      checkRestoreConfirm();
    }
  }, [confirm]);

  const restorePassword = () => {
    if (email.value && !showLoading) {      
      setShowLoading(true);

      axios({
        method: 'post',
        url: url + "/api/restore-password",
        data: {
          restore: email.value
        }
      })
        .then(res => {
          if (res.data.status === 1) {
            notify({ 
              message: i18next.t("Success"),
              description: i18next.t("We have sent a letter on your email with further instructions"),
              icon: "success",
              isEmail: true
            });
            // toast(
            //   <ToastContent 
            //     message={'We have sent a letter on your email with further instructions'} 
            //     icon="success" 
            //     isEmail
            //   />
            // );

            setOpenModal(false);
            setShowLoading(false);
          }
          if (res.data.error) {
            notify({ message: res.data.error });
            // toast(<ToastContent message={res.data.error} />);
            setShowLoading(false);
          };
        })
    } else {
      if (!email.value) {
        email.setCheckSubmit(true);
      }
    }
  }

  const checkRestoreConfirm = () => {
    setShowMainLoading(true);

    axios({
      method: 'post',
      url: url + "/api/check-restore-confirm",
      data: {
        confirmation: confirm.code,
        restore: confirm.user,
      }
    })
      .then(res => {
        if (res.data.status === 1) {
          setStep('finish');
          setShowMainLoading(false);
        }
        if (res.data.errors) {
          email.setValue(confirm.user);
          setStep('check');
          setShowMainLoading(false);
        };
      })
  }

  const restoreFinal = () => {
    if (password.value && password.value === rpassword.value && !showLoading) {
      setShowLoading(true);

      axios({
        method: 'post',
        url: url + "/api/restore-confirm",
        data: {
          password: password.value,
          confirmation: confirm.code,
          restore: confirm.user,
        }
      })
        .then(res => {
          if (!res.data.errors) {
            notify({ 
              message: i18next.t("Success"),
              description: i18next.t("Your password has been changed"),
              icon: "success",
              btn: 'login'
            });
            // toast(
            //   <ToastContent 
            //     message={'Your Pas'} 
            //     description={'Your password has been changed'}
            //     icon="success" 
            //     btn={'login'} 
            //   />
            // );

            setOpenModal(false);
            setShowLoading(false);
          } else {
            notify({ message: res.data.errors });
            // toast(<ToastContent message={res.data.errors} />);
            setShowLoading(false);
          }
        })
    } else {
      if (!password.value) {
        password.setCheckSubmit(true);
      }
      if (!rpassword.value || password.value !== rpassword.value) {
        rpassword.setCheckSubmit(true);
      }
    }
  }

  const closeModal = () => {
    setOpenModal(false);
    email.setValue('');
    password.setValue('');
    rpassword.setValue('');
    setConfirm({ code: '', user: '' });
    setStep('start');
  }

  return (
    <>
      <IonModal 
        isOpen={openModal}
        cssClass='auth-modal forget-modal mod-window auto-height'
        onDidDismiss={closeModal}
      >
        <div className="mod-container flex">
          <div className="modal-data flex">
            <div className="modal-header flex">
              {i18next.t('Reset Password')}
              <div onClick={closeModal} className="absolute-close-modal flex">
                <Cross />
              </div>
            </div>

            <div className="forget-modal-body">
              <>
                {step !== 'finish' ? 
                  <>
                    <div className="forget-modal-top flex">
                      <img src={step === 'start' ? penIcon : timeIcon} alt={step === 'start'? 'pen' : 'time'} />
                      <div className="forget-modal-title">
                        {step === 'start' ?
                          i18next.t('Enter your registered email or username')
                          :
                          i18next.t('Your request is expired')
                        }
                      </div>
                      {step === 'check' && 
                        <div className="forget-modal-description">
                          {i18next.t('Please enter your registered email or username and we’ll send message again')}
                        </div>
                      }
                    </div>
 
                    <div className="auth-modal-inputs-container">
                      <div className="input-container flex">
                        <div className="input-container-label">
                          <span>
                            {i18next.t('Email')} {i18next.t('or')} {i18next.t('Username')}
                          </span>
                        </div>
                        <input
                          value={email.value}
                          onChange={e => email.onChange(e)}
                          className={'field ' + (email.checkSubmit && email.isEmpty ? 'field-error' : '')}
                          type="email" 
                        />
                        {email.checkSubmit && email.isEmpty && 
                          <div className="error-message-block">{i18next.t('Fill the input')}</div>
                        }
                      </div>
                    </div>

                    <div 
                      onClick={restorePassword} 
                      className={`save-btn flex ${!email.value ? 'disabled' : 'ion-activatable'}`}
                      tabIndex="0"
                    >
                      <IonRippleEffect />
                      {showLoading ? <IonSpinner /> : <p>{i18next.t('Next')}</p>}
                    </div>
                  </>
                  :
                  <>
                    <div className="forget-modal-top flex">
                      <img src={keyIcon} alt="key" />
                      <div className="forget-modal-title">{i18next.t('Create a new password')}</div>
                    </div>

                    <div className="auth-modal-inputs-container">
                      <>
                        <div className="input-container password flex">
                          <div className="input-container-label">
                            <span>{i18next.t('New Password')}</span>
                          </div>
                          <input 
                            value={password.value}
                            onChange={e => password.onChange(e)}
                            className={'field ' + ((password.checkSubmit && password.isEmpty) ? 'field-error' : '')}
                            type={`${showPass ? 'text' : 'password' }`} 
                            autoComplete="new-password"
                          />
                          {showPass ? 
                            <EyeHide className="eye" onClick={() => setShowPass(false)} /> 
                            : 
                            <EyeShow className="eye" onClick={() => setShowPass(true)} />
                          }
                          {password.isEmpty && password.checkSubmit && <div className="error-message-block">{i18next.t('Fill the input')}</div>}
                        </div>

                        <div className="input-container password flex">
                          <div className="input-container-label">
                            <span>{i18next.t('Retype New Password')}</span>
                          </div>
                          <input 
                            value={rpassword.value}
                            onChange={e => rpassword.onChange(e)}
                            className={'field ' + ((rpassword.checkSubmit && (rpassword.isEmpty || password.value !== rpassword.value)) ? 'field-error' : '')}
                            type={`${showPass ? 'text' : 'password' }`} 
                            autoComplete="new-password"
                          />
                          {showPass ? 
                            <EyeHide className="eye" onClick={() => setShowPass(false)} /> 
                            : 
                            <EyeShow className="eye" onClick={() => setShowPass(true)} />
                          }
                          {rpassword.isEmpty && rpassword.checkSubmit && <div className="error-message-block">{i18next.t('Fill the input')}</div>}
                          {!rpassword.isEmpty && rpassword.checkSubmit && password.value !== rpassword.value &&
                            <div className="error-message-block">{i18next.t('Passwords do not match')}</div>
                          }
                        </div>
                      </>
                    </div>

                    <div 
                      onClick={restoreFinal} 
                      className={`save-btn w-100 flex ${password.value && rpassword.value ? 'ion-activatable' : 'disabled'}`}
                      tabIndex="0"
                    >
                      <IonRippleEffect />
                      {showLoading ? <IonSpinner /> : <p>{i18next.t('Change Password')}</p>}
                    </div>
                  </>
                }
              </>
            </div>
          </div>
        </div>
      </IonModal>
    </>
  )
}

export default ForgotModal;
