class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.state = { lists: [] };
		this.deleteList = this.deleteList.bind(this);
	}

	componentWillMount() {
		$.ajax({
			url: `/boards/${this.props.boardId}/lists`,
			type: 'GET',
			dataType: 'JSON'
		}).done( lists => {
			this.setState({ lists })
		}).fail( data => {
			alert('Failed grabbing board lists.')
		})
	}

	addList(e) {
		e.preventDefault()
		$.ajax({
			url: `/boards/${this.props.boardId}/lists`,
			type: 'POST',
			dataType: 'JSON',
			data: { list: { name: this.refs.name.value, priority: this.refs.priority.value } }
		}).done( list => {
			this.refs.addList.reset()
			this.setState({ lists: [{...list}, ...this.state.lists] })
		}).fail( data => {
			alert('List not saved')
		})
	}

	deleteList(id) {
		event.preventDefault()
		$.ajax({
			url: `/boards/${this.props.boardId}/lists/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let lists = this.state.lists;
			let index = lists.findIndex( l => l.id === id)
			this.setState({ lists: [
				...lists.slice(0, index),
				...lists.slice(index + 1, lists.length)
			]})
		}).fail( data => {
			alert('List not deleted!')
		})
	}

	render() {
		let lists = this.state.lists.map( list=> {
			return(<List key={list.id} {...list} deleteList={this.deleteList}/>)
		})
		return(
			<div>
				<form onSubmit={this.addList.bind(this)} ref='addList'>
					<input type='text' ref='name' placeholder='List Name' required />
					<input type='number' ref='priority' placeholder='Priority' />
					<input type='submit' className='btn' value='Add' />
				</form>
				{lists}
			</div>
		)
	}
}