const localStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');

const initialize = (passport, getUserByUsername) => {
  const authenticateUser = (username, password, done) => {
    // 1. check if there is a user
    const user = getUserByUsername(username);

    // 2. condition if there is not
    if(user == null) {
        return done(null, false, { message: 'No user with that email'})
    }

    try{
        // 3. if there is a user, compare the password that was input.
        if (await bcrypt.compare(password, user.password)){
            // if the user matches and now the password matches on the user
            // then we have the correct user
            return done(null, user);
        }else{
            return done(null, false, { message: "Password incorrect"})
        }
    }catch (error) {
        // error with application
        return done(error)
    }
  };
  passport.use(
    new localStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserByUserId(id)))
};

module.exports = initialize;
