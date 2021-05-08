const express = require('express');
const router = express.Router({ mergeParams: true });
const Camground = require('../../models/campground');
const Review = require('../../models/review');
const catchAsync = require('../../utils/catchAsync');
const { validateReview, isLoggedIn, verifyReviewAuthor } = require('../../middleware');



router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Camground.findById(id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    review.author = req.user._id;
    await review.save();
    await campground.save();
    req.flash('success', "New review created!")
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewId', isLoggedIn, verifyReviewAuthor, catchAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Camground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', "Review deleted successfully!")
    res.redirect(`/campgrounds/${id}`);
}));


module.exports = router;