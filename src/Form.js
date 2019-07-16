import React, { Component } from 'react';
import Select from 'react-dropdown-select';

class Form extends Component {
	
	constructor(props) {
		super(props)
		this.initialState = {
			item: ''
		}
		this.state = this.initialState
	}
	
	handleChange = event => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}
	
	render() {
		const {item} = this.state
		//const {itemNames} = this.props
		//console.log(itemNames)
		const itemNames = this.props.itemNames.map(name => {return({'label': name, 'value': name})})
		console.log(itemNames)
		return(
			<form>
			<label>Item</label>
			<Select 
				options={itemNames} />
			<input type="button" value="Check" />
			</form>
		)
	}
	
}

export default Form;