import i18next from "i18next";
import { ReactComponent as Star } from "../images/premium-icons/status-none.svg";
import { ReactComponent as StarBronze } from "../images/premium-icons/status-bronze.svg";
import { ReactComponent as StarSilver } from "../images/premium-icons/status-silver.svg";
import { ReactComponent as StarGold } from "../images/premium-icons/status-gold.svg";
import { ReactComponent as StarPlatinum } from "../images/premium-icons/status-platinum.svg";
import { ReactComponent as StarDiamond } from "../images/premium-icons/status-diamond.svg";
import { ReactComponent as StarExclusive } from "../images/premium-icons/status-exclusive.svg";
import { ReactComponent as New } from "../images/medals/new.svg";
import { ReactComponent as Bronze } from "../images/medals/bronze.svg";
import { ReactComponent as Silver } from "../images/medals/silver.svg";
import { ReactComponent as Gold } from "../images/medals/gold.svg";
import { ReactComponent as Platinum } from "../images/medals/platinum.svg";
import { ReactComponent as Diamond } from "../images/premium-icons/premium-diamond.svg";
import { ReactComponent as Exclusive } from "../images/premium-icons/premium-exclusive.svg";
import unranked from "../images/medals/unranked.png";
import bronze from "../images/medals/bronze.png";
import silver from "../images/medals/silver.png";
import gold from "../images/medals/gold.png";
import platinum from "../images/medals/platinum.png";
import diamond from "../images/medals/diamond.png";
import exclusive from "../images/medals/exclusive.png";
import level0 from "../images/medals/level-0.png";
import level1 from "../images/medals/level-1.png";
import level2 from "../images/medals/level-2.png";
import level3 from "../images/medals/level-3.png";
import level4 from "../images/medals/level-4.png";
import level5 from "../images/medals/level-5.png";
import level6 from "../images/medals/level-6.png";
// import all from '../images/games-category-tabs/all.png';
// import slots from '../images/games-category-tabs/slots.png';
import { ReactComponent as All } from "../images/games-category-tabs/all.svg";
import { ReactComponent as Slots } from "../images/games-category-tabs/slots.svg";
import { ReactComponent as Poker } from "../images/games-category-tabs/poker.svg";
import { ReactComponent as Roulette } from "../images/games-category-tabs/roulette.svg";
import { ReactComponent as Baccarat } from "../images/games-category-tabs/baccarat.svg";
import { ReactComponent as Blackjack } from "../images/games-category-tabs/blackjack.svg";
import { ReactComponent as Dice } from "../images/games-category-tabs/dice.svg";
import { ReactComponent as Other } from "../images/games-category-tabs/other.svg";
import { ReactComponent as Live } from "../images/live.svg";
import { ReactComponent as Games } from "../images/games.svg";
import all from "../images/games-category-tabs/new/all.png";
import slots from "../images/games-category-tabs/new/slots.png";
import live from "../images/games-category-tabs/new/live.png";
import table from "../images/games-category-tabs/new/table.png";
import roulette from "../images/games-category-tabs/new/roulette.png";
import poker from "../images/games-category-tabs/new/poker.png";
import other from "../images/games-category-tabs/new/other.png";
import bingocoin from "../images/crypto-logos/bcoin.png";
import bitcoin from "../images/crypto-logos/bitcoin.png";
import ethereum from "../images/crypto-logos/ethereum.png";
import litecoin from "../images/crypto-logos/litecoin.png";
import ripple from "../images/crypto-logos/ripple.png";
import tetherUsdt from "../images/crypto-logos/tether-usdt.png";
import tetherUsdc from "../images/crypto-logos/circle-usdc.png";
import chip from "../images/crypto-logos/bcoin.png";
import { ReactComponent as HL0 } from "../images/hl-colors/hl-color-0.svg";
import { ReactComponent as HL1 } from "../images/hl-colors/hl-color-1.svg";
import { ReactComponent as HL2 } from "../images/hl-colors/hl-color-2.svg";
import { ReactComponent as HL3 } from "../images/hl-colors/hl-color-3.svg";
import { ReactComponent as HL4 } from "../images/hl-colors/hl-color-4.svg";
import { ReactComponent as HL5 } from "../images/hl-colors/hl-color-5.svg";
import { ReactComponent as HL6 } from "../images/hl-colors/hl-color-6.svg";
import { toast } from "react-toastify";
import ToastContent from "../components/ui/toast/ToastContent";

