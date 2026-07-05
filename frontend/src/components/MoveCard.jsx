import { useState } from 'react'
import api from '../api/axios'

function MoveCard({ card, boardLists, onCardMoved }) {
  const [showDropdown, setShowDropdown] = useState(false)

  const moveCard = async (newBoardListId) => {
    try {
      const res = await api.post(`/cards/${card._id}/move`, {
        newBoardListId
      })
      if (res.status === 200 || res.status === 201) {
        onCardMoved(card, newBoardListId)
        setShowDropdown(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const otherLists = boardLists.filter((list) => list._id !== card.boardList)

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-gray-400 hover:text-blue-500 text-xs"
      >
        ↔
      </button>
      {showDropdown && (
        <div className="absolute right-0 top-5 bg-white border border-gray-200 rounded-lg shadow-md z-10 w-40">
          <p className="text-xs text-gray-500 px-3 py-2 border-b">Move to...</p>
          {otherLists.map((list) => (
            <button
              key={list._id}
              onClick={() => moveCard(list._id)}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              {list.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default MoveCard