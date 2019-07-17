import React, { Component } from 'react';
import Chart from 'react-google-charts';

const ItemName = props => {
	if (props.item.item_name) {
		return (
			<h1>{props.item.item_name}</h1>
		)
	} else {
		return (<h5>Select an item.</h5>)
	}
}

const AvgPrice = props => {
	if (props.stats.length > 0) {
		return (
			<h3>Average Price: {props.stats[props.stats.length-1].avg_price}</h3>
		)
	} else {
		return(<p>Loading stats...</p>)
	}
}

const OrderPrice = props => {
	if (props.orders.length > 0) {		
		var buy_prices = props.orders
							.filter(order => (order.user.status === "ingame" && order.order_type === "buy"))
							.map(order => order.platinum)
		var buy_max =  Math.max.apply(Math, buy_prices)
		if (!isFinite(buy_max)) {
			buy_max = 'No online buyer found.'
		}
		
		var sell_prices = props.orders
							.filter(order => (order.user.status === "ingame" && order.order_type === "sell"))
							.map(order => order.platinum)
		var sell_min =  Math.min.apply(Math, sell_prices)
		if (!isFinite(sell_min)) {
			sell_min = 'No online buyer found.'
		}
		
		return(
			<div className="prices">
				<h3>Max buyer online: {buy_max}</h3>
				<h3>Min seller online: {sell_min}</h3>
			</div>
		)
	} else {
		return(<p>Loading orders...</p>)
	}
}

const StatChart = props => {
	if (props.stats.length > 0) {
		var data = props.stats.map(stat => [new Date(stat.datetime), stat.avg_price])
		data.unshift([
			{ type: 'datetime', label: 'time' },
			{ type: 'number', label: 'price' }
		])
		return(
			<Chart
				width="100%"
				height="30%"
				chartType="LineChart"
				loader={<div>Loading Chart</div>}
				data={data}
				options={{
					intervals: { style: 'sticks' },
				}}
			/>
		)
	} else {
		return(<p>Loading stats...</p>)
	}
}

class PriceInfo extends Component {
	render() {
		const {item, stats, orders} = this.props
		if (item.item_name !== undefined) {
			return(
				<div className="stats" >
					<ItemName item={item} />
					<AvgPrice stats={stats} />
					<OrderPrice orders={orders} />
					<input type="button" value="Check the market" onClick={()=> window.open("https://warframe.market/items/" + item.url_name, "_blank")} />
					<StatChart stats={stats} />
				</div>
			)
		} else {
			return (null)
		}
	}
}

export default PriceInfo;