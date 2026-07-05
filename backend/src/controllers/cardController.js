const Card = require("../models/Card");
const BoardList = require("../models/BoardList");
const Board = require("../models/Board");

// Create a card
exports.createCard = async (req, res) => {
  try {
    const { name, description, boardList } = req.body;
    const card = await Card.create({ name, description, boardList });
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one card
exports.getOneCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate(
      "assignedTo",
      "name email",
    );
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update card
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Card
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign user to card
exports.assignUserToCard = async (req, res) => {
  try {
    const {userId} = req.body;
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    const boardList = await BoardList.findById(card.boardList);
    const board = await Board.findById(boardList.board);

    if (!board.members.includes(userId)) {
     return res.status(400).json({
        message: "User is not a member of this board",
      });
    }
    const updateCard = await Card.findByIdAndUpdate(
      req.params.id,
      { assignedTo: userId },
      { new: true },
    ).populate("assignedTo", "name email");
    res.status(200).json(updateCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unassign user from card
exports.unassignUserFromCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { assignedTo: null },
      { new: true },
    );
    if (!card)
      return res.status(400).json({
        message: "Card not found",
      });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Move card to a different boardlist
exports.moveCard = async (req, res) => {
  try {
    const { newBoardListId } = req.body;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { boardList: newBoardListId },
      { new: true },
    );
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
