const { Country } = require('./countryModel');

//Reads all the countries in the database array
function readCountries(req, res, options = []) {

    // this uses object deconstruction to extract the data from the query string
    const { name, nationality, natLang, limit } = req.query;
    let filter = {};

    if (name) { //filter by country name
        console.log(name);
        filter.name = { $regex: `${name}`, $options: 'i' };; //regular expression to allow filtering of countries.
    }                                                       //Useful if you don't know how to spell them

    if (nationality) { //filter by nationality
        console.log(nationality);
        filter.nationality = { $regex: `^${nationality}`, $options: 'i' }; //Regex for nationality. 
    }                                                                     //Only takes the first letters of the query and needs a match

    if (natLang) { //filter by national language
        console.log(natLang);
        filter.natLang = natLang
    }

    const limitNumber = parseInt(limit) //Sets a limit using ?limit=# to limit the amount of results returned
    Country.find(filter)
        .limit(limitNumber)
        .then((result) => {
            res.json(result)
        })
        .catch((error) =>
            res.status(500).json({ error: 'An error' + error }))
}

//Reads a specific country from the database
function readCountry(req, res) {
    const id = req.params.id;
    Country.findById(id)
        .then((result) => {
            console.log('result' + result.uri);
            res.json(result)
        })
        .catch((error) =>
            res.status(404).json({ error: 'Not Found!' }))
}

//Creates a new country from the database using the database schema
function createCountry(req, res) {
    let countryDoc = new Country(req.body);
    countryDoc.save()
        .then((result) => {
            console.log('Country saved');
            res.location('/countries/' + result._id)
                .status(201)
                .json({ id: result._id, uri: result.uri })
        })
        .catch((error) => {
            res.status(412).json({ status: 'Error 412', message: 'Not Created!' })
        });
    console.log('Promising to save!');
}

//Updates a country within the database
function updateCountry(req, res) {
    const id = req.params.id;

    Country.findByIdAndUpdate(id, req.body)
        .then((result) => {
            if (result) {
                res.status(203).send({ message: 'Country updated!' })
            }
            else {
                res.status(404).send({ message: 'Not Found!' })
            }
        })
        .catch((error) => {
            res.status(412).json({ message: 'Not updated!' })
        });
}

//Deletes a country from the database
function deleteCountry(req, res) {
    const id = req.params.id;

    Country.findByIdAndDelete(id).
        then((result) => {
            if (result) {
                res.status(203).send({ message: 'Country deleted!' })
            }
            else {
                res.status(404).send({ message: 'Not Found!' })
            }
        })
        .catch((error) =>
            res.status(404).send({ message: 'Not Found!' }));
}
//Exports the methods for use outside of the service.
module.exports = { createCountry, deleteCountry, readCountries, readCountry, updateCountry }