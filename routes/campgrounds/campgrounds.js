const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const { campgroundSchema, reviewSchema } = require('../../schemas');
const AppError = require('../../utils/AppErrors');
const Camground = require('../../models/campground');
const { isLoggedIn } = require('../../middleware');


const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',')
        throw new AppError(message, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Camground.find({});
    res.render('campgrounds/index', { campgrounds })
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    //if (!req.body.campground) throw new routerError('invalid campground', 400)
    const campground = new Camground(req.body.campground);
    await campground.save();
    req.flash('success', "New campground created!")
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Camground.findById(id).populate('reviews');
    if (!campground) {
        req.flash('error', 'Campground not found!');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground })
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Camground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground not found!');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground })
}));

router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Camground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', "Campground updated successfully!");
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedCampground = await Camground.findByIdAndDelete(id);
    req.flash('success', "Campground deleted successfully!")
    res.redirect(`/campgrounds`);
}));

module.exports = router;