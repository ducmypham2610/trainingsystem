const { Router } = require('express');
const express = require('express');
const topicController = require('../controller/topicController');

const router = express.Router();

router.post('/',topicController.add);
router.put('/:id',topicController.update);
router.delete('/:id',topicController.delete);
router.get('/',topicController.getAll);
router.get('/:id',topicController.getById);

module.exports = router;