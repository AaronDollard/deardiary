const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountrySchema = new Schema( //The schema in which the database will be organised
    {
        name: { type: String, required: true }, //Name of the country
        nationality: { type: String, required: true }, //Nationality of the citizens
        natLang: { type: String, required: false },//National language of the country
        note: { type: String, required: false },//Notes of the country
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
    },
    { toJSON: { virtuals: true } }) // Include virtuals when document is converted to JSON

CountrySchema.virtual('uri').get(function()  {
    return `/countries/${this._id}`; //Get a unique id for the coutry entered and assigns it
});

//Connecting the scheme to the class as var called Country then export it to use outside of this file
let Country = mongoose.model('Country', CountrySchema);
module.exports = { Country }