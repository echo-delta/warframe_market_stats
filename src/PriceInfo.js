import React, { Component } from 'react';
import Chart from 'react-google-charts';

const ItemName = props => {
	if (props.item.item_name) {
		if (props.item.mod_max_rank > -1) {
			var buttonVal = 'Rank ' + props.item.rank
			return (
				<div className="rankLabel">
					<h1>{props.item.item_name}</h1>
					<input type="button" className="rankButton" value={buttonVal} onClick={props.changeRank} />
				</div>
			)
		} else {
			return (
				<h1>{props.item.item_name}</h1>
			)
		}
	} else {
		return (<h5>Select an item.</h5>)
	}
}

const AvgPrice = props => {
	if (props.item.stats) {
		if (props.item.mod_max_rank > -1) {
			var rank_stat
			if (props.item.rank === 0) {
				rank_stat = props.item.stats.rank_0
			} else {
				rank_stat = props.item.stats.max_rank
			}
			return (
				<div className="averagePrice"><h3>Average Price: </h3><h1 className="price">{rank_stat[rank_stat.length-1] ? rank_stat[rank_stat.length-1].avg_price : '-'}</h1></div>
			)
		} else {
			return (
				<div className="averagePrice"><h3>Average Price: </h3><h1 className="price">{props.item.stats[props.item.stats.length-1]? props.item.stats[props.item.stats.length-1].avg_price : '-'}</h1></div>
			)
		}
	} else {
		return(<p>Loading stats...</p>)
	}
}

const OrderPrice = props => {
	if (props.item.orders) {
		if (props.item.mod_max_rank > -1) {
			if (props.item.rank === 0) {
				return(
					<div className="prices">
						<div className="orderPrice"><h3>Max offer: </h3><h1 className="price">{props.item.orders.rank_0.max_buy == -1 ? '-' : props.item.orders.rank_0.max_buy}</h1></div>
						<div className="orderPrice"><h3>Min asked: </h3><h1 className="price">{props.item.orders.rank_0.min_sell == -1 ? '-' : props.item.orders.rank_0.min_sell}</h1></div>
					</div>
				) 
			} else {
				return(
					<div className="prices">
						<div className="orderPrice"><h3>Max offer: </h3><h1 className="price">{props.item.orders.max_rank.max_buy == -1 ? '-' : props.item.orders.max_rank.max_buy}</h1></div>
						<div className="orderPrice"><h3>Min asked: </h3><h1 className="price">{props.item.orders.max_rank.min_sell == -1 ? '-' : props.item.orders.max_rank.min_sell}</h1></div>
					</div>
				)
			}
		} else {
				return(
					<div className="prices">
						<div className="orderPrice"><h3>Max offer: </h3><h1 className="price">{props.item.orders.max_buy == -1 ? '-' : props.item.orders.max_buy}</h1></div>
						<div className="orderPrice"><h3>Min asked: </h3><h1 className="price">{props.item.orders.min_sell == -1 ? '-' : props.item.orders.min_sell}</h1></div>
					</div>
				)
		}
		
	} else {
		return(<p>Loading orders...</p>)
	}
}

const StatChart = props => {
	if (props.item.stats) {
		var data
		if (props.item.mod_max_rank > -1) {
			if (props.item.rank === 0) {
				data = props.item.stats.rank_0.map(stat => [new Date(stat.datetime), stat.avg_price])
			} else {
				data = props.item.stats.max_rank.map(stat => [new Date(stat.datetime), stat.avg_price])
			}
		} else {
			data = props.item.stats.map(stat => [new Date(stat.datetime), stat.avg_price])
		}
		
		data.unshift([
			{ type: 'datetime', label: 'time' },
			{ type: 'number', label: 'price' }
		])
		var options = {
			backgroundColor: '#3b3b3b',
			colors: ['#94bdff'],
			intervals: { style: 'sticks' },
			hAxis:{textStyle:{color:'white'}},
			vAxis:{textStyle:{color:'white'}},
			legend:'none'
		}
		return(
			<Chart
				width="100%"
				height="20%"
				chartType="LineChart"
				loader={<div>Loading Chart</div>}
				data={data}
				options={options}
			/>
		)
	} else {
		return(<p>Loading stats...</p>)
	}
}

class PriceInfo extends Component {
	render() {
		const {item, changeRank} = this.props
		if (item.item_name !== undefined) {
			return(
				<div className="stats" >
					<ItemName item={item} changeRank={changeRank}/>
					<table>
					<tbody>
							<tr>
								<td><AvgPrice item={item} /></td>
								<td><OrderPrice item={item} /></td>
								<td><input className="marketButton" type="button" value="Check the market" onClick={()=> window.open("https://warframe.market/items/" + item.url_name, "_blank")} /></td>
							</tr>
						</tbody>
					</table>
					<StatChart item={item} />
				</div>
			)
		} else {
			return (null)
		}
	}
}

export default PriceInfo;