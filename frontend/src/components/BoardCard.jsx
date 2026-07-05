const BoardCard = ({ board, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <h2 className="text-lg font-semibold text-gray-800">{board.name}</h2>
      <p className="text-sm text-gray-500">{board.privacy}</p>
    </div>
  );
};

export default BoardCard;
