import i18next from "i18next";
import { useMemo } from "react";
import JoinedAll from "./JoinedAll";
import JoinedZero from "./JoinedZero";

const JoinedUserConteiner = (props) => {
  const lengthJoinedUsers = useMemo(() => props.joinedUsers.length, [props.joinedUsers.length]);
  return (
    <>
      <div className="joined-users-title-cont">
        <span className="joined-users-title">
          {i18next.t(`Joined Users (${lengthJoinedUsers})`)}
        </span>
      </div>
      <div className="joined-users-cont">
        {lengthJoinedUsers > 0 ? (
          <JoinedAll data={props.data} joinedUsers={props.joinedUsers} />
        ) : (
          <JoinedZero
            headerMes={props.headerMes}
            LastSteamLink={props.LastSteamLink}
            data={props.data}
            token={props.token}
            currentGiveaways={props.currentGiveaways}
          />
        )}
      </div>
    </>
  );
};

export default JoinedUserConteiner;
