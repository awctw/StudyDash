var express = require('express');
var router = express.Router();
const { addModule, getAllModules, addFlashcard, editFlashcard, deleteFlashcard, deleteModule, refreshFlashcard, getScheduledCards } = require('../controllers/flashcard.controller');

router.post('/', addModule);

router.get('/:userID', getAllModules);

router.get('/sra/:userID', getScheduledCards);

router.patch('/:moduleId', addFlashcard);

router.patch('/edit/:moduleId', editFlashcard);

router.patch('/refresh/:moduleId', refreshFlashcard);

router.delete('/:moduleId/:index', deleteFlashcard);

router.delete('/:moduleId', deleteModule);

module.exports = router;