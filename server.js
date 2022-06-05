const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb"); //object destructuring from const MongoClient = require("mongodb").MongoClient;
const { deepStrictEqual } = require("assert");
const app = express();

connectionString =
  "";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //server now accepts JSON data
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("tasks");
    const tasks = db.collection("tasks");

    app.get("/", (req, res) => {
      tasks
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { tasks: results });
        })
        .catch((error) => console.log(error));
    });

    app.post("/tasks", (req, res) => {
      tasks
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
          console.log(result);
        })
        .catch((error) => console.error(error));
    });

    app.put("/tasks", (req, res) => {
      tasks
        .findOneAndUpdate(
          //filter,update,options
          { name: "Pare" },
          {
            $set: {
              name: req.body.name,
              description: req.body.description,
            },
          },
          {
            upsert: true, // if there is no documents under this filter, on will be created
          }
        )
        .then((result) => res.json("Success"))
        .catch((error) => console.error(error));
    });

    app.delete("/tasks", (req, res) => {
      const redirect =  '/';
      tasks
        .deleteMany(
          //filter
          { name: req.body.name }
        )
        .then((result) => {
          
          if (result.deletedCount === 0) {
            return res.json("No tasks to delete");
          }
          res.redirect(redirect);
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
