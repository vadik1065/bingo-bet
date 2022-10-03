import React from "react";
import "../css/providers.css";
import Footer from "../components/Footer.js";
import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router";
import useTempBonuses from "../hooks/useTempBonuses";
import BonusDetails from "../components/bonuses/BonusDetails";

const BonusSingle = (props) => {
  const { bonus } = useTempBonuses(props.data.lang);
  const { name } = useParams();

  return (
    <IonPage>
      <IonContent className={"page"}>
        <div className="homepage flex">
          <div className="width-container">
            <BonusDetails
              bonus={
                props.bonuses.find(
                  (b) => b.type === 0 && b.name.replace(/\s+/g, "") === name
                ) || bonus
              }
              width={props.data.width}
              color={props.color}
              token={props.data.token}
              updateUser={props.updateUser}
              lang={props.data.lang}
            />

            {/* {
              <BonusDetails 
                bonus={props.bonuses.find(b => b.type === 0 && b.name.replace(/\s+/g, '') === name)} 
                width={props.data.width}
                color={props.color}
                token={props.data.token}
                updateUser={props.updateUser} 
              /> 
              ||
              <BonusDetails 
                bonus={bonus} 
                width={props.data.width}
                color={props.color}
                token={props.data.token}
                updateUser={props.updateUser} 
              />
            } */}
          </div>
          <Footer data={props.data} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BonusSingle;
