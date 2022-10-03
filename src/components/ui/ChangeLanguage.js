import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import i18next from "i18next";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { languageGl } from "../../state";

const ChangeLanguage = (props) => {
  const [lang, setLang] = useState(props.lang ?? "GB");
  const [langAtom, setLangAtom] = useAtom(languageGl);

  useEffect(() => {
    setLangAtom(localStorage.getItem("lan"));
  }, []);

  function changeLang(e) {
    i18next.changeLanguage(e).then(() => {
      i18next.options.lng = e;
      localStorage.setItem("lan", e);
      console.log("setLangAtom ");
      setLangAtom(e);

      props.changeLan(e);
    });
  }

  return (
    <IonItem lines="none" className="lang-field-item">
      <IonSelect
        value={lang}
        onIonChange={(e) => {
          setLang(e.detail.value);
          changeLang(e.detail.value);
        }}
        interface={"popover"}
        mode={"md"}
        className="lang-field"
      >
        <IonSelectOption value={"GB"}>English</IonSelectOption>
        <IonSelectOption value={"FR"}>Français</IonSelectOption>
        <IonSelectOption value={"DE"}>Deutsch</IonSelectOption>
        <IonSelectOption value={"ES"}>Español</IonSelectOption>
        <IonSelectOption value={"RU"}>Русский</IonSelectOption>
        <IonSelectOption value={"ZH"}>简体中文</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default ChangeLanguage;
