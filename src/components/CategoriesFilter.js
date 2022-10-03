import React, { useEffect, useMemo, useRef, useState } from "react";
import i18next from "i18next";
import { capitalize, getGamesCategoryIcon } from "../utils/utils";
import user from "../images/user.svg";
import Select from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation } from "swiper";
import { languageGl } from "../state";
import { useAtom } from "jotai";

SwiperCore.use([Navigation]);

const MainFilterItem = (props) => {
  return (
    <div
      onClick={() => {
        props.setFilterValue(props.el.tag);
        props.setSubFilterValue("all");
        props.setSearch("");
      }}
      className={
        "slot-tag flex " + (props.filterValue === props.el.tag ? "current" : "")
      }
    >
      <div className="tag-img">
        <img src={getGamesCategoryIcon(props.el.tag)} alt="filter icon" />
        {/* {!props.el.displayName && getGamesCategoryIcon(props.el.tag)} */}
        {/* {props.el.displayName && props.el.image} */}
      </div>
      <p className="tag-name">
        {i18next.t(props.el.displayName || capitalize(props.el.tag))}
      </p>
    </div>
  );
};

const CategoriesFilter = (props) => {
  const [langAtom, setLangAtom] = useAtom(languageGl);

  const [subBtns, setSubBtns] = useState([]);
  const filterRef = useRef();
  // const [filterScroll, setFilterScroll] = useState(0);
  const [filterAnimate, setFilterAnimate] = useState(false);
  const categories = [
    {
      tag: "all",
      image: getGamesCategoryIcon("all"),
      displayName: "All Games",
    },
    {
      tag: "SLOTS",
      image: getGamesCategoryIcon("slots"),
      displayName: "Slots",
    },
    { tag: "LIVE", image: getGamesCategoryIcon("LIVE"), displayName: "Live" },
    {
      tag: "GAMES",
      image: getGamesCategoryIcon("GAMES"),
      displayName: "Table",
    },
    {
      tag: "Roulette",
      image: getGamesCategoryIcon("Roulette"),
      displayName: "Roulette",
    },
    {
      tag: "Poker",
      image: getGamesCategoryIcon("Poker"),
      displayName: "Poker",
    },
    {
      tag: "Other games",
      image: getGamesCategoryIcon("Other games"),
      displayName: "Other",
    },
  ];

  // useEffect(() => {
  //   setTimeout(() => {
  //     setFilterScroll(filterRef?.current.getBoundingClientRect().top);
  //   }, 3000)
  // }, []);
  const curProvider = useMemo(() => {
    // console.log("props.curProvider ", props.curProvider);
    // console.log("props.lang " + langAtom);
    return { ...props.curProvider, label: i18next.t("All Providers") };
  }, [props.curProvider, langAtom]);

  useEffect(() => {
    if (props.width <= 767) {
      // console.log(props.scrollTop);
      // console.log(filterRef?.current.getBoundingClientRect().top + 170);
      // console.log(window.innerHeight);
      if (
        filterRef?.current.getBoundingClientRect().top + 100 <
        window.innerHeight
      ) {
        setFilterAnimate(true);
      } else {
        setFilterAnimate(false);
      }

      // if (filterScroll > 0 && props.scrollTop + window.innerHeight - 170 >= filterScroll) {
      //   setFilterAnimate(true);
      // }
      // if (filterScroll > 0 && props.scrollTop + window.innerHeight - 170 < filterScroll) {
      //   setFilterAnimate(false);
      // }
    }
  }, [props.scrollTop, props.width]);

  useEffect(() => {
    if (props.filterValue !== "Roulette" && props.filterValue !== "Poker") {
      setSubBtns(props.tags.filter((tags) => tags.cat === props.filterValue));
    }
    if (props.filterValue === "Roulette" || props.filterValue === "Poker") {
      setSubBtns([
        { tag: "GAMES", displayName: "Table Games" },
        { tag: "LIVE", displayName: "Live" },
      ]);
    }
  }, [props.filterValue]);

  const options = [
    { id: "all", name: "All", value: "all", label: i18next.t("All Providers") },
    ...props.providers.map((option) => {
      return {
        ...option,
        value: option.id,
        label: option.name,
      };
    }),
  ];

  const pic = () => ({
    alignItems: "center",
    display: "flex",
    ":before": {
      backgroundImage: `url(${user})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      content: '""',
      display: "block",
      marginRight: props.width >= 3400 ? 16 : 8,
      height: props.width >= 3400 ? 44 : 22,
      width: props.width >= 3400 ? 44 : 22,
      minWidth: props.width >= 3400 ? 44 : 22,
      maxWidth: props.width >= 3400 ? 44 : 22,
    },
  });

  const getOptionBg = () => {
    if (props.isDark) {
      return "#19252C";
    } else {
      return "#F2F6F2";
    }
  };

  const getOptionColor = () => {
    if (props.isDark) {
      return "#CACACA";
    } else {
      return "#61696B";
    }
  };

  const customStyles = {
    option: function (base, state) {
      return {
        ...base,
        display: "flex",
        alignItems: "center",
        height: state.selectProps.is4k ? 100 : 50,
        paddingLeft: state.selectProps.isMobile
          ? 10
          : state.selectProps.is4k
          ? 30
          : 15,
        backgroundColor: state.isSelected
          ? "transparent"
          : state.isFocused
          ? getOptionBg()
          : "transparent",
        "&:hover": { backgroundColor: getOptionBg() },
        color: state.isSelected ? "#268A00" : getOptionColor(),
        cursor: "pointer",
        fontSize: state.selectProps.isMobile
          ? "12px"
          : state.selectProps.is4k
          ? "28px"
          : "14px",
      };
    },
    menu: (base) => ({
      ...base,
      zIndex: 99,
      borderRadius: 8,
      backgroundColor: "transparent",
    }),
    menuList: (base, state) => ({
      ...base,
      minHeight: state.selectProps.is4k ? 600 : "inherit",
      borderRadius: 8,
      backgroundColor: state.selectProps.isDark ? "#171F21" : "#ffffff",
      "::-webkit-scrollbar": { width: 0 },
    }),
    control: (base, state) => ({
      ...base,
      height: "100%",
      backgroundColor: "transparent",
      boxShadow: "none",
      border: "none",
      cursor: "pointer",
      fontSize: state.selectProps.is4k ? "32px" : "16px",
    }),
    valueContainer: (base, state) => ({
      ...base,
      // paddingTop: 0,
      // paddingBottom: 0,
      paddingLeft: state.selectProps.isMobile
        ? 10
        : state.selectProps.is4k
        ? 30
        : 15,
      // paddingRight: state.selectProps.isMobile ? 5 : state.selectProps.is4k ? 40 : 20,
    }),
    // singleValue: (base, state) => ({
    //   ...base,
    //   // display: 'flex',
    //   // alignItems: 'center',
    //   display: 'grid',
    //   gridTemplateColumns: state.selectProps.is4k ? '40px 1fr' : '20px 1fr',
    //   gap: state.selectProps.is4k ? 20 : 10,
    //   position: 'relative'
    // }),
    placeholder: (styles) => ({ ...styles, ...pic() }),
    singleValue: (base, state) => ({
      ...base,
      ...pic(),
      color: state.selectProps.isDark ? "#ffffff" : "#1c3130",
    }),
    input: (base, state) => ({
      ...base,
      ...pic(),
      // margin: 0,
      // paddingTop: 0,
      // paddingBottom: 0,
      // paddingLeft: state.selectProps.is4k ? 60 : 30,
      color: state.selectProps.isDark ? "#ffffff" : "#1c3130",
    }),
    indicatorSeparator: (base) => ({ ...base, display: "none" }),
    indicatorsContainer: (base, state) => ({
      ...base,
      padding: "2px 4px",
      // padding: state.selectProps.is4k ? 15 : 5,
      // paddingLeft: state.selectProps.isMobile ? 0 : state.selectProps.is4k ? 10 : 5,
      opacity: 0.33,
    }),
  };

  return (
    <div
      className={`categories-filter ${filterAnimate ? "animate" : ""}`}
      ref={filterRef}
    >
      <div className={`categories-filter-container flex`}>
        {categories.map((cat) => (
          <MainFilterItem
            key={cat.tag}
            el={cat}
            filterValue={props.filterValue}
            setFilterValue={props.setFilterValue}
            setSubFilterValue={props.setSubFilterValue}
            setSearch={props.setSearch}
          />
        ))}
      </div>

      <div className={`subcategories-filter-container flex`}>
        {props.filterValue !== "all" && props.filterValue !== "Other games" && (
          <>
            <Swiper
              breakpoints={{
                320: {
                  spaceBetween: 8,
                },
                3400: {
                  spaceBetween: 16,
                },
              }}
              slidesPerView="auto"
              watchOverflow={true}
              observer={true}
              observeParents={true}
              observeSlideChildren={true}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
            >
              <SwiperSlide key="all">
                <div
                  className={`subcategories-item ${
                    props.subFilterValue === "all" ? "current" : ""
                  }`}
                  onClick={() => {
                    props.setSubFilterValue("all");
                    props.setSearch("");
                  }}
                >
                  {i18next.t("All Games")}
                </div>
              </SwiperSlide>
              {subBtns.map((tags) => (
                <SwiperSlide key={tags.tag}>
                  <div
                    className={`subcategories-item ${
                      props.subFilterValue === tags.tag ? "current" : ""
                    }`}
                    onClick={() => {
                      props.setSubFilterValue(tags.tag);
                      props.setSearch("");
                    }}
                  >
                    {i18next.t(tags.displayName || tags.tag)}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {props.width > 1024 && (
              <div className="levels-carousel-arrows flex">
                <div className="levels-carousel-arrow prev-slide swiper-button-prev"></div>
                <div className="levels-carousel-arrow next-slide swiper-button-next"></div>
              </div>
            )}
          </>
        )}

        {props.curProvider?.id && (
          <Select
            className="cust-select providers-select"
            value={curProvider}
            onChange={(e) => {
              if (e.id === "all") {
                props.setCurProvider({
                  id: "all",
                  name: "All",
                  value: "all",
                  label: i18next.t("All Providers"),
                });
              } else {
                props.setCurProvider(e);
              }
            }}
            options={options}
            styles={customStyles}
            isDark={props.isDark}
            isMobile={props.width < 768}
            is4k={props.width >= 3400}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesFilter;
