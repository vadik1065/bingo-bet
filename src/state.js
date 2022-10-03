import { atom } from "jotai";

export const cookieModal = atom(true);
export const restoreModal = atom(false);
export const authModal = atom({
  isOpen: false,
  type: "",
});
export const registerFinalModal = atom({
  isOpen: false,
  tempToken: "",
});
export const loginModal = atom(false);
export const registerModal = atom(false);
export const forbiddenModal = atom(false);
export const premiumModal = atom(false);
export const premiumModalHowToCharge = atom(false);
export const openGameId = atom(null);
export const defGameUrl = atom("");
export const defHtml = atom("");
export const defGameError = atom("");
export const gameModal = atom(false);
export const mainLoading = atom(false);
export const logoutModal = atom(false);
export const balanceTotal = atom(0.0);
export const colorState = atom(false);
export const globalSuccess = atom(false);
export const globalSuccessText = atom("");
export const globalFalse = atom(false);
export const globalFalseText = atom("");
export const filterProvider = atom("");
export const creditErr = atom(false);
export const promo = atom("");
export const kycModal = atom(false);
export const bingoCoinModal = atom(false);
export const cashbackSuccessModal = atom({
  isOpen: false,
  cashback: null,
});
export const bountySuccessModal = atom({
  isOpen: false,
  type: null,
  cashout: null,
});
export const userId = atom("");
export const playerInfoModal = atom(false);
export const liveChat = atom(false);
export const liveChatRulesModal = atom(false);
export const liveChatToMessageId = atom(null);
export const unreadLiveMessagesCount = atom(0);
export const gl_notifications = atom([]);
export const confirmation = atom({ code: "", user: "" });

export const infoItemPopoverGL = atom({ open: false, param: {} });

export const languageGl = atom("GB");

// costul
export const switchModalForJoinGL = atom(0);
export const switchModalForJoinGLWitchParam = atom({ open: 0, param: {} });

export const RequestLinkGL = atom(false);
export const SteamLinkGL = atom("");
export const FinalModalRegGL = atom(false);
export const JoinChangeGL = atom(false);
export const OpenToastJoinedGiveawaysGL = atom({ open: false, data: {} });
export const reloadListGiveawaysGL = atom([]);
export const openJoinedUserGL = atom(false);
export const currentedGiveawaysGL = atom(false);
