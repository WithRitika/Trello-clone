import api from '../api/axios'
import MoveCard from './MoveCard'
import AssignUser from './AssignUser'

function Card({ card, onCardDeleted, onCardMoved, onUserAssigned, boardLists, boardMembers }) {
  const deleteCard = async () => {
    try {
      const res = await api.delete(`/cards/${card._id}`)
      if (res.status === 200) {
        onCardDeleted(card._id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-800">{card.name}</p>
          {card.description && (
            <p className="text-xs text-gray-500 mt-1">{card.description}</p>
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
    </div>
  )
}

export default Card