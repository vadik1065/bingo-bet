import i18next from "i18next";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const useSearch = (data) => {
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [subFilterValue, setSubFilterValue] = useState("all");
  const [curProvider, setCurProvider] = useState({
    id: "all",
    name: "All",
    value: "all",
    label: i18next.t("All Providers"),
  });
  const [foundGames, setFoundGames] = useState([]);
  const [focused, setFocused] = useState(false);
  const [loadingGames, setLoadingGames] = useState(false);
  const [prevGames, setPrevGames] = useState([]);
  const location = useLocation();

  function searchGame(e) {
    let temp = [];
    if (e !== "") {
      // foundGames.forEach(item => {
      //   if (item.name.toLowerCase().indexOf(e.toLowerCase()) > -1) {
      //     temp.push(item);
      //   }
      // });
      // console.log(temp);
      // setFoundGames(temp);

      if (foundGames.length) {
        foundGames.forEach((item) => {
          if (item.name.toLowerCase().indexOf(e.toLowerCase()) > -1) {
            temp.push(item);
          }
        });
      } else {
        sortGames().forEach((item) => {
          if (item.name.toLowerCase().indexOf(e.toLowerCase()) > -1) {
            temp.push(item);
          }
        });
      }
      setFoundGames(temp);
    }

    if (e === "") {
      setFoundGames(prevGames);
    }
    setLoadingGames(false);
  }

  useEffect(() => {
    setLoadingGames(true);
    if (data.games.length) {
      // let sortGames = [];
      // let filterGames = [];
      // // console.log('filter', filterValue);
      // // console.log('subfilter', subFilterValue);
      // // console.log(curProvider.id);

      // if (filterValue === 'all') {
      //   filterGames = data.games;
      // } else if (filterValue === 'Roulette' || filterValue === 'Poker') {
      //   filterGames = data.games.filter(g => g.tags.some(tags => subFilterValue === 'all' ? tags.tag.some(tag => tag === filterValue) : tags.cat === subFilterValue && tags.tag.some(tag => tag === filterValue)));
      // } else if (filterValue === 'Other games') {
      //   filterGames = data.games.filter(g => g.tags.some(tags => tags.tag.some(tag => tag === filterValue)));
      // } else {
      //   filterGames = data.games.filter(g => g.tags.some(tags => tags.cat === filterValue && subFilterValue === 'all' ? tags : tags.tag.some(tag => tag === subFilterValue)));
      // }

      // if (curProvider.id !== 'all') {
      //   filterGames = filterGames.filter(games => games.merchant_id == curProvider.id);
      // }

      // sortGames = filterGames.sort((a, b) => a.forbidden - b.forbidden || b.cnt_likes - a.cnt_likes);
      // // console.log(sortGames);
      // // console.log(loadingGames);
      // console.log(3);
      // setFoundGames(sortGames);
      // setPrevGames(sortGames);
      // setLoadingGames(false);

      setFoundGames(sortGames());
      setPrevGames(sortGames());
      setLoadingGames(false);
    }
  }, [data.games, filterValue, subFilterValue, curProvider]);

  useEffect(() => {
    switch (location.pathname) {
      case "/games/live":
        setFilterValue("LIVE");
        break;
      case "/games/slots":
        setFilterValue("SLOTS");
        break;
      case "/games/table":
        setFilterValue("GAMES");
        break;
      case "/games/roulette":
        setFilterValue("Roulette");
        break;
      case "/games/poker":
        setFilterValue("Poker");
        break;
      case "/games/other":
        setFilterValue("Other games");
        break;
      default:
        setFilterValue("all");
        break;
    }
  }, [location.pathname]);

  useEffect(() => {
    setLoadingGames(true);
    if (focused) {
      searchGame(search);
    }
    if (!focused && data.games.length) {
      setLoadingGames(false);
    }
  }, [search]);

  function sortGames() {
    let sortGames = [];
    let filterGames = [];

    if (filterValue === "all") {
      filterGames = data.games;
    } else if (filterValue === "Roulette" || filterValue === "Poker") {
      filterGames = data.games.filter((g) =>
        g.tags.some((tags) =>
          subFilterValue === "all"
            ? tags.tag.some((tag) => tag === filterValue)
            : tags.cat === subFilterValue &&
              tags.tag.some((tag) => tag === filterValue)
        )
      );
    } else if (filterValue === "Other games") {
      filterGames = data.games.filter((g) =>
        g.tags.some((tags) => tags.tag.some((tag) => tag === filterValue))
      );
    } else {
      filterGames = data.games.filter((g) =>
        g.tags.some((tags) =>
          tags.cat === filterValue && subFilterValue === "all"
            ? tags
            : tags.tag.some((tag) => tag === subFilterValue)
        )
      );
    }

    if (curProvider.id !== "all") {
      filterGames = filterGames.filter(
        (games) => games.merchant_id == curProvider.id
      );
    }

    sortGames = filterGames.sort(
      (a, b) => a.forbidden - b.forbidden || b.cnt_likes - a.cnt_likes
    );

    return sortGames;
  }

  return {
    search,
    setSearch,
    filterValue,
    setFilterValue,
    subFilterValue,
    setSubFilterValue,
    curProvider,
    setCurProvider,
    setFocused,
    focused,
    loadingGames,
    foundGames,
  };
};

export default useSearch;
