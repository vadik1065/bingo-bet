const PrizeItem = (props) => {
  const URL_ADMIN = "https://admin.bingo.bet/";
  return (
    <>
      <div className="border-stick"></div>
      <div className="show-prizes">
        <img className="image-prizes" src={URL_ADMIN + props.prizeGiveaways.image_url} />
        <span className="title-of-item">{props.prizeGiveaways.name}</span>
        <span className="price-item">{`$${props.prizeGiveaways.summa}`}</span>
      </div>
    </>
  );
};

export default PrizeItem;
