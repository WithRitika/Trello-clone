import { useState, useEffect } from 'react'
import api from '../api/axios'

function AddMember({ boardId, onMemberAdded }) {
  const [users, setUsers] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users')
        if (res.status === 200) setUsers(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])

  const addMember = async (userId) => {
    try {
      const res = await api.post(`/boards/${boardId}/members`, { userId })
      if (res.status === 200 || res.status === 201) {
        onMemberAdded(res.data)
        setShowDropdown(false)
        setError('')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-blue-200 hover:text-white text-sm px-3 py-1 border border-blue-400 rounded-lg"
      >
        + Add Member
      </button>

      {showDropdown && (
        <div className="absolute top-10 right-0 bg-white rounded-lg shadow-md p-3 z-10 w-56">
          <p className="text-sm font-medium text-gray-800 mb-2">Add Member</p>
          {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
          {users.length === 0 ? (
            <p className="text-xs text-gray-500">No users found</p>
          ) : (
            users.map((user) => (
              <button
                key={user._id}
                onClick={() => addMember(user._id)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
              >
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </button>
            ))
          )}
          <button
            onClick={() => setShowDropdown(false)}
            className="mt-2 w-full text-gray-500 text-sm hover:bg-gray-100 rounded-lg p-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default AddMember