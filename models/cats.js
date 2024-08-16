
const mongoose = require('mongoose');

const catsSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String
});

const Cats = mongoose.model('Cats', catsSchema);

module.exports = Cats;
