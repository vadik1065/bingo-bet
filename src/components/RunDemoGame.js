import { useAtom } from "jotai";
import { openGameId, defGameUrl,defHtml, gameModal, mainLoading} from "../state.js";
import axios from 'axios';
import url from '../axios.js';


  /*eslint-disable*/
  const [showLoading, setShowLoading] = useAtom(mainLoading);
  const [openGame, setOpenGame] = useAtom(openGameId);
  const [gameUrl, setGameUrl]  = useAtom(defGameUrl);
  const [html, setHtml]  = useAtom(defHtml);
  const [isOpen, setIsOpen]  = useAtom(gameModal);
  /*eslint-enable*/
  function showDemoGame(id, token, lang) {
      setOpenGame(id);
      setShowLoading(true);
      axios({
        method: "post",
        url: url + "/api/run-demo-game",
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          id: id,
          lang: lang
        }
      }).then(res => {
        if (res.data.data.linkType === "URL") {
          setGameUrl(res.data.data.url);
        }
        if (res.data.data.linkType === "HTML") {
          setGameUrl("");
          setHtml(res.data.data.html);
        }
        setIsOpen(true);
      });
    }
    
    function showGame(id, token, lang, currency) {
        setOpenGame(id);
        setShowLoading(true);
        axios({
          method: "post",
          url: url + "/api/run-game",
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            id: id,
            lang: lang,
            currency: currency
          }
        }).then(res => {
          if (res.data.data.linkType === "URL") {
            setGameUrl(res.data.data.url);
          }
          if (res.data.data.linkType === "HTML") {
            setGameUrl("");
            setHtml(res.data.data.html);
          }
          // setShowLoading(false);
          setIsOpen(true);
        });
      }


export default showDemoGame();
