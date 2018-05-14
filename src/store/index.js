import { observable, action } from 'mobx'

class Todo {
  @observable value
  @observable id = new Date().getTime()
  @observable complete = false

  constructor (value) {
    this.value = value
  }
}

class TodoStore {
  @observable todos = []

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
