import i18next from "i18next";
import { useState } from "react";

const HeaderGiveAways = (props) => {
  const [tab, setTab] = useState({});

  const tabs = [
    { value: "rolldate", name: "Roll Date", sort: "date_end" },
    { value: "prize", name: "Prize Value", sort: "cur_prize" },
    { value: "joined", name: "User Joined", sort: "joined_players" },
  ];

  return (
    <div className="header-giveaways-container">
      <div className="header-giveaways">
        <p className="giveaways-page-title">{`${i18next.t("Giveaways")} (${
          props.listGiveaways.length
        })`}</p>
        <p className="text-sortyby">SORT BY</p>

        <div className="giveaways-header-sorting">
          <div className="leader-board-header flex">
            {tabs.map((t) => (
              <div
                key={t.value}
                className={`leader-board-header-tab ${tab === t.value ? "current" : ""}`}
                onClick={() => {
                  setTab(t.value);
                  let oldArray = JSON.stringify(props.listGiveaways);
                  let sortArray = [];
                  if (t.value === "rolldate") {
                    sortArray = props.listGiveaways.sort(function (a, b) {
                      let timeA = new Date(a[t.sort]).getTime();
                      let timeB = new Date(b[t.sort]).getTime();
                      return timeA - timeB;
                    });
                  } else if (t.value === "joined") {
                    sortArray = props.listGiveaways.sort(function (a, b) {
                      let joinedA = +a[t.sort]?.length || 0;
                      let joinedB = +b[t.sort]?.length || 0;
                      return joinedA - joinedB;
                    });
                  } else {
                    sortArray = props.listGiveaways.sort(function (a, b) {
                      return a[t.sort] - b[t.sort];
                    });
                  }
                  if (oldArray == JSON.stringify(sortArray)) {
                    sortArray.reverse();
                  }
                  props.setListGiveaways([...sortArray]);
                }}
              >
                {i18next.t(t.name)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderGiveAways;
