import {
  IonMenu,
  IonSearchbar,
  IonRippleEffect,
  useIonViewWillLeave,
  IonBadge,
  IonMenuToggle,
  IonToggle,
} from "@ionic/react";
import { menuController } from "@ionic/core";
import { ReactComponent as LiveChat } from "../images/live-chat.svg";
import { ReactComponent as Home } from "../images/home.svg";
import { ReactComponent as Live } from "../images/live.svg";
import { ReactComponent as Slots } from "../images/slots.svg";
import { ReactComponent as Games } from "../images/games.svg";
import { ReactComponent as Other } from "../images/other.svg";
import { ReactComponent as Poker } from "../images/games-category-tabs/poker.svg";
import { ReactComponent as Roulette } from "../images/games-category-tabs/roulette.svg";
// import { ReactComponent as Sportsbook } from '../images/soccer-ball.svg';
import sportsbookDark from "../images/sportsbook-dark.png";
import sportsbookLight from "../images/sportsbook-light.png";
import { ReactComponent as Plus } from "../images/plus.svg";
import { ReactComponent as Tournaments } from "../images/tournaments.svg";
import { ReactComponent as Premium } from "../images/premium.svg";
import { ReactComponent as Bonuses } from "../images/bonuses.svg";
import { ReactComponent as Providers } from "../images/providers.svg";
import { ReactComponent as Question } from "../images/question.svg";
import { ReactComponent as Favorites } from "../images/favorites.svg";
import { ReactComponent as GooglePlay } from "../images/googleplay.svg";
import { ReactComponent as AppStore } from "../images/appstore.svg";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../css/Menu.css";
import { useAtom } from "jotai";
import {
  mainLoading,
  logoutModal,
  balanceTotal,
  bingoCoinModal,
  liveChat,
  unreadLiveMessagesCount,
  authModal,
} from "../state.js";
import axios from "axios";
import url from "../axios.js";
import i18next from "i18next";
import PromoModal from "./PromoModal";
import useCheckRegister from "../hooks/useCheckRegister";
import useChangeCurrency from "../hooks/useChangeCurrency";

