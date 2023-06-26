import { TodoListItem } from "./TodoListItem"

export function TodoList({ todo, toggleTodo, deleteTodo, updateTodo, editTodo }) {
  return (
    <ul className="list">
      {todo.length === 0 && "Yay! Nothing to do"}
      {todo.map(td => {
        return (
          <TodoListItem
            {...td}
            key={td.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
            editTodo={editTodo}
          />
        )
      })}
    </ul>
  )
}