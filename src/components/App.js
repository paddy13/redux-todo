import React from 'react';
import {addTodo, deleteTodo, completeTodo} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoInputVal: ''
    }
  }

  pushTodoToList = () => {
    if(this.state.todoInputVal) {
      this.props.addTodo(this.state.todoInputVal);
      this.setState({ todoInputVal: '' });
    }
  }

  render() {
    return (
      <div>
        <p className='title'> Task(s) To Do </p>
        <div className='form-container'>
          <input
            className='input-task' 
            type='text'
            placeholder='Type in task to do'
            value={this.state.todoInputVal}
            onChange={(evt) => this.setState({ todoInputVal: evt.target.value })}
          />
          <button className='submit-button' type='button' onClick={this.pushTodoToList}> Submit </button>
        </div>
        
        <ol>
          {this.props.todos && this.props.todos.map((todo, i) => {
            return (
              <div key={todo.id}>
                <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}> {todo.text} </li>
                <div className='action-buttons'>
                  <button className='delete-button' type='button' onClick={() => this.props.deleteTodo(todo.id)}>
                    Delete
                  </button>
                  <button className='complete-button' type='button' onClick={() => this.props.completeTodo(todo.id)}>
                    {todo.completed ? 'Mark As Incomplete' : 'Mark As Complete'}
                  </button>
                </div>
              </div>
            )
          })}
        </ol>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    completeTodo: completeTodo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
