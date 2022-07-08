const LocalStrategy = require("passport-local");
const passport = require("passport");
const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "neonrunner_db",
  socketPath: "/tmp/mysql.sock",
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const result = await db
      .promise()
      .query(`SELECT * FROM users WHERE username=${username}`);
    console.log("result value in local strategy", result);
  })
);
