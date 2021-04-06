const db = require("../models");

module.exports = {
  create: function (req, res) {
    db.Countries.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findAll: function (req, res) {
    db.Countries.find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.Countries.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findOne: function (req, res) {
    db.Countries.findById({ _id: req.params.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findOneAndUpdate: function (req, res) {
    db.Countries.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.update())
      .then((dbModel)=>
      res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  

   deleteCountry: function(req, res) {
    const id = req.params.id;
    db.Countries.findByIdAndRemove(id).
        then((result) => {
            if (result) {
                res.status(202).send({ message: 'deleted' })
            }
            else {
                res.status(404).send({ message: 'not found' })
            }
        })
        .catch((error) =>
            res.status(404).send({ message: 'not found' }));
  },
  

   readCountry: function(req, res) {
    const id = req.params.id;
    db.Countries.findById(id)
        .then((result) => {
            console.log('result' + result.uri);
  
            res.json(result)
        })
        .catch((error) =>
            res.status(404).json({ error: 'not found' }))
  },
  
 
   updateCountry: function(req, res) {
    const id = req.params.id;
  
    db.Countries.findByIdAndUpdate(id, req.body).
        then((result) => {
            if (result) {
                res.status(200).send({ message: 'updated' })
            }
            else {
                res.status(404).send({ message: 'not found' })
            }
        })
        .catch((error) =>
            res.status(404).send({ message: 'not found' }));
  }
};
