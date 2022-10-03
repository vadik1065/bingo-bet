import React, { useState, useEffect, useRef } from "react";
import i18next from "i18next";
// import { Helmet } from "react-helmet";
import Footer from "../components/Footer.js";
import GameCard from "../components/GameCard";
import JackpotCard from "../components/JackpotCard";
import Recommended from "../components/Recommended";
import Banner from "../components/Banner.js";
import BannersSmall from "../components/BannersSmall.js";
import {
  IonContent,
  IonPage,
  useIonViewWillLeave,
  IonSearchbar,
  IonSpinner,
} from "@ionic/react";
import PremiumVipContainer from "../components/PremiumVipContainer.js";
import CategoriesFilter from "../components/CategoriesFilter.js";
import useSearch from "../hooks/useSearch.js";
import "../css/home.css";
import LeaderBoard from "../components/LeaderBoard.js";

const Home = (props) => {
  const [showGamesCount, setShowGamesCount] = useState(8);
  // const [filterValue, setFilterValue] = useState('all');
  const [jpotImg, setJpotImg] = useState("");
  const jackPotRef = useRef(null);
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
    focused,
    loadingGames,
    foundGames,
  } = useSearch(props.data);
  const [scrollTop, setScrollTop] = useState(0);

  //уходим со страницы
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

  function scrollDown() {
    jackPotRef.current.scrollIntoView({ behavior: "smooth" });
    // let yOffset = document.getElementById('hhere').offsetTop;
    // console.log(yOffset);
    // document.getElementById('home-page').scrollToPoint(0, yOffset, 1500);
  }

  // useEffect(() => {
  //   props.mainPageFilter(filterValue)
  // }, [filterValue]);

  useEffect(() => {
    if (props?.data?.banners?.desktopSmall) {
      setJpotImg(
        props.data.banners.desktopSmall
          .find((el, i) => i === props.data.banners.desktopSmall.length - 1)
          .json.split(`src="`)[1]
          .split(`"`)[0]
      );
    }
  }, [props.data.banners]);

  return (
    <IonPage>
      {/* <Helmet>
        <title>Home</title>
      </Helmet> */}
      <IonContent
        className={"page"}
        scrollEvents={true}
        onIonScroll={(e) => setScrollTop(e?.detail.currentY)}
      >
        <div className="homepage flex">
          <div className="width-container">
            {/* {props.platforms.map((platform) => 
              <div key={platform}>{platform}</div>
            )} */}
            {props.data.token !== null &&
              props.data.userData.statusProgress && (
                <PremiumVipContainer
                  name={props.data.userData.login}
                  avatar={props.data.userData.avatar}
                  statusProgress={props.data.userData.statusProgress}
                  width={props.data.width}
                />
              )}

            <div className="promoted flex">
              <div className="promoted-card">
                <BannersSmall banners={props.data.banners.desktopSmall} />
              </div>
              <div className="promoted-card">
                <BannersSmall banners={props.data.banners.desktopSmallRight} />
              </div>
            </div>

            {filterValue !== "Jackpots" && (
              <Recommended
                token={props.data.token}
                recommended={props.data.recommended}
                providers={props.data.providersList}
                width={props.data.width}
                lang={props.data.lang}
                currency={props.data.userData.currency_id}
                loading={props.data.loadingRecommended}
              />
            )}

            <div className="promoted-card big">
              <Banner
                link={"/bonuses"}
                banners={props.data.banners}
                width={props.data.width}
              />
            </div>

            <div id="hhere" ref={jackPotRef} />

            <div className="games-block flex">
              {filterValue === "Jackpots" && (
                <div className="jackpots-margin"></div>
              )}
              <div className="title-w-filter flex">
                {/* {filterValue !== 'Jackpots' && <p className="page-title">{i18next.t('Games')}</p>} */}
                {filterValue === "Jackpots" && (
                  <p className="page-title jackpot">{i18next.t("Jackpot")}</p>
                )}
                {filterValue !== "Jackpots" && (
                  <p className="page-title">{i18next.t("Games")}</p>
                )}
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
              {filterValue !== "Jackpots" && foundGames.length > 0 && (
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
                  isDark={props.color}
                  width={props.data.width}
                  // allTag={{ tag: 'all', image: getGamesCategoryIcon('all'), displayName: 'All' }}
                  // slotsTag={{ tag: 'SLOTS', image: getGamesCategoryIcon('slots'), displayName: 'Slots' }}
                />
              )}

              {/* {filterValue !== 'Jackpots' && <div id="hhere"></div>} */}

              {loadingGames && (
                <IonSpinner className="spinner-loader center" name="lines" />
              )}
              <div className="games-container">
                {!loadingGames &&
                  filterValue !== "Jackpots" &&
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

                {!loadingGames &&
                  filterValue === "Jackpots" &&
                  foundGames.map((el, i) => {
                    while (i < showGamesCount) {
                      return (
                        <JackpotCard
                          lang={props.data.lang}
                          currency={props.data.userData.currency_id}
                          token={props.data.token}
                          data={el}
                          key={el.id}
                          providers={props.data.providersList}
                          setFav={props.setFav}
                          jackPotValue={props.data.jackPotValue}
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

              {/* {filterValue === 'Jackpots' && props.data.games.length > showGamesCount &&
                <div onClick={() => setShowGamesCount(showGamesCount + 24)} className="more-games flex">
                  <p>{i18next.t('more games')}</p>
                </div>
              } */}
              {!loadingGames && foundGames.length === 0 && (
                <div className="no-games">{i18next.t("No games")}</div>
              )}
            </div>

            <LeaderBoard
              data={props.data.leaderBoard}
              width={props.data.width}
            />
          </div>

          <Footer data={props.data} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
