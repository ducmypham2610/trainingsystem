const { Router } = require('express');
const express = require('express');
const categoryController = require('../controller/categoryController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictedTo('staff'));
router.post('/',categoryController.add);
router.put('/:id',categoryController.update);
router.delete('/:id',categoryController.delete);
router.get('/',categoryController.getAll);
router.get('/:id',categoryController.getById);

module.exports = router;