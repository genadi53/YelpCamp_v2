const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, verifyAuthor, validateCampground } = require('../middleware');
const campgroundsController = require('../controllers/campgrounds');


// router.route('/')
//     .get(catchAsync(campgroundsController.index))
//     .post(isLoggedIn, validateCampground, catchAsync(campgroundsController.createCampground));

// router.route('/:id')
//     .get(catchAsync(campgroundsController.showCampground))
//     .put(isLoggedIn, validateCampground, verifyAuthor, catchAsync(campgroundsController.updateCampground))
//     .delete(isLoggedIn, verifyAuthor, catchAsync(campgroundsController.deleteCampground));

router.get('/', catchAsync(campgroundsController.index));

router.get('/new', isLoggedIn, campgroundsController.renderNew);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundsController.createCampground));

router.get('/:id', catchAsync(campgroundsController.showCampground));

router.get('/:id/edit', isLoggedIn, verifyAuthor, catchAsync(campgroundsController.renderUpdate));

router.put('/:id', isLoggedIn, validateCampground, verifyAuthor, catchAsync(campgroundsController.updateCampground));

router.delete('/:id', isLoggedIn, verifyAuthor, catchAsync(campgroundsController.deleteCampground));

module.exports = router;