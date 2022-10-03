import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonSpinner,
  useIonViewWillLeave,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import axios from "axios";
import url from "../axios.js";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Header from "../components/Header";
import CategoriesFilter from "../components/CategoriesFilter.js";
import useSearch from "../hooks/useSearch";
import { useAtom } from "jotai";
import {
  defGameError,
  defGameUrl,
  defHtml,
  mainLoading,
  openGameId,
} from "../state";
import Iframe from "react-iframe";
import { useHistory, useParams } from "react-router";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { ReactComponent as FullscreenIcon } from "../images/fullscreen.svg";
import { ReactComponent as Like } from "../images/like.svg";
import "../css/game.css";
import { getGamesCategoryIcon } from "../utils/utils.js";

const Game = (props) => {
  const history = useHistory();
  const params = useParams();
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
  const [showLoading, setShowLoading] = useAtom(mainLoading);
  const [openGame, setOpenGame] = useAtom(openGameId);
  const [gameUrl, setGameUrl] = useAtom(defGameUrl);
  const [html, setHtml] = useAtom(defHtml);
  const [gameError, setGameError] = useAtom(defGameError);
  const [showGamesCount, setShowGamesCount] = useState(8);
  const [gameName, setGameName] = useState("");
  const [provider, setProvider] = useState("");
  const [notLoggedInText, setNotLoggedInText] = useState(false);
  const [isLike, setLike] = useState(0);
  const [likeQuantity, setLikeQuantity] = useState(0);
  const [loadingLike, setLoadingLike] = useState(false);
  const handleFullscreen = useFullScreenHandle();
  const [scrollTop, setScrollTop] = useState(0);

  // console.log(props.data.games);
  useEffect(() => {
    setLoadingLike(true);
    let game = "";
    if (
      params.id?.includes("demo") &&
      props.games &&
      props.games.some((el) => el.id == params.id.split("_")[0])
    ) {
      game = props.games.find((el) => el.id == params.id.split("_")[0]);
      setGameName(game.name);
      setProvider(props.providers.find((p) => p.id === game.merchant_id));
      setLike(game.islike);
      setLikeQuantity(game.cnt_likes);
      setLoadingLike(false);
    }
    if (
      !params.id?.includes("demo") &&
      props.games &&
      props.games.some((el) => el.id == params.id)
    ) {
      game = props.games.find((el) => el.id == params.id);
      setGameName(game.name);
      setProvider(props.providers.find((p) => p.id === game.merchant_id));
      setLike(game.islike);
      setLikeQuantity(game.cnt_likes);
      setLoadingLike(false);
    }
  }, [props.games, params.id]);

  useEffect(() => {
    setShowLoading(true);
    setGameError("");
    if (params.id?.includes("demo")) {
      showDemoGame(params.id.split("_")[0]);
    }
    if (
      props.token !== null &&
      props.currency &&
      !params.id?.includes("demo")
    ) {
      showGame(params.id);
      setNotLoggedInText(false);
    }
    if (props.token === null && !params.id?.includes("demo")) {
      setNotLoggedInText(true);
      setShowLoading(false);
    }
    if (!params.id) {
      history.push("/home");
    }
  }, [props.token, props.currency, params.id]);

  // useEffect(() => {
  //   props.mainPageFilter(filterValue);
  // }, [filterValue]);

  async function showDemoGame(id) {
    // setShowLoading(true);
    setOpenGame(id);
    axios({
      method: "post",
      url: url + "/api/run-demo-game",
      headers: {
        Authorization: props.token !== null ? `Bearer ${props.token}` : -1,
      },
      data: {
        id: id,
        lang: props.data.lang,
        platform: window.innerWidth <= 800 ? "mobile" : "desktop",
      },
    })
      .then((res) => {
        if (res.data.data.linkType === "URL") {
          setGameUrl(res.data.data.url);
        }
        if (res.data.data.linkType === "HTML") {
          setGameUrl("");
          setHtml(res.data.data.html);
        }
        setShowLoading(false);
      })
      .catch((err) => {
        setGameError(err.response.data.error);
        setShowLoading(false);
      });
  }

  function showGame(id) {
    // setShowLoading(true);
    setOpenGame(id);
    axios({
      method: "post",
      url: url + "/api/run-game",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      data: {
        id: id,
        lang: props.data.lang,
        currency: props.currency,
        platform: window.innerWidth <= 800 ? "mobile" : "desktop",
      },
    })
      .then((res) => {
        if (res.data.data.linkType === "URL") {
          setGameUrl(res.data.data.url);
        }
        if (res.data.data.linkType === "HTML") {
          setGameUrl("");
          setHtml(res.data.data.html);
        }
        setShowLoading(false);
      })
      .catch((err) => {
        setGameError(err.response.data.error);
        setShowLoading(false);
      });
  }

  function changeLike() {
    if (!loadingLike) {
      setLoadingLike(true);
      axios({
        method: "post",
        url: url + "/api/set-like",
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        data: {
          id: params.id.includes("demo") ? params.id.split("_")[0] : params.id,
          islike: Number(!isLike),
        },
      })
        .then((res) => {
          let count = isLike ? likeQuantity - 1 : likeQuantity + 1;
          setLikeQuantity(count);
          setLike(Number(!isLike));
          setLoadingLike(false);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setLoadingLike(false);
        });
    }
  }

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
    setGameUrl("");
    setOpenGame(null);
    setHtml("");
    setGameError("");
    setNotLoggedInText(false);
  });

  function toggleFullscreen() {
    let elem = document.querySelector(".game-canvas");
    // let elem = document.querySelector("#gameOpened");
    // if (!elem) {
    //   elem = document.querySelector(".html-frame iframe");
    // }

    if (elem.requestFullscreen) {
      console.log(elem.requestFullscreen);
      elem
        .requestFullscreen()
        .then(() => console.log("ok"))
        .catch((err) => {
          console.log(`Error attempting to enable full-screen mode: ${err})`);
        });
    } else if (elem.mozRequestFullscreen) {
      console.log(elem.mozRequestFullscreen);
      elem
        .mozRequestFullscreen()
        .then(() => console.log("ok"))
        .catch((err) => {
          console.log(`Error attempting to enable full-screen mode: ${err})`);
        });
    } else if (elem.msRequestFullscreen) {
      console.log(elem.msRequestFullscreen);
      elem
        .msRequestFullscreen()
        .then(() => console.log("ok"))
        .catch((err) => {
          console.log(`Error attempting to enable full-screen mode: ${err})`);
        });
    } else if (elem.webkitRequestFullscreen) {
      console.log(elem.webkitRequestFullscreen);
      elem
        .webkitRequestFullscreen()
        .then(() => console.log("ok"))
        .catch((err) => {
          console.log(`Error attempting to enable full-screen mode: ${err})`);
        });
    }

    // elem.requestFullscreen = elem.requestFullscreen || elem.mozRequestFullscreen || elem.msRequestFullscreen || elem.webkitRequestFullscreen;
    // if (!document.fullscreenElement) {
    //   elem.requestFullscreen().catch(err => {
    //     console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    //   });
    // } else {
    //   document.exitFullscreen();
    // }
  }

  return (
    <IonPage>
      {/* <Header
        setColor={props.setColor}
        color={props.color}
        data={props.data} 
        updateUser={props.updateUser} 
      /> */}

      <IonContent
        id={"game-page"}
        className={"page"}
        scrollEvents={true}
        onIonScroll={(e) => setScrollTop(e?.detail.currentY)}
      >
        <div className="homepage flex">
          <div
            className={`width-container game-page-width-container ${
              props.data.width <= 1024 ? "flex" : ""
            }`}
          >
            <div className="game-container">
              <div className="game-header flex">
                <div className="game-header-title">{gameName}</div>
                {provider?.id && (
                  <div
                    className="game-header-logo"
                    onClick={() => {
                      // setCurProvider(provider);
                      history.push(`/providers/${provider.name}`);
                    }}
                  >
                    <img src={provider.logo} alt={provider.name} />
                    {/* <img src={`${process.env.PUBLIC_URL}/assets/provider-logos/${provider.name}.png`} alt={provider.name} /> */}
                  </div>
                )}
              </div>

              <div className="game-center-wrapper">
                <div className="game-center">
                  <FullScreen
                    handle={handleFullscreen}
                    className={`game-canvas ${
                      handleFullscreen.active ? "with-header" : ""
                    }`}
                  >
                    {/* <div className="game-canvas"> */}
                    {props.data.width > 1024 && handleFullscreen.active && (
                      <div className="game-canvas-header">
                        <div className="logo-link"></div>
                      </div>
                    )}
                    {notLoggedInText && (
                      <div className="err-window">
                        <p>
                          {i18next.t(
                            "To play the full version of the game, please log in or try the demo mode."
                          )}
                        </p>
                        <div
                          onClick={() => {
                            setNotLoggedInText(false);
                            history.push(`/game/${params.id}_demo`);
                          }}
                          className="demo flex"
                        >
                          {i18next.t("demo")}
                        </div>
                      </div>
                    )}
                    {gameError && (
                      <div className="err-window">
                        <p>{gameError}</p>
                      </div>
                    )}

                    {gameUrl && (
                      <Iframe
                        onLoad={() => setTimeout(setShowLoading(false), 3000)}
                        url={gameUrl.toString()}
                        width="100%"
                        height="100%"
                        id="gameOpened"
                        className="game-opened"
                        display="initial"
                        position="relative"
                        allowFullScreen
                      />
                    )}

                    {html && html.match("booongo") !== null && (
                      <iframe
                        srcDoc={html}
                        onLoad={() => setTimeout(setShowLoading(false), 3000)}
                        width="100%"
                        height="100%"
                        id="gameOpened"
                        className="game-opened"
                        display="initial"
                        position="relative"
                        allowFullScreen
                      />
                    )}

                    {html && html.match("booongo") === null && (
                      <div className="html-frame">
                        <div
                          className="html-frame"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                        <Helmet
                          onLoad={() => setTimeout(setShowLoading(false), 3000)}
                        >
                          {html.match(
                            /<script\b[^>]*>([\s\S]*?)<\/script>/gm
                          ) !== null &&
                            Array.from(
                              html.match(
                                /<script\b[^>]*>([\s\S]*?)<\/script>/gm
                              )
                            ).map((el, i) => {
                              if (html.match("egamingsStartNetEnt") !== null) {
                                if (
                                  /<script\b[^>]*>([\s\S]*?)<\/script>/gm.exec(
                                    el
                                  )[1] !== ""
                                ) {
                                  return (
                                    <script type="text/javascript" key={i}>
                                      {/<script\b[^>]*>([\s\S]*?)<\/script>/gm.exec(
                                        el
                                      )[1] + " egamingsStartNetEnt()"}
                                    </script>
                                  );
                                }
                                if (
                                  /<script\b[^>]*>([\s\S]*?)<\/script>/gm.exec(
                                    el
                                  )[1] === ""
                                ) {
                                  return (
                                    <script
                                      key="added"
                                      type="text/javascript"
                                      src="https://egamings-static-test.casinomodule.com/gameinclusion/library/gameinclusion.js"
                                    ></script>
                                  );
                                }
                              } else {
                                return (
                                  <script type="text/javascript" key={i}>
                                    {
                                      /<script\b[^>]*>([\s\S]*?)<\/script>/gm.exec(
                                        el
                                      )[1]
                                    }
                                  </script>
                                );
                              }
                            })}
                        </Helmet>
                      </div>
                    )}
                    {/* </div> */}
                  </FullScreen>
                </div>
              </div>

              <div className="game-footer flex">
                <div
                  onClick={changeLike}
                  className={`game-footer-like-btn ${isLike ? "active" : ""}`}
                >
                  {loadingLike ? (
                    <IonSpinner />
                  ) : (
                    <>
                      <Like />
                      <span>{likeQuantity}</span>
                    </>
                  )}
                </div>
                <div
                  onClick={handleFullscreen.enter}
                  className="game-footer-fullscreen-btn"
                >
                  <FullscreenIcon />
                </div>
              </div>
            </div>

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
                  isDark={props.color}
                  width={props.data.width}
                  lang={props.lang}
                  // allTag={{ tag: 'all', image: getGamesCategoryIcon('all'), displayName: 'All' }}
                  // slotsTag={{ tag: 'SLOTS', image: getGamesCategoryIcon('slots'), displayName: 'Slots' }}
                />
              )}
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
          </div>

          <Footer data={props.data} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Game;
