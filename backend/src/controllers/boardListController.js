const Board = require("../models/Board");
const BoardList = require("../models/BoardList");
const Card = require("../models/Card");

// Create a boardlist
exports.createBoardList = async (req, res) => {
  try {
    const { name, board } = req.body;
    const boardList = await BoardList.create({ name, board });
    res.status(201).json(boardList);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all boardlists for a board
exports.getBoardListsByBoard = async (req, res) => {
  try {
    const boardLists = await BoardList.find({ board: req.params.boardId });
    res.status(201).json(boardLists);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get one boardlist (with its cards)
exports.getOneBoardList = async (req, res) => {
  try {
    const boardList = await BoardList.findById(req.params.id);
    if (!boardList)
      return res.status(404).json({ message: "BoardList not found" });
    const cards = await Card.find({
      boardList: boardList._id,
    });
    res.status(201).json({ ...boardList.toObject(), cards });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update boardlist
exports.updateBoardList = async (req, res) => {
  try {
    const boardList = await BoardList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!boardList)
      return res.status(404).json({ message: "BoardList not found" });
    res.status(200).json(boardList);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete boardlist

exports.deleteBoardList = async (req, res) => {
  try {
    const boardList = await BoardList.findByIdAndDelete(req.params.id);
    if (!boardList)
      return res.status(404).json({ message: "BoardList not found" });
    await Card.deleteMany({
      boardList: boardList._id,
    });
    res.status(200).json({ message: "BoardList and its cards deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