const Menu = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [isLiveChatOpen, setLiveChatOpen] = useAtom(liveChat);
  const [unreadMessagesCount, setUnreadMessagesCount] = useAtom(
    unreadLiveMessagesCount
  );
  const [full, setFull] = useState(false);
  const [focused, setFocused] = useState(false);
  const [foundGames, setFoundGames] = useState([]);
  /*eslint-disable*/
  const [showLoading, setShowLoading] = useAtom(mainLoading);
  const [auth, setAuth] = useAtom(authModal);
  const [balance, setBalance] = useAtom(balanceTotal);
  const [bonusBalance, setBonusBalance] = useState(0);
  const [freespinBalance, setFreespinBalance] = useState(0);
  const [openLogout, setOpenLogout] = useAtom(logoutModal);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isPromoModalOpen, setPromoModalOpen] = useState(false);
  const [isGamePage, setIsGamePage] = useState(false);
  const [lang, setLang] = useState(props.data.lang);
  // const { checkRegister } = useCheckRegister();
  const { changeCurrency, balanceActive, setBalanceActive } = useChangeCurrency(
    {
      currency_id: props.data.userData.currency_id,
      token: props.data.token,
      balance: props.data.balance,
      updateUser: props.updateUser,
    }
  );
  const [popoverBonusState, setShowPopoverBonus] = useState({
    showPopover: false,
    event: undefined,
  });
  const [popoverFreespinState, setShowPopoverFreespin] = useState({
    showPopover: false,
    event: undefined,
  });
  const [openBingoCoinModal, setOpenBingoCoinModal] = useAtom(bingoCoinModal);

  useEffect(() => {
    if (props.data.lang) {
      setLang(props.data.lang);
    }
  }, [props.data.lang]);

  useEffect(() => {
    if (location.pathname.includes("/game/")) {
      setIsGamePage(true);
    } else {
      setIsGamePage(false);
    }
  }, [location.pathname]);

  const routes = {
    gamesPages: [
      { title: "Home", path: "/home", icon: <Home /> },
      { title: "Live Games", path: "/games/live", icon: <Live /> },
      { title: "Slots", path: "/games/slots", icon: <Slots /> },
      { title: "Table Games", path: "/games/table", icon: <Games /> },
      {
        title: "Roulette",
        path: "/games/roulette",
        icon: <Roulette className="menu-link-icon" />,
      },
      {
        title: "Poker",
        path: "/games/poker",
        icon: <Poker className="menu-link-icon" />,
      },
      { title: "Other", path: "/games/other", icon: <Other /> },
    ],
    otherPages: [
      { title: "Giveaways", path: "/giveaways", icon: <Bonuses /> },
      { title: "Tournaments", path: "/tournaments", icon: <Tournaments /> },
      { title: "Levels", path: "/levels", icon: <Premium /> },
      { title: "Bonuses", path: "/bonuses", icon: <Bonuses /> },
      { title: "Providers", path: "/providers", icon: <Providers /> },
    ],
  };

  function renderlistItems(list) {
    return list
      .filter((route) => !!route.path)
      .map((page) => (
        <IonMenuToggle
          key={page.title}
          onClick={() => history.push(page.path)}
          className="menu-links"
          auto-hide="false"
        >
          <div
            className={
              "menu-link flex " +
              (location.pathname === page.path ? "url-selected" : "")
            }
          >
            {page.icon}
            <p>{i18next.t(page.title)}</p>
          </div>
        </IonMenuToggle>
      ));
  }

  /*eslint-enable*/
  function showDemoGame(id) {
    history.push(`/game/${id}_demo`);
  }

  function showGame(id) {
    history.push(`/game/${id}`);
  }

  let handleClickOutside = (event) => {
    const modal = document.getElementsByClassName("search-game-popover")[0];
    if (modal !== event.target) {
      setFoundGames([]);
    }
  };
  function addevent() {
    document.addEventListener("click", handleClickOutside, false);
  }
  function removeevent() {
    document.removeEventListener("click", handleClickOutside, false);
  }

  // function moveTo(path) {
  //   menuController.toggle('start');
  //   history.push(path);
  // }

  useEffect(() => {
    if (props.data.userData.currency_id) {
      let obj = props.data.balance.find((item) => item.currency_id == 840);
      setBonusBalance(obj.ob_b);
      setFreespinBalance(obj.ob_fs);
    }
  }, [props.data.balance, props.data.userData.currency_id]);

  useEffect(() => {
    function searchGame(e) {
      let temp = [];
      if (e !== "") {
        props.games.forEach((item) => {
          if (item.name.toLowerCase().indexOf(e.toLowerCase()) > -1) {
            temp.push(item);
          }
        });
        setFoundGames(temp);
      }
      if (e === "") {
        setFoundGames([]);
      }
    }
    searchGame(search);
  }, [props.games, search]);

  // function changeLang(e) {
  //   i18next.changeLanguage(e).then(() => {
  //     i18next.options.lng = e;
  //     localStorage.setItem("lan", e);
  //     props.data.changeLan(e);
  //   })
  // }

  function changeColor() {
    if (props.data.color) {
      props.setColor(false);
    } else {
      props.setColor(true);
    }
  }

  useIonViewWillLeave(() => {
    setShowPopoverBonus({ showPopover: false, event: undefined });
    setShowPopoverFreespin({ showPopover: false, event: undefined });
  });

  return (
    <IonMenu
      onIonDidOpen={() => {
        setMenuOpen(true);
        addevent();
      }}
      onIonDidClose={() => {
        setMenuOpen(false);
        removeevent();
        setSearch("");
      }}
      contentId="main"
      menuId="main-menu"
      side="start"
      type="overlay"
    >
      <div id="menu-list">
        {props.token === null && (
          <div className="only-mob-menu">
            {props.data.width < 768 && (
              <div className="menu-top flex">
                <IonToggle
                  onClick={changeColor}
                  checked={props.data.color}
                  className={`daymode-toggle ${
                    props.token === null ? "mr-a" : ""
                  }`}
                  mode={"md"}
                  tabIndex="3"
                />
              </div>
            )}

            <div className="unlogged flex">
              <IonMenuToggle
                onClick={() => history.push("/login")}
                // onClick={() => setAuth({ isOpen: true, type: 'login' })}
                className="w-100"
                auto-hide="false"
              >
                <div className="login-btn flex ion-activatable" tabIndex="2">
                  <IonRippleEffect />
                  {i18next.t("Login")}
                </div>
              </IonMenuToggle>

              <IonMenuToggle
                onClick={() => history.push("/register")}
                // onClick={checkRegister}
                className="w-100"
                auto-hide="false"
              >
                <div className="register-btn flex ion-activatable" tabIndex="1">
                  <IonRippleEffect />
                  {i18next.t("Sign up")}
                </div>
              </IonMenuToggle>

              {/* <div 
                onClick={() => setAuth({ isOpen: true, type: 'login' })} 
                className="login-btn flex ion-activatable"
                tabIndex="2"
              >
                <IonRippleEffect />
                {i18next.t('Login')}
              </div> */}
              {/* <div 
                onClick={checkRegister} 
                className="register-btn flex ion-activatable"
                tabIndex="1"
              >
                <IonRippleEffect />
                {i18next.t('Sign up')}
              </div> */}
            </div>
          </div>
        )}

        <div className="search-game-container">
          <IonSearchbar
            value={search}
            onIonFocus={() => setFocused(true)}
            onIonClear={() => setSearch("")}
            onIonBlur={() => setFocused(false)}
            onIonChange={(e) => setSearch(e.detail.value)}
            placeholder={i18next.t("Search game")}
            className={"search-game-field " + (focused ? "focused" : "")}
            type="text"
            tabIndex="0"
            debounce={0}
          />
          {foundGames.length > 0 && (
            <div className={"search-game-popover"}>
              {foundGames.map((el, i) => {
                return (
                  <IonMenuToggle
                    key={i}
                    className={"search-game-link flex"}
                    auto-hide="false"
                    onClick={() => {
                      if (props.data.token) {
                        showGame(el.id);
                      } else {
                        showDemoGame(el.id);
                      }
                    }}
                  >
                    <div
                      style={{ backgroundImage: `url(${el.banner_url})` }}
                      className={"game-image"}
                    ></div>
                    <p>{el.name}</p>
                  </IonMenuToggle>
                );
              })}
            </div>
          )}
        </div>

        {props.data.token !== null && (
          <>
            <div className="horizontal-line mt-0 mb-0"></div>

            <IonMenuToggle
              onClick={() => setLiveChatOpen(!isLiveChatOpen)}
              className="menu-links"
              auto-hide="false"
            >
              <div className={"menu-link live-chat-link flex"}>
                <LiveChat className="live-chat-icon" />
                <p>{i18next.t("Chat")}</p>
                {unreadMessagesCount > 0 && (
                  <IonBadge mode="ios">{unreadMessagesCount}</IonBadge>
                )}
              </div>
            </IonMenuToggle>

            <div className="horizontal-line mt-0"></div>
          </>
        )}

        {renderlistItems(routes.gamesPages)}

        <div className="menu-links">
          <div className={"menu-link flex "}>
            <img
              src={props.data.color ? sportsbookDark : sportsbookLight}
              alt="sportsbook"
            />
            <a target="_blank" rel="noopener noreferrer" href="https://sbet.gg">
              {i18next.t("Sportsbook")}
            </a>
          </div>
        </div>

        <div className="horizontal-line"></div>

        <div className="more-container flex">
          <Plus />
          <p className="more">{i18next.t("More")}</p>
        </div>

        {renderlistItems(routes.otherPages)}

        <div className="horizontal-line"></div>

        <IonMenuToggle
          onClick={() => history.push("/faq")}
          className="menu-links"
          auto-hide="false"
        >
          <div
            className={
              "menu-link flex " +
              (location.pathname === "/faq" ? "url-selected" : "")
            }
          >
            <Question className="question" />
            <p>{i18next.t("FAQ")}</p>
          </div>
        </IonMenuToggle>

        <div className="horizontal-line"></div>

        {props.token !== null && (
          <>
            <div className="more-container flex">
              <Favorites />
              <p className="more">{i18next.t("Favorites")}</p>
            </div>
            <div className="favs-menu-container">
              {props.favorites.length === 0 && (
                <p className="more auto">
                  {i18next.t("You have no favorite games yet.")}
                </p>
              )}
              {props.favorites.map((el, i) => {
                return (
                  <IonMenuToggle
                    onClick={() => showGame(el.id)}
                    key={i}
                    className="menu-fav flex"
                    auto-hide="false"
                  >
                    <img
                      className="menu-fav-preview"
                      alt={el.name}
                      src={`${el.banner_url}`}
                    ></img>
                    <p>{el.name}</p>
                  </IonMenuToggle>
                );
              })}
            </div>
            <div className="horizontal-line mb-0"></div>
          </>
        )}

        <div className="store-links flex">
          <a
            // href={`${process.env.PUBLIC_URL}/assets/Bingo-bet.apk`}
            href="https://bingo.bet/assets/Bingo-bet.apk"
            download
            target="_blank"
            rel="noreferrer"
            className="store-link"
          >
            <GooglePlay />
          </a>

          <IonMenuToggle
            onClick={() => history.push("/ios-app-setup")}
            className="store-link"
            auto-hide="false"
          >
            <AppStore />
          </IonMenuToggle>
        </div>

        <PromoModal
          setIsOpen={setPromoModalOpen}
          isOpen={isPromoModalOpen}
          token={props.data.token}
          updateUser={props.updateUser}
        />
      </div>
    </IonMenu>
  );
};

export default Menu;
