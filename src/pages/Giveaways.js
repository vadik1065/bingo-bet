import { IonPage } from "@ionic/react";

import GiveAwaysContent from "../components/page-giveaways-content/GiveAwaysContent";
import "../css/less/pages/giveaways/css/main-giveaways.css";

const Giveaways = (props) => {
  return (
    <IonPage>
      <GiveAwaysContent data={props.data} token={props.token} />
    </IonPage>
  );
};

export default Giveaways;
