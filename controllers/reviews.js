const Camground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Camground.findById(id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    review.author = req.user._id;
    await review.save();
    await campground.save();
    req.flash('success', "New review created!")
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Camground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', "Review deleted successfully!")
    res.redirect(`/campgrounds/${id}`);
}