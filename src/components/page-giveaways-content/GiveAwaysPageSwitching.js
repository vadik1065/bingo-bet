import { IonIcon } from "@ionic/react";
import i18next from "i18next";
import ShowMoreIcon from "../../images/giveaways/reload-icon.svg";

const GiveAwaysPageSwitching = (props) => {
  const Сondition = (curPage, page, lengthPages) => {
    function countRightFromCurPageMinPage(indx) {
      switch (indx) {
        case 0:
          return ALL_PAGE_VIS + 3;
        case 1:
          return ALL_PAGE_VIS + 2;
        case 2:
          return ALL_PAGE_VIS + 1;
        default:
          return ALL_PAGE_VIS;
      }
    }

    function countLeftFromCurPageMaxPage(indx) {
      console.log("deddddd" + indx);
      switch (indx) {
        case 0:
          return ALL_PAGE_VIS + 3;
        case 1:
          return ALL_PAGE_VIS + 2;
        case 2:
          return ALL_PAGE_VIS + 1;
        case 3:
          return ALL_PAGE_VIS;
        default:
          return 1;
      }
    }
    console.log(props.slicePage[props.ind + 1].length);

    const ALL_PAGE_VIS = 1;
    let difLeft, difRight;
    if (curPage > page) {
      difLeft = countLeftFromCurPageMaxPage(lengthPages - curPage);
      difRight = ALL_PAGE_VIS;
    } else if (curPage < page) {
      difLeft = ALL_PAGE_VIS;
      difRight = countRightFromCurPageMinPage(curPage);
    }

    console.log(difLeft, difRight);
    return page + difLeft >= curPage && page <= curPage + difRight;
  };
  return (
    <div className="page-switch-cont">
      <button
        className="page-swicth-show-more"
        onClick={() => {
          if (
            props?.slicePage?.length - 1 > props.ind &&
            props.ind <= props?.slicePage?.length - 1
          ) {
            props.setInd(0);
            props.setCurrEventPage(
              () => props.currEventPage + props.slicePage[props.ind + 1].length
            );
          }
          if (props?.slicePage?.length == 1) {
            props.setInd(0);
            props.setCurrEventPage(10);
          }
        }}
      >
        <div className="el-in-btn-show-more">
          <IonIcon className="icon-btn-show-more" icon={ShowMoreIcon} />
          <span className="text-btn-show-more">{i18next.t("Show More")}</span>
        </div>
      </button>
      <div className="arr-btn-page-switch-cont">
        {props.slicePage.map((el, i) => {
          const lastPage = i === props?.slicePage?.length - 1;
          const firstPage = i === 0;

          return (
            <div key={i}>
              {props?.slicePage?.length > 6 ? (
                <div className={`focus-page-switch ${i == props.ind ? "current" : ""}`}>
                  {firstPage && (
                    <div className="ellipsis-cont">
                      <button
                        className="arr-btn-page-switch first-page"
                        onClick={() => props.setInd(i)}
                      >
                        <span className="arr-btn-text">{i + 1}</span>
                      </button>
                      {props.ind >= 3 && (
                        <div className="ellipsis first-page">
                          <span>...</span>
                        </div>
                      )}
                    </div>
                  )}

                  {!firstPage &&
                    !lastPage &&
                    (props.ind == i || Сondition(props.ind, i, props?.slicePage?.length - 1)) && (
                      <button className="arr-btn-page-switch" onClick={() => props.setInd(i)}>
                        <span className="arr-btn-text">{i + 1}</span>
                      </button>
                    )}

                  {lastPage && (
                    <div className="ellipsis-cont">
                      <button
                        className="arr-btn-page-switch last-page"
                        onClick={() => props.setInd(i)}
                      >
                        <span className="arr-btn-text">{i + 1}</span>
                      </button>
                      {props.ind < props?.slicePage?.length - 3 && (
                        <div className="ellipsis last-page">
                          <span>...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className={`focus-page-switch ${i == props.ind ? "current" : ""}`}>
                  <button className="arr-btn-page-switch" onClick={() => props.setInd(i)}>
                    <span className="arr-btn-text">{i + 1}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GiveAwaysPageSwitching;
