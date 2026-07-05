
import api from '../api/axios'

function DeleteBoardList({ listId, onListDeleted }) {
  const handleDelete = async () => {
    try {
      const res = await api.delete(`/boardlists/${listId}`)
          console.log('Delete response:', res.status, res.data)
      if (res.status === 200) {
        onListDeleted(listId)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-gray-400 hover:text-red-500 text-xs"
    >
      ✕
    </button>
  )
}

export default DeleteBoardList