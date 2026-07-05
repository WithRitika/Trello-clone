const express = require('express');
const router = express.Router()
const {
  createBoardList,
  getBoardListsByBoard,
  getOneBoardList,
  updateBoardList,
  deleteBoardList
} = require('../controllers/boardListController');

router.post('/', createBoardList);
router.get('/board/:boardId', getBoardListsByBoard);
router.get('/:id', getOneBoardList);
router.put('/:id', updateBoardList);
router.delete('/:id', deleteBoardList);

module.exports = router;
