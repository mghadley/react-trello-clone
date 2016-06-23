class Boards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {boards: props.boards, show: false, edit: false};
		this.deleteBoard = this.deleteBoard.bind(this);
		this.showBoard = this.showBoard.bind(this);
		this.editBoard = this.editBoard.bind(this);
		this.updateBoard = this.updateBoard.bind(this);
	}

	addBoard(board) {
		this.setState({ boards: [{...board}, ...this.state.boards] })
	}

	showBoard(board) {
		this.setState({ show: true, board })
	}

	editBoard(board) {
		this.setState({ edit: true, board })
	}

	updateBoard(id) {

	}

	deleteBoard(id) {
		$.ajax({
			url: `boards/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let boards = this.state.boards;
			let index = boards.findIndex( board => board.id === id);
			this.setState({
				show: false,
				boards: [
					...boards.slice(0, index),
					...boards.slice(index + 1, boards.length)
				]
			})
		}).fail( data => {
			alert('Board did not delete')
		})
	}

	boardBack() {
		this.setState({ show: false });
	}

	render() {
		if(this.state.show) {
			return(
				<div className="container">
					<h3>{this.state.board.name}</h3>
					<i>{this.state.board.description}</i>
					<br />
					<button className='btn' onClick={this.boardBack.bind(this)}>Back</button>
					<button className='btn red' onClick={() => this.deleteBoard(this.state.board.id)}>Delete</button>
					<hr />
					<Lists boardId={this.state.board.id} />
				</div>
			)
		} else {
			let boards = this.state.boards.map( board => {
				return(<Board key={`board-${board.id}`} {...board} deleteBoard={this.deleteBoard} showBoard={this.showBoard}/>);
			});
			return(
				<div>
					<NewBoard  addBoard={this.addBoard.bind(this)} />
					<div className='row'>
						{boards}
					</div>
				</div>
			);
		}
	}
}