import React from 'react';
import { IonToast } from '@ionic/react';
import i18next from "i18next";
import { Redirect } from 'react-router-dom';

const VerifyWarning = (props) => {
  return (
    <>
      <IonToast
        isOpen={props.verifyErr}
        message={i18next.t('You have some issues with verification.')}
        color='danger'
        duration={3000}
      /> 
      {/* {props.verifyErr && <Redirect to='/account'/>} */}
    </>
  )
}

export default VerifyWarning;
