import React, { useState } from 'react';
import { IonModal, IonCheckbox, IonRippleEffect, IonToast, IonSpinner } from '@ionic/react';
import { useAtom } from "jotai";
import { loginModal, restoreModal, kycModal, userId } from "../state.js";
import { ReactComponent as Cross } from '../images/cross.svg';
import axios from 'axios';
import url from '../axios.js';
import i18next from "i18next";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import '../css/loginmodal.css';
import FP from '@fingerprintjs/fingerprintjs-pro'
import useCheckRegister from '../hooks/useCheckRegister.js';
const { v4: uuidv4 } = require('uuid');
// const uuidv4 = require('uuid/v4');

const Loginmodal = (props) => {
  const [openRestore, setOpenRestore] = useAtom(restoreModal);
  const [openLogin, setOpenLogin] = useAtom(loginModal);
  const [btnLoading, setBtnLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState(false);
  const [openKycModal, setOpenKycModal] = useAtom(kycModal);
  const { checkRegister } = useCheckRegister();
  const [usId, setUserId] = useAtom(userId);

  const login = () => {
    setBtnLoading(true);
    axios.interceptors.response.use(response => {
      return response;
    }, function (error, response) {
      if (error.response.status === 422 || error.response.status === 403) {
        setLoginErrorMessage(i18next.t("Incorrect login or password"));
        setLoginError(true);
      }
      if (error.response.status === 333) {
        // некорректная страна
        setOpenLogin(false);
        setOpenKycModal(true);
      }
      return Promise.reject(error);
    });

    var uuid = uuidv4();
    let requestMetadata = { UUID: uuid };
    async function sendInfo() {
      let fp = await FP.load({ token: "UCmjTCW278UaQTDLjsMJ", region: "eu" });
      let response = await fp.get({ tag: requestMetadata, callbackData: true });
      return response;
    }
    setLoginErrorMessage('');
    setLoginError(false);

    axios({
      method: 'post',
      url: url + "/api/login",
      data: {
        password: password,
        login: username,
        uuid: uuid
      }
    })
      .then(res => {
        if (res.data.data.token) {
          props.setToken(res.data.data.token);
          setOpenLogin(false)
          setUsername('');
          setPassword('');
          props.setUuid(uuid);
          setUserId(uuid);
        }
        return res.data
      })
      .finally(() => setBtnLoading(false))
    sendInfo(); // я не понял почему это не в then`e но трогать не стал
  }

  const responseGoogle = (res) => {
    var uuid = uuidv4();
    let requestMetadata = { UUID: uuid };
    async function sendInfo() {
      let fp = await FP.load({ token: "UCmjTCW278UaQTDLjsMJ", region: "eu" });
      let response = await fp.get({ tag: requestMetadata, callbackData: true });
      return response;
    }
    setLoginErrorMessage('');
    setLoginError(false);

    if (res.accessToken) {
      axios({
        method: 'post',
        url: url + "/api/callback/socialite/google",
        data: {
          accessToken: res.accessToken
        }
      })
        .then(res => {
          if (res.data.success) {
            setOpenLogin(false);
            setUsername('');
            setPassword('');
            props.setUuid(uuid);
            setUserId(uuid);
          }
        })
    }

    sendInfo();
  }

  const responseFacebook = (res) => {
    var uuid = uuidv4();
    let requestMetadata = { UUID: uuid };
    async function sendInfo() {
      let fp = await FP.load({ token: "UCmjTCW278UaQTDLjsMJ", region: "eu" });
      let response = await fp.get({ tag: requestMetadata, callbackData: true });
      return response;
    }
    setLoginErrorMessage('');
    setLoginError(false);

    if (res.accessToken) {
      axios({
        method: 'post',
        url: url + "/api/callback/socialite/facebook",
        data: {
          accessToken: res.accessToken
        }
      })
        .then(res => {
          if (res.data.success) {
            props.setToken(res.data.token);
            setOpenLogin(false);
            setUsername('');
            setPassword('');
            props.setUuid(uuid);
            setUserId(uuid);
          }
        })
    }

    sendInfo();
  }


  return (
    <IonModal isOpen={openLogin}
      cssClass='login-modal mod-window auto-height'
      onDidDismiss={() => setOpenLogin(false)}
    >
      <div className="mod-container flex">
        <div className="img-container">
          <div className="modal-question">
            {i18next.t('Dont have an account?')} <a href="/" onClick={(e) => { e.preventDefault(); setOpenLogin(false); checkRegister() }} className="sign-up">{i18next.t('Sign up for free')}</a>
          </div>
        </div>
        <div className="modal-data flex">
          <div onClick={() => setOpenLogin(false)} className="flex absolute-close-modal">
            <Cross />
          </div>
          <p className="modal-title">{i18next.t('Welcome back')}</p>
          <p className="modal-description">{i18next.t('Login to your account')}</p>
          <div className="input-container flex">
            <span>{i18next.t('Username')}</span>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder={i18next.t('Username')} className='field' type="text" />
          </div>
          <div className="input-container flex">
            <span>{i18next.t('Password')}</span>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder={i18next.t('Password')} className='field' type="password" />
          </div>
          <div className="remember-me flex">
            <IonCheckbox />
            <span>{i18next.t('Remember me')}</span>
            <p onClick={() => { setOpenLogin(false); setOpenRestore(true) }} className='forgot-password'>{i18next.t('Forgot password?')}</p>
          </div>

          <GoogleLogin
            // clientId="1058456651698-f5tiujpj9il1k21u6sn9npee3426c6m9.apps.googleusercontent.com"
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            // responseType="code"
            // accessType="offline"
            // cookiePolicy={'single_host_origin'}
          />

          <FacebookLogin
            // appId="3140850979532538"
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            // cssClass="facebook-btn"
            fields="name,email,picture"
            // scope="public_profile,user_friends"
            callback={responseFacebook}
            icon="fa-facebook" 
          />


          <div 
            onClick={() => {
              if (!btnLoading) {
                login()
              }
            }} 
            className="btn login-btn flex ion-activatable"
          >
            <IonRippleEffect />
            {btnLoading ? <IonSpinner /> : i18next.t('Login now')}
          </div>
        </div>
        <div className="modal-question-mob">
          {i18next.t('Dont have an account?')} <a href="/" onClick={(e) => { e.preventDefault(); setOpenLogin(false); checkRegister() }} className="sign-up">{i18next.t('Sign up for free')}</a>
        </div>
      </div>
      <IonToast
        isOpen={loginError}
        onDidDismiss={() => { setLoginError(false) }}
        message={loginErrorMessage}
        color='danger'
        duration={5000}
      />
    </IonModal>
  )
}

export default Loginmodal
