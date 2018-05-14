import { observable, action, reaction } from 'mobx'

class Todo {
  @observable value
  @observable id = new Date().getTime()
  @observable complete = false

  constructor (value) {
    this.value = value
  }
}

class TodoStore {
  @observable todos = JSON.parse(localStorage.getItem('todoList')) || []

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
    this.todos = this.todos.filter(todo => !todo.complete)
  }
}

const store = window.store = new TodoStore()

export default store
