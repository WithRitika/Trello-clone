import { useState } from 'react'
import api from '../api/axios'

function BoardCard({ board, onClick, onBoardDeleted }) {
  const [isEditing, setIsEditing] = useState(false)
  const [boardName, setBoardName] = useState(board.name)

  const deleteBoard = async (e) => {
    e.stopPropagation()
    try {
      const res = await api.delete(`/boards/${board._id}`)
      if (res.status === 200) {
        onBoardDeleted(board._id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateBoard = async (e) => {
    e.stopPropagation()
    try {
      await api.put(`/boards/${board._id}`, { name: boardName })
      setIsEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      onClick={!isEditing ? onClick : undefined}
      className="bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow relative"
    >
      {isEditing ? (
        <div onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-full outline-none focus:border-blue-600 mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={updateBoard}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-700 flex-1"
            >
              Save
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsEditing(false) }}
              className="text-gray-500 text-xs hover:bg-gray-100 px-3 py-1 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-gray-800 pr-12">{boardName}</h2>
          <p className="text-sm text-gray-500">{board.privacy}</p>
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}
              className="text-gray-400 hover:text-blue-500 text-xs"
            >
              ✎
            </button>
            <button
              onClick={deleteBoard}
              className="text-gray-400 hover:text-red-500 text-xs"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default BoardCard