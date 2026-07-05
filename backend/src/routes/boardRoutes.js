const express = require('express');
const router = express.Router();

const { createBoard,
  getAllBoards,
  getOneBoard,
  updateBoard,
  deleteBoard,
  addUserToBoard} = require('../controllers/boardController')

  router.post('/',createBoard);
  router.get('/',getAllBoards);
  router.get('/:id',getOneBoard);
  router.put('/:id',updateBoard);
  router.delete('/:id', deleteBoard);
  router.post('/:id/members',addUserToBoard);

module.exports = router;