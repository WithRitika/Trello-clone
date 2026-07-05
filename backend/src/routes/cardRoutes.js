const express = require('express');

const router = express.Router()
const {
  createCard,
  getOneCard,
  updateCard,
  deleteCard,
  assignUserToCard,
  unassignUserFromCard,
  moveCard
} = require('../controllers/cardController');

router.post('/',createCard);
router.get('/:id', getOneCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);
router.post('/:id/assign', assignUserToCard);
router.post('/:id/unassign', unassignUserFromCard);
router.post('/:id/move', moveCard);

module.exports = router;