const { campgroundSchema, reviewSchema } = require('./schemas');
const AppError = require('./utils/AppErrors');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        //console.log(req.path, req.originalUrl)
        req.session.returnTo = req.originalUrl;
        req.flash('error', "You must be signed in!");
        return res.redirect('/login');
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',')
        throw new AppError(message, 400)
    } else {
        next();
    }
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',')
        throw new AppError(message, 400)
    } else {
        next();
    }
}

module.exports.verifyAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', "You do not have permission to do that!");
        return res.redirect(`/campgrounds/${campground._id}`);
    }
    next();
}

module.exports.verifyReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', "You do not have permission to do that!");
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}