import React from 'react';
import { IonToast } from '@ionic/react';
import i18next from "i18next";
const CreditWarning = (props) => {
  return (
    <IonToast
      isOpen={props.creditErr}
      message={i18next.t('You have an overdue loan.')}
      color='danger'
      duration={20000}
    />
  )
}

export default CreditWarning
