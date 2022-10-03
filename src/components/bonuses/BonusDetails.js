import axios from "axios";
import i18next from "i18next";
import { useAtom } from "jotai";
import moment from "moment";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router";
import { bountySuccessModal, globalFalse, globalFalseText } from "../../state";
import laptop from "../../images/temp-bonuses-pics/laptop.png";
import { bcIcon } from "../../utils/utils";
import { IonProgressBar } from "@ionic/react";
import url from "../../axios";
import ClaimInfo from "./cashback/ClaimInfo";

const BonusDetails = (props) => {
  const history = useHistory();
  const [cashbackInfo, setCashbackInfo] = useState("");
  const [bountyWeekInfo, setBountyWeekInfo] = useState("");
  const [bountyMonthInfo, setBountyMonthInfo] = useState("");
  const [openBountySuccessModal, setOpenBountySuccessModal] =
    useAtom(bountySuccessModal);
  const [errorToast, setErrorToast] = useAtom(globalFalse);
  const [errorMessage, setErrorMessage] = useAtom(globalFalseText);

  useEffect(() => {
    if (props.bonus.type === 1 && props.token) {
      getBountyInfo();
    }

    if (props.bonus.type === 2 && props.token) {
      getCashbackInfo();
    }
  }, [props.bonus.type, props.token]);

  async function getBountyInfo() {
    if (props.token) {
      axios({
        method: "post",
        url: url + "/api/get-bounty-info",
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
        .then((res) => {
          const weekly = res.data.data.find((b) => b.type_bounty === 0);
          const monthly = res.data.data.find((b) => b.type_bounty === 1);
          if (weekly) {
            setBountyWeekInfo(weekly);
          }
          if (monthly) {
            setBountyMonthInfo(monthly);
          }
        })
        .catch((error) => {
          console.log(error?.response?.data?.error);
        });

      // try {
      //   const res = await getBountyInfo(props.token);
      //   const weekly = res.data.data.find((b) => b.type_bounty === 0);
      //   const monthly = res.data.data.find((b) => b.type_bounty === 1);
      //   if (weekly) {
      //     setBountyWeekInfo(weekly);
      //   }
      //   if (monthly) {
      //     setBountyMonthInfo(monthly);
      //   }
      // } catch (e) {
      //   console.log(e?.response?.data?.error);

      //   console.log(e);
      // }
    }
  }

  function getCashbackInfo() {
    if (props.token) {
      axios({
        method: "post",
        url: url + "/api/get-cashback-info",
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
        .then((res) => {
          // console.log(res);

          // let tempRes = {
          //   //BUG
          //   date_left: "",
          //   enable_button: 1,
          //   next_cashback: "2022-08-1",
          //   summa_cashback: 550,
          //   time_left: "",
          // };
          // setCashbackInfo(tempRes);

          setCashbackInfo(res.data.data);
        })
        .catch((error) => {
          console.log(error?.response?.data?.error);
        });
    }
  }

  function withdrawBounty(type_bounty) {
    let type = null;
    let cashout = null;
    if (type_bounty === 0) {
      type = i18next.t("Weekly Bounty");
      cashout = bountyWeekInfo?.summa_bonus;
    }
    if (type_bounty === 1) {
      type = i18next.t("Monthly Bounty");
      cashout = bountyMonthInfo?.summa_bonus;
    }
    const info = {
      isOpen: true,
      type,
      cashout,
    };

    axios({
      method: "post",
      url: url + "/api/withdraw-bounty",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      data: {
        type_bounty,
      },
    })
      .then((res) => {
        if (res.data.status === 1) {
          setOpenBountySuccessModal(info);
          getBountyInfo();
          props.updateUser(props.token);
        }
      })
      .catch((error) => {
        console.log(error?.response?.data?.error);
        setErrorMessage(error?.response?.data?.error);
        setErrorToast(true);
      });
  }

  return (
    <>
      <button className="back-button" onClick={() => history.push("/bonuses")}>
        &lt; {i18next.t("Back to all Bonuses")}
      </button>

      {props.bonus && props.bonus.type === 0 && (
        <div className={`bonus-description-content`}>
          <div className="tournament-description bonus-description-opn flex">
            <div dangerouslySetInnerHTML={{ __html: props.bonus.content }} />
          </div>
        </div>
      )}

      {props.bonus && props.bonus.type !== 0 && (
        <div
          className={`bonus-description-content ${
            props.bonus.commingSoon ? "darkest" : ""
          }`}
        >
          <div className="tournament-description bonus-description-opn flex">
            <div
              className={`bonus-description-pic ${
                props.bonus.type === 1 ? "square" : ""
              }`}
            >
              <LazyLoadImage effect="blur" src={props.bonus.bigImg} />
              {/* <img src={props.bonus.bigImg} alt="bonus img" /> */}
              {/* {props.width < 768 && props.bonus.type === 1 &&
                <div className="coming-soon-mask">
                  COMING SOON
                </div>
              } */}
            </div>
            <div className="bonus-description-text">
              <div
                className={`bonus-description-title ${
                  props.color ? "" : "text-border"
                }`}
              >
                {props.bonus.title}
                {props.bonus.subTitle && <span>{props.bonus.subTitle}</span>}
              </div>
              {/* <div className="bonus-description-dang-text" dangerouslySetInnerHTML={{__html: props.bonus.content}}></div> */}
              <div className="bonus-description-dang-text">
                {props.bonus.type === 1 && (
                  <ul>
                    <li>
                      {i18next.t(
                        "Complete the Bingo Bounty by wagering specific minimum bets to get money rewards!"
                      )}
                    </li>
                    <li>
                      {i18next.t(
                        "Bounties tim er activates once your first minimum waager is made!"
                      )}
                    </li>
                    <li>
                      {i18next.t(
                        "Highly chaotic bonus! big bets, big wins, big rewards."
                      )}
                    </li>
                    <li>
                      {i18next.t(
                        "Weekly Bounty - counts any bets between the bet cost of"
                      )}{" "}
                      {bcIcon}50 - {bcIcon}99!
                    </li>
                    <li>
                      {i18next.t(
                        "Monthly Bounty - counts any bets between the bet cost of"
                      )}{" "}
                      {bcIcon}100 {i18next.t("and above!")}
                    </li>
                  </ul>
                )}
                {props.bonus.type === 2 && (
                  <ul>
                    <li>
                      {i18next.t(
                        "Receive end of month lossback to cover more of your loses!"
                      )}
                    </li>
                    <li>
                      {i18next.t("Click")}{" "}
                      <strong>'{i18next.t("Claim Cashback")}'</strong>{" "}
                      {i18next.t("to send your bonus to your balance!")}
                    </li>
                    <li>
                      {i18next.t(
                        "Wager more to improve your premium rank and gain higher cashback rewards!"
                      )}
                    </li>
                  </ul>
                )}
              </div>

              {props.bonus.type === 1 && (
                <>
                  {bountyWeekInfo?.dat_end && (
                    <p className="dang-big-paragraph">
                      <span className="dang-big-paragraph-left">
                        {i18next.t("Weekly Task Reset")}:
                      </span>
                      <span className="dang-big-paragraph-right">
                        {moment
                          .utc(bountyWeekInfo.dat_end, "YYYY-MM-DD HH:mm:ss")
                          .local()
                          .fromNow()}
                      </span>
                    </p>
                  )}
                  {bountyMonthInfo?.dat_end && (
                    <p className="dang-big-paragraph">
                      <span className="dang-big-paragraph-left">
                        {i18next.t("Monthly Task Reset")}:
                      </span>
                      <span className="dang-big-paragraph-right">
                        {moment
                          .utc(bountyMonthInfo.dat_end, "YYYY-MM-DD HH:mm:ss")
                          .local()
                          .fromNow()}
                      </span>
                    </p>
                  )}
                </>
              )}

              {props.bonus.type === 2 && cashbackInfo && (
                <ClaimInfo
                  cashbackInfo={cashbackInfo}
                  token={props.token}
                  getCashbackInfo={getCashbackInfo}
                />
              )}
            </div>
          </div>

          {props.bonus.type === 1 && (
            <div className="bonus-description-bottom">
              <img src={laptop} alt="laptop" className="laptop" />
              {/* {props.width >= 768 && 
                <div className="coming-soon-mask">
                  COMING SOON
                </div>
              } */}
              <div className="premium-vip-container bonus-page flex">
                <div className="premium-vip-content">
                  <p className="premium-vip-title">
                    {i18next.t("Weekly Bounty")}{" "}
                    {bountyWeekInfo?.dat_end && (
                      <span>
                        {moment
                          .utc(bountyWeekInfo.dat_end, "YYYY-MM-DD HH:mm:ss")
                          .local()
                          .fromNow(true)}{" "}
                        {i18next.t("remaining")}
                      </span>
                    )}
                  </p>
                  <div className="premium-vip-progress-container">
                    <div className="premium-vip-progress-top flex">
                      <span className="pale">
                        {i18next.t("Wager")} {bcIcon}
                        {bountyWeekInfo?.sum_bet || 50} x{" "}
                        {bountyWeekInfo?.cnt_bets_all || 100}{" "}
                        {i18next.t("times")}
                      </span>
                      <span>
                        {i18next.t("Bets")} {bountyWeekInfo?.cnt_bets || 0}/
                        {bountyWeekInfo?.cnt_bets_all || 100}
                      </span>
                    </div>
                    <IonProgressBar
                      className="premium-vip-progress-bar"
                      value={
                        bountyWeekInfo?.cnt_bets /
                          bountyWeekInfo?.cnt_bets_all || 0
                      }
                    />
                  </div>
                </div>
                <div className="premium-vip-content-right flex">
                  <div className="premium-vip-content-right-label">
                    {bcIcon}
                    {bountyWeekInfo?.summa_bonus || 5}{" "}
                    {i18next.t("Cashout Rewards")}
                  </div>
                  <button
                    onClick={() => {
                      if (!!bountyWeekInfo.enable_button) {
                        withdrawBounty(0);
                      }
                    }}
                    className={`save-btn ${
                      !!bountyWeekInfo.enable_button ? "" : "disabled"
                    }`}
                  >
                    <p>{i18next.t("Claim")}</p>
                  </button>
                </div>
              </div>
              <div className="premium-vip-container bonus-page flex">
                <div className="premium-vip-content">
                  <p className="premium-vip-title">
                    {i18next.t("Monthly Bounty")}{" "}
                    {bountyMonthInfo?.dat_end && (
                      <span>
                        {moment
                          .utc(bountyMonthInfo.dat_end, "YYYY-MM-DD HH:mm:ss")
                          .local()
                          .fromNow(true)}{" "}
                        {i18next.t("remaining")}
                      </span>
                    )}
                  </p>
                  <div className="premium-vip-progress-container">
                    <div className="premium-vip-progress-top flex">
                      <span className="pale">
                        {i18next.t("Wager")} {bcIcon}
                        {bountyMonthInfo?.sum_bet || 100} x{" "}
                        {bountyMonthInfo?.cnt_bets_all || 100}{" "}
                        {i18next.t("times")}
                      </span>
                      <span>
                        {i18next.t("Bets")} {bountyMonthInfo?.cnt_bets || 0}/
                        {bountyMonthInfo?.cnt_bets_all || 100}
                      </span>
                    </div>
                    <IonProgressBar
                      className="premium-vip-progress-bar"
                      value={
                        bountyMonthInfo?.cnt_bets /
                          bountyMonthInfo?.cnt_bets_all || 0
                        // bountyMonthInfo?.cnt_bets_all ?? 1
                      }
                    />
                  </div>
                </div>
                <div className="premium-vip-content-right flex">
                  <div className="premium-vip-content-right-label">
                    {bcIcon}
                    {bountyMonthInfo?.summa_bonus || 20}{" "}
                    {i18next.t("Cashout Rewards")}
                  </div>
                  <button
                    onClick={() => {
                      if (!!bountyMonthInfo.enable_button) {
                        withdrawBounty(1);
                      }
                    }}
                    className={`save-btn ${
                      !!bountyMonthInfo.enable_button ? "" : "disabled"
                    }`}
                  >
                    <p>{i18next.t("Claim")}</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!props.bonus && <p>{i18next.t("No bonus")}</p>}

      {/* <button className="back-button" onClick={() => props.setCurrentCard(null)} >
        &lt; {i18next.t('Back to all Bonuses')}
      </button>
      <div className="tournament-single-header">
        <p className="page-title top-of-the-page">{props.bonus.name}</p>
      </div>
      <div className="tournament-description bonus-description-opn flex">
        <div dangerouslySetInnerHTML={{__html: props.bonus.content}}></div>
      </div> */}
    </>
  );
};

export default BonusDetails;
