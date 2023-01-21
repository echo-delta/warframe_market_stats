const Prices = (props) => {
  const {
    itemDetail,
    rank,
  } = props;

  const getAverage = () => {
    if (itemDetail.mod_max_rank === -1) {
      return itemDetail.stats[itemDetail.stats.length - 1].avg_price;
    }

    return rank === 0
      ? itemDetail.stats.rank_0[itemDetail.stats.rank_0.length - 1].avg_price
      : itemDetail.stats.max_rank[itemDetail.stats.max_rank.length - 1].avg_price;
  }

  const getMinSell = () => {
    if (itemDetail.mod_max_rank === -1) {
      return itemDetail.orders.min_sell === -1 ? '-' : itemDetail.orders.min_sell;
    }

    return rank === 0
      ? itemDetail.orders.rank_0.min_sell == -1 ? '-' : itemDetail.orders.rank_0.min_sell
      : itemDetail.orders.max_rank.min_sell == -1 ? '-' : itemDetail.orders.max_rank.min_sell
  }

  const getMaxBuy = () => {
    if (itemDetail.mod_max_rank === -1) {
      return itemDetail.orders.max_buy  === -1 ? '-' : itemDetail.orders.max_buy ;
    }

    return rank === 0
      ? itemDetail.orders.rank_0.max_buy  == -1 ? '-' : itemDetail.orders.rank_0.max_buy 
      : itemDetail.orders.max_rank.max_buy  == -1 ? '-' : itemDetail.orders.max_rank.max_buy 
  }

  return (
    <div className="item-detail__prices">
      <div className="item-detail__prices__price item-detail__prices__price--average">
        <div>Average Price</div>
        <div>{Math.ceil(getAverage())}</div>
      </div>
      <div className="item-detail__prices__price item-detail__prices__price--min">
        <div>Min Demand</div>
        <div>{getMinSell()}</div>
      </div>
      <div className="item-detail__prices__price item-detail__prices__price--max">
        <div>Max Offer</div>
        <div>{getMaxBuy()}</div>
      </div>
    </div>
  );
};

export default Prices;
