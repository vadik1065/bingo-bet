import { IonRouterOutlet } from "@ionic/react";
import { useMemo } from "react";
import { Redirect, Route } from "react-router";
import Account from "./pages/Account";
import Affiliate from "./pages/Affiliate";
import Balance from "./pages/Balance";
import Bonus from "./pages/Bonus";
import BonusSingle from "./pages/BonusSingle";
import CrashPage from "./pages/CrashPage";
import Documents from "./pages/Documents";
import FAQ from "./pages/FAQ";
import Game from "./pages/Game";
import Games from "./pages/Games";
import Giveaways from "./pages/Giveaways";
import History from "./pages/History";
import Home from "./pages/Home";
import IosAppSetup from "./pages/IosAppSetup";
import Levels from "./pages/Levels";
import NewPassword from "./pages/NewPassword";
import Promo from "./pages/Promo";
import Providers from "./pages/Providers";
import ProviderSingle from "./pages/ProviderSingle";
import Statistics from "./pages/Statistics";
import Tournaments from "./pages/Tournaments";

const CusIonRouterOutlet = (props) => {
  const cusThis = useMemo(() => props.cusThis, [props.cusThis]);
  return (
    <IonRouterOutlet animated="false" id="main">
      <Route
        exact
        path="/history"
        render={() => (
          <History
            getExactGames={cusThis.getExactGames}
            getExactTransactions={cusThis.getExactTransactions}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            getTopGames={cusThis.getTopGames}
            gecusThistoryTransactions={cusThis.gecusThistoryTransactions}
            gecusThistoryDeposits={cusThis.gecusThistoryDeposits}
            gecusThistoryBets={cusThis.gecusThistoryBets}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
      />

      <Route
        path="/statistics"
        render={() => (
          <Statistics
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            getTopGames={cusThis.getTopGames}
            gecusThistoryDeposits={cusThis.gecusThistoryDeposits}
            gecusThistoryBets={cusThis.gecusThistoryBets}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
        exact
      />
      <Route
        path="/tournaments"
        render={() => (
          <Tournaments
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
        exact
      />
      <Route path="/promo" render={() => <Promo />} exact />
      <Route path="/confirm" render={() => <NewPassword />} exact />
      <Route
        exact
        path="/bonuses"
        render={() => (
          <Bonus
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
      />
      <Route
        exact
        path="/bonuses/:name"
        render={() => (
          <BonusSingle
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            data={cusThis.state}
            bonuses={cusThis.state.bonuses}
            updateUser={cusThis.getInfo}
          />
        )}
      />
      <Route
        exact
        path="/providers"
        render={() => (
          <Providers
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            data={cusThis.state}
            // providers={cusThis.state.providersList}
            updateUser={cusThis.getInfo}
          />
        )}
      />
      <Route
        exact
        path="/providers/:name"
        render={() => (
          <ProviderSingle
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            data={cusThis.state}
            providers={cusThis.state.providersList}
            games={cusThis.state.games}
            updateUser={cusThis.getInfo}
          />
        )}
      />
      <Route
        path="/levels"
        render={() => (
          <Levels
            data={cusThis.state}
            token={cusThis.state.token}
            currency={cusThis.state.userData.currency_id}
            balance={cusThis.state.balance}
            updateUser={cusThis.getInfo}
            width={cusThis.state.width}
            statusProgress={cusThis.state.userData.statusProgress}
          />
        )}
        exact
      />
      <Route
        path="/giveaways"
        render={() => (
          <Giveaways data={cusThis.state} token={cusThis.state.token} />
        )}
      />
      <Route
        path="/home"
        render={() => (
          <Home
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            getJackpotValue={cusThis.getJackpotValue}
            mainPageFilter={cusThis.mainPageFilter}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
            // platforms={cusThis.state.platforms}
          />
        )}
        exact
      />
      <Route
        path="/login"
        render={() => (
          <Home
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            getJackpotValue={cusThis.getJackpotValue}
            mainPageFilter={cusThis.mainPageFilter}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
        exact
      />
      <Route
        path="/register"
        render={() => (
          <Home
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            getJackpotValue={cusThis.getJackpotValue}
            mainPageFilter={cusThis.mainPageFilter}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
        exact
      />
      <Route
        path="/forget"
        render={() => (
          <Home
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            getJackpotValue={cusThis.getJackpotValue}
            mainPageFilter={cusThis.mainPageFilter}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
        exact
      />
      <Route
        exact
        path="/game/:id"
        render={() => (
          <Game
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            mainPageFilter={cusThis.mainPageFilter}
            data={cusThis.state}
            providers={cusThis.state.providersList}
            updateUser={cusThis.getInfo}
            games={cusThis.state.games}
            token={cusThis.state.token}
            currency={cusThis.state.userData.currency_id}
            lang={cusThis.state.lang}
          />
        )}
      />
      <Route
        path="/games"
        render={() => (
          <Games
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            livePageFilter={cusThis.livePageFilter}
            slotsPageFilter={cusThis.slotsPageFilter}
            gamesPageFilter={cusThis.gamesPageFilter}
            pokerPageFilter={cusThis.pokerPageFilter}
            roulettePageFilter={cusThis.roulettePageFilter}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
        exact
      />
      <Route
        path="/games/:page"
        render={() => (
          <Games
            setFav={cusThis.setFav}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            livePageFilter={cusThis.livePageFilter}
            slotsPageFilter={cusThis.slotsPageFilter}
            gamesPageFilter={cusThis.gamesPageFilter}
            pokerPageFilter={cusThis.pokerPageFilter}
            roulettePageFilter={cusThis.roulettePageFilter}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
        exact
      />
      <Route
        path="/balance"
        render={() => (
          <Balance
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            updateUser={cusThis.getInfo}
            data={cusThis.state}
            setVerifyError={cusThis.setVerifyError}
          />
        )}
        exact
      />
      <Route
        exact
        path="/affiliate"
        render={() => (
          <Affiliate
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            data={cusThis.state}
            width={cusThis.state.width}
            updateUser={cusThis.getInfo}
          />
        )}
      />
      <Route
        path="/account"
        render={() => (
          <Account
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            updateUser={cusThis.getInfo}
            data={cusThis.state}
          />
        )}
        exact
      />
      <Route
        path="/documents/:page"
        render={() => (
          <Documents
            fromDocs={cusThis.fromDocs}
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
        exact
      />
      <Route
        exact
        path="/faq"
        render={() => (
          <FAQ
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
      />
      <Route
        exact
        path="/ios-app-setup"
        render={() => (
          <IosAppSetup
            setColor={cusThis.setColor}
            color={cusThis.state.color}
            data={cusThis.state}
            updateUser={cusThis.getInfo}
          />
        )}
      />
      <Route
        exact
        path="/crash"
        render={() => <CrashPage data={cusThis.state} />}
      />

      <Route path="/" render={() => <Redirect to="/home" />} exact />
      <Redirect to="/home" />
    </IonRouterOutlet>
  );
};

export default CusIonRouterOutlet;
