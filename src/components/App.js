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

  deleteTask(i) {
    this.props.deleteTodo(i);
  }

  completeTask(i) {
    this.props.completeTodo(i);
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
              <div className='list-group' key={todo.id}>
                <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}> {todo.text} </li>
                <div className='test'>
                  <button className='action-button delete-button' type='button' onClick={() => this.deleteTask(todo.id)}>
                    Delete
                  </button>
                  <button className='action-button complete-button' type='button' onClick={() => this.completeTask(todo.id)}>
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
