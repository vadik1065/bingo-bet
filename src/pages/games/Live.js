import React, { useState, useEffect } from "react";
import { IonSearchbar, IonSpinner } from "@ionic/react";
import i18next from "i18next";
import useSearch from "../../hooks/useSearch";
import { getGamesCategoryIcon } from "../../utils/utils";
import Recommended from "../../components/Recommended";
import GameCard from "../../components/GameCard";
import CategoriesFilter from "../../components/CategoriesFilter";

const Live = (props) => {
  const [showGamesCount, setShowGamesCount] = useState(16);
  // const { search, setSearch, setFocused, loadingGames, foundGames } = useSearch(props);
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
  } = useSearch(props);

  useEffect(() => {
    return () => {
      setShowGamesCount(16);
      setFilterValue("all");
      setCurProvider({
        id: "all",
        name: "All",
        value: "all",
        label: i18next.t("All Providers"),
      });
      setSearch("");
    };
  }, []);

  // useEffect(() => {
  //   props.livePageFilter(filterValue);
  // }, [filterValue]);

  return (
    <div className="games-page-container">
      <div className="title-w-filter flex">
        <p className="page-title">{i18next.t("Live Games")}</p>
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
          tags={props.tags}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          subFilterValue={subFilterValue}
          setSubFilterValue={setSubFilterValue}
          curProvider={curProvider}
          setCurProvider={setCurProvider}
          category="LIVE"
          setSearch={setSearch}
          currentGames={foundGames}
          providers={props.providers}
          isDark={props.color}
          width={props.width}
          // allTag={{ tag: 'all', image: getGamesCategoryIcon('all'), displayName: 'All' }}
        />
      )}

      <div className="games-block flex">
        {loadingGames && (
          <IonSpinner className="spinner-loader center" name="lines" />
        )}
        <div className="games-container">
          {!loadingGames &&
            foundGames.map((el, i) => {
              while (i < showGamesCount) {
                return (
                  <GameCard
                    setFav={props.setFav}
                    updateGames={props.updateGames}
                    lang={props.applang}
                    currency={props.currency_id}
                    token={props.token}
                    data={el}
                    key={el.id}
                    providers={props.providers}
                  />
                );
              }
            })}
        </div>

        {showGamesCount <= foundGames.length && (
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

        <Recommended
          token={props.token}
          recommended={props.recommended}
          providers={props.providers}
          width={props.width}
          lang={props.applang}
          currency={props.currency_id}
          loading={props.loading}
        />
      </div>
    </div>
  );
};

export default Live;
