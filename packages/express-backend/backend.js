// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined) {
    userService
      .getUsers(name, job)
      .then((result) => {
        res.send({ users_list: result });
      })
      .catch(() => {
        res.status(500).send("Error retrieving resources.");
      });
  } else if (name != undefined || job != undefined) {
    return res
      .status(400)
      .send("Please provide both name and job query parameters.");
  } else {
    userService
      .getUsers()
      .then((result) => {
        res.send({ users_list: result });
      })
      .catch(() => {
        res.status(500).send("Error retrieving resources.");
      });
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userService
    .findUserById(id)
    .then((result) => {
      if (result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch(() => {
      res.status(500).send("Error retrieving resource.");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService
    .addUser(userToAdd)
    .then((savedUser) => {
      res.status(201).send(savedUser);
    })
    .catch(() => {
      res.status(500).send("Error adding resource.");
    });
});

app.delete("/users/:id", (req, res) => {
  const toDeleteId = req.params["id"];
  userService
    .removeUser(toDeleteId)
    .then((result) => {
      if (result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send("Resource deleted successfully.");
      }
    })
    .catch(() => {
      res.status(500).send("Error deleting resource.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
