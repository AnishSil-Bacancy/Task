export function TodoListItem({ completed, id, title, update, toggleTodo, deleteTodo, updateTodo, editTodo }) {
  return (
    <li className="todo-card">
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className="btn btn-danger">
        Delete
      </button>

      {!update && <button onClick={() => editTodo(id, title)} className="btn">
        Edit
      </button>}

      {update && <button onClick={() => updateTodo(id)} className="btn">
        Update
      </button>}
    </li>
  )
}