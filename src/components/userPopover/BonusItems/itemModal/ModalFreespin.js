import i18next from "i18next";
import React from "react";

const ModalFreespin = (props) => {
  return (
    <div className="popover-conteiner-freespin-content">
      <div className="count-freespin-conteiner conteiner-item">
        <span className="name-free-spins">{i18next.t("Free Spins")}</span>
        <span className="count-tickets">{props.countFreespin}</span>
      </div>
    </div>
  );
};

export default ModalFreespin;
