import { useState } from "react";
import api from "../api/axios";
import Card from "./Card";
import DeleteBoardList from "./DeleteBoardList";

function BoardList({
  list,
  boardLists,
  boardMembers,
  onCardAdded,
  onCardDeleted,
  onCardMoved,
  onUserAssigned,
  onListDeleted,
}) {
  const [showCardForm, setShowCardForm] = useState(false);
  const [newCardName, setNewCardName] = useState("");
  const [newCardDesc, setNewCardDesc] = useState("");

  const createCard = async () => {
    if (!newCardName.trim()) return;
    try {
      const res = await api.post("/cards", {
        name: newCardName,
        description: newCardDesc,
        boardList: list._id,
      });
      if (res.status === 201 || res.status === 200) {
        onCardAdded(list._id, res.data);
        setNewCardName("");
        setNewCardDesc("");
        setShowCardForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardDeleted = (cardId) => {
    onCardDeleted(list._id, cardId);
  };

  const handleCardMoved = (card, newBoardListId) => {
    onCardMoved(card, list._id, newBoardListId);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 min-w-64 w-64 shrink-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">{list.name}</h2>
        <DeleteBoardList listId={list._id} onListDeleted={onListDeleted} />
      </div>

      <div className="flex flex-col gap-2">
        {list.cards &&
          list.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              boardLists={boardLists}
              boardMembers={boardMembers}
              onCardDeleted={handleCardDeleted}
              onCardMoved={handleCardMoved}
              onUserAssigned={onUserAssigned}
            />
          ))}
      </div>

      {showCardForm ? (
        <div className="mt-3">
          <input
            type="text"
            placeholder="Card name..."
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-blue-600 mb-2"
          />
          <input
            type="text"
            placeholder="Description (optional)..."
            value={newCardDesc}
            onChange={(e) => setNewCardDesc(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-blue-600 mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={createCard}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex-1 hover:bg-blue-700"
            >
              Add Card
            </button>
            <button
              onClick={() => setShowCardForm(false)}
              className="text-gray-500 px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowCardForm(true)}
          className="mt-3 w-full text-gray-500 hover:bg-gray-100 rounded-lg p-2 text-sm text-left"
        >
          + Add a card
        </button>
      )}
    </div>
  );
}

export default BoardList;
