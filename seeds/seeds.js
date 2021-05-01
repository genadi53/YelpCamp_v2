const mongoose = require('mongoose');
const Camground = require('../models/campground');
const cities = require('./city');
const names = require('./names');

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

const randName = (arr) => arr[Math.floor(Math.random() * arr.length)]

const seedDB = async () => {
    await Camground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        let rand = Math.floor(Math.random() * 1000);
        const campground = new Camground({
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${randName(names.descriptors)} ${randName(names.places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore at fugit deleniti sequi eveniet atque corrupti a, vero nostrum libero omnis magni laboriosam qui! Dolorum, numquam? Nobis quasi labore itaque!',
            price: rand,
        });
        await campground.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})