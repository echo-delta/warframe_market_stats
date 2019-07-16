import React, { Component } from 'react';
import Form from './Form';

class App extends Component {
	
	state = {
		items: {},
		itemNames: []
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
					items:result,
					itemNames: result.payload.items.map(item => item.item_name)
				})
			})
	}
	
  render() {
    return (
      <div className="App">
        <h1>Hello, World</h1>
				<Form itemNames={this.state.itemNames}/>
      </div>
    );
  }
}

export default App;
