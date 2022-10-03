import React from "react";
import "../css/bonus.css";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import { useHistory } from "react-router";
import i18next from "i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Footer from "../components/Footer.js";

const Bonus = (props) => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent id={"bonuses-page"} className={"page"}>
        <div className="homepage flex">
          <div className="width-container">
            <p className="page-title top-of-the-page">{i18next.t("Bonuses")}</p>
            {props.data.loadingBonuses && (
              <IonSpinner className="spinner-loader center" name="lines" />
            )}
            {!props.data.loadingBonuses && (
              <div className="bonuses-container">
                {props.data.bonuses.map((el, i) => {
                  return (
                    <div key={i} className="bonus-card flex">
                      <div className="bonus-top">
                        <div className="btn-container flex">
                          <div
                            onClick={() =>
                              history.push(
                                `/bonuses/${el.name.replace(/\s+/g, "")}`
                              )
                            }
                            className="read-more open flex"
                          >
                            {i18next.t("Read more")}
                          </div>
                        </div>
                        <LazyLoadImage
                          className="bonus-preview"
                          wrapperClassName="bonus-preview"
                          alt="bonus preview"
                          effect="blur"
                          src={el.img}
                        />
                        {/* <img className="bonus-preview" alt="bonus preview" src={el.img} /> */}
                      </div>
                      <div className="bonus-info flex">
                        <p>{i18next.t(el.name)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Footer data={props.data} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Bonus;
