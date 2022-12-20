const { Router } = require('express');
const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/login',authController.login);

router.use(authController.protect);
router.use(authController.restrictedTo('admin','staff'));
router.get('/',userController.getAll);
router.post('/',userController.addUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);
// router.get('/:email',userController.search);
router.get('/:id',userController.getById);
module.exports = router;