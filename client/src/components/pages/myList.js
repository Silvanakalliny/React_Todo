import React from 'react';
import { withAuthorization } from '../session';
import { Component } from 'react';
import Todos from '..//Todo'
import AddTodo from '../AddTodo'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'


class MyList extends Component {
  constructor(props) {
    super(props)
    this.state = { todos: [] }
  }

  componentDidMount() {
    if (this.props.authUser) {
      this.props.firebase.db.collection(this.props.authUser.uid).doc('todos').get()
        .then(doc => this.setState({ todos: doc.data().todos }))
    }
  }

  markComplete = (id) => {
    let docRef = this.props.firebase.db.collection(this.props.authUser.uid).doc('todos')
    docRef.update()
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed

        }
        return todo
      })
    })
  }

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) }))

  }

  addTodo = (title) => {
    let docRef = this.props.firebase.db.collection(this.props.authUser.uid).doc('todos')
    docRef.update(
      {
        todos: [...this.state.todos, {
          id: uuidv4(),
          title,
          completed: false
        }]
      }
    )
      .then(docRef.get().then(doc => this.setState({ todos: doc.data().todos })));// used spread syntax here because u cant just add a single entry you need to rewrite the entire state with the new entry
  }

  render() {
    return (
      
      <React.Fragment>
        <AddTodo addTodo={this.addTodo} />
        <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
      </React.Fragment>

    )
  }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(MyList);