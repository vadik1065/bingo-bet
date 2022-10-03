import React, { useState } from 'react';
import { IonContent, IonPage, useIonViewWillLeave } from '@ionic/react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import i18next from "i18next";
import '../css/documents.css';

const IosAppSetup = (props) => {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, title: 'Open website in Safari browser', description: 'Click to open the Safari browser on the phone desktop.', imgClass: 'first' },
    { id: 2, title: 'Tap Sharing button', description: 'Use Safari Explore APP and go to Bingo.bet, then tap the Sharing Button.', imgClass: 'second' },
    { id: 3, title: 'Tap Add to Home Screen', description: 'Press Add to Home Screen in the list popup to add to the home screen. You may need to swipe left to locate the Add to Home Screen button.', imgClass: 'third' },
  ]

  useIonViewWillLeave(() => {
    setStep(1);
  });

  return (
    <IonPage >
      {/* <Header 
        setColor={props.setColor}
        color={props.color} 
        data={props.data} 
        updateUser={props.updateUser} 
      /> */}
      <IonContent className={"page"}>
        <div className="homepage flex">
          <div className={"width-container terms faq ios-app-setup"}>
            <p className="page-title top-of-the-page">{i18next.t('IOS Bingo.bet APP Setup')}</p>
            <p className="ios-app-setup-subtitle">{i18next.t('How to install?')}</p>
            <div className="ios-app-setup-content flex">
              <div className="ios-app-setup-content-left flex">
                <div className="ios-app-setup-content-steps flex"> 
                  {[1, 2, 3].map(el => 
                    <div key={el} className={`step-item ${step === el ? 'active' : ''}`}>
                      {i18next.t('Step')} {el}
                    </div>                    
                  )}
                </div>
                <div className="ios-app-setup-content-title">
                  {step}. {i18next.t(steps[step - 1]?.title)}
                </div>
                <div className="ios-app-setup-content-description">
                  {i18next.t(steps[step - 1]?.description)}
                </div>
                <div className="ios-app-setup-content-btns flex">
                  {step !== 1 && 
                    <button 
                      onClick={() => setStep(prev => prev - 1)}
                      className={`cancel-btn`}
                    >
                      <p>{i18next.t('Back')}</p>
                    </button>
                  }
                  {step !== 3 && 
                    <button 
                      onClick={() => setStep(prev => prev + 1)}
                      className={`save-btn`}
                    >
                      <p>{i18next.t('Next')}</p>
                    </button>
                  }
                </div>
              </div>
              <div className={`ios-app-setup-content-right ${props.color ? 'dark' : ''} ${steps[step - 1]?.imgClass}`}></div>
            </div>
          </div>
          <Footer data={props.data} />
        </div>
      </IonContent>
    </IonPage >
  )
}

export default IosAppSetup;
