import { useEffect, useState } from "react"
import { TodoForm } from "./TodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todo, setTodo] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todo))
  }, [todo])

  function addTodo(title) {
    setTodo(currentTodo => {
      return [
        ...currentTodo,
        { id: crypto.randomUUID(), title, completed: false , update: false},
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodo(currentTodo => {
      return currentTodo.map(td => {
        if (td.id === id) {
          return { ...td, completed }
        }

        return td
      })
    })
  }

  function deleteTodo(id) {
    setTodo(currentTodo => {
      return currentTodo.filter(td => td.id !== id)
    })
  }

  function updateTodo(id) {
    setTodo(currentTodo => {
      return currentTodo.map(td => {
        if (td.id === id) {
          return { ...td, title: newItem, update: false }
        }

        return td
      })
    })
    setNewItem("")
  }

  function editTodo(id, title) {
    setNewItem(title)
    setTodo(currentTodo => {
      return currentTodo.map(td => {
        if (td.id === id) {
          return { ...td, update: true }
        }

        return { ...td, update: false }
      })
    })
  }

  return (
    <>
      <TodoForm 
      addTodo={addTodo} 
      newItem={newItem}
      setNewItem={setNewItem}
      />

      <h1 className="header">Todo List</h1>

      <TodoList 
      todo={todo} 
      toggleTodo={toggleTodo} 
      deleteTodo={deleteTodo} 
      updateTodo={updateTodo} 
      editTodo={editTodo} 
      />
    </>
  )
}