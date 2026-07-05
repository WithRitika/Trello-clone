import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        if (res.status === 200) setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const createUser = async () => {
    if (!name.trim() || !email.trim()) return;
    try {
      const res = await api.post("/users", { name, email });
      if (res.status === 201 || res.status === 200) {
        setUsers([...users, res.data]);
        setName("");
        setEmail("");
        setShowForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-gray-800 text-sm"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + New User
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 outline-none focus:border-blue-600"
          />
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 outline-none focus:border-blue-600"
          />
          <button
            onClick={createUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {users.length === 0 ? (
          <p className="text-gray-500 p-4 text-sm">No users yet.</p>
        ) : (
         users.map((user) => (
  <div key={user._id} className="flex items-center gap-4 p-4 border-b border-gray-100">
    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
      {user.name.charAt(0).toUpperCase()}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-800">{user.name}</p>
      <p className="text-xs text-gray-500">{user.email}</p>
    </div>
  </div>
))
        )}
      </div>
    </div>
  );
}

export default UsersPage;
