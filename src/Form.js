import React, { Component } from 'react';
import Select from 'react-dropdown-select';

class Form extends Component {
	
	constructor(props) {
		super(props)
		this.initialState = {
			itemName: {}
		}
		this.state = this.initialState
	}
	
	handleChange = values => {
		this.setState({
			itemName: values
		})
	}
	
	handleSubmit = e => {
		e.preventDefault()
		if (this.state.itemName.value !== undefined) {
			this.props.getPriceInfo(this.state.itemName)
			this.setState(this.initialState)
		}
	}
	
	loadNoDataRenderer = ({props,state,methods}) => (
		<center>Loading items...</center>
	)
	
	render() {
		const itemName = [this.state.itemName]
		
		const itemNames = this.props.itemNames.map(name => {return({'label': name, 'value': name})})
		
		return(
			<form onSubmit={e => this.handleSubmit(e)}>
				<Select
					options={itemNames}	
					clearOnSelect="True"
					clearable="True"
					values={itemName}
					noDataRenderer={this.loadNoDataRenderer}
					onChange={(values) => this.handleChange(values[0])} />
				<input className="checkButton" type="button" value="Check" onClick={this.handleSubmit} />
				<hr />
			</form>
		)
	}
	
}

export default Form;