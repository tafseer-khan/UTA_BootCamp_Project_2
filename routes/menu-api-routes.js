const db = require("../models");

module.exports = (app) => {
    app.get('/api/:user_id/:menu', (req, res) => {
        db.menu-items.findAll({
            where: {
                user_id: req.params.user_id,
                menu_id: req.params.menu_id

            },
            include: [db.category],
            
        }).then((results) => res.json(results))
    })
}