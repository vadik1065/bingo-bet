import React from 'react';
import { IonModal, IonRippleEffect } from '@ionic/react';
import { useAtom } from "jotai";
import { ReactComponent as Cross } from '../images/cross.svg';
import { logoutModal } from "../state.js";
import axios from 'axios';
import url from '../axios.js';
import i18next from "i18next";

const LogoutModal = (props) => {
  const [openLogout, setOpenLogout] = useAtom(logoutModal);
  function logout() {
    setOpenLogout(false);
    axios({
      method: 'post',
      url: url + '/api/logout',
      headers: {
        'Authorization': `Bearer ${props.token}`,
      }
    })
      .then(res => {
        localStorage.removeItem('token');
        document.location.reload(true);
        // document.getElementsByTagName('body')[0].classList.remove('hide-chat')
      });
  }
  return (
    <IonModal isOpen={openLogout}
      cssClass='logout-modal mod-window auto-height'
      onDidDismiss={() => setOpenLogout(false)}
    >
      <div className="mod-container flex">
        <div className="img-container"></div>
        <div className="modal-data logout-container flex">
          <div onClick={() => setOpenLogout(false)} className="flex absolute-close-modal">
            <Cross />
          </div>
          <p className="modal-description">{i18next.t('Are you sure you want to logout?')}</p>
          <div onClick={() => logout()} className="login-btn flex ion-activatable">
            <IonRippleEffect />
            {i18next.t('Logout')}
          </div>
        </div>
      </div>

    </IonModal>
  )
}

export default LogoutModal
