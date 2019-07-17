import React, { Component } from 'react';
import Form from './Form';
import PriceInfo from './PriceInfo';

class App extends Component {
	
	state = {
		items: [],
		itemNames: [],
		current_item:{},
		current_statistics:[],
		current_orders:[]
	}
	
	componentDidMount() {
		const url = 'https://api.warframe.market/v1/items'
		fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(result => result.json())
			.then(result => {
				this.setState({
					items:result.payload.items,
					itemNames: result.payload.items.map(item => item.item_name)
				})
			})
	}
	
	changeRank = () => {
		var item = this.state.current_item
		if (item.rank === item.max_rank) {
			item.rank = 0
		} else {
			item.rank = item.max_rank
		}
		this.setState({
				current_item: item
		})
	}
	
	getPriceInfo = itemName => {
		var item = this.state.items.find(item => {return(item.item_name === itemName.value)})
		this.setState({
			current_item: item,
			current_statistics:[],
			current_orders:[]
		})
		
		var url = 'https://api.warframe.market/v1/items/' + item.url_name + '/statistics'
		fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(result => result.json())
			.then(result => {
				this.setState({
					current_statistics: result.payload.statistics_closed["90days"]
				})
			})
			
		url = 'https://api.warframe.market/v1/items/' + item.url_name + '/orders'
		fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(result => result.json())
			.then(result => {
				this.setState({
					current_orders: result.payload.orders
				})
			})
			
		url = 'https://api.warframe.market/v1/items/' + item.url_name
		fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(result => result.json())
			.then(result => {
				if (result.payload.item.items_in_set[0].mod_max_rank) {
					item.max_rank = result.payload.item.items_in_set[0].mod_max_rank
					item.rank = 0
					this.setState({
						current_item:item
					})
				} else {
					item.max_rank = -1
					item.rank = 0
					this.setState({
						current_item:item
					})
				}
			})
	}
	
  render() {
    return (
      <div className="App">
				<center>
					<h3>Select an item</h3>
					<Form itemNames={this.state.itemNames} getPriceInfo={this.getPriceInfo}/>
					<PriceInfo item={this.state.current_item} stats={this.state.current_statistics} orders={this.state.current_orders} changeRank={this.changeRank} />
					<p>Made by echo_delta for learning purposes. Source and documentation at <a href="https://github.com/echo-delta/warframe-market-stats">https://github.com/echo-delta/warframe-market-stats</a>.</p>
				</center>
      </div>
    );
  }
}

export default App;
