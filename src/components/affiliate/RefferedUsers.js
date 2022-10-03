import React, { useEffect, useState } from 'react';
import i18next from "i18next";
import axios from 'axios';
import url from '../../axios';
import moment from 'moment';
import { IonItem, IonSelect, IonSelectOption, IonSpinner } from '@ionic/react';
import { getCurrencyIcon, getTempCurrency, thousandSeparator } from '../../utils/utils';
import noEntriesPic from '../../images/no-entries.png';
import noEntriesLightPic from '../../images/no-entries-light.png';

const RefferedUsers = (props) => {
  const [campaignName, setCampaignName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [referralUsers, setReferralUsers] = useState([]);
  const [curFilter, setCurFilter] = useState('commission');
  const [referralUsersFiltered, setReferralUsersFiltered] = useState([]);

  useEffect(() => {
    if (referralUsers.length) {
      curFilter === 'created_at' 
      ?
      setReferralUsersFiltered(referralUsers.sort((a, b) => moment(b[curFilter] || 0).unix() - moment(a[curFilter] || 0).unix()))
      :
      setReferralUsersFiltered(referralUsers.sort((a, b) => b[curFilter] - a[curFilter]));
    }
  }, [curFilter, referralUsers.length]);

  const getReferredUsers = (promo) => {
    setCampaignName(promo);
    setLoading(true);
    axios({
      method: 'post',
      url: url + "/api/referred-users",
      headers: {
        'Authorization': `Bearer ${props.token}`,
      },
      data: {
        promo
      }
    })
      .then(res => setReferralUsers(res.data.data.rows))
      .catch(error => console.log(error.response.data))
      .finally(() => setLoading(false))
  }
  
  return (
    <div className="balance-fields-container affiliate-fields-container">
      <div className="balance-title affiliate-title">{i18next.t('Reffered users')}</div>

      {props.campaigns.filter(c => c.promo !== 'all').length > 0 && 
        <div className="balance-fields-wrapper w100">
          <div className="input-container flex select">
            <span>{i18next.t('Campaign Name')}</span>
            <IonItem lines="none" className="ion-item-select">
              <IonSelect
                value={campaignName} 
                onIonChange={(e) => getReferredUsers(e.detail.value)}
                placeholder={i18next.t('Choose a campaign name')}
                interface={'popover'} 
                mode={'md'} 
                className={`field`}
              >
                {props.campaigns
                  .filter(c => c.promo !== 'all')
                  .map(el => 
                    <IonSelectOption key={el.id} value={el.promo}>
                      {el.comment || el.promo}
                    </IonSelectOption>
                  )
                }
              </IonSelect>
            </IonItem>
          </div>
          <div className="input-container flex select">
            <span>{i18next.t('Sort by')}</span>
            <IonItem lines="none" className="ion-item-select">
              <IonSelect 
                value={curFilter} 
                onIonChange={(e) => setCurFilter(e.detail.value)}
                interface={'popover'} 
                mode={'md'} 
                className={`field`}
              >
                <IonSelectOption value="created_at">
                  {i18next.t('Registered')}
                </IonSelectOption>
                <IonSelectOption value="commission">
                  {i18next.t('Commission')}
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          </div>
        </div>
      }

      {(loading || props.loading) ? 
        <IonSpinner className="spinner-loader center" name="lines"/>
        :
        <>
          {referralUsers.length > 0 && 
            <div className="account-table affiliate-table">
              {props.width > 1024 && 
                <table>
                  <thead>
                    <tr>
                      <th>{i18next.t('Username')}</th>
                      <th>{i18next.t('Created')}</th>
                      <th>{i18next.t('Total Deposited')}</th>
                      <th>{i18next.t('Last Deposit')}</th>
                      <th>{i18next.t('Wagered')}</th>
                      <th>{i18next.t('Commission')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralUsersFiltered.map((user, i) => {
                      return (
                        <tr key={i} className={i % 2 === 0 ? 'colored' : ''} >
                          <td className="address-title">
                            {user.login ?? '-'}
                          </td>
                          <td className="address-title">
                            {user.created_at ?? '-'}
                          </td>
                          <td className="address-title">
                            {user.total_deposited !== null && 
                              <div className="with-img flex center">
                                {thousandSeparator(user.total_deposited)}
                                <img src={getCurrencyIcon(user.currensy_id)} alt="currency" className="bc-icon"/>
                              </div>
                            }
                            {user.total_deposited === null && '-'}
                          </td>
                          <td className="address-title">
                            {user.last_deposit ?? '-'}
                          </td>
                          <td className="address-title">
                            {user.summa_bet !== null && 
                              <div className="with-img flex center">
                                {thousandSeparator(user.summa_bet)}
                                <img src={getCurrencyIcon(user.currensy_id)} alt="currency" className="bc-icon"/>
                              </div>
                            }
                            {user.summa_bet === null &&  '-'}
                          </td>
                          <td className="address-title">
                            {user.commission !== null && 
                              <div className="with-img flex center">
                                {thousandSeparator(user.commission)}
                                <img src={getCurrencyIcon(user.currensy_id)} alt="currency" className="bc-icon"/>
                              </div>
                            }
                            {user.commission === null &&  '-'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              }

              {props.width <= 1024 && referralUsersFiltered.map((user, i) =>
                <div key={i} className="table-adaptive">
                  <div className="table-adaptive-row">
                    <div className="table-adaptive-row-item">
                      <div className="table-adaptive-row-item-value">{user.login ?? '-'}</div>
                      <div className="table-adaptive-row-item-title">{i18next.t('Username')}</div>
                    </div>
                    <div className="table-adaptive-row-item">
                      <div className="table-adaptive-row-item-value">{user.created_at ?? '-'}</div>
                      <div className="table-adaptive-row-item-title">{i18next.t('Created')}</div>
                    </div>
                  </div>
                  <div className="table-adaptive-row">
                    <div className="table-adaptive-row-item">
                      <div className="table-adaptive-row-item-value flex with-img">
                        {user.total_deposited !== null && 
                          <>
                            {thousandSeparator(user.total_deposited)}
                            <img src={getCurrencyIcon(user.currensy_id)} alt="currency" className="bc-icon"/>
                          </>
                        }
                        {user.total_deposited === null && '-'}
                      </div>
                      <div className="table-adaptive-row-item-title">{i18next.t('Total Deposited')}</div>
                    </div>
                    <div className="table-adaptive-row-item">
                      <div className="table-adaptive-row-item-value">{user.last_deposit ?? '-'}</div>
                      <div className="table-adaptive-row-item-title">{i18next.t('Last Deposit')}</div>
                    </div>
                  </div>
                  <div className="table-adaptive-row">
                    <div className="table-adaptive-row-item">
                      <div className="table-adaptive-row-item-value flex with-img">
                        {user.summa_bet !== null && 
                          <>
                            {thousandSeparator(user.summa_bet)}
                            <img src={getCurrencyIcon(user.currensy_id)} alt="currency" className="bc-icon"/>
                          </>
                        }
                        {user.summa_bet === null &&  '-'}
                      </div>
                      <div className="table-adaptive-row-item-title">{i18next.t('Wagered')}</div>
                    </div>
                    <div className="table-adaptive-row-item">
                      <div className="table-adaptive-row-item-value flex with-img">
                        {user.commission !== null && 
                          <>
                            {thousandSeparator(user.commission)}
                            <img src={getCurrencyIcon(user.currensy_id)} alt="currency" className="bc-icon"/>
                          </>
                        }
                        {user.commission === null &&  '-'}
                      </div>
                      <div className="table-adaptive-row-item-title">{i18next.t('Commission')}</div>
                    </div>
                  </div> 
                </div>
              )}
            </div>
          }
          {campaignName && referralUsers.length === 0 &&
            <div className="no-entries-container">
              <img src={props.color ? noEntriesPic : noEntriesLightPic } alt="no entries" />
              <div className="no-entries-label big">{i18next.t('No entries.')}</div>
              <div className="no-entries-label">{i18next.t('There are no Reffered users in the list.')}</div>
            </div>
          }
        </>
      }

      {props.campaigns.filter(c => c.promo !== 'all').length === 0 && !loading && !props.loading &&
        <div className="no-entries-container">
          <div className="no-entries-label big">{i18next.t('No entries.')}</div>
        </div>
      }
    </div>
  )
}

export default RefferedUsers;
