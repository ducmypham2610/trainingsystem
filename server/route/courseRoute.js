const { Router } = require('express');
const express = require('express');
const courseController = require('../controller/courseController');

const router = express.Router();

router.post('/',courseController.addCourse);
router.put('/:id',courseController.updateCourse);
router.delete('/:id',courseController.deleteCourse);
router.get('/:id',courseController.getById);
router.get('/',courseController.getAll);

module.exports = router;