// TODO: Unsure if needed? Loads in all dependencies if not in prodution aka in dev?
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
const express = require("express");
// const passport = require("passport");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
// const flash = require("express-flash");
// const session = require("express-session");

dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT;
const mysql = require("mysql");
const cors = require("cors");

// const initializePassport = require("./passport-config");
// initializePassport(
//   passport,
//   (username) => users.find((user) => user.username === username),
//   (id) => users.find((user) => user.user_id === id)
// );

app.use(cors());
// needs to be changed into json when coming from express
app.use(express.json());

// setup for passport
// set up a session so that it persists locally.
// app.use(flash());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// // initialize passport and start a session
// app.use(passport.initialize());
// app.use(passport.session());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "neonrunner_db",
  socketPath: "/tmp/mysql.sock",
});

db.connect();

// res = what the front and will show (sent to front end)
// req = front end requesting something from the backend

// *** GET REQUESTS *** //

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
  db.query("SELECT * FROM all_cards ORDER BY name ASC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/all-cards/:filters", (req, res) => {
  console.log("req in filtered cards", req.params.filters);
  db.query(
    `SELECT * FROM all_cards WHERE rarity IN (${req.params.filters}) ORDER BY name ASC`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/all-cards/search-name/:name", (req, res) => {
  console.log("req in searchbar by name", req.params.name);
  const name = req.params.name;
  db.query(
    `SELECT * FROM all_cards WHERE name LIKE '%${name}%' ORDER BY name ASC`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// ** SPECIFIC USER ** //

app.get("/user_collection/:id", (req, res) => {
  console.log("request in user_collection", req);
  const id = req.params.id;
  console.log("id inside user_collecton", id);
  db.query(
    `SELECT *
    FROM user_cards
    INNER JOIN all_cards
    ON user_cards.card_id = all_cards.card_id
    WHERE user_id=${id}
    ORDER BY name ASC;`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/user_collection/search-name/:id/:text", (req, res) => {
  console.log("request in user_collection/search name", req.params);
  const id = req.params.id;
  const text = req.params.text;
  console.log("text in name search", req.params.text);
  db.query(
    `SELECT *
    FROM user_cards
    INNER JOIN all_cards
    ON user_cards.card_id = all_cards.card_id
    WHERE user_id=${id}
    AND name LIKE '%${text}%'
    ORDER BY name ASC;`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result value", result);
        res.send(result);
      }
    }
  );
});

// *** POST REQUESTS *** //

app.post("/create-user", async (req, res) => {
  // ** Notes on hashing ** //
  // second arg of hash() is how many times the password is hashed.
  // 10 is standard, fast but secure.
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(
      "🚀 ~ file: index.js ~ line 139 ~ app.post ~ hashedPassword",
      hashedPassword
    );

    // call the db variable to start an SQL statement
    // when putting the values, for security, pass questions marks and then an array (in the same order) with the variables we are using
    // as declared above
    db.query(
      "INSERT INTO users (name, username, password, avatar) VALUES (?,?,?,?)",
      [req.body.name, req.body.username, hashedPassword, req.body.avatar],
      (err, result) => {
        if (err) {
          console.log("error value", err);
        } else {
          console.log("sent the values correctly");
        }
        res.send("Values Inserted to users table");
      }
    );
  } catch {
    console.log("catch in create-user");
    res.redirect("/login");
  }
});

// TODO: passport
// app.post(
//   `/login`,
//   passport.authenticate("local", {
//     successRedirect: "/collection",
//     failureRedirect: "/login",
//     failureFlash: true,
//   })
// );

app.post("/custom-card", (req, res) => {
  const name = req.body.name;
  const attack = req.body.attack;
  const defense = req.body.defense;
  const rarity = req.body.rarity;
  const flavor = req.body.flavor_text;

  // call the db variable to start an SQL statement
  // when putting the values, for security, pass questions marks and then an array (in the same order) with the variables we are using
  // as declared above

  db.query(
    "INSERT INTO all_cards (name, attack, defense, flavor_text, rarity) VALUES (?,?,?,?,?)",
    [name, attack, defense, flavor, rarity],
    (err, result) => {
      if (err) {
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
