import { useMemo } from "react";

const JoinedAll = (props) => {
  const joinedUsers = useMemo(() => props.joinedUsers, [props.joinedUsers]);
  return (
    <div className="users-joined-cont">
      {joinedUsers.map((user, indx) => (
        <div className="square-user" key={indx}>
          {user.login === props.data.userData.login && (
            <div className="you-or-no">
              <span className="text-you-or-no">You</span>
            </div>
          )}

          <div className="user-info">
            <div className="user-avatar">
              <img src={user.avatar}></img>
            </div>
            <div className="user-nick">{user.login}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JoinedAll;
