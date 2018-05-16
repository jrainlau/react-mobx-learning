import { observable, action, reaction } from 'mobx'
import { bridge } from '../utils'

class Todo {
  @observable
  $data = {
    value: '',
    id: new Date().getTime(),
    complete: false
  }
  constructor (value) {
    bridge(this)
    this.value = value
  }
}

class TodoStore {
  @observable
  todos = JSON.parse(localStorage.getItem('todoList')) || []

  watchTodoList = reaction(
    () => this.todos.length,
    length => localStorage.setItem('todoList', JSON.stringify(this.todos))
  )

  @action createTodo (val) {
    this.todos.push(new Todo(val))
  }

  @action toggleComplete (todo) {
    todo.complete = !todo.complete
  }

  @action clearComplete () {
    this.todos.replace(this.todos.filter(todo => !todo.complete))
  }
}

const store = window.store = new TodoStore()

export default store