export function getCurrency(currency_id) {
  switch (currency_id) {
    case "840":
      return "$";
    case "978":
      return "€";
    case "643":
      return "₽";
    case "826":
      return "£";
    case "bitcoin":
      return "BTC";
    case "litecoin":
      return "LTC";
    case "ethereum":
      return "ETH";
    case "USDT-ERC20":
      return "USDT-ERC20";
    case "ripple":
      return "XRP";
    default:
      return currency_id;
  }
}

export function getTempCurrency(currency_id) {
  switch (currency_id) {
    case "840":
      return "BNG";
    case "978":
      return "€";
    case "643":
      return "₽";
    case "826":
      return "£";
    case "bitcoin":
      return "BTC";
    case "litecoin":
      return "LTC";
    case "ethereum":
      return "ETH";
    case "USDT-ERC20":
      return "USDT-ERC20";
    case "ripple":
      return "XRP";
    default:
      return currency_id;
  }
}

export function getCurrencyIcon(currency_id) {
  switch (currency_id) {
    case "840":
      return bingocoin;
    case "bitcoin":
      return bitcoin;
    case "litecoin":
      return litecoin;
    case "ethereum":
      return ethereum;
    case "USDT-ERC20":
      return tetherUsdt;
    case "USDC-ERC20":
      return tetherUsdc;
    case "ripple":
      return ripple;
    default:
      return currency_id;
  }
}

export function getCurrencyIconFromEntity(currency_id) {
  switch (currency_id) {
    case "840":
      return bingocoin;
    case "BTC":
      return bitcoin;
    case "LTC":
      return litecoin;
    case "ETH":
      return ethereum;
    case "USDT-ERC20":
      return tetherUsdt;
    case "USDC-ERC20":
      return tetherUsdc;
    case "XRP":
      return ripple;
    default:
      return currency_id;
  }
}

export const bcIcon = <img src={chip} alt="chip" className="bc-icon" />;

export const pButtons = [
  { title: "period", value: 0 },
  { title: "day", value: 1 },
  { title: "week", value: 7 },
  { title: "month", value: 31 },
  { title: "quarter", value: 120 },
  { title: "year", value: 365 },
];

export function thousandSeparator(val) {
  if (val && val !== null) {
    let parts = val.toString().split(".");
    parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return parts.join(".");
  } else {
    return val;
  }
}

export const getPlayerStatus = (val) => {
  switch (val) {
    case 1:
      return i18next.t("None");
    case 2:
      return i18next.t("Bronze");
    case 3:
      return i18next.t("Silver");
    case 4:
      return i18next.t("Gold");
    case 5:
      return i18next.t("Platinum");
    case 6:
      return i18next.t("Diamond");
    case 7:
      return i18next.t("Exclusive");
    case 8:
      return null;
    default:
      return i18next.t("None");
  }
};

export const getPlayerStatusIcon = (val) => {
  switch (val) {
    case 1:
      return level0;
    case 2:
      return level1;
    case 3:
      return level2;
    case 4:
      return level3;
    case 5:
      return level4;
    case 6:
      return level5;
    case 7:
      return level6;
    default:
      return level0;
  }
};

export const getHLColor = (val) => {
  switch (val) {
    case 1:
      return <HL0 />;
    case 2:
      return <HL1 />;
    case 3:
      return <HL2 />;
    case 4:
      return <HL3 />;
    case 5:
      return <HL4 />;
    case 6:
      return <HL5 />;
    case 7:
      return <HL6 />;
    default:
      return <HL0 />;
  }
};

