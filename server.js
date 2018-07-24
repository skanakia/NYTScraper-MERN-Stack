var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var path = require("path");
var router = require("router");
var Article = require("./src/models/Article");
var Note = require("./src/models/Note");

const routes = require("./nyt-scraper/routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/"));
}

app.use(routes);



// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactarticles");


app.get("/scrape", function (req, res) {
    
    request("https://www.nytimes.com/", function (error, response, html) {
        var $ = cheerio.load(html);
        
        $("article").each(function (i, element) {

            var result = {};

            result.title = $(this).children("h2").text();
            result.summary = $(this).children(".summary").text();
            result.link = $(this).children("h2").children("a").attr("href");
            console.log(result);
            var entry = new Article(result);

            entry.save(function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                }
            });

        });
        res.send("Scrape Complete");

    });
});

app.get("/articles", function(req, res) {
    Article.find({}, function(error, data) {
      if (error) {
        console.log(error);
      }
      else {
        res.json(data);
      }
    });
  });
  
  app.get("/saved", function(req, res) {
    Article.find({"saved": true}).populate("notes").exec(function(error, articles) {
      var hbsObject = {
        article: articles
      };
      res.render("saved", hbsObject);
    });
  });
  

  app.get("/articles/:id", function(req, res) {
    Article.findOne({ "_id": req.params.id })
    .populate("note")
    .exec(function(error, data) {
      if (error) {
        console.log(error);
      }
      else {
        res.json(data);
      }
    });
  });
  
  
  app.post("/articles/save/:id", function(req, res) {
        Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": true})
        .exec(function(err, data) {
          if (err) {
            console.log(err);
          }
          else {
            res.send(data);
          }
        });
  });
  
  app.post("/notes/save/:id", function(req, res) {
    var newNote = new Note({
      body: req.body.text,
      article: req.params.id
    });
    console.log(req.body)
    newNote.save(function(error, note) {
      if (error) {
        console.log(error);
      }
      else {
        Article.findOneAndUpdate({ "_id": req.params.id }, {$push: { "notes": note } })
        .exec(function(err) {
          if (err) {
            console.log(err);
            res.send(err);
          }
          else {
            res.send(note);
          }
        });
      }
    });
  });

  app.post("/articles/delete/:id", function(req, res) {
        Article.findOneAndUpdate({ "_id": req.params.id }, {"saved": false, "notes": []})
        .exec(function(err, data) {
          if (err) {
            console.log(err);
          }
          else {
            res.send(data);
          }
        });
  });
  
  
  
  
  app.delete("/notes/delete/:note_id/:article_id", function(req, res) {
    Note.findOneAndRemove({ "_id": req.params.note_id }, function(err) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      else {
        Article.findOneAndUpdate({ "_id": req.params.article_id }, {$pull: {"notes": req.params.note_id}})
          .exec(function(err) {
            if (err) {
              console.log(err);
              res.send(err);
            }
            else {
              res.send("Note Deleted");
            }
          });
      }
    });
  });


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
