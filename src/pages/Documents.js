import {
  IonContent,
  IonPage,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import "../css/documents.css";
import url from "../axios.js";
import axios from "axios";
import SimpleMap from "../components/Map";
import { mainLoading } from "../state.js";
import { useAtom } from "jotai";

function Documents(props) {
  const [text, setText] = useState([]);
  let location = useLocation();
  /*eslint-disable*/
  const [loading, setLoading] = useAtom(mainLoading);
  // const [firstloading, setFirstLoading] = useState(true);
  useIonViewWillEnter(() => {
    if (localStorage.getItem("cookie") !== "accepted") {
      props.fromDocs(false);
    }
  });
  useIonViewWillLeave(() => {
    if (localStorage.getItem("cookie") !== "accepted") {
      props.fromDocs(true);
    }
  });
  useEffect(() => {
    let documentId;
    function getDocs() {
      if (location.pathname === "/documents/about") {
        documentId = 5;
      }
      if (location.pathname === "/documents/kyc-policy") {
        documentId = 9;
      }
      if (location.pathname === "/documents/responsible-policy") {
        documentId = 8;
      }
      if (location.pathname === "/documents/welcome-bonus") {
        documentId = 4;
      }
      if (location.pathname === "/documents/cookie-policy") {
        documentId = 6;
      }
      if (location.pathname === "/documents/contributions") {
        documentId = 3;
      }
      if (location.pathname === "/documents/disclaimer") {
        documentId = 7;
      }
      if (location.pathname === "/documents/policy") {
        documentId = 2;
      }
      if (location.pathname === "/documents/terms") {
        documentId = 1;
      }
      if (location.pathname === "/documents/bonuses-conditions") {
        documentId = 10;
      }
      if (location.pathname === "/documents/tournaments") {
        documentId = 11;
      }
      if (location.pathname === "/documents/data-protection") {
        documentId = 12;
      }
      if (location.pathname === "/documents/help") {
        documentId = 13;
      }
      if (location.pathname === "/documents/anti-money-laundering") {
        documentId = 14;
      }
      // if (firstloading === true) {
      //   setLoading(true);
      // }
      setLoading(true);
      axios({
        method: "post",
        url: url + "/api/get-documents",
        data: {
          id: documentId,
          lang: props.data.lang,
        },
      }).then((res) => {
        setText(JSON.parse(Object.values(res.data.data)));
        setLoading(false);
        // setFirstLoading(false);
      });
    }
    if (
      location.pathname === "/documents/about" ||
      location.pathname === "/documents/kyc-policy" ||
      location.pathname === "/documents/anti-money-laundering" ||
      location.pathname === "/documents/welcome-bonus" ||
      location.pathname === "/documents/bonuses-conditions" ||
      location.pathname === "/documents/responsible-policy" ||
      location.pathname === "/documents/cookie-policy" ||
      location.pathname === "/documents/contributions" ||
      location.pathname === "/documents/disclaimer" ||
      location.pathname === "/documents/policy" ||
      location.pathname === "/documents/terms" ||
      location.pathname === "/documents/tournaments" ||
      location.pathname === "/documents/data-protection" ||
      location.pathname === "/documents/help"
    ) {
      getDocs();
      document.getElementsByClassName("toscroll")[0].scrollIntoView(true);

      // propsDoc(false);
    }
  }, [location.pathname, props.data.lang]);
  /*eslint-enable*/
  function toggleHeight(e, i, content) {
    if (content !== null) {
      let count = +e.target.parentElement.getAttribute("data-p");
      document
        .getElementsByClassName("paragraph")
        [count].classList.toggle("opened");
    }
  }
  return (
    <IonPage>
      {/* <Header
          setColor={props.setColor}
          color={props.color} 
          data={props.data}
          updateUser={props.updateUser} 
        /> */}
      <IonContent overflow-scroll="true" className="page has-header">
        {location.pathname.includes("/documents") && (
          <div className="homepage flex">
            <div className="toscroll"></div>
            <div
              className={
                "width-container terms " + location.pathname.replace(/\//g, "")
              }
            >
              {text.map((el, i) => {
                return (
                  <span
                    className={
                      "paragraph " + (el.opened === true ? "opened" : "")
                    }
                    data-p={i}
                    key={i}
                  >
                    {el.name !== "" ? (
                      <h3
                        className={el.contents === null ? "" : "h3-smaller"}
                        onClick={(e) => toggleHeight(e, i, el.contents)}
                      >
                        {el.name}
                      </h3>
                    ) : (
                      ""
                    )}
                    {el.contents !== "" ? (
                      <p dangerouslySetInnerHTML={{ __html: el.contents }}></p>
                    ) : (
                      ""
                    )}
                  </span>
                );
              })}
              {location.pathname === "/documents/about" && (
                <div className="map-general">
                  <SimpleMap />
                </div>
              )}
            </div>

            <Footer data={props.data} />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Documents;
