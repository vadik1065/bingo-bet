import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router-dom";
import i18next from "i18next";
import "../css/banner.css";

export default function Banner(props) {
  const history = useHistory();

  return (
    <div>
      {props.width > 767 && props.banners.desktop.length > 0 && (
        <Carousel
          className="big-banner"
          autoPlay
          showThumbs={false}
          stopOnHover={false}
          infiniteLoop={true}
          interval={6000}
        >
          {props.banners.desktop.map((el, i) => {
            return (
              // <Link
              //   to={el.link !== '' ? el.link : '/bonuses' }
              //   key={i}
              //   dangerouslySetInnerHTML={{__html: el.json}}>
              // </Link>

              <div key={i}>
                <div className="btn-cnt">
                  {el.link && (
                    <div
                      onClick={() => history.push(el.link)}
                      className="filter-btn flex"
                    >
                      {el.name ? i18next.t(el.name) : i18next.t("Read more")}
                    </div>
                  )}
                </div>
                <div className="pr-img">
                  <img
                    src={el.json.split(`src=\"`)[1].split(`\"`)[0]}
                    alt="games"
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      )}

      {props.width <= 767 && props.banners.mobile.length > 0 && (
        <Carousel
          className="big-banner"
          interval={3000}
          autoPlay={true}
          showThumbs={false}
          emulateTouch={false}
          stopOnHover={false}
          swipeable={false}
          infiniteLoop={true}
          showArrows={false}
        >
          {props.banners.mobile.map((el, i) => {
            return (
              // <Link to={el.link !== '' ? el.link : '/bonuses'} key={i} dangerouslySetInnerHTML={{__html: el.json}}></Link>
              <div key={i}>
                <div className="btn-cnt">
                  {el.link && (
                    <div
                      onClick={() => history.push(el.link)}
                      className="filter-btn flex"
                    >
                      {el.name ? el.name : i18next.t("Read more")}
                    </div>
                  )}
                </div>
                <div className="pr-img">
                  <img
                    src={el.json.split(`src=\"`)[1].split(`\"`)[0]}
                    alt="games"
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
}
