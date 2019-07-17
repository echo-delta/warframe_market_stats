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
	
	getPriceInfo = itemName => {
		var item = this.state.items.find(item => {return(item.item_name === itemName.value)})
		this.setState({
			current_item: item
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
	}
	
  render() {
    return (
      <div className="App">
        <h1>Hello, World</h1>
				<Form itemNames={this.state.itemNames} getPriceInfo={this.getPriceInfo}/>
				<PriceInfo item={this.state.current_item} stats={this.state.current_statistics} orders={this.state.current_orders} />
      </div>
    );
  }
}

export default App;
