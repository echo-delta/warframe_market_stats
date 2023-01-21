import { useState } from 'react';

import Loader from 'src/components/loader';
import Name from 'src/components/item-detail/name';
import Prices from 'src/components/item-detail/prices';
import CheckMarketButton from 'src/components/item-detail/check-market-button';
import Chart from 'src/components/item-detail/chart';

const ItemDetail = (props) => {
  const {
    itemDetail,
    loading,
  } = props;

  const [rank, setRank] = useState(0);

  const handleToggleRank = () => {
    setRank((prevState) => (
      prevState === 0
        ? itemDetail.mod_max_rank
        : 0
    ));
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Name
            itemDetail={itemDetail}
            onToggleRank={handleToggleRank}
            rank={rank}
          />
          <div className="item-detail__loader-wrapper">
            <Loader />
          </div>
        </>
      );
    }

    return (
      <>
        <Name
          itemDetail={itemDetail}
          onToggleRank={handleToggleRank}
          rank={rank}
        />
        <Prices
          itemDetail={itemDetail}
          rank={rank}
        />
        <CheckMarketButton
          itemDetail={itemDetail}
        />
        <Chart
          itemDetail={itemDetail}
          rank={rank}
        />
      </>
    );
  }

  if (!loading && Object.keys(itemDetail).length === 0) {
    return null;
  }

  return (
    <div className="item-detail">
      {renderContent()}
    </div>
  );
};

export default ItemDetail;
