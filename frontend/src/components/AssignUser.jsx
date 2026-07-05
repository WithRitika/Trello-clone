import { useState } from "react";
import api from "../api/axios";

function AssignUser({ card, boardMembers, onUserAssigned }) {
  const [showDropdown, setShowDropdown] = useState(false);
  console.log('AssignUser boardMembers:', boardMembers)
const assignUser = async (userId) => {
  console.log('Assigning userId:', userId, 'to card:', card._id)
  try {
    const res = await api.post(`/cards/${card._id}/assign`, { userId })
    console.log('Assign response:', res.status, res.data)
    if (res.status === 200 || res.status === 201) {
      onUserAssigned(card._id, res.data)
      setShowDropdown(false)
    }
  } catch (error) {
    console.error('Assign error:', error)
  }
}

  const unassignUser = async () => {
    try {
      const res = await api.post(`/cards/${card._id}/unassign`);
      if (res.status === 200 || res.status === 201) {
        onUserAssigned(card._id, res.data);
        setShowDropdown(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-gray-400 hover:text-blue-500 text-xs"
        title="Assign user"
      >
        👤
      </button>
      {showDropdown && (
        <div className="absolute right-0 top-5 bg-white border border-gray-200 rounded-lg shadow-md z-10 w-40">
          <p className="text-xs text-gray-500 px-3 py-2 border-b">
            Assign to...
          </p>
          {boardMembers &&
            boardMembers.map((member) => (
              <button
                key={member._id}
                onClick={() => assignUser(member._id)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {member.name}
              </button>
            ))}
          {card.assignedTo && (
            <button
              onClick={unassignUser}
              className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-50 border-t"
            >
              Remove
            </button>
          )}
        </div>
      )}
      {card.assignedTo && (
        <p className="text-xs text-blue-500 mt-1">
          {card.assignedTo.name || "Assigned"}
        </p>
      )}
    </div>
  );
}

export default AssignUser;
