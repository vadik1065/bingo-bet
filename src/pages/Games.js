import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonSpinner,
  useIonViewWillLeave,
} from "@ionic/react";
import i18next from "i18next";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer.js";
import Live from "./games/Live";
import Slots from "./games/Slots";
import Other from "./games/Other";
import TableGames from "./games/TableGames";
import Poker from "./games/Poker";
import Roulette from "./games/Roulette";
import Banner from "../components/Banner";
import "../css/games.css";
import CategoriesFilter from "../components/CategoriesFilter.js";
import GameCard from "../components/GameCard.js";
import useSearch from "../hooks/useSearch.js";
import { getGamesCategoryIcon } from "../utils/utils";

const Games = (props) => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("");
  const {
    search,
    setSearch,
    filterValue,
    setFilterValue,
    subFilterValue,
    setSubFilterValue,
    curProvider,
    setCurProvider,
    setFocused,
    loadingGames,
    foundGames,
  } = useSearch(props.data);
  // const [filterValue, setFilterValue] = useState('all');
  const [showGamesCount, setShowGamesCount] = useState(8);
  const [scrollTop, setScrollTop] = useState(0);

  useIonViewWillLeave(() => {
    setShowGamesCount(8);
    setFilterValue("all");
    setCurProvider({
      id: "all",
      name: "All",
      value: "all",
      label: i18next.t("All Providers"),
    });
    setSearch("");
  });

  useEffect(() => {
    if (location.pathname.includes("/games")) {
      setCurrentLocation(location.pathname);
    }
  }, [location.pathname]);

  return (
    <IonPage>
      <IonContent
        className={"page"}
        scrollEvents={true}
        onIonScroll={(e) => setScrollTop(e?.detail.currentY)}
      >
        {currentLocation.includes("/games") && (
          <div className="homepage games-page flex">
            <div className="width-container">
              <div className="promoted-card big">
                <Banner banners={props.data.banners} width={props.data.width} />
              </div>
              {currentLocation === "/games" && (
                <>
                  <div className="games-block flex">
                    <div className="title-w-filter flex">
                      <p className="page-title">{i18next.t("Games")}</p>
                      <IonSearchbar
                        value={search}
                        onIonFocus={() => setFocused(true)}
                        onIonClear={() => setSearch("")}
                        onIonBlur={() => setFocused(false)}
                        onIonChange={(e) => setSearch(e.detail.value)}
                        placeholder={i18next.t("Search game")}
                        className={"search-game-field"}
                        type="text"
                        debounce={0}
                      />
                    </div>
                    {foundGames.length > 0 && (
                      <CategoriesFilter
                        scrollTop={scrollTop}
                        tags={props.data.tags}
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                        subFilterValue={subFilterValue}
                        setSubFilterValue={setSubFilterValue}
                        curProvider={curProvider}
                        setCurProvider={setCurProvider}
                        category="GAMES"
                        setSearch={setSearch}
                        currentGames={foundGames}
                        providers={props.data.providersList}
                        isDark={props.data.color}
                        width={props.data.width}
                      />
                    )}

                    {loadingGames && (
                      <IonSpinner
                        className="spinner-loader center"
                        name="lines"
                      />
                    )}
                    <div className="games-container">
                      {!loadingGames &&
                        foundGames.map((el, i) => {
                          while (i < showGamesCount) {
                            return (
                              <GameCard
                                setFav={props.setFav}
                                updateGames={props.data.updateGames}
                                lang={props.data.lang}
                                currency={props.data.userData.currency_id}
                                token={props.data.token}
                                data={el}
                                key={el.id}
                                providers={props.data.providersList}
                              />
                            );
                          }
                        })}
                    </div>

                    {foundGames.length > showGamesCount && (
                      <div
                        onClick={() => setShowGamesCount(showGamesCount + 24)}
                        className="more-games flex"
                      >
                        <p>{i18next.t("more games")}</p>
                      </div>
                    )}
                    {!loadingGames && foundGames.length === 0 && (
                      <div className="no-games">{i18next.t("No games")}</div>
                    )}
                  </div>
                </>
              )}

              {currentLocation === "/games/live" && (
                <Live
                  setFav={props.setFav}
                  updateGames={props.data.updateGames}
                  livePageFilter={props.livePageFilter}
                  tags={props.data.tags}
                  recommended={props.data.recommended}
                  providers={props.data.providersList}
                  applang={props.data.lang}
                  currency_id={props.data.userData.currency_id}
                  token={props.data.token}
                  games={props.data.games}
                  // games={props.data.live}
                  width={props.data.width}
                  loading={props.data.loadingRecommended}
                  color={props.data.color}
                />
              )}
              {currentLocation === "/games/slots" && (
                <Slots
                  setFav={props.setFav}
                  updateGames={props.data.updateGames}
                  slotsPageFilter={props.slotsPageFilter}
                  tags={props.data.tags}
                  recommended={props.data.recommended}
                  providers={props.data.providersList}
                  applang={props.data.lang}
                  currency_id={props.data.userData.currency_id}
                  token={props.data.token}
                  games={props.data.games}
                  // games={props.data.slots}
                  width={props.data.width}
                  loading={props.data.loadingRecommended}
                  color={props.data.color}
                />
              )}
              {currentLocation === "/games/table" && (
                <TableGames
                  setFav={props.setFav}
                  updateGames={props.data.updateGames}
                  gamesPageFilter={props.gamesPageFilter}
                  tags={props.data.tags}
                  recommended={props.data.recommended}
                  providers={props.data.providersList}
                  applang={props.data.lang}
                  currency_id={props.data.userData.currency_id}
                  token={props.data.token}
                  games={props.data.games}
                  // games={props.data.fgames}
                  width={props.data.width}
                  loading={props.data.loadingRecommended}
                  color={props.data.color}
                />
              )}
              {currentLocation === "/games/other" && (
                <Other
                  setFav={props.setFav}
                  updateGames={props.data.updateGames}
                  tags={props.data.tags}
                  recommended={props.data.recommended}
                  providers={props.data.providersList}
                  applang={props.data.lang}
                  currency_id={props.data.userData.currency_id}
                  token={props.data.token}
                  games={props.data.games}
                  // games={props.data.other}
                  width={props.data.width}
                  loading={props.data.loadingRecommended}
                  color={props.data.color}
                />
              )}
              {currentLocation === "/games/poker" && (
                <Poker
                  setFav={props.setFav}
                  updateGames={props.data.updateGames}
                  pokerPageFilter={props.pokerPageFilter}
                  tags={props.data.tags}
                  recommended={props.data.recommended}
                  providers={props.data.providersList}
                  applang={props.data.lang}
                  currency_id={props.data.userData.currency_id}
                  token={props.data.token}
                  games={props.data.games}
                  // games={props.data.poker}
                  width={props.data.width}
                  loading={props.data.loadingRecommended}
                  color={props.data.color}
                />
              )}
              {currentLocation === "/games/roulette" && (
                <Roulette
                  setFav={props.setFav}
                  updateGames={props.data.updateGames}
                  roulettePageFilter={props.roulettePageFilter}
                  tags={props.data.tags}
                  recommended={props.data.recommended}
                  providers={props.data.providersList}
                  applang={props.data.lang}
                  currency_id={props.data.userData.currency_id}
                  token={props.data.token}
                  games={props.data.games}
                  // games={props.data.roulette}
                  width={props.data.width}
                  loading={props.data.loadingRecommended}
                  color={props.data.color}
                />
              )}
            </div>
            <Footer data={props.data} />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Games;
