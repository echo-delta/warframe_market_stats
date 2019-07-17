import React, { Component } from 'react';

const ItemName = props => {
	console.log(props.item)
	if (props.item) {
		return (
			<h1>{props.item.item_name}</h1>
		)
	} else {
		return (null)
	}
}

const AvgPrice = props => {
	if (props.stats.length > 0) {
		return (
			<h3>Average Price: {props.stats[props.stats.length-1].avg_price}</h3>
		)
	} else {
		return(<p>No stats available.</p>)
	}
}

class PriceInfo extends Component {
	render() {
		const {item, stats, orders} = this.props
		console.log(this.props)
		return(
			<div className="stats" >
				<ItemName item={item} />
				<AvgPrice stats={stats} />
			</div>
		)
	}
}

export default PriceInfo;