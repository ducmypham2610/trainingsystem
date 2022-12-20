const { Router } = require('express');
const express = require('express');
const courseController = require('../controller/courseController');
const authController = require('../controller/authController');
const router = express.Router();
router.use(authController.protect);
router.use(authController.restrictedTo('staff'));
router.post('/',courseController.addCourse);
router.put('/:id',courseController.updateCourse);
router.delete('/:id',courseController.deleteCourse);
router.get('/:id',courseController.getById);
router.get('/',courseController.getAll);

module.exports = router;