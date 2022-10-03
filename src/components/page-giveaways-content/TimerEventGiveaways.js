import { IonIcon } from "@ionic/react";
import i18next from "i18next";
import SubtractG from "../../images/giveaways/subtract-giveaways.svg";

const TimerEventGiveaways = (props) => {
  let now = new Date();
  let date = new Date(props.currentGiveaways.date_end);
  let result = Math.abs(date - now);
  var sec_num = result / 1000;
  var days = Math.floor(sec_num / (3600 * 24));
  var hours = Math.floor((sec_num - days * (3600 * 24)) / 3600);
  var minutes = Math.floor((sec_num - days * (3600 * 24) - hours * 3600) / 60);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return (
    <div>
      {date > now ? (
        <div>
          <span className="time-color-one">{`${days}`}</span>
          <span className="time-color-two">d</span>
          <span className="time-color-one">{` : ${hours}`}</span>
          <span className="time-color-two">h</span>
          <span className="time-color-one">{` : ${minutes}`}</span>
          <span className="time-color-two">m</span>
        </div>
      ) : props.currentGiveaways?.has_won === null ? (
        <div className="winner-is-being-verified">
          <IonIcon className="winner-icon" icon={SubtractG} />
          <span className="winner-text">{i18next.t("Winner is being verified")}</span>
        </div>
      ) : (
        <div className="winner-event">
          <span className="winner-event-text">{i18next.t("Winner")}:</span>
          {props?.currentGiveaways?.has_won !== null &&
            props?.currentGiveaways?.has_won.map((win, i) => (
              <div key={i}>
                <div className="avatar-winner">{win.avatar}</div>
                <span className="nickname-winner">{win.login}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TimerEventGiveaways;
