import { ReactComponent as ExitIcon } from 'src/assets/exit.svg';

const CheckMarketButton = (props) => {
  const {
    itemDetail,
  } = props;

  const handleRedirect = () => {
    window.open(
      `https://warframe.market/items/${itemDetail.url_name}`,
      '_blank',
    );
  }

  return (
    <button
      className="item-detail__check-market-button"
      onClick={handleRedirect}
    >
      Check Market
      {' '}
      <ExitIcon />
    </button>
  )
}

export default CheckMarketButton;
