import React from 'react';
import i18next from "i18next";
import { useHistory } from 'react-router';

const ProviderCard = (props) => {
  const history = useHistory();

  return (
    <div className="prov-card">
      <div className="prov-img flex">
        {props.el && <img src={props.el.logo} alt={props.el.name} className="provider-logo"/>}
      </div>
      <div className="prov-discription">
        <div className="prov-name">{props.el.name}</div>
        <div className="prov-count">{props.count} {i18next.t('games')}</div>
      </div>
      <div 
        onClick={() => history.push(`/providers/${props.el.name}`)}
        className="playnow-btn"
      >
        <p>{i18next.t('Play now')}</p>
      </div>
    </div>
  )
}

export default ProviderCard;
