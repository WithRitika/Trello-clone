import { useState } from 'react'
import api from '../api/axios'

function AddList({ boardId, onListAdded }) {
  const [showForm, setShowForm] = useState(false)
  const [listName, setListName] = useState('')

  const createList = async () => {
    if (!listName.trim()) return
    try {
      const res = await api.post('/boardlists', { name: listName, board: boardId })
      if (res.status === 201 || res.status === 200) {
        const listRes = await api.get(`/boardlists/${res.data._id}`)
        onListAdded(listRes.data)
        setListName('')
        setShowForm(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-w-64 w-64 shrink-0">
      {showForm ? (
        <div className="bg-white shadow-sm rounded-lg p-4">
          <input
            type="text"
            placeholder="List name..."
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-blue-600 mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={createList}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex-1 hover:bg-blue-700"
            >
              Add List
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 rounded-lg p-4 text-sm font-medium shadow-sm text-left"
        >
          + Add a list
        </button>
      )}
    </div>
  )
}

export default AddList