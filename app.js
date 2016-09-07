import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'

// actions ****************************************************************************
function add(text) {
  return { type: "ADD_TODO", text }
}
function dele(index) {  
  return { type: "DELE_TODO", index }
}
function changeFilter(filter) {
  return { type:"CHANGE_FILTER", filter }
}
// actions ****************************************************************************

// App ************************************************************
class App extends Component{
  render() {
    const { dispatch, todos,visibilityFilter} = this.props;
    return (
        <div>
            <AddTodo onAddClick={text => dispatch(add(text))} />
            <TodoList todos={todos} onClick={index => dispatch(dele(index))}/>
            <Footer filter={visibilityFilter} onClick={ _filter =>dispatch(changeFilter(_filter))
          }/>
        </div>
    )
  }
}
 
function filterTodos(todos, _filter) {
    switch (_filter) {
        case "SHOW_ALL":
            return todos
        case "SHOW_DELETED":
            return todos.filter(todo => todo.deleted)
        default:
            return todos 
    }
}

export default connect((state)=> { 
    return {
        todos:filterTodos(state.todos,state.visibilityFilter)
    }    
})(App);
// App ************************************************************

// addToDo ************************************************************
class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
      </div>
    )
  }

  handleClick(e) {
    const node = this.refs.input;
    this.props.onAddClick(node.value.trim());
    node.value = '';
  }
}
// addToDo ************************************************************

// toDoList ***********************************************************
class TodoList extends Component {
    render(){
        if(this.props.todos){
            return (
              <ul>
                {
                    this.props.todos.map(
                        (todo, index) =>
                            <li key={index} 
                                onClick = {() => this.onClick(index)} 
                                style = {{textDecoration: todo.deleted ? 'line-through' : 'none'}}
                            >
                                {todo.text}
                            </li>
                    )
                }
              </ul>
            )
        }
        
        return null;
        
    }  
    onClick(index){
        this.props.onClick(index);        
    }
}
// toDoList ***********************************************************

// Footer *************************************************************
class Footer extends Component{
    renderFilter(filter, name){
        if (filter === this.props.filter) {
            return name
        }
        return (
            <a href='#' onClick={e => {this.props.onClick(filter)}}>
                {name}
            </a>
        )
    }
    render() {
        return (
          <p>
            Show:
            {' '}
            {this.renderFilter('SHOW_ALL', 'All')}
            {', '}
            {this.renderFilter('SHOW_DELETED', 'DELETED')}
            .
          </p>
        )
      }
    
}
// Footer *************************************************************