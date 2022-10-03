import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, useIonViewWillLeave } from '@ionic/react';
import { Redirect } from 'react-router';
import i18next from "i18next";
import axios from 'axios';
import url from '../axios.js';
import Header from '../components/Header';
import Footer from '../components/Footer.js';
import Overview from '../components/affiliate/Overview.js';
import Commission from '../components/affiliate/Commission.js';
import Funds from '../components/affiliate/Funds.js';
import RefferedUsers from '../components/affiliate/RefferedUsers.js';
import Campaigns from '../components/affiliate/Campaigns.js';
import '../css/affiliate.css';

const Affiliate = (props) => {
  const headerTabs = [
    { id: 1, title: 'Overview', icon: 'overview' },
    { id: 2, title: 'Commision', icon: 'commision' },
    { id: 3, title: 'Funds', icon: 'funds' },
    { id: 4, title: 'Reffered users', icon: 'reffered-users' },
    { id: 5, title: 'Campaigns', icon: 'campaigns' },
  ];

  const [tab, setTab] = useState(1);

  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  const [funds, setFunds] = useState({});
  const [loadingFunds, setLoadingFunds] = useState(false);

  useEffect(() => {
    if (props.data.token) {
      // getFunds();
      getCampaigns();
    }
  }, [props.data.token]);

  useEffect(() => {
    if (tab === 3) {
      getFunds();
    }
  }, [tab]);

  useIonViewWillLeave(() => {
    setTab(1);
  });

  const getFunds = () => {
    setLoadingFunds(true);
    axios({
      method: 'post',
      url: url + "/api/get-funds",
      headers: {
        'Authorization': `Bearer ${props.data.token}`,
      }
    })
      .then(res => setFunds(res.data.data))
      .catch(error => console.log(error.response.data))
      .finally(() => setLoadingFunds(false))
  }

  const getCampaigns = () => {
    setLoadingCampaigns(true);
    axios({
      method: 'post',
      url: url + "/api/referral-campaigns",
      headers: {
        'Authorization': `Bearer ${props.data.token}`,
      }
    })
      .then(res => {
        if (res.data.data.rows) {
          setCampaigns(res.data.data.rows);
        }
      })
      .catch(error => console.log(error.response.data))
      .finally(() => setLoadingCampaigns(false))
  }

  return (
    <IonPage>
      {/* <Header
        setColor={props.setColor}
        color={props.color}
        data={props.data} 
        updateUser={props.updateUser} 
      /> */}

      <IonContent className={"page"}>
        <div className="homepage flex account-page">
          <div className="width-container">
            <p className="page-title top-of-the-page">{i18next.t('Affiliate program')}</p>
            <div className="account-container-header flex">
              {headerTabs.map(item => 
                <div key={item.id} onClick={() => setTab(item.id)} className={`account-header-tab affiliate-header-tab ${tab === item.id ? 'active' : ''}`}>
                  <div className={`img-center-balance ${item.icon}`}></div>
                  <p>{i18next.t(item.title)}</p>
                </div>
              )}
            </div>
            <div className="account-container">
              <div className="account-container-body">
                {tab === 1 &&
                  <Overview promo_url={props.data.userData.promo_url} />
                }

                {tab === 2 && <Commission />}

                {tab === 3 && 
                  <Funds 
                    funds={funds}
                    getFunds={getFunds}
                    loading={loadingFunds}
                    width={props.width}
                    token={props.data.token}
                    updateUser={props.updateUser}
                  />
                }

                {tab === 4 && 
                  <RefferedUsers 
                    campaigns={campaigns}
                    width={props.width}
                    token={props.data.token}
                    color={props.color}
                    loading={loadingCampaigns}
                  />
                }

                {tab === 5 && 
                  <Campaigns 
                    campaigns={campaigns}
                    setCampaigns={setCampaigns}
                    width={props.width}
                    loading={loadingCampaigns}
                    token={props.data.token}
                  />
                }
              </div>
            </div>
          </div>

          <Footer data={props.data} />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Affiliate;
