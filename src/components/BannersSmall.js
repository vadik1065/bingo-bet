import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router-dom";
// import games from '../images/banners-small/games.jpg';
// import live from '../images/banners-small/live.jpg';
// import slots from '../images/banners-small/slots2.png';
import i18next from "i18next";

const BannersSmall = (props) => {
  const history = useHistory();
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // if (props?.banners?.desktopSmall) {
    //   // setBanners(props.banners.desktopSmall.filter((el, i) => i !== (props.banners.desktopSmall.length - 1)));
    //   setBanners(props.banners.desktopSmall);
    // }
    if (props.banners) {
      setBanners(props.banners);
    }
  }, [props.banners]);

  return (
    <div className="banners-small">
      {banners.length > 0 && (
        <Carousel
          autoPlay
          showThumbs={false}
          stopOnHover={false}
          infiniteLoop={true}
          showArrows={false}
          showIndicators={false}
          emulateTouch={false}
          swipeable={false}
          interval={6000}
        >
          {banners.map((el, i) => {
            return (
              // Вариант, если в админке заполнены link
              <div key={i}>
                <div className="btn-cnt">
                  {el.link && (
                    <div
                      onClick={() => history.push(el.link)}
                      className="filter-btn flex"
                    >
                      {el.name ? i18next.t(el.name) : i18next.t("Read More")}

                      {/* {el.link === "/games/slots" && i18next.t("Slots")} */}
                      {/* {el.link === '/providers/Booongo' && i18next.t('Booongo')}
                      {el.link !== '/games/table' && 
                        el.link !== '/games/live' && 
                        el.link !== '/games/slots' && 
                        el.link !== '/providers/Booongo' && 
                        'Learn more'
                      } */}
                    </div>
                  )}
                </div>
                <div className="pr-img">
                  <img
                    src={el.json.split(`src=\"`)[1].split(`\"`)[0]}
                    alt="games"
                  />
                </div>
                <div className="pr-info flex">
                  <p>
                    {i18next.t(el.name)}
                    {/* {console.log(el.name)} */}
                    {/* {el.link === '/games/table' && i18next.t('Games')}
                    {el.link === '/games/live' && i18next.t('Live Games')}
                    {el.link === '/games/slots' && i18next.t('Slots')}
                    {el.link === '/providers/Booongo' && i18next.t('Booongo')} */}
                  </p>
                </div>
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default BannersSmall;
