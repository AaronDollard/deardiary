const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    name: { type: String, required: true }, //Name of the country
    nationality: { type: String, required: true }, //Nationality of the citizens
    natLang: { type: String, required: false },//National language of the country
    note: { type: String, required: false },//Notes of the country
    code: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    
});

module.exports = mongoose.model("Country", CountrySchema);

