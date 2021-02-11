const db = require("../models");

module.exports = (app) => {
    app.get('/api/:user_id', (req, res) => {
        db.Menu.findAll({
            where: {
                user_id: req.params.user_id
            },
        }).then((results) => res.json(results))
    })

    app.post('/api/:user_id', (req,res) => {
        db.Menu.create(req.body, {
            where: {
                user_id: req.params.user_id
            }
        }).then((results) => res.json(results));
    })

}