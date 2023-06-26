import { useState } from 'react'
import '../App.css'
import Card from "./Card"
import Form from "./Form"

function App() {
  const testData = [{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"}]
  const [users, setUsers] = useState([])

  return (
    <>
      <Form setUsers={setUsers} />
      <div>
        {users.map((item) => <Card profile = {item} key={item.id} />)}
      </div>
    </>
  )
}

export default App
