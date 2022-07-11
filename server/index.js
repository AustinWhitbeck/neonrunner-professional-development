const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT;

app.use(cors());
// needs to be changed into json when coming from express
app.use(express.json());

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

app.get("/all-cards-filter", (req, res) => {
  // -- query values -- //
  const rarities = req.query.rarities;
  const nameSearch =
    req.query.namesearch === "undefined" ? "" : req.query.namesearch;

  // -- sql statement variables -- //
  const select = `SELECT * FROM all_cards `;
  const raritySQL = `WHERE rarity IN (${rarities}) `;
  const nameSearchSQL =
    nameSearch !== undefined ? `AND name LIKE '%${nameSearch}%'` : "";

  db.query(
    `${select}${raritySQL}${nameSearchSQL} ORDER BY name ASC`,
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

app.get("/login/:username/:password", async (req, res) => {
  // ** Notes on hashing ** //
  // second arg of hash() is how many times the password is hashed.
  // 10 is standard, fast but secure.

  const password = req.params.password;
  console.log("🚀 ~ file: index.js ~ line 110 ~ app.get ~ password", password);
  const username = req.params.username;
  console.log("🚀 ~ file: index.js ~ line 112 ~ app.get ~ username", username);

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(
    //   "🚀 ~ file: index.js ~ line 116 ~ app.get ~ hashedPassword",
    //   hashedPassword
    // );

    // call the db variable to start an SQL statement
    // when putting the values, for security, pass questions marks and then an array (in the same order) with the variables we are using
    // as declared above
    db.query(
      `SELECT * FROM users WHERE username="${username}" AND password="${password}"`,
      (err, result) => {
        if (err) {
          console.log("error value", err);
        } else {
          res.send(result);
          console.log(
            "🚀 ~ file: index.js ~ line 131 ~ app.get ~ result",
            result
          );
          console.log("checked login info correctly!");
        }
      }
    );
  } catch {
    console.log("catch in login");
    res.redirect("/login");
  }
});

app.get("/user_collection/:id", (req, res) => {
  const id = req.params.id;
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

app.get("/user_collection/rarity-filter/:id/:filters", (req, res) => {
  const filters = req.params.filters;
  const id = req.params.id;
  db.query(
    `SELECT *
    FROM user_cards
    INNER JOIN all_cards
    ON user_cards.card_id = all_cards.card_id
    WHERE user_id=${id}
    AND rarity IN (${filters})
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
  const id = req.params.id;
  const text = req.params.text;
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
        res.send(result);
      }
    }
  );
});

app.get("/user-cards-filter", (req, res) => {
  // `http://localhost:3001/user-cards-filter?rarities=${filters.rarityValues}&namesearch=${filters.nameSearch}&userid=${filters.user_id}`
  console.log("inside get of user_cards_filter");
  console.log(
    "request in user-cards-filter route, all this users cards",
    req.query
  );

  // -- query values -- //
  const id = req.query.userid;
  const rarities = req.query.rarities;
  const nameSearch =
    req.query.namesearch === "undefined" ? "" : req.query.namesearch;

  // -- sql statement variables -- //
  const nameSearchSQL =
    nameSearch !== undefined ? `AND name LIKE '%${nameSearch}%'` : "";
  console.log("nameSearchSQl value", nameSearchSQL);

  db.query(
    `SELECT *
    FROM user_cards
    INNER JOIN all_cards
    ON user_cards.card_id = all_cards.card_id
    WHERE user_id=${id}
    AND rarity IN (${rarities})
    ${nameSearchSQL}
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
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // call the db variable to start an SQL statement
    // when putting the values, for security, pass questions marks and then an array (in the same order) with the variables we are using
    // as declared above
    db.query(
      "INSERT INTO users (name, username, password, avatar) VALUES (?,?,?,?)",
      [req.body.name, req.body.username, req.body.password, req.body.avatar],
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

app.post("/custom-card", (req, res) => {
  const name = req.body.name;
  const attack = req.body.attack;
  const defense = req.body.defense;
  const rarity = req.body.rarity;
  const flavor = req.body.flavor_text;

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
