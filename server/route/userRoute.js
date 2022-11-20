const { Router } = require('express');
const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/',userController.addUser);
router.post('/login',userController.login);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);
// router.get('/:email',userController.search);
router.get('/',userController.getAll);
router.get('/:id',userController.getById);
router.get('/',userController.getAll);
module.exports = router;