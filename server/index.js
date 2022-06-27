const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
// needs to be changed into json when coming from express
app.use(express.json());

const db = mysql.createConnection({
  user: "sqluser",
  host: "localhost",
  password: "password",
  database: "neonrunner_db",
});

// res = what the front and will show (sent to front end)
// req = front end requesting something from the backend

app.get("/", (req, res) => {
  res.send("Something different");
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
        console.log("error value", err);
      } else {
        console.log("sent the values correctly");
        res.send("Values Inserted to users table");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
