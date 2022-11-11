const { Router } = require('express');
const express = require('express');
const courseController = require('../controller/courseController');

const router = express.Router();

router.post('/',courseController.addCourse);
router.put('/:id',courseController.updateCourse);
router.delete('/:id',courseController.deleteCourse);
router.get('/',courseController.getAll);
router.get('/:id',courseController.getById);

module.exports = router;