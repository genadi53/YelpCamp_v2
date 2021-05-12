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
            images: [{
                url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                filename: 'YelpCamp_img_1'
            },
            {
                // url: 'https://source.unsplash.com/collection/483251',
                url: 'https://images.unsplash.com/photo-1503093928907-326ec3f06115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwNjYxMDE2&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
                filename: 'YelpCamp_img_2'
            },
            {
                // url: 'https://source.unsplash.com/collection/483251',
                url: 'https://images.wunderstock.com/Brown-Wooden-House-Surrounded-By-Trees_EJmhXn6MXpK1.jpeg',
                filename: 'YelpCamp_img_3'
            }],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore at fugit deleniti sequi eveniet atque corrupti a, vero nostrum libero omnis magni laboriosam qui! Dolorum, numquam? Nobis quasi labore itaque!',
            price: rand,
            author: '609648457024120c6ced2c0e',
            geometry: { type: 'Point', coordinates: [cities[rand].longitude, cities[rand].latitude] },
        });
        await campground.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})