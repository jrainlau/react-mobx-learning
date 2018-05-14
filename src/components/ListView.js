import React from 'react'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react'

export default observer(({ todo }) => {
  function toggleComplete (todo) {
    runInAction(() => {
      todo.complete = !todo.complete
    })
  }
  return (
    <li>
      <input type="checkbox" className="complete" checked={todo.complete} onChange={() => {toggleComplete(todo)}} />
      {todo.complete ? <del>{todo.value}</del> : <span>{todo.value}</span>}
    </li>
  )
})
