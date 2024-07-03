import React, { useState } from 'react'

type ListProps = {
    initialItems: string[]
}

export default function List({ initialItems }: ListProps) {

    const [list, setList] = useState(initialItems)
    const [newItem, setNewItem] = useState("")

    const addToList = () => {
        // Simulating an API call response time
        setTimeout(() => {
            setList([...list, newItem])
        }, 500)
    }

    const removeFromList = (itemToDelete) => {
        setTimeout(() => {
            setList(state => state.filter(item => item !== itemToDelete))
        }, 500)
    }

  return (
    <div>
        <div>Hello World</div>

        <input placeholder="Novo item" type="text" value={newItem} onChange={e => setNewItem(e.target.value)}/>
        <button onClick={addToList}>Adicionar</button>
        <ul>
            {list.map((item, index) => (
            <li key={index}>
                {item}
                <button onClick={() => removeFromList(item)}>Remover</button>
            </li>))}
        </ul>
    </div>
  )
}
