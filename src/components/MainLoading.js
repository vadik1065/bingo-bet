import React, { useEffect } from 'react';
import { IonLoading } from '@ionic/react';
import { useAtom } from "jotai";
import { mainLoading } from "../state.js";
import '../css/mainloading.css'

const MainLoading = ({ mainIsLoading }) => {
  const [isOpen, setIsOpen] = useAtom(mainLoading);

  useEffect(() => {
    setIsOpen(mainIsLoading);
  }, [mainIsLoading]);
  
  return (
    <IonLoading
      isOpen={isOpen}
      onDidDismiss={() => setIsOpen(false)}
      spinner={'dots'}
      duration={5000}
      cssClass={'loading-hidden'}
    />
  )
}

export default MainLoading;
