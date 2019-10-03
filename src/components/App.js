import React from 'react';
import addTodo from './actions';
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
    this.props.addTodo(this.state.todoInputVal);
  }

  render() {
    return (
      <div>
        <input 
          type='text'
          value={this.state.todoInputVal}
          onChange={(evt) => this.setState({ todoInputVal: evt.target.value })}
        />
        <button type='button' onClick={this.pushTodoToList}> Submit </button>
        
        {this.props.todos && this.props.todos.map((todo) => {
          return <li key={todo.id}> {todo.text} </li>
        })}

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
    addTodo: addTodo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
