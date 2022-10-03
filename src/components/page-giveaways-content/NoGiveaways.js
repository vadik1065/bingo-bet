import i18next from "i18next";
import { ReactComponent as GiftGiveaways } from "../../images/giveaways/gift-giveaways.svg";

const NoGiveaways = () => {
  return (
    <div className="body-no-giveaways">
      <GiftGiveaways className="img-no-giveaways" />
      <span className="text-no-giveaways">
        {i18next.t("There are no active giveaways yet")}
      </span>
    </div>
  );
};

export default NoGiveaways;
