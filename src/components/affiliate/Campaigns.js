import React, { useEffect, useState } from 'react';
import i18next from "i18next";
import axios from 'axios';
import url from '../../axios';
import { IonRippleEffect, IonSpinner } from '@ionic/react';
import { notify, thousandSeparator } from '../../utils/utils';
import useCopyText from '../../hooks/useCopyText';
import { ReactComponent as Copy } from '../../images/copy.svg';
import { ReactComponent as Arrow } from '../../images/arrow-up.svg';
import CreatePromoModal from '../CreatePromoModal';
import chip from '../../images/crypto-logos/bcoin.png';

const CampaignItem = (props) => {
  const [open, setOpen] = useState(false);
  const { isNotSupportCopyText, copyText } = useCopyText();
  const [loading, setLoading] = useState(false);

  function deletePromo(promo) {
    setLoading(true);
      axios({
        method: 'post',
        url: url + "/api/delete-promo",
        headers: {
          'Authorization': `Bearer ${props.token}`,
        },
        data: {
          promo
        }
      })
        .then(res => {
          notify({ 
            message: i18next.t("Success"),
            description: i18next.t("Your campaign has been deleted."),
            icon: "success",
          });
          setLoading(false);
          if (res.data.data.rows) {
            props.setCampaigns(res.data.data.rows);
          }
        })
        .catch(error => {
          notify({ message: error.response.data.error });
          setLoading(false);
        })
  }

  return (
    <>
      {props.campaign.total_commission && 
        <div className={`affiliate-campaign-table-item ${open ? 'open' : 'close'}`}>
          <div 
            className="affiliate-campaign-item-header flex"
            onClick={() => setOpen(!open)}
          >
            <div className="affiliate-campaign-item-header-label">{props.campaign.comment || props.campaign.promo}</div>
            <div className="affiliate-campaign-item-header-right flex">
              <div className="affiliate-campaign-item-header-value flex center">
                {thousandSeparator(props.campaign.total_commission)}
                <img src={chip} alt="chip" className="chip-icon"/>
                <Arrow />
              </div>
            </div>
          </div>
          <div className="affiliate-campaign-item-body">
            <div className="affiliate-content-top small flex">
              <div className="affiliate-content-top-item flex">
                <div className="affiliate-content-top-item-label">{i18next.t('Referrals')}</div>
                <div className="affiliate-content-top-item-value">{props.campaign.referrals ?? '-'}</div>
              </div>
              <div className="affiliate-content-top-item flex">
                <div className="affiliate-content-top-item-label">{i18next.t('Total Deposits')}</div>
                <div className="affiliate-content-top-item-value">{props.campaign.total_deposits ?? '-'}</div>
              </div>
              <div className="affiliate-content-top-item flex">
                <div className="affiliate-content-top-item-label">{i18next.t('Unique Deposits')}</div>
                <div className="affiliate-content-top-item-value">{props.campaign.unique_deposits ?? '-'}</div>
              </div>
              <div className="affiliate-content-top-item flex">
                <div className="affiliate-content-top-item-label">{i18next.t('Commission Rate')}</div>
                <div className="affiliate-content-top-item-value">{props.campaign.commission_rate}%</div>
              </div>
              <div className="affiliate-content-top-item flex">
                <div className="affiliate-content-top-item-label">{i18next.t('Commission')}</div>
                <div className="affiliate-content-top-item-value flex center">
                  {thousandSeparator(props.campaign.commission) ?? '-'}
                  <img src={chip} alt="chip" className="chip-icon"/>
                </div>
              </div>
              <div className="affiliate-content-top-item flex">
                <div className="affiliate-content-top-item-label">{i18next.t('Total Commission')}</div>
                <div className="affiliate-content-top-item-value flex center">
                  {thousandSeparator(props.campaign.total_commission) ?? '-'}
                  <img src={chip} alt="chip" className="chip-icon"/>
                </div>
              </div>
            </div>

            <div className="affiliate-campaign-item-referral">
              <div className="referral-body-item-top">{i18next.t("Referral link")}</div>
              <div className="referral-body-item-bottom">
                <div 
                  onClick={() => {
                    if (!isNotSupportCopyText) copyText(props.campaign.promo_url);
                  }}
                  className={`refferal-link-field contrast-bg ${!isNotSupportCopyText ? 'ion-activatable' : ''}`}
                >
                  <IonRippleEffect />
                  <span>{props.campaign.promo_url}</span>
                  {!isNotSupportCopyText && <Copy />}
                </div>
                {props.campaign.closed_at === null && 
                  <button 
                    className={`save-btn delete-btn`}
                    onClick={() => {
                      if (!loading) deletePromo(props.campaign.promo)}
                    }
                  >
                    {loading ? <IonSpinner /> : <p>{i18next.t('Delete')}</p>}
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

const Campaigns = (props) => {
  const [allCampaigns, setAllCampaigns] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
      const obj = props.campaigns.find(c => c.promo === 'all');
      if (obj) {
        setAllCampaigns(obj);
      }
  }, [props.campaigns]);

  return (
    <div className="balance-fields-container affiliate-fields-container">
      <div className="balance-title affiliate-title">{i18next.t('Campaigns')}</div>
      {props.loading && 
        <IonSpinner className="spinner-loader center" name="lines"/>
      }

      {!props.loading && allCampaigns.promo && 
        <div className="affiliate-content">
          <div className="affiliate-content-top flex">
            <div className="affiliate-content-top-item flex">
              <div className="affiliate-content-top-item-label">{i18next.t('Referrals')}</div>
              <div className="affiliate-content-top-item-value">
                {allCampaigns.referrals || '-'}
              </div>
            </div>
            <div className="affiliate-content-top-item flex">
              <div className="affiliate-content-top-item-label">{i18next.t('Total Deposits')}</div>
              <div className="affiliate-content-top-item-value">
                {allCampaigns.total_deposits || '-'}
              </div>
            </div>
            <div className="affiliate-content-top-item flex">
              <div className="affiliate-content-top-item-label">{i18next.t('Unique Deposits')}</div>
              <div className="affiliate-content-top-item-value">
                {allCampaigns.unique_deposits || '-'}
              </div>
            </div>
            <div className="affiliate-content-top-item flex">
              <div className="affiliate-content-top-item-label">{i18next.t('Commission')}</div>
              <div className="affiliate-content-top-item-value flex center">
                {thousandSeparator(allCampaigns.commission) || 0}
                <img src={chip} alt="chip" className="chip-icon"/>
              </div>
            </div>
            <div className="affiliate-content-top-item flex">
              <div className="affiliate-content-top-item-label">{i18next.t('Total Commission')}</div>
              <div className="affiliate-content-top-item-value flex center">
                {thousandSeparator(allCampaigns.total_commission) || 0}
                <img src={chip} alt="chip" className="chip-icon"/>
              </div>
            </div>
            {props.width > 1024 && 
              <div className="affiliate-content-top-item flex">
                <div 
                  className="save-btn ion-activatable"
                  onClick={() => setModalOpen(true)}
                >
                  <IonRippleEffect />
                  <p>{i18next.t('Create New')}</p>
                </div>
              </div>
            }
          </div>
          {props.width <= 1024 && 
            <div className="affiliate-content-top-item left flex">
              <div 
                className="save-btn ion-activatable"
                onClick={() => setModalOpen(true)}
              >
                <IonRippleEffect />
                <p>{i18next.t('Create New')}</p>
              </div>
            </div>
          }

          <div className="affiliate-campaign-table">
            {props.campaigns
              .filter(c => c.promo !== 'all')
              .map((item, i) => 
                <CampaignItem 
                  key={item.id} 
                  campaign={item} 
                  index={i} 
                  token={props.token}
                  setCampaigns={props.setCampaigns}
                />
              )
            }
          </div>
        </div>
      }

      {props.campaigns.filter(c => c.promo !== 'all').length === 0 && !props.loading &&
        <div className="no-entries-container">
          <div className="no-entries-label big">{i18next.t('No entries.')}</div>
        </div>
      }

      <CreatePromoModal
        setIsOpen={setModalOpen} 
        isOpen={isModalOpen} 
        token={props.token}
        setCampaigns={props.setCampaigns}
      />
    </div>
  )
}

export default Campaigns;
