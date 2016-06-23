class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [] };
	}

	componentWillMount() {
		// TODO: Make ajax call to grab all items
		// TODO: On success set state of all the itms
	}

	render() {
		let items = this.state.items.map( item => {
			// This should be a new component
			return(<h3>{item.name}</h3>)
		});
		return(
			<div>
				<h3>{this.props.name}</h3>
				<p>Priority: {this.props.priority}</p>
				<button className='btn red' onClick={() => this.props.deleteList(this.props.id)}>Delete</button>
				<hr />
				{items}
			</div>
		)
	}
}