const mongoose = require('mongoose');
const Board = require("../models/Board");
const BoardList = require("../models/BoardList");
const Card = require('../models/Card');

exports.createBoard = async (req, res) => {
  try {
    const { name, privacy } = req.body;
    const id = new mongoose.Types.ObjectId();
    const board = await Board.create({
      _id: id,
      name,
      privacy,
      url: `/board/${id}`,
    });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get all boards
exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find().populate("members", "name email");
    res.status(201).json(boards);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get one board
exports.getOneBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate(
      "members",
      "name email",
    );
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update board
exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete board
exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    
    const boardLists = await BoardList.find({board:board._id});
    const boardListIds = boardLists.map(list=>list._id);

    await Card.deleteMany({boardList:{$in:boardListIds}});
    await BoardList.deleteMany({board:board._id});

    res.status(200).json({ message: "Board deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add user to board
exports.addUserToBoard = async (req, res) => {
  try {
    const { userId } = req.body;
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          members: userId,
        },
      },
      { new: true },
    ).populate('members', 'name email');
    if (!board) return res.status(404).json({ message: 'Board not found' })
    res.status(200).json(board)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
