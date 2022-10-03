import React, { useRef, useState } from 'react';
import { IonContent, IonPage, IonSpinner, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import Footer from '../components/Footer.js';
import i18next from "i18next";
import axios from 'axios';
import url from '../axios.js';
import redShip from '../images/bg/crash/starship-1.png';
import yellowShip from '../images/bg/crash/starship-2.png';
import blueShip from '../images/bg/crash/starship-3.png';
import orangeShip from '../images/bg/crash/starship-4.png';
import alien1 from '../images/bg/crash/alien-1.png';
import alien2 from '../images/bg/crash/alien-2.png';
import alien3 from '../images/bg/crash/alien-3.png';
import alien4 from '../images/bg/crash/alien-4.png';
import { ReactComponent as Email } from '../images/email.svg';
import { ReactComponent as Heart } from '../images/heart.svg';
import { ReactComponent as Send } from '../images/send-message.svg';
import '../css/crash.css';

const CrashPage = (props) => {
  const blocks = [
    {
      title: "New Age of iGaming Content",
      description: "Slots and live casino games have been the popular go-to choice in gambling for years, however the ever growing technological advancements have given platform for new and innovative type of gambling. We believe 3D interactive games are the future!",
      alien: alien1,
      starship: redShip,
      bg: 'red'
    },
    {
      title: "In-House Game Development",
      description: "Bingo Bet team has been hard at work - developing our own engine for the creation of various 3D crypto games. Together with our talented team of arists, designers and developers we will be able to bring many interesting projects to the iGaming industry.",
      alien: alien2,
      starship: yellowShip,
      bg: 'yellow'
    },
    {
      title: "Immersive Gameplay",
      description: "Immersion and interactivity are two tools that we believe could make the 3D crypto game experience even more interesting! Majority of the anticipation comes from the gambling itself, however this could be largely enhanced by providing the player with a visual experience that keeps them on the edge of their seat!",
      alien: alien3,
      starship: blueShip,
      bg: 'blue'
    }, 
    {
      title: "3D Crash and much more!",
      description: "Our first project that we are planning to release in the very near future - near the end of 2021, will be our take on the popular crypto game CRASH! With variety of ships and scenarios to choose from, no one game will feel the same! We have great plans for cool features that we hope our customers will enjoy, including customisable ships and NFT prizes for big wins!",
      alien: alien4,
      starship: orangeShip,
      bg: 'orange'
    },
  ];

  const [email, setEmail] = useState('');
  const [isSubscribe, setSubscribe] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  useIonViewWillEnter(() => {
    videoRef.current.play();
  });

  useIonViewWillLeave(() => {
    videoRef.current.pause();
    setEmail('');
  });

  const subscribe = (event) => {
    event.preventDefault();
    if (email.trim() && !loading) {
      setLoading(true);
      axios({
        method: 'post',
        url: `${url}/api/save-mailing-address`,
        data: {
          email
        }
      }).then((res) => {
        if (res.data.status === 1) {
          setEmail('');
          setSubscribe(true);
          setLoading(false);
          setTimeout(() => setSubscribe(false), 2000);  
        }
      }).catch(error => {
        console.log(error?.response?.data?.error);
      })
    }
  }

  return (
    <IonPage>
      <IonContent className={"page"}>
        <div className="homepage crashpage flex">
          <div className="width-container">
            <div className="crash-content">
              <div className="crash-video-container">
                <video 
                  // autoPlay
                  loop
                  muted
                  playsInline
                  ref={videoRef}
                >
                  <source src="https://admin.bingo.bet/images/banners/video/space_panorama.webm" type="video/webm"/>
                  <source src="https://admin.bingo.bet/images/banners/video/space_panorama.mp4" type="video/mp4"/>
                  <p>{i18next.t('Your browser does not support the video or formats')}</p>
                </video>
                {props.data.width > 767 && 
                  <div className={`crash-video-title`}>
                    <p>{i18next.t('Bingo Bet 3D Games')}</p>
                    <p>{i18next.t('Future of iGaming - Today!')}</p>
                  </div>
                }
              </div>
              {props.data.width <= 767 && 
                <div className={`crash-video-title mob`}>
                  <p>{i18next.t('Bingo Bet 3D Games')}</p>
                  <p>{i18next.t('Future of iGaming - Today!')}</p>
                </div>
              }

              {blocks.map(item => 
                <div key={item.title} className={`crash-game-container flex ${item.bg}`}>
                  <div className="crash-game-big-planet"></div>
                  <div className="crash-game-small-planet"></div>
                  <div className="crash-game-container-left">
                    <img src={item.alien} alt="alien" className="crash-game-left-img" />
                  </div>
                  <div className="crash-game-container-center">
                    <div className="crash-game-title">{i18next.t(item.title)}</div>
                    <div className="crash-game-description">{i18next.t(item.description)}</div>
                  </div>
                  <div className="crash-game-container-right">
                    <img src={item.starship} alt="spaceship" />
                  </div>
                </div>
              )}

              <div className="crash-subscribe-container flex ">
                <div className={`crash-subscribe-left flex ${isSubscribe ? 'animate' : 'animate2'}`}>
                  {isSubscribe ? <Heart /> : <Email />}
                  <div className="crash-subscribe-labels">
                    {isSubscribe 
                      ?
                      <div className="crash-subscribe-title">{i18next.t('Thanks for Subscribing')}</div>
                      :
                      <>
                        <div className="crash-subscribe-title">{i18next.t('Get Our Newsletter')}</div>
                        <div className="crash-subscribe-description">{i18next.t('For development and bonuses info, subscribe to our newsletter')}</div>
                      </>
                    }
                  </div>
                </div>
                <form 
                  className="crash-subscribe-right flex"
                  onSubmit={subscribe}
                >
                  <div className="input-container flex">
                    <span>{i18next.t('Your email')}</span>
                    <input 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      className='field' 
                      type="email"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className={`send-btn ${email ? '' : 'disabled'}`}
                  >
                    {loading ? <IonSpinner /> : <Send/>}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <Footer data={props.data} />
        </div>
      </IonContent>
    </IonPage >
  )
}

export default CrashPage;
