import React, { useState } from 'react'

function Form({setUsers}) {

    const [text, setText] = useState("")


    async function handleSubmit(event) {
        event.preventDefault()
        const resp = await axios.get(`https://api.github.com/users/${text}`)
        console.log(resp.data)
        setText("")
        setUsers((prev) => [...prev, resp.data])

    }

    function handleChange(event){
        setText(event.target.value)
    }


  return (
    <>
        <form onSubmit={handleSubmit} >
                <label htmlFor="text">
                    Search for Github Profile: <input 
                    type="text" 
                    name="text" 
                    id="text" 
                    value={text}
                    onChange={handleChange}
                    />
                </label>
        </form>
    </>
  )
}

export default Form