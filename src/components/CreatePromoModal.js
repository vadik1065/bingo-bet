import React, { useState } from 'react';
import { IonModal, IonRippleEffect, IonSpinner } from '@ionic/react';
import i18next from "i18next";
import url from '../axios.js';
import axios from 'axios';
import { ReactComponent as Cross } from '../images/cross.svg';
import { notify } from '../utils/utils.js';
import "../css/promo.css";

const CreatePromoModal = (props) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  function createPromo(e) {
    e.preventDefault();
    if (name.trim() && code.trim() && !loading) {
      setLoading(true);
      axios({
        method: 'post',
        url: url + "/api/add-promo",
        headers: {
          'Authorization': `Bearer ${props.token}`,
        },
        data: {
          promo: code,
          comment: name
        }
      })
        .then(res => {
          notify({ 
            message: i18next.t("Success"),
            description: i18next.t("Your campaign has been created."),
            icon: "success",
          });
          setLoading(false);
          if (res.data.data.rows) {
            props.setCampaigns(res.data.data.rows);
          }
          props.setIsOpen(false);
        })
        .catch(error => {
          notify({ message: error.response.data.error });
          setLoading(false);
        })
      }
  }

  function clean() {
    props.setIsOpen(false);
    setName('');
    setCode('');
  }

  return (
    <IonModal 
      isOpen={props.isOpen}
      cssClass='mod-window create-promo-window'
      onDidDismiss={() => clean()}
    >
      <div className="mod-container mod-confirm create-promo">
        <div className="modal-data">
          <div onClick={() => props.setIsOpen(false)} className="flex absolute-close-modal">
            <Cross />
          </div>
          <div className="promo-modal-title center">{i18next.t('Create New Campaign')}</div>
          
          <form 
            className="promo-modal-form"
            onSubmit={(e) => createPromo(e)}
          >
            <div className="input-container">
              <div className="input-title">{i18next.t('Campaign Name')} <span>*</span></div>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className='contrast' 
                type="text" 
              />
            </div>
            <div className="input-container">
              <div className="input-title">{i18next.t('Code (Campaign ID)')} <span>*</span></div>
              <input 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                className='contrast' 
                type="text" 
              />
            </div>
            <div className="promo-modal-form-buttons flex">
              <button 
                onClick={() => props.setIsOpen(false)}
                className="cancel-btn ion-activatable" 
                type="button"
              >
                <IonRippleEffect/>
                {i18next.t('Cancel')}
              </button>
              <button 
                className={`save-btn ${(!name.trim() || !code.trim()) ? 'disabled' : ''}`}
                type="submit"
              >
                {loading ? <IonSpinner /> : i18next.t('Create')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </IonModal>
  )
}

export default CreatePromoModal;
