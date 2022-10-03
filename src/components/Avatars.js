import React, { useState, useEffect } from 'react';
import { IonModal } from "@ionic/react";
import axios from 'axios';
import url from '../axios.js';
import i18next from "i18next";
import { ReactComponent as Cross } from '../images/cross.svg';

const Avatar = (props) => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    // setAvatars(importAll(require.context(`../images/avatars`, false, /\.(png|jpe?g|svg)$/)));

    axios({
      method: 'post',
      url: url + "/api/get-avatars",
    })
      .then(res => {
        setAvatars(res.data);
      })
  }, []);

  // function importAll(r) {
  //   console.log(r.keys());
  //   return r.keys().map(r);
  // };
  
  function setImg(img) {
    props.setDefault(img);
    props.setAvatarsModal(false);
  }

  return (
    <IonModal
      isOpen={props.avatarsModal}
      cssClass="mod-window avatars-modal auto-height"
      onDidDismiss={() => props.setAvatarsModal(false)}
    >
      <div className="modal-header flex">
        {i18next.t('Avatars')}
        <div onClick={() => props.setAvatarsModal(false)} className="absolute-close-modal flex">
          <Cross />
        </div>
      </div>
      <div className='avatars-container'>
        {avatars.map(avatar => {
          return (
            <div onClick={() => setImg({ id: avatar.id, link: avatar.url_image })} className='pick-avatar' key={avatar.id}>
              <img src={avatar.url_image} alt="default avatar"/>
            </div>
          )
        })}
        {/* {
          avatars.map((el, i) => {
            return (
              <div onClick={() => setImg(el.default)} className='pick-avatar' key={i}>
                <img src={el.default} alt="default avatar"/>
              </div>
            )
          })
        } */}
      </div>
    </IonModal>
  )
}

export default Avatar;
