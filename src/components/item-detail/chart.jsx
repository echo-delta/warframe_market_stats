import { useMemo } from 'react';
import { Chart as GoogleChart } from "react-google-charts";

import Loader from 'src/components/loader';

const CHART_OPTIONS = {
  backgroundColor: 'none',
  colors: ['white'],
  intervals: { style: 'sticks' },
  hAxis:{ textStyle: { color: 'white' } },
  vAxis:{ textStyle: { color: 'white' } },
  legend:'none'
}

const Chart = (props) => {
  const {
    itemDetail,
    rank,
  } = props;

  const data = useMemo(() => {
    let result;
    let stats;

    if (itemDetail.mod_max_rank < 0) {
      stats = itemDetail.stats;
    } else {
      stats = rank === 0
        ? itemDetail.stats.rank_0
        : itemDetail.stats.max_rank;
    }

    result = stats.map((stat) => (
      [new Date(stat.datetime), stat.avg_price]
    ));

    // Add labels
    result.unshift([
			{ type: 'datetime', label: 'time' },
			{ type: 'number', label: 'price' }
		]);

    return result
  }, [itemDetail, rank]);

  const renderLoader = () => (
    <div className="item-detail__loader-wrapper">
      <Loader />
    </div>
  );

  return (
    <GoogleChart
      width="100%"
      height="100%"
      chartType="LineChart"
      data={data}
      options={CHART_OPTIONS}
    />
  );
};

export default Chart;
