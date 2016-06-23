class Board extends React.Component {
	constructor(props) {
		super(props);
    this.state = { edit: false, name: this.props.name, description: this.props.description }
    this.editBoard = this.editBoard.bind(this)
    this.updateBoard = this.updateBoard.bind(this)
	}

  editBoard(e) {
    e.stopPropagation();
    this.setState({ edit: true })
  }

  updateBoard(e) {
    e.preventDefault();
    let name = this.refs.name.value
    let description = this.refs.description.value
    $.ajax({
      url: `/boards/${this.props.id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { board: { name, description } }
    }).done( board => {
      this.refs.updateForm.reset()
      this.setState({ edit: false, name: board.name, description: board.description })
    }).fail( data => {
      alert('Failed to update')
    })
  }

	render() {
    if(this.state.edit) {
      return(
        <div>
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{`Edit ${this.props.name}`}</span>
                <form ref='updateForm' onSubmit={this.updateBoard}>
                  <input type='text' defaultValue={this.state.name} ref='name' required />
                  <textarea defaultValue={this.state.description} ref='description'></textarea>
                  <input type='submit' className='btn' value='Update'/>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
  		return(
  			<div>
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text" onClick={() => this.props.showBoard(this.props)}>
                <span className="card-title">{this.state.name}</span>
                <p>{this.state.description}</p>
              </div>
              <div className="card-action">
                <button className='btn' onClick={this.editBoard}>Edit</button>
                <button className='btn red' onClick={() => this.props.deleteBoard(this.props.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
	}
}