const express = require('express');
const db = require('../models/countryService');
const router = express.Router();

//When post is used call create country method and create country
router.post('/', (req, res) => {
    db.createCountry(req, res);
});

//Get a complete list of countries
router.get('/', (req, res) => {
   db.readCountries(req, res);
})

//Get country with specific id
router.get('/:id', (req,res) => {
    db.readCountry(req,res);
})

//Update country
router.put('/:id', (req,res) => {
  db.updateCountry(req,res);
})

//Delete a country
router.delete('/:id',(req, res) => {
  db.deleteCountry(req, res);
})

module.exports = router;