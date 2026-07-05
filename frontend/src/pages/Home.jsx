import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import BoardCard from "../components/BoardCard";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await api.get("/boards");
        setBoards(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBoards();
  }, []);

  const createBoard = async () => {
    if (!newBoardName.trim()) return;
    try {
      const res = await api.post("/boards", {
        name: newBoardName,
        privacy: "PUBLIC",
      });
      setBoards([...boards, res.data]);
      setNewBoardName("");
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex item-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Boards</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer text-sm font-medium hover:bg-blue-700"
        >
          + New Board
        </button>
      </div>
      {showForm && (
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Board name..."
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-600 flex-1"
          />
          <button
            onClick={createBoard}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      )}
      {
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {boards.map((board) => (
            <BoardCard
              key={board._id}
              board={board}
              onClick={() => navigate(`/board/${board._id}`)}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default Home;
