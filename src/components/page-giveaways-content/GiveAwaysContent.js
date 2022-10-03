import { IonContent } from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getListGiveaways } from "../../api";
import HeaderGiveAways from "./HeaderGiveAways";
import EventGiveawaysBody from "./EventGiveawaysBody";
import NoGiveaways from "./NoGiveaways";
import JoinedBackToGiveaways from "./giveaways-joined-user/JoinedBackToGiveaways";
import GiveAwaysPageSwitching from "./GiveAwaysPageSwitching";

import Footer from "../Footer";
import { currentedGiveawaysGL, openJoinedUserGL, reloadListGiveawaysGL } from "../../state";
import { useAtom } from "jotai";

const GiveAwaysContent = (props) => {
  const token = useMemo(() => props.token, [props.token]);
  const location = useLocation();
  const pathname = location.pathname;
  const [reloadListGiveaways, setReloadListGiveaways] = useAtom(reloadListGiveawaysGL);
  const VALID_CUR_PATHNAME = pathname === "/giveaways";
  const [listGiveaways, setListGiveaways] = useState([]);
  const [LastSteamLink, setLastSteamLink] = useState("");
  const [openJoinedUser, setOpenJoinedUser] = useAtom(openJoinedUserGL);
  const [currentedGiveaways, setCurrentedGiveaways] = useAtom(currentedGiveawaysGL);

  const [currEventPage, setCurrEventPage] = useState(10);
  const history = useHistory();
  const [ind, setInd] = useState(0);
  const sliceIntoChunks = (arr, chunkSize) => {
    const rest = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      rest.push(chunk);
    }
    return rest;
  };

  const slicePage = sliceIntoChunks(listGiveaways, currEventPage); // кол-во розыгрышей на 1 странице

  useEffect(() => {
    if (VALID_CUR_PATHNAME) {
      getListGiveaways(token)
        .then((res) => {
          // console.log(res);
          try {
            let listGiveawaysTemp = res.data.data.listGiveaways;
            let listGiveawaysLastSteamLink = res.data.data;

            listGiveawaysTemp.forEach((giveaways, indx, origArray) => {
              let curPrize = 0;
              if (giveaways?.prizes?.length) {
                giveaways.prizes.forEach((curprize) => {
                  curPrize += curprize?.summa ?? 0;
                });
                origArray[indx].cur_prize = curPrize;
              }
            });

            // console.log(listGiveawaysLastSteamLink);
            // console.log(listGiveawaysTemp);

            setListGiveaways([...listGiveawaysTemp]);
            setLastSteamLink(listGiveawaysLastSteamLink.last_steam_link);

            let search = location.search;

            if (!search) {
              return;
            }
            // console.log(search);
            let id = search.split("%22")[1];

            setCurrentedGiveaways(listGiveawaysTemp.find((curGive) => curGive.id == id));
            setOpenJoinedUser(true);
          } catch (e) {}
        })
        .catch((error) => {
          console.log(error?.response?.data?.error);
        });
    }
  }, [VALID_CUR_PATHNAME, token, reloadListGiveaways]);

  return (
    <IonContent className={"page"}>
      {VALID_CUR_PATHNAME && (
        <div className="homepage levels-page flex">
          <div className="width-container">
            {openJoinedUser && currentedGiveaways ? (
              <>
                <JoinedBackToGiveaways setOpenJoinedUser={setOpenJoinedUser} />
                <EventGiveawaysBody
                  LastSteamLink={LastSteamLink}
                  data={props.data}
                  token={props.token}
                  currentGiveaways={currentedGiveaways}
                  setOpenJoinedUser={setOpenJoinedUser}
                  openJoinedUser={openJoinedUser}
                  listGiveaways={listGiveaways}
                />
              </>
            ) : (
              <>
                <HeaderGiveAways
                  setListGiveaways={setListGiveaways}
                  listGiveaways={listGiveaways}
                />
                {listGiveaways.length === 0 ? (
                  <NoGiveaways />
                ) : (
                  listGiveaways.lenght !== 0 &&
                  slicePage[ind].map((itemGiveaways, i) => (
                    <EventGiveawaysBody
                      LastSteamLink={LastSteamLink}
                      data={props.data}
                      token={props.token}
                      setCurrentedGiveaways={setCurrentedGiveaways}
                      setOpenJoinedUser={setOpenJoinedUser}
                      key={i}
                      currentGiveaways={itemGiveaways}
                    />
                  ))
                )}
                {listGiveaways.length !== 0 && (
                  <GiveAwaysPageSwitching
                    listGiveaways={listGiveaways}
                    currEventPage={currEventPage}
                    setCurrEventPage={setCurrEventPage}
                    ind={ind}
                    setInd={setInd}
                    slicePage={slicePage}
                  />
                )}
              </>
            )}
          </div>
          <Footer data={props.data} />
        </div>
      )}
    </IonContent>
  );
};

export default GiveAwaysContent;
