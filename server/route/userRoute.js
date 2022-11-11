const { Router } = require('express');
const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/',userController.addUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);
router.get('/',userController.getAll);
router.get('/:id',userController.getById);

module.exports = router;