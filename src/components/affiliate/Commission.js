import React from 'react';
import i18next from "i18next";

const Commission = () => {
  return (
    <div className="balance-fields-container affiliate-fields-container">
      <div className="balance-title affiliate-title">{i18next.t('Commission')}</div>
      <div className="affiliate-content">
        <div className="affiliate-content-title">{i18next.t('Providers & Casino')}</div>
        <p>{i18next.t('Bingo.bet provides their users with games from a variety of 3rd party providers to ensure an assortment of different experiences to enjoy during their play. These providers all set their own house edge and commission for the games.')}</p>
        <p>{i18next.t('The invitee commission will be based on a percentage of the revenue received when their invited players wager on the site. The initial commission rate is 10% of revenue received after provider’s share. Your affiliate level and therefore commission % will increase upon reaching certain referral thresholds every month. The invitee will be able to withdraw their commission at the start of each month. If, for any reason you are unable to access the site during that period, your commission will remain on your account until you next decide to withdraw.')}</p>
        <div className="affiliate-content-note-container">
          {i18next.t('If you believe that you are an exceptional affiliate with an extensive group of users, feel free to contact our support team regarding personalised commission programs. Applying affiliates will be reviewed to be deemed appropriate for special programs.')}
        </div>
      </div>
    </div>
  )
}

export default Commission;
