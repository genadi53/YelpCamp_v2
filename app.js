const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const Camground = require('./models/campground');
const methodOverride = require('method-override');
const AppError = require('./utils/AppErrors');
const catchAsync = require('./utils/catchAsync');

mongoose.connect('mongodb://localhost:27017/v2-yelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to db!');
});
db.on('error', console.error.bind(console, 'connection error: '));


const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Camground.find({});
    res.render('campgrounds/index', { campgrounds })
}));

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', catchAsync(async (req, res) => {
    //if (!req.body.campground) throw new AppError('invalid campground', 400)
    const campground = new Camground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Camground.findById(id);
    res.render('campgrounds/show', { campground })
}));

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Camground.findById(id);
    res.render('campgrounds/edit', { campground })
}));

app.put('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Camground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedCampground = await Camground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
}));

app.all('*', (req, res, next) => {
    next(new AppError("PAGE NOT FOUND!", 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('App started!');
})