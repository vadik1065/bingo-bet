import { IonButton } from "@ionic/react";
import i18next from "i18next";
import React from "react";
import { useHistory } from "react-router";

const ModalTickets = (props) => {
  const history = useHistory();

  return (
    <div className="popover-conteiner-tickets-content">
      <div className="count-tickets-conteiner conteiner-item">
        <span className="name-tickets">{i18next.t("Tickets")}</span>
        <span className="count-tickets">{props.countTicket}</span>
      </div>

      <div className="play-game-button-conteiner conteiner-item">
        <div className="first-yarus">
          <span>🤔{i18next.t("How to receive?")}</span>
          <span>{i18next.t("Make a bet on any slot 🎮game!")}</span>
        </div>
        <div className="second-yarus">
          <IonButton
            onClick={() => {
              history.push("/games");
              props.dismissModal();
            }}
          >
            <span className="text-button-tickets">
              {i18next.t("Play Games")}
            </span>
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default ModalTickets;
