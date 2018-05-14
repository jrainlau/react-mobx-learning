import React, { Component } from 'react'
import { configure, observable, computed, action, runInAction, reaction } from 'mobx'
import { observer } from 'mobx-react'

import ListView from './components/ListView'

configure({
  enforceActions: true
})

@observer
export default class App extends Component {
  @observable filter = ''
  @observable time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  @computed get filteredTodos () {
    const matchesFilter = new RegExp(this.filter, 'i')
    return this.props.store.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
  }

  componentDidMount () {
    setInterval(() => {
      runInAction(() => {
        this.time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      })
    }, 1000)
  }

  watch = reaction(
    () => this.filter,
    filter => console.log(filter)
  )

  createNew = (e) => {
    if (e.which === 13 && e.target.value) {
      this.props.store.createTodo(e.target.value)
      e.target.value = ''
    }
  }

  clearComplete = () => {
    this.props.store.clearComplete()
  }
  
  @action
  updateFilter = (e) => {
    this.filter = e.target.value
  }

  render () {
    const todoList = this.filteredTodos.map(todo => (
      <ListView key={todo.id} todo={todo}></ListView>
    ))

    return (
      <div>
        <h1>Todos</h1>
        <p>Time: {this.time}</p>
        <p>Filter: {this.filter}</p>
        <input type="text" className="filter" value={this.filter} onChange={this.updateFilter} />
        <p>Creat new todo</p>
        <input type="text" className="create" onKeyPress={this.createNew} />
        <ul>{todoList}</ul>
        <button onClick={this.clearComplete}>Clear complete</button>
      </div>
    )
  }
}
