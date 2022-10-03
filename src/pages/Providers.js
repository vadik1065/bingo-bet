import React from 'react';
import '../css/providers.css';
import Footer from '../components/Footer.js';
import ProviderCard from '../components/ProviderCard.js'
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import Header from '../components/Header.js';
import i18next from "i18next";
import { useLocation } from 'react-router-dom';

const Providers = (props) => {
  const location = useLocation();

  const getCountIds = (target, el) => {
    const result = {};
    target.forEach(item =>
      result[item.merchant_id]
        ? result[item.merchant_id]++
        : (result[item.merchant_id] = 1)
    );
    return Object.keys(result).map(item => {
      if (item === el.id) {
        return result[item];
      }
      return null;
    });
  };

  return (
    <IonPage >
      {/* <Header 
        setColor={props.setColor}
        color={props.color} 
        data={props.data} 
        updateUser={props.updateUser} 
      /> */}
      <IonContent id={"providers-page"} className={"page"}>
        {location.pathname === '/providers' && 
          <div className="homepage flex providers-page">
            <div className="width-container">
              <p className="page-title top-of-the-page">{i18next.t('Providers')}</p>
              {props.data.loadingMainData && <IonSpinner className="spinner-loader center" name="lines"/>}
              <div className="providers-block">
                {!props.data.loadingMainData && props.data.providersList.map((el, i) => {
                  return (
                    <ProviderCard 
                      count={getCountIds(props.data.defaultGames, el)} 
                      el={el} 
                      key={el.id} 
                    />
                  )
                })}
              </div>
              {/* <div id="shere"></div> */}
            </div>
            <Footer data={props.data} />
          </div>
        }
      </IonContent>

    </IonPage >
  )
}

export default Providers;
