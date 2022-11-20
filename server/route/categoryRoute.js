const { Router } = require('express');
const express = require('express');
const categoryController = require('../controller/categoryController');

const router = express.Router();

router.post('/',categoryController.add);
router.put('/:id',categoryController.update);
router.delete('/:id',categoryController.delete);
router.get('/',categoryController.getAll);
router.get('/:id',categoryController.getById);

module.exports = router;