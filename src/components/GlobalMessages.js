import React from 'react';
import { globalSuccess,globalSuccessText,globalFalse,globalFalseText } from "../state.js";
import { useAtom } from "jotai";
import { IonToast } from '@ionic/react';
const GlobalMessages = (props) => {
  /*eslint-disable*/
  const [success, setSuccess] = useAtom(globalSuccess);
  const [successText, setSuccessText] = useAtom(globalSuccessText);
  const [falseModal, setFalseModal] = useAtom(globalFalse);
  const [falseModalText, setFalseModalText] = useAtom(globalFalseText);
  /*eslint-enable*/
  return (
    <>
      <IonToast
        isOpen={success}
        onDidDismiss={() => setSuccess(false)}
        message={successText}
        color='primary'
        duration={3000}
      />
      <IonToast
        isOpen={falseModal}
        onDidDismiss={() => setFalseModal(false)}
        message={falseModalText}
        color='danger'
        duration={3000}
      />
    </>
  )
}

export default GlobalMessages
