import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import BoardList from "../components/BoardList";
import AddList from "../components/AddList";

const BoardPage = () => {
  const [board, setBoard] = useState(null);
  const [boardLists, setBoardLists] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await api.get(`/boards/${id}`);
        if (res.status === 200 || res.status === 201) {
          setBoard(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch board:", error);
      }
    };

    const fetchBoardLists = async () => {
      try {
        const res = await api.get(`/boardlists/board/${id}`);
        if (res.status === 200 || res.status === 201) {
          const listWithCards = await Promise.all(
            res.data.map(async (list) => {
              const listRes = await api.get(`/boardlists/${list._id}`);
              return listRes.data;
            })
          );
          setBoardLists(listWithCards);
        }
      } catch (error) {
        console.error("Failed to fetch boardlists:", error);
      }
    };

    fetchBoard();
    fetchBoardLists();
  }, [id]);

  const handleListAdded = (newList) => {
    setBoardLists([...boardLists, newList]);
  };

  const handleCardAdded = (listId, newCard) => {
    setBoardLists(
      boardLists.map((list) => {
        if (list._id === listId) {
          return { ...list, cards: [...list.cards, newCard] };
        }
        return list;
      })
    );
  };

  const handleCardDeleted = (listId, cardId) => {
    setBoardLists(
      boardLists.map((list) => {
        if (list._id === listId) {
          return {
            ...list,
            cards: list.cards.filter((card) => card._id !== cardId),
          };
        }
        return list;
      })
    );
  };

  const handleListDeleted = (listId) => {
    setBoardLists(boardLists.filter((list) => list._id !== listId));
  };

  const handleCardMoved = (card, fromListId, toListId) => {
    setBoardLists(
      boardLists.map((list) => {
        if (list._id === fromListId) {
          return {
            ...list,
            cards: list.cards.filter((c) => c._id !== card._id),
          };
        }
        if (list._id === toListId) {
          return {
            ...list,
            cards: [...list.cards, { ...card, boardList: toListId }],
          };
        }
        return list;
      })
    );
  };

  const handleUserAssigned = (cardId, updatedCard) => {
    setBoardLists(
      boardLists.map((list) => ({
        ...list,
        cards: list.cards.map((card) =>
          card._id === cardId ? updatedCard : card
        ),
      }))
    );
  };

  if (!board) return <div className="text-gray-500 p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 px-8 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="text-blue-200 hover:text-white text-sm"
        >
          ← Back
        </button>
        <div>
          <h1 className="text-white font-bold text-xl">{board.name}</h1>
          <p className="text-blue-200 text-sm">{board.privacy}</p>
        </div>
        <div className="flex gap-2 ml-auto">
          {board.members && board.members.map((member) => (
            <div
              key={member._id}
              className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold"
              title={member.name}
            >
              {member.name.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 flex gap-4 overflow-x-auto items-start">
        {boardLists.map((list) => (
          <BoardList
            key={list._id}
            list={list}
            boardLists={boardLists}
            boardMembers={board.members}
            onCardAdded={handleCardAdded}
            onCardDeleted={handleCardDeleted}
            onCardMoved={handleCardMoved}
            onUserAssigned={handleUserAssigned}
            onListDeleted={handleListDeleted}
          />
        ))}
        <AddList boardId={id} onListAdded={handleListAdded} />
      </div>
    </div>
  );
};

export default BoardPage;