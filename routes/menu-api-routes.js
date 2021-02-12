const db = require("../models");

module.exports = (app) => {
    app.get('/api/:user_id/menus', (req, res) => {
        db.Menu.findAll({
            where: {
                UserId: req.params.user_id,
            }
            
        }).then((results) => res.json(results))
    })

    app.get('/api/:user_id/menus:/menu_id', (req,res) =>{
        db.Menu.findOne({
            where: {
                UserId: req.params.user_id,
                id: req.params.menu_id

            }
        }).then((results) => res.json(results))
    })

    app.get('/api/:user_id/menus:/menu_id', (req,res) =>{
        db.MenuItem.findAll({
            where:{
                MenuId: req.params.menu_id
            }
        }).then((results) => res.json(results))
    })

    app.delete('/api/:user_id/menus/:menu_id', (req,res) => {
        db.MenuItem.destroy({
            where: {
                user_id: req.params.user_id,
                menu_id: req.params.menu_id
            }
        }).then((results)=> res.json(results))
    })

    app.post('/api/:user_id/createMenus', (req,res) =>{
        db.Menu.create({
                UserId: req.params.user_id,
                menuName: req.body.menuName
        }).then((results) => res.json(results))
    })

    app.put('/api/:user_id/:menu', (req,res) =>{
        db.MenuItem.put({
            where:{
                user_id: req.params.user_id,
                menu_id: req.params.menu_id
            }
        }).then((results) => res.json(results))
    })
}