const db = require("../models");

module.exports = (app) => {
    app.get('/api/:user_id/:menu', (req, res) => {
        db.MenuItem.findAll({
            where: {
                user_id: req.params.user_id,
                menu_id: req.params.menu_id

            },
            include: [db.category],
            
        }).then((results) => res.json(results))
    })

    app.delete('/api/:user_id/:menu', (req,res) => {
        db.MenuItem.destroy({
            where: {
                user_id: req.params.user_id,
                menu_id: req.params.menu_id
            }
        }).then((results)=> res.json(results))
    })

    app.put('/api/:user_id/:menu', (req,res) =>{
        db.MenuItem.put({
            where:{
                user_id: req.params.user_id,
                menu_id: req.params.menu_id
            }
        })
    })
}