import React, { Component } from 'react';
import Form from './Form';
import PriceInfo from './PriceInfo';

class App extends Component {
	
	state = {
		items: [],
		current_item:{},
		loadState: "Loading items ..."
	}
	
	componentDidMount() {
		const url = 'https://wf-marketstats.herokuapp.com/items'
		fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(result => {
				console.log(result)
				if (!result.ok) {
					throw Error(result.statusText)
				}
			})
			.then(result => result.json())
			.then(result => {
				this.setState({
					items:result
				})
			})
			.catch(error => {
				console.log(error)
				this.setState({
					loadState: "Load Failed."
				})
			})
	}
	
	changeRank = () => {
		var item = this.state.current_item
		if (item.rank === item.mod_max_rank) {
			item.rank = 0
		} else {
			item.rank = item.mod_max_rank
		}
		this.setState({
				current_item: item
		})
	}
	
	getPriceInfo = item => {
		this.setState({
			current_item: {item_name : item.label}
		})
		var url = 'https://wf-marketstats.herokuapp.com/items' + item.value
		fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(result => result.json())
			.then(result => {
				result.item_name = item.label
				result.rank = 0
				this.setState({
					current_item: result
				})
			})
	}
	
  render() {
    return (
      <div className="App">
				<center>
					<h3>Select an item</h3>
					<Form loadState={this.state.loadState} items={this.state.items} getPriceInfo={this.getPriceInfo}/>
					<PriceInfo item={this.state.current_item} changeRank={this.changeRank}/>
					<p>Made by echo_delta for learning purposes. Source and documentation at <a href="https://github.com/echo-delta/warframe-market-stats">https://github.com/echo-delta/warframe-market-stats</a>.</p>
				</center>
      </div>
    );
  }
}

export default App;
