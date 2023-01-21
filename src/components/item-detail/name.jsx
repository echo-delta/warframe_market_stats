const Name = (props) => {
  const {
    itemDetail,
    onToggleRank,
    rank,
  } = props;

  const renderRankButton = () => {
    if (!itemDetail.mod_max_rank || itemDetail.mod_max_rank < 0) {
      return null;
    }

    return (
      <button onClick={onToggleRank} type="button">
        Rank
        {' '}
        <b>{rank}</b>
      </button>
    )
  };

  return (
    <div className="item-detail__name">
      <span>{itemDetail.item_name}</span>
      {renderRankButton()}
    </div>
  );
};

export default Name;
