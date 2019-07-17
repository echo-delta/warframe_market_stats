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
		this.props.getPriceInfo(this.state.itemName)
		this.setState(this.initialState)
	}
	
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
					onChange={(values) => this.handleChange(values[0])} />
				<input type="button" value="Check" onClick={this.handleSubmit} />
			</form>
		)
	}
	
}

export default Form;