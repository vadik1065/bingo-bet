import { useEffect, useState } from "react";
import {
  FinalModalRegGL,
  RequestLinkGL,
  SteamLinkGL,
  switchModalForJoinGLWitchParam,
} from "../../state";
import { useAtom } from "jotai";
import CompleteJoin from "../../images/giveaways/copmlete-giveaways.svg";
import { IonIcon } from "@ionic/react";

const EventGiveawaysBtnJoin = (props) => {
  const [requestLinkGiveaways, setRequestLinkGiveaways] = useAtom(RequestLinkGL);
  const [fianalModal, setFinalModal] = useAtom(FinalModalRegGL);

  let TimeNow = new Date();
  let TimeDate = new Date(props.currentGiveaways.date_end);

  const RequestLink = () => {
    if (props.currentGiveaways.request_link === 1) {
      setRequestLinkGiveaways(true);
    } else {
      setRequestLinkGiveaways(false);
    }
  };

  const [switchModalForJoinWitchParam, setSwitchModalForJoinWitchParam] = useAtom(
    switchModalForJoinGLWitchParam
  );
  const [switchModalForJoin, setSwitchModalForJoin] = useState(0);

  function changeTypeModal(number = 0, param = {}) {
    if (fianalModal) {
      return;
    }
    setSwitchModalForJoin(number);
    setSwitchModalForJoinWitchParam({ open: number, param: param });
    if (localStorage.getItem("currentGiveawaysID")) {
      localStorage.removeItem("currentGiveawaysID");
    }
  }

  const [steamlink, setSteamLink] = useAtom(SteamLinkGL);

  const modalsJoinClick = [
    "",
    () =>
      setSwitchModalForJoinWitchParam({
        name: "auth",
        open: 1,
        param: {
          onClose: changeTypeModal,
        },
        onSuccess: () => {
          changeTypeModal(3, {
            data: props.data,
            noRedirect: props.noRedirect,
            headerMes: props.headerMes,
            onClose: changeTypeModal,
            currentGiveaways: props.currentGiveaways,
          });
        },
      }),

    () => {
      setSwitchModalForJoinWitchParam({
        name: "steam",
        open: 2,
        param: {
          onClose: () => {
            changeTypeModal();
          },
          onSuccess: () => {
            changeTypeModal(3, {
              data: props.data,
              noRedirect: props.noRedirect,
              headerMes: props.headerMes,
              onClose: changeTypeModal,
              currentGiveaways: props.currentGiveaways,
            });
          },
          data: props.data,
          currentGiveaways: props.currentGiveaways,
          LastSteamLink: props.LastSteamLink,
        },
      });
    },

    () => {
      setSwitchModalForJoinWitchParam({
        name: "requmend",
        open: 3,
        param: {
          noRedirect: props.noRedirect,
          headerMes: props.headerMes,
          onClose: changeTypeModal,
          data: props.data,
          currentGiveaways: props.currentGiveaways,
        },
      });
      return "";
    },
  ];
  const onBtnJoinClick = () => {
    if (fianalModal) {
      setFinalModal(false);
      return;
    }
    if (props.currentGiveaways.joined === 0) {
      if (!props.token) {
        console.log(props);
        localStorage.setItem("currentGiveawaysID", props.currentGiveaways.id);
        setSwitchModalForJoin(1);
      } else if (props.token && props.currentGiveaways.request_link === 1) {
        setSwitchModalForJoin(2);
      } else if (props.token && props.currentGiveaways.request_link === 0) {
        setSwitchModalForJoin(3);
      }
    }
  };

  useEffect(() => {
    try {
      let a = modalsJoinClick[switchModalForJoin];
      if (typeof a == "function") {
        a();
      }
    } catch (e) {
      console.log(e);
    }
  }, [switchModalForJoin]);

  useEffect(() => {
    if (!!Object.keys(props.data.userData).length) {
      if (localStorage.getItem("currentGiveawaysID") == props.currentGiveaways.id) {
        onBtnJoinClick();
      }
    }
  }, [props.data.userData]);

  return (
    <>
      {props.currentGiveaways.joined !== 1 && TimeDate > TimeNow ? (
        <button
          className="button-join-giveaways"
          onClick={() => {
            onBtnJoinClick();
            RequestLink();
          }}
        >
          <p>{props.children}</p>
        </button>
      ) : (
        <div className="buttons-event-giveaways-complete">
          <button className="buttons-event-giveaways-complete-body" disabled={TimeDate < TimeNow}>
            <IonIcon className="buttons-event-giveaways-complete-icon" icon={CompleteJoin} />
            <span className="buttons-event-giveaways-complete-text">Joined</span>
          </button>
        </div>
      )}
    </>
  );
};

export default EventGiveawaysBtnJoin;
