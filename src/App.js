import { IonApp, IonSplitPane, setupIonicReact, isPlatform } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import packageJson from "../package.json";
import Menu from "./components/Menu.js";
import CookieModal from "./components/CookieModal.js";
import LogoutModal from "./components/LogoutModal.js";
import ForgotModal from "./components/ForgotModal.js";
import MainLoading from "./components/MainLoading.js";
import GlobalMessages from "./components/GlobalMessages.js";
import Chat from "./chat/Chat.js";
import React from "react";
import axios from "axios";
import url from "./axios.js";
import FP from "@fingerprintjs/fingerprintjs-pro";
import Pusher from "pusher-js";
import GameModal from "./components/GameModal";
import PremiumModal from "./components/PremiumModal.js";
import KYCModal from "./components/KYCModal.js";
import BingoCoinModal from "./components/BingoCoinModal.js";
import CashbackSuccessModal from "./components/CashbackSuccessModal.js";
import Header from "./components/Header.js";
import BountySuccessModal from "./components/BountySuccessModal.js";
import PremiumModalHowToCharge from "./components/PremiumModalHowToCharge.js";
import moment from "moment";
import i18next from "i18next";
import smoothscroll from "smoothscroll-polyfill";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/css/media.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "./css/app.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/headervars.css";
import LiveChat from "./chat/LiveChat.js";
import LiveChatRulesModal from "./chat/components/LiveChatRulesModal.js";
import NewAppVersionModal from "./components/NewAppVersionModal.js";
import AuthModal from "./components/AuthModal";
import RegisterFinalModal from "./components/RegisterFinalModal";
import CloseButton from "./components/ui/toast/CloseButton";
import { notify } from "./utils/utils";
import CusIonRouterOutlet from "./CusIonRouterOutlet";
import SwutchModalForGW from "./components/page-giveaways-content/SwutchModalForGW";
import Toasts from "./components/ui/toast/Toasts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainIsLoading: true,
      loadingMainData: false,
      loadingBonuses: false,
      loadingRecommended: false,
      comission: 0,
      banners: { desktop: [], mobile: [] },
      globalFilter: "none",
      width: window.innerWidth,
      games: [],
      userData: [],
      providersList: [],
      favs: [],
      lang: "GB",
      listPaymentSystem: [],
      applang: "GB",
      balance: [],
      token: null,
      uuid: "",
      logins: [],
      recommended: [],
      tags: [],
      slots: [],
      creditErr: false,
      fgames: [],
      live: [],
      other: [],
      poker: [],
      roulette: [],
      games_history: [],
      defaultGames: [],
      jackPotValue: 0,
      jackPotCount: 0,
      countries: [],
      verifyErr: false,
      currencies: [],
      provsFooter: [],
      bets: 0,
      bets_count: 0,
      wins: 0,
      wins_count: 0,
      deposits: 0,
      withdrawals: 0,
      deposits_count: 0,
      withdrawal_count: 0,
      topGames: [],
      tournaments: [],
      color: true,
      transactions: [],
      warningCookie: false,
      warningForbidden: false,
      bonuses: [],
      changeProv: this.setGlobalFilter,
      changeLan: this.changeGlobalLan,
      fingerprint: {},
      leaderBoard: [],
      playerInfo: {},
      pusher: "",
      isNewVersionApp: false,
      yourParametr: "",
      // platforms: [],
    };

    setupIonicReact();
  }

  setGlobalFilter = (prop) => {
    this.setState((state) => {
      return {
        globalFilter: prop,
      };
    });
  };

  changeGlobalLan = (prop) => {
    this.setState((state) => {
      return {
        lang: prop,
      };
    });
  };

  getPaymentSystems = (token) => {
    axios({
      method: "post",
      url: url + "/api/get-paymentsystem-list",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      this.setState({ listPaymentSystem: res.data.data.listPaymentSystem });
    });
  };

  setColor = (prop) => {
    this.setState({ color: prop });
    if (prop === true) {
      document.getElementsByTagName("body")[0].classList.add("dark");
    }
    if (prop === false) {
      document.getElementsByTagName("body")[0].classList.remove("dark");
    }
  };

  getBonuses = (str) => {
    this.setState({ loadingBonuses: true });
    axios({
      method: "post",
      url: url + "/api/get-bonuses",
      data: {
        lang: str,
      },
    })
      .then((res) => {
        this.setState({
          bonuses: res.data.data.map((el) => {
            return {
              name: el.name || "",
              img: el.image || "",
              content: JSON.parse(el.description)[0]?.contents,
              type: el.type,
            };
          }),
        });
      })
      .finally(() => this.setState({ loadingBonuses: false }));
  };

  getTournaments = () => {
    axios({
      method: "post",
      url: url + "/api/get-tournaments",
    }).then((res) => {
      this.setState({ tournaments: res.data.data });
    });
  };

  getLogins = (token) => {
    axios({
      method: "post",
      url: url + "/api/multiple-logins",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      this.setState({ logins: res.data.data.session.reverse() });
    });
  };

  getTopGames = (days, token) => {
    axios({
      method: "post",
      url: url + "/api/top-games",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        date_from: moment().subtract(days, "days").unix(),
        date_to: moment(new Date()).unix(),
      },
    }).then((res) => {
      this.setState({
        topGames: res.data.data.topGames,
      });
    });
  };

  getHistoryTransactions = (days, token) => {
    axios({
      method: "post",
      url: url + "/api/history-transactions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        date_from: moment().subtract(days, "days").unix(),
        date_to: moment(new Date()).unix(),
      },
    }).then((res) => {
      // this.props.setShowLoading(false);
      this.setState({ transactions: res.data.data.history.reverse() });
      // console.log(res.data.data.history);
    });
  };

  getExactTransactions = (from, to, token) => {
    axios({
      method: "post",
      url: url + "/api/history-transactions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        date_from: moment(from).unix(),
        date_to: moment(to).unix(),
      },
    }).then((res) => {
      // this.props.setShowLoading(false);
      this.setState({ transactions: res.data.data.history.reverse() });
      // console.log(res.data.data.history);
    });
  };

  getHistoryDeposits = (period, token) => {
    axios({
      method: "post",
      url: url + "/api/history-transactions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        date_from: moment().subtract(period, "days").unix(),
        date_to: moment(new Date()).unix(),
      },
    }).then((res) => {
      if (res.data.data.history.length !== 0) {
        // console.log(res.data.data.history);
        var depositValue = 0;
        var withdrawalValue = 0;
        res.data.data.history
          .filter((i) => i.operation === "Deposit")
          .forEach((el) => {
            // depositValue = depositValue + +el.amount;
            depositValue = depositValue + +el.summa_priv;
          });
        res.data.data.history
          .filter((i) => i.operation === "Withdrawal")
          .forEach((el) => {
            // withdrawalValue = withdrawalValue + +el.amount;
            withdrawalValue = withdrawalValue + +el.summa_priv;
          });
        let total = 0;
        res.data.data.history.forEach((el) => {
          // total = total + +el.amount;
          total = total + +el.summa_priv;
        });
        let deposit = (depositValue / total) * 100;
        let withdrawal = (withdrawalValue / total) * 100;
        this.setState({
          deposits: deposit.toFixed(2),
          withdrawals: withdrawal.toFixed(2),
          deposits_count: depositValue,
          withdrawal_count: withdrawalValue,
        });
      }
      if (res.data.data.history.length === 0) {
        this.setState({
          deposits: 0,
          withdrawals: 0,
          deposits_count: 0,
          withdrawal_count: 0,
        });
      }
    });
  };

  getExactGames = (from, to, token) => {
    axios({
      method: "post",
      url: url + "/api/history-games",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        date_from: moment(from).unix(),
        date_to: moment(to).unix(),
      },
    }).then((res) => {
      if (res.data.data.history.length !== 0) {
        let bets =
          (res.data.data.history.filter((i) => i.operation === "Bet").length /
            res.data.data.history.length) *
          100;
        let wins =
          (res.data.data.history.filter((i) => i.operation === "Win").length /
            res.data.data.history.length) *
          100;
        this.setState({
          bets: bets.toFixed(2),
          wins: wins.toFixed(2),
          games_history: res.data.data.history,
          bets_count: res.data.data.history.filter((i) => i.operation === "Bet").length,
          wins_count: res.data.data.history.filter((i) => i.operation === "Win").length,
        });
      }
      if (res.data.data.history.length === 0) {
        this.setState({
          bets: 0,
          wins: 0,
          games_history: [],
          bets_count: 0,
          wins_count: 0,
        });
      }
    });
  };

  getHistoryBets = (period, token) => {
    axios({
      method: "post",
      url: url + "/api/history-games",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        date_from: moment().subtract(period, "days").unix(),
        date_to: moment(new Date()).unix(),
      },
    }).then((res) => {
      if (res.data.data.history.length !== 0) {
        let tempBets = res.data.data.history.filter((i) => i.operation === "Bet");
        let tempWins = res.data.data.history.filter((i) => i.operation === "Win");
        let tempBet = 0;
        let tempWin = 0;
        let total = 0;
        res.data.data.history.forEach((el) => {
          // total = total + +el.amount
          total = total + +el.summa_priv;
        });

        tempBets.forEach((item, i) => {
          // tempBet += +item.amount;
          tempBet += +item.summa_priv;
        });
        tempWins.forEach((item, i) => {
          // tempWin += +item.amount;
          tempWin += +item.summa_priv;
        });
        // let bets = tempBet / total * 100;
        // let wins = tempWin / total * 100;
        let bets = 100;
        let wins = (tempWin / tempBet) * 100;

        this.setState({
          bets: bets.toFixed(2),
          wins: wins.toFixed(2),
          games_history: res.data.data.history,
          bets_count: tempBet.toFixed(1),
          wins_count: tempWin.toFixed(1),
        });
      }
      if (res.data.data.history.length === 0) {
        this.setState({
          bets: 0,
          wins: 0,
          games_history: [],
          bets_count: 0,
          wins_count: 0,
        });
      }
    });
  };

  getTags = () => {
    axios({
      method: "post",
      url: url + "/api/list-tags",
    }).then((res) => {
      this.setState({ tags: res.data.data.listTags });
    });
  };

  getPlayerInfo = () => {
    const info = {
      player_id: 777,
      name: "Zallahi123",
      joined: "12 Nov, 2021 Joined",
      best_wins: "30000",
      player_level: 0,
      favorite_games: [
        {
          id: 1634,
          img: "https://static.egamings.com/games/pragmaticplay/vs20fruitsw.jpg",
          hasDemo: "1",
          wagered: 29934.0,
        },
        {
          id: 4607,
          img: "https://cdn.softswiss.net/i/s2/evoplay/BrutalSanta.png",
          hasDemo: "1",
          wagered: 34.0,
        },
        {
          id: 2988,
          img: "https://static.egamings.com/games/mg/10000_wishes.jpg",
          hasDemo: "1",
          wagered: 29934.0,
        },
        {
          id: 4150,
          img: "https://cdn.softswiss.net/i/s2/yggdrasil/10xRewind.png",
          hasDemo: "1",
          wagered: 9934.0,
        },
        {
          id: 4318,
          img: "https://cdn.softswiss.net/i/s2/wazdan/9Tigers.png",
          hasDemo: "1",
          wagered: 934.0,
        },
      ],
    };
    this.setState({ playerInfo: info });
  };

  getCurrencies = () => {
    axios({
      method: "post",
      url: url + "/api/get-currencies",
    }).then((res) => {
      this.setState({ currencies: res.data });
    });
  };

  getCountries = () => {
    axios({
      method: "post",
      url: url + "/api/permitted-countries",
    }).then((res) => {
      // console.log(res);
      this.setState({ countries: res.data });
    });
  };

  getInfo = (token) => {
    this.getPaymentSystems(token);
    axios({
      method: "post",
      url: url + "/api/user",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res);
        this.setState({
          userData: {
            ...res.data.data.player,
            login: res.data.data.login,
            statusProgress: res.data.data.status_progress,
            statusRakeback: res.data.data.rakeback_status,
          },
          balance: res.data.data.balance,
          token: token,
          comission: res.data.data.change_currency_commission,
        });
        localStorage.setItem("token", token);
        this.checkLoan();
        if (
          res.data.data.player.verified_status === 3 ||
          res.data.data.player.verified_status === 4
        ) {
          let changeStateLately = () => {
            this.setVerifyError();
            // this.setState({ verifyErr: true });
          };
          setTimeout(changeStateLately, 3000);
        }
        this.setMainLoading(false);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          localStorage.removeItem("token");
          window.location.reload();
        }
      });

    axios({
      method: "post",
      url: url + "/api/multiple-logins",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      this.setState({ logins: res.data.data.session.reverse() });
    });
  };

  getBalance = (token) => {
    axios({
      method: "post",
      url: url + "/api/user-balance",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => this.setState({ balance: res.data.data }))
      .catch((error) => console.log(error.response.data));
  };

  setVerifyError = () => {
    notify({ message: i18next.t("You have some issues with verification.") });

    // this.setState({ verifyErr: true });
    // setTimeout(() => this.setState({ verifyErr: false }), 3000);
  };

  setToken = (token) => {
    this.setState({ token: token });
    this.getGames(true, token);
    this.getInfo(token);
    setInterval(() => {
      this.getBalance(token);
    }, 60000);
  };

  setUuid = (uuid) => {
    this.setState({ uuid: uuid });
  };

  checkGames = (item, tag) => {
    let boo = false;
    item.tags.forEach((el, i) => {
      if (el.cat === tag) {
        boo = true;
      }
    });
    return boo;
  };

  checkTags = (item, tag) => {
    let boo = false;
    item.tags.forEach((el, i) => {
      if ((el.cat === "GAMES" || el.cat === "LIVE") && el.tag.includes(tag)) {
        boo = true;
      }
    });
    return boo;
  };

  mainPageFilter = (prop) => {
    const promisedUpdate = new Promise((resolve) => {
      resolve(this.setState({ games: [] }));
    });
    if (prop === "all") {
      promisedUpdate.then(() => {
        this.setState({ games: this.state.defaultGames });
      });
    }

    let tempArr = [];
    if (prop === "SLOTS") {
      promisedUpdate.then(() => {
        this.state.defaultGames.map((el) => {
          el.tags.forEach((element) => {
            if (element.cat === "SLOTS") {
              tempArr.push(el);
            }
          });
          return null;
        });
        this.setState({ games: tempArr });
        tempArr = [];
      });
    }

    if (prop !== "all" && prop !== "SLOTS") {
      promisedUpdate.then(() => {
        this.state.defaultGames.map((el) => {
          el.tags.forEach((element) => {
            element.tag.forEach((tag) => {
              if (tag === prop) {
                tempArr.push(el);
              }
            });
          });
          return null;
        });
        this.setState({ games: tempArr });
        tempArr = [];
      });
    }
  };

  gamesPageFilter = (prop) => {
    let promisedUpdate = new Promise((resolve) => {
      resolve(this.setState({ fgames: [] }));
    });
    if (prop !== "all") {
      let tempArr = [];
      promisedUpdate.then(() => {
        this.state.defaultGames.map((el) => {
          el.tags.forEach((element) => {
            if (element.cat === "GAMES") {
              element.tag.forEach((tag) => {
                if (tag === prop) {
                  tempArr.push(el);
                }
              });
            }
          });
          return null;
        });
        this.setState({ fgames: tempArr });
        tempArr = [];
      });
    }
    if (prop === "all") {
      promisedUpdate.then(() => {
        this.setState({
          fgames: this.state.defaultGames.filter((el) => this.checkGames(el, "GAMES")),
        });
      });
    }
  };

  slotsPageFilter = (prop) => {
    // console.log(this.state.defaultGames);
    let promisedUpdate = new Promise((resolve) => {
      resolve(this.setState({ slots: [] }));
    });
    if (prop !== "all") {
      let tempArr = [];
      promisedUpdate.then(() => {
        this.state.defaultGames.map((el) => {
          el.tags.forEach((element) => {
            if (element.cat === "SLOTS") {
              element.tag.forEach((tag) => {
                if (tag === prop) {
                  tempArr.push(el);
                }
              });
            }
          });
          return null;
        });
        this.setState({ slots: tempArr });
        tempArr = [];
      });
    }
    if (prop === "all") {
      promisedUpdate.then(() => {
        this.setState({
          slots: this.state.defaultGames.filter((el) => this.checkGames(el, "SLOTS")),
        });
      });
    }
  };

  livePageFilter = (prop) => {
    // console.log(this.state.defaultGames);
    let promisedUpdate = new Promise((resolve) => {
      resolve(this.setState({ live: [] }));
    });
    if (prop !== "all") {
      let tempArr = [];
      promisedUpdate.then(() => {
        this.state.defaultGames.map((el) => {
          el.tags.forEach((element) => {
            if (element.cat === "LIVE") {
              element.tag.forEach((tag) => {
                if (tag === prop) {
                  tempArr.push(el);
                }
              });
            }
          });
          return null;
        });
        this.setState({ live: tempArr });
        tempArr = [];
      });
    }
    if (prop === "all") {
      promisedUpdate.then(() => {
        this.setState({
          live: this.state.defaultGames.filter((el) => this.checkGames(el, "LIVE")),
        });
      });
    }
  };

  pokerPageFilter = (prop) => {
    let promisedUpdate = new Promise((resolve) => {
      resolve(this.setState({ poker: [] }));
    });
    if (prop !== "all") {
      let tempArr = [];
      promisedUpdate.then(() => {
        this.state.defaultGames.map((el) => {
          el.tags.forEach((element) => {
            if (element.cat === prop) {
              element.tag.forEach((tag) => {
                if (tag === "Poker") {
                  tempArr.push(el);
                }
              });
            }
          });
          return null;
        });
        this.setState({ poker: tempArr });
        tempArr = [];
      });
    }
    if (prop === "all") {
      promisedUpdate.then(() => {
        this.setState({
          poker: this.state.defaultGames.filter((el) => this.checkTags(el, "Poker")),
        });
      });
    }
  };

  roulettePageFilter = (prop) => {
    let promisedUpdate = new Promise((resolve) => {
      resolve(this.setState({ roulette: [] }));
    });
    if (prop !== "all") {
      let tempArr = [];
      promisedUpdate.then(() => {
        this.state.defaultGames.map((el) => {
          el.tags.forEach((element) => {
            if (element.cat === prop) {
              element.tag.forEach((tag) => {
                if (tag === "Roulette") {
                  tempArr.push(el);
                }
              });
            }
          });
          return null;
        });
        this.setState({ roulette: tempArr });
        tempArr = [];
      });
    }
    if (prop === "all") {
      promisedUpdate.then(() => {
        this.setState({
          roulette: this.state.defaultGames.filter((el) => this.checkTags(el, "Roulette")),
        });
      });
    }
  };

  getJackpotValue = () => {
    axios({
      method: "post",
      url: url + "/api/get-jackpot-total",
    }).then((res) => {
      this.setState({
        jackPotValue: res.data[0].value,
        jackPotCount: res.data[0].count,
      });
    });
  };

  getGames = (boo, token) => {
    if (boo) {
      FP.load({ token: "UCmjTCW278UaQTDLjsMJ", region: "eu" })
        .then((fp) => fp.get({ extendedResult: true }))
        .then((res) => {
          this.setState({
            fingerprint: res,
            loadingMainData: true,
            loadingRecommended: true,
          });
          axios({
            method: "post",
            url: url + "/api/list-games-auth",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              platform: window.innerWidth <= 800 ? "mobile" : "desktop",
              country_code: res.ipLocation.country.code,
            },
          })
            .then((res) => {
              this.setState({
                providersList: [...res.data.data.merchants],
                provsFooter: [...res.data.data.merchants],
                warningForbidden: res.data.data.listGames.some((game) => !!game.forbidden),
                defaultGames: res.data.data.listGames,
                games: res.data.data.listGames,
                slots: res.data.data.listGames.filter((el) => this.checkGames(el, "SLOTS")),
                fgames: res.data.data.listGames.filter((el) => this.checkGames(el, "GAMES")),
                live: res.data.data.listGames.filter((el) => this.checkGames(el, "LIVE")),
                other: res.data.data.listGames.filter((el) => this.checkGames(el, "OTHERS")),
                poker: res.data.data.listGames.filter((el) => this.checkTags(el, "Poker")),
                roulette: res.data.data.listGames.filter((el) => this.checkTags(el, "Roulette")),
                favs: res.data.data.listGames.filter((el) => el.favorite === 1),
                recommended: res.data.data.listGames.filter((el) => el.recommended === 1),
              });
            })
            .finally(() =>
              this.setState({
                loadingMainData: false,
                loadingRecommended: false,
              })
            );
        });
    } else if (!boo) {
      this.setState({ loadingMainData: true, loadingRecommended: true });
      axios({
        method: "post",
        url: url + "/api/list-games-new",
        data: {
          platform: window.innerWidth <= 800 ? "mobile" : "desktop",
        },
      })
        .then((res) => {
          this.setState({
            providersList: [...res.data.data.merchants],
            provsFooter: [...res.data.data.merchants],
            defaultGames: res.data.data.listGames,
            games: res.data.data.listGames,
            slots: res.data.data.listGames.filter((el) => this.checkGames(el, "SLOTS")),
            fgames: res.data.data.listGames.filter((el) => this.checkGames(el, "GAMES")),
            live: res.data.data.listGames.filter((el) => this.checkGames(el, "LIVE")),
            other: res.data.data.listGames.filter((el) => this.checkGames(el, "OTHERS")),
            poker: res.data.data.listGames.filter((el) => this.checkTags(el, "Poker")),
            roulette: res.data.data.listGames.filter((el) => this.checkTags(el, "Roulette")),
            recommended: res.data.data.listGames.filter((it) => it.recommended === 1),
          });
        })
        .finally(() => this.setState({ loadingMainData: false, loadingRecommended: false }));
    }
  };

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  getBanners = () => {
    axios({
      method: "post",
      url: url + "/api/get-banners-new",
    }).then((res) => {
      // console.log(res.data);
      this.setState({
        banners: {
          desktop: res.data.desktop,
          desktopSmall: res.data.desktop2,
          desktopSmallRight: res.data.desktop3,
          mobile: res.data.mobile,
        },
        advs: {
          desktop: res.data.desktopLow,
          mobile: res.data.mobileLow,
        },
      });
    });
  };

  checkLoan = () => {
    this.state.balance.forEach((item) => {
      if (item.currency_id === this.state.userData.currency_id && item.credit_status === 2) {
        if (+item.credit_time < moment(new Date()).unix()) {
          notify({
            message: i18next.t("You have an overdue loan."),
            autoClose: false,
          });
        }
      }
    });

    // this.state.balance.forEach((item) => {
    //   if (item.currency_id === this.state.userData.currency_id && item.credit_status === 2) {
    //     if (+item.credit_time < moment(new Date()).unix()) {
    //       this.setState({ creditErr: true });
    //     }
    //   }
    // });
  };

  changeFooter = () => {
    let arr = this.state.provsFooter;
    arr.push(arr[0]);
    this.setState({ provsFooter: [] });
    arr.splice(0, 1);
    this.setState({ provsFooter: arr });
  };

  getAppVersion = () => {
    return axios({
      url: "https://bingo.bet/app-version.json",
      // url: './app-version.json'
    });
  };

  checkAppVersion = () => {
    this.getAppVersion().then((res) => {
      if (res.data?.version != packageJson?.version && isPlatform("android")) {
        this.setState({ isNewVersionApp: true });
      }
    });

    setInterval(() => {
      this.getAppVersion().then((res) => {
        if (res.data?.version != packageJson?.version && !isPlatform("android")) {
          window.location.reload();
        }
      });
    }, 60000);
  };

  componentDidMount() {
    this.getYourParametr();

    if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
      this.checkAppVersion();
    }

    // kick off the polyfill!
    smoothscroll.polyfill();

    window.onload = function () {
      window.apg_e2d99ef0_80aa_4b65_965a_b09eccf29ba2?.init();
    };

    window.addEventListener("resize", this.handleWindowSizeChange);
    if (localStorage.getItem("cookie") !== "accepted") {
      this.setState({ warningCookie: true });
    }
    if (localStorage.getItem("lan") !== null) {
      this.setState({ lang: localStorage.getItem("lan") });
      this.getBonuses(localStorage.getItem("lan"));
    }
    if (localStorage.getItem("lan") === null || localStorage.getItem("lan") === undefined) {
      this.getBonuses("GB");
    }

    this.getLeaderBoard();
    this.getCurrencies();
    this.getCountries();
    this.getJackpotValue();
    this.getBanners();
    this.getTournaments();
    this.getTags();
    this.getPlayerInfo();
    let token = localStorage.getItem("token");
    if (token !== null || this.state.token !== null) {
      this.getInfo(token);
      setInterval(() => {
        this.getBalance(token);
      }, 60000);
      // this.getPusher(token);
      this.getGames(true, token);
      this.getLogins(token);
      this.getHistoryBets(30, token);
      this.getHistoryDeposits(90, token);
      this.getHistoryTransactions(30, token);
      this.getTopGames(10, token);
      this.checkLoan();
    } else {
      this.getGames(false, null);

      if (
        window.location.pathname !== "/register" &&
        !window.location.pathname.includes("/promo")
      ) {
        setInterval(() => this.setMainLoading(false), 1000);
      }
      // this.setMainLoading(false);
    }
    setInterval(this.changeFooter, 5000);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  getYourParametr = () => {
    const params = new URLSearchParams(window?.location?.search);
    if (params) {
      const yParametr = params.get("your_parameter");
      // console.log(yParametr);
      this.setState({ yourParametr: yParametr });
    }
  };

  fromDocs = (boo) => {
    this.setState((state) => {
      return {
        warningCookie: boo,
      };
    });
  };

  getPusher = (token) => {
    this.setState({
      pusher: new Pusher("1234567", {
        cluster: "mt1",
        wsHost: "admin.bingo.bet",
        authEndpoint: "https://admin.bingo.bet/api/broadcasting/auth",
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        wsPort: 6001,
        wssPort: 6001,
        enabledTransports: ["ws", "wss"],
        // forceTLS: true
      }),
    });
  };

  // setWarningForbidden = (boo) => {
  //   this.setState((state) => {
  //     return {
  //       warningForbidden: boo
  //     }
  //   })
  // }

  /*eslint-disable*/
  setFav = (id, value) => {
    let mutate = this.state.defaultGames.filter((el) => el.id === id)[0];
    mutate.favorite = value;
    let index = this.state.defaultGames.indexOf(
      this.state.defaultGames.filter((el) => el.id === id)[0]
    );
    let arr = this.state.games;
    let defaultArr = this.state.games;
    arr.forEach((item, i) => {
      if (item.id === id) {
        item.favorite = value;
      }
    });
    defaultArr.forEach((item, i) => {
      if (item.id === id) {
        item.favorite = value;
      }
    });
    this.setState({
      defaultGames: defaultArr,
      games: arr,
      favs: this.state.defaultGames.filter((el) => el.favorite === 1),
    });
    arr = [];
    defaultArr = [];
    /*eslint-enable*/
  };

  getLeaderBoard = () => {
    axios({
      method: "post",
      url: url + "/api/get-wins",
    })
      .then((res) => {
        this.setState({
          leaderBoard: res.data.data.all_wins,
        });
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  setMainLoading = (isLoading) => {
    this.setState({ mainIsLoading: isLoading });
  };

  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <NewAppVersionModal
            isOpen={this.state.isNewVersionApp}
            setOpen={this.setOpenNewAppVersionModal}
          />

          <LiveChat
            token={this.state.token}
            color={this.state.color}
            width={this.state.width}
            user_id={this.state.userData.user_id}
            pusher={this.state.pusher}
            getPusher={this.getPusher}
          />

          <Chat name={this.state.userData.first_name} token={this.state.token} />

          {this.state.token && <LiveChatRulesModal />}

          <AuthModal
            setToken={this.setToken}
            setUuid={this.setUuid}
            currencies={this.state.currencies}
            countries={this.state.countries}
            color={this.state.color}
            width={this.state.width}
            token={this.state.token}
            yourParametr={this.state.yourParametr}
            this={this}
          />

          <SwutchModalForGW data={this.state} token={this.state.token} />
          <Toasts />
          <RegisterFinalModal data={this.state} setUuid={this.setUuid} isBlack={this.state.color} />

          <ForgotModal isBlack={this.state.color} />

          {/* <Loginmodal setToken={this.setToken} setUuid={this.setUuid} /> */}
          {/* <RegisterModal setUuid={this.setUuid} currencies={this.state.currencies} countries={this.state.countries} /> */}
          <MainLoading mainIsLoading={this.state.mainIsLoading} />
          <GlobalMessages />
          {/* <CreditWarning creditErr={this.state.creditErr} /> */}
          {this.state.userData.statusProgress && (
            <PremiumModal statusProgress={this.state.userData.statusProgress} />
          )}
          <PremiumModalHowToCharge
            token={this.state.token}
            currency={this.state.userData.currency_id}
            balance={this.state.balance}
            updateUser={this.getInfo}
            width={this.state.width}
          />
          {/* <VerifyWarning verifyErr={this.state.verifyErr} /> */}
          <CookieModal setIsOpen={this.fromDocs} isOpen={this.state.warningCookie} />
          {/* <ForbiddenModal setIsOpen={this.setWarningForbidden} isOpen={this.state.warningForbidden} /> */}
          <KYCModal />
          <BingoCoinModal width={this.state.width} />
          {/* {this.state.playerInfo.player_id && 
            <PlayerInfoModal 
              width={this.state.width} 
              playerInfo={this.state.playerInfo} 
              token={this.state.token}
            />
          } */}
          <CashbackSuccessModal />
          <BountySuccessModal />
          <LogoutModal token={this.state.token} />
          <GameModal getInfo={this.getInfo} token={this.state.token} />

          <Header
            mainPageFilter={this.mainPageFilter}
            setColor={this.setColor}
            color={this.state.color}
            data={this.state}
            updateUser={this.getInfo}
            statusProgress={this.state.userData.statusProgress}
            setToken={this.setToken}
          />

          <ToastContainer
            position={"bottom-center"}
            // autoClose={3000}
            closeOnClick={false}
            closeButton={CloseButton}
            hideProgressBar={true}
            className="custom-toast-container"
            toastClassName="custom-toast"
            bodyClassName="custom-toast-body"
          />

          <IonSplitPane contentId="main" when="(min-width: 1400px)">
            <Menu
              data={this.state}
              currency={this.state.userData.currency_id}
              applang={this.state.applang}
              favorites={this.state.favs}
              token={this.state.token}
              games={this.state.defaultGames}
              updateUser={this.getInfo}
              setColor={this.setColor}
            />

            <CusIonRouterOutlet cusThis={this} />
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    );
  }
}

export default App;
