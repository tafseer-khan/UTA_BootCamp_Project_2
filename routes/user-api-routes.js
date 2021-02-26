const db = require("../models");
const passport = require("../config/passport.js");


module.exports = (app) => {
  
  // Posts that we have logged in once authenticated 
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });
  // Posts new user 
  app.post('/api/createUser', (req, res) => {
    db.User.create(req.body).then((response) => {
      res.json(response);
    });
  })
  // Gets user data if logged in
  app.get('/api/user_data', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      console.log('logged in')
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstName: req.user.firstName
      });
    }
  });

}