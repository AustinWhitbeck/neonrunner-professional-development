const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT;
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
// needs to be changed into json when coming from express
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  // port: process.env.DB_PORT,
  host: "localhost",
  password: "password",
  database: "neonrunner_db",
  socketPath: "/tmp/mysql.sock",
});

db.connect();

// // PASSPORT SETUP
// app.use();

// res = what the front and will show (sent to front end)
// req = front end requesting something from the backend

app.get("/all-users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/all-cards", (req, res) => {
  db.query("SELECT * FROM all_cards", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create-user", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const avatar = req.body.avatar;

  // call the db variable to start an SQL statement
  // when putting the values, for security, pass questions marks and then an array (in the same order) with the variables we are using
  // as declared above

  db.query(
    "INSERT INTO users (name, username, password, avatar) VALUES (?,?,?,?)",
    [name, username, password, avatar],
    (err, result) => {
      if (err) {
        console.log("confirmed talking to front end");
        console.log("error value", err);
      } else {
        console.log("sent the values correctly");
      }
      res.send("Values Inserted to users table");
    }
  );
});

app.post("/custom-card", (req, res) => {
  console.log("🚀 ~ file: index.js ~ line 79 ~ app.post ~ req", req);
  const name = req.body.name;
  const attack = req.body.attack;
  const defense = req.body.defense;
  const rarity = req.body.rarity;
  const flavor = req.body.flavor_text;
  console.log("inside custom card post method");

  // call the db variable to start an SQL statement
  // when putting the values, for security, pass questions marks and then an array (in the same order) with the variables we are using
  // as declared above

  db.query(
    "INSERT INTO all_cards (name, attack, defense, flavor_text, rarity) VALUES (?,?,?,?,?)",
    [name, attack, defense, flavor, rarity],
    (err, result) => {
      if (err) {
        console.log("confirmed talking to front end");
        console.log("error value", err);
      } else {
        console.log("sent the values correctly");
      }
      res.send("New Card added to all cards");
    }
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
