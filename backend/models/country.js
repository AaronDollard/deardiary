const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    name: { type: String, required: true }, //Name of the country
    nationality: { type: String, required: true }, //Nationality of the citizens
    natLang: { type: String, required: false },//National language of the country
    note: { type: String, required: false },//Notes of the country
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
});

module.exports = mongoose.model("Bookings", BookingSchema);