export const getPromoVipRankClass = (level) => {
  return `premium-vip-rank level-${level}`;
};

export const getHeaderPlayerStatusIcon = (val) => {
  switch (val) {
    case 1:
      return <New />;
    case 2:
      return <Bronze />;
    case 3:
      return <Silver />;
    case 4:
      return <Gold />;
    case 5:
      return <Platinum />;
    case 6:
      return <Diamond />;
    case 7:
      return <Exclusive />;
    case 8:
      return null;
    default:
      return <New />;
  }
};

export const getSmallPlayerStatusIcon = (val) => {
  switch (val) {
    case 1:
      return <Star />;
    case 2:
      return <StarBronze />;
    case 3:
      return <StarSilver />;
    case 4:
      return <StarGold />;
    case 5:
      return <StarPlatinum />;
    case 6:
      return <StarDiamond />;
    case 7:
      return <StarExclusive />;
    default:
      return <Star />;
  }
};

export const getGamesCategoryIcon = (val) => {
  switch (val) {
    case "all":
      return all;
    // return <All />;
    case "SLOTS":
      return slots;
    // return <Slots />;
    case "Poker":
      return poker;
    // return <Poker/>;
    case "Roulette":
      return roulette;
    // return <Roulette/>;
    case "Other games":
      return other;
    // return <Other/>;
    case "LIVE":
      return live;
    // return <Live/>;
    case "GAMES":
      return table;
    // return <Games/>;
    case "Baccarat":
      return <Baccarat />;
    case "Blackjack":
      return <Blackjack />;
    case "Dice":
      return <Dice />;
    default:
      return null;
  }
};

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

export const аchieves = [
  {
    status: 1,
    list: ["Wager on games to improve your Level and unlock awesome rewards!"],
    coins: null,
  },
  {
    status: 2,
    list: [
      "End of month Cashback",
      "New rank icon and trophy",
      "Sunday giveaways and tournaments",
    ],
    coins: 3000,
  },
  {
    status: 3,
    list: [
      "Improved Cashback returns",
      "New rank icon and trophy",
      "Monthly rewards and free spins",
    ],
    coins: 30000,
  },
  {
    status: 4,
    list: [
      "Improved Cashback returns",
      "New rank icon and trophy",
      "Monthly rakeback refills",
    ],
    coins: 200000,
  },
  {
    status: 5,
    list: [
      "Greatly improved Cashback returns",
      "New rank icon and trophy",
      "Loan feature and bonuses",
    ],
    coins: 800000,
  },
  {
    status: 6,
    list: [
      "Greatly improved Cashback returns",
      "New rank icon and trophy",
      "Personal casino contact and bonuses",
    ],
    coins: 1500000,
  },
  {
    status: 7,
    list: [
      "Monthly and event gifts and holidays",
      "Exclusive offers and unlimited rakeback",
      "Chance to join exclusive poker group",
      "Personal agent and access to VIP betting platform",
    ],
    coins: 5000000,
  },
];

export const notify = (props) => {
  let toastId = props.description || props.message;
  if (typeof toastId !== "string" && toastId.length) {
    toastId = toastId.join();
  }
  // if (typeof props.message !== 'string' && props.message.length) {
  //   toastId = props.message.join();
  // }

  let autoClose = 3000;
  if (props.hasOwnProperty("autoClose")) {
    autoClose = props.autoClose;
  }

  return toast(<ToastContent {...props} />, { toastId: toastId, autoClose });
};

export const FormatTime = (time) => {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];
  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? "AM" : "PM";
    time[0] = +time[0] % 12 || 12;
  }
  return time.join("");
};

export const FormatMouth = (mouth) => {
  const MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return MONTHS[mouth - 1];
};
