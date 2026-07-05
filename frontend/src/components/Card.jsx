import { useState } from 'react'
import api from '../api/axios'
import MoveCard from './MoveCard'
import AssignUser from './AssignUser'

function Card({ card, onCardDeleted, onCardMoved, onUserAssigned, boardLists, boardMembers }) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(card.name)
  const [description, setDescription] = useState(card.description)

  const deleteCard = async (e) => {
    e.stopPropagation()
    try {
      const res = await api.delete(`/cards/${card._id}`)
      if (res.status === 200) {
        onCardDeleted(card._id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateCard = async () => {
    try {
      const res = await api.put(`/cards/${card._id}`, { name, description })
      if (res.status === 200 || res.status === 201) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-full outline-none focus:border-blue-600 mb-2"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-full outline-none focus:border-blue-600 mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={updateCard}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 px-3 py-1 rounded-lg text-xs hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div onClick={() => setIsEditing(true)} className="cursor-pointer flex-1">
            <p className="text-sm font-medium text-gray-800">{name}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <div className="flex gap-2 ml-2">
            <AssignUser
              card={card}
              boardMembers={boardMembers}
              onUserAssigned={onUserAssigned}
            />
            <MoveCard card={card} boardLists={boardLists} onCardMoved={onCardMoved} />
            <button
              onClick={deleteCard}
              className="text-gray-400 hover:text-red-500 text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card