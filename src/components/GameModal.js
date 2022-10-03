import { IonModal } from "@ionic/react";
import React, { useEffect, useState, memo } from "react";
import Iframe from "react-iframe";
import { Helmet } from "react-helmet";
import { useAtom } from "jotai";
import { openGameId, defGameUrl, defHtml, gameModal, mainLoading, defGameError} from "../state.js";
import { ReactComponent as Cross } from '../images/cross.svg';
import i18next from "i18next";
import { useHistory, useLocation, useRouteMatch } from "react-router";

const GameModal = memo(props => {
  const history = useHistory();
  // const match = useRouteMatch();
  const [isPresented, setIspresented] = useState(false);
  /*eslint-disable*/
  const [showLoading, setShowLoading] = useAtom(mainLoading);
  const [openGame, setOpenGame] = useAtom(openGameId);
  const [gameUrl, setGameUrl]  = useAtom(defGameUrl);
  const [html, setHtml]  = useAtom(defHtml);
  const [gameError, setGameError] = useAtom(defGameError);
  const [isOpen, setIsOpen]  = useAtom(gameModal);
  // const [notLoggedInText, setNotLoggedInText] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName("body")[0].classList.add("hide-chat");
    }
  }, [isOpen]);

  function closeGame() {
    document.getElementsByTagName("body")[0].classList.remove("hide-chat");
    setIsOpen(false);
    if (props.token !== null && props.token !== undefined) {
      props.getInfo(props.token);
    }
    setGameUrl("");
    setOpenGame(null);
    setIspresented(false);
    setHtml("");
    setGameError("");
  }

  return (
    <IonModal
      isOpen={isOpen}
      cssClass="game-modal"
      onDidDismiss={() => {
        closeGame();
        // history.goBack();
      }}
      onDidPresent={() => setIspresented(true)}
    >
      <div className="close-gme" onClick={() => closeGame()}><Cross/></div>
      {/* {notLoggedInText && 
        <div className='err-window'>
          <p>
            {i18next.t('To play the full version of the game, please log in or try the demo mode.')}
          </p>
          <div 
            onClick={() => {setNotLoggedInText(false); history.push(`/game/${match.params.id}_demo`)}}
            className="demo flex"
          >
            {i18next.t('demo')}
          </div>
        </div>
      } */}
      {gameError && (
        <div className='err-window'>
          <p>
            {gameError}
            {/* {i18next.t('This game is not available in your country.')} */}
          </p>
        </div>
      )}
      {gameUrl && (
        <Iframe
          onLoad={()=> setTimeout(setShowLoading(false), 3000)}
          url={gameUrl.toString()}
          width="100%"
          height="100%"
          id="gameOpened"
          className="game-opened"
          display="initial"
          position="relative"
        />
      )}
      {html !== "" && isPresented === true && (
        <div className="html-frame">
          <div
            className="html-frame"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {/*eslint-disable*/}
        <Helmet onLoad={() => setTimeout(setShowLoading(false), 3000)}>
            {html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gm) !==null &&
              Array.from(html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gm)).map((el,i) => {
                if(html.match('egamingsStartNetEnt')!== null) {
                  if (/<script\b[^>]*>([\s\S]*?)<\/script>/gm.exec(el)[1] !== '') {
                      return (
                          <script type="text/javascript" key={i}>
                            {/<script\b[^>]*>([\s\S]*?)<\/script>/gm.exec(el)[1] + ' egamingsStartNetEnt()'}
                          </script>
                          // + ' egamingsStartNetEnt()'
                      )
                    } if (/<script\b[^>]*>([\s\S]*?)<\/script>/gm.exec(el)[1] === '') {
                      return(
                        <script key='added' type="text/javascript" src="https://egamings-static-test.casinomodule.com/gameinclusion/library/gameinclusion.js"></script>
                      )
                    }
                  }
                  else {
                    return (
                        <script type="text/javascript">
                          {/<script\b[^>]*>([\s\S]*?)<\/script>/gm.exec(el)[1]}
                        </script>
                    )
                  }

              }
            )
            }

            </Helmet>
        </div>
      )}
    </IonModal>
  );
});
export default GameModal;
