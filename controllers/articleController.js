const Article = require("../src/models/Article");
const Note = require("../src/models/Note")

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    Article
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const savedArticle 	= {};
    savedArticle.title 	= req.body.article.headline.main;
    savedArticle.url	= req.body.article.web_url; 
    savedArticle.summary = req.body.article.summary;
    Article.create(savedArticle).then(function(doc) {
        res.json(doc);
  }).catch(function(err) {
        res.json(err);
  });
},
  createNote: function(req, res) {
    Note
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateSave: function(req, res) {
    Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateUnsave: function(req, res) {
    Article
      .findOneAndUpdate({ _id: req.params.id }, req.saved)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeNote: function(req, res) {
    Note
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

};