const db = require("../models");
const passport = require("../config/passport");


module.exports = (app) => {
    app.get('/api/:user_id', (req, res) => {
        const user_id = req.params.user_id;
        db.User.findAll({
            where: {
                id: user_id
            },
        }).then((results) => res.json(results))
    });

    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
      });

    app.post('/api/createUser', (req, res) => {
        console.log(req.body);
        db.User.create(req.body).then((res) => {console.log(res.insertId)});
    })

}