import React, { Component } from 'react';
import Select from 'react-dropdown-select';

class Form extends Component {
	
	constructor(props) {
		super(props)
		this.initialState = {
			item: {}
		}
		this.state = this.initialState
	}
	
	handleChange = values => {
		this.setState({
			item: values
		}, () => {  
			if (this.state.item && this.state.item.value !== undefined) {
				this.props.getPriceInfo(this.state.item)
				this.setState(this.initialState)
			}
		})
	}
	
	loadNoDataRenderer = () => (
		<center>{this.props.loadState}</center>
	)
	
	render() {
		const item = [this.state.item]
		const items = this.props.items.map(item => {return({'label': item.item_name, 'value': item.url_name})})
		
		return(
			<form onSubmit={e => this.handleSubmit(e)}>
				<Select
					options={items}	
					clearOnSelect="True"
					values={item}
					noDataRenderer={this.loadNoDataRenderer}
					onChange={(values) => this.handleChange(values[0])} />
				<br />
				<hr />
			</form>
		)
	}
	
}

export default Form;