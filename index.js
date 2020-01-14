// implement your API here
const express = require('express')

const mack = require('./data/db')
const server = express();

server.use(express.json());

server.post("/api/user", (req, res) =>{
    const mackData = req.body;

    if(!mackData.name || !mackData.bio){
        res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    mack.insert(mackData)
      .then(thingPost => {
        res.status(201).json({ ...thingPost, ...mackData });
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." });
      });

    }
})

server.get("/api/users", (req, res) => {
    mack.find()
      .then(hubs => {
        res.status(200).json(hubs);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." });
      });
  });

  server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    mack.findById(id)
      .then(thing => {
        if (thing) {
          res.status(200).json(thing);
        } else {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be retrieved." });
      });
  });

  server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
  
    mack.remove(id)
      .then(removed => {
        if (removed) {
          res.status(202).json({ message: "Successfully deleted user" });
        } else {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
      });
  });

  server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const userData = req.body;
  
    mack.findById(id).then(users => {
      if (!users) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    });
    if (!userData.name || !userData.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user" });
    } else {
      mack.update(id, userData)
        .then(change => {
          console.log(change);
          db.findById(id).then(user => {
            res.status(200).json(user);
          });
        })
        .catch(err => {
          console.log("Error on PUT /users/:id", err);
          res
            .status(500)
            .json({ error: "The user information could not be modified " });
        });
    }
  });
  
  //Set up port
  const port = 8000;
  server.listen(port, () => console.log(`\n API running on port ${port}\n`));
  

