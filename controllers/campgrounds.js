const Camground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Camground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNew = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res) => {
    //if (!req.body.campground) throw new routerError('invalid campground', 400)
    const campground = new Camground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', "New campground created!")
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Camground.findById(id)
        .populate({
            path: 'reviews',
            populate: { path: 'author' }
        }).populate('author');

    if (!campground) {
        req.flash('error', 'Campground not found!');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground })
}

module.exports.renderUpdate = async (req, res) => {
    const { id } = req.params;
    const campground = await Camground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground not found!');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground })
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Camground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', "Campground updated successfully!");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const deletedCampground = await Camground.findByIdAndDelete(id);
    req.flash('success', "Campground deleted successfully!")
    res.redirect(`/campgrounds`);
}