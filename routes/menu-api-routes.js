const db = require("../models");

module.exports = (app) => {
    

    app.get('/api/:user_id/menus', (req, res) => {
        db.Menu.findAll({
            where: {
                UserId: req.params.user_id,
            }
            
        }).then((results) => res.json(results))
    })

    app.get('/api/:user_id/menus/:menu_id/menuItems', (req,res) =>{
        db.MenuItem.findAll({
            where:{
                MenuId: req.params.menu_id
            }
        }).then((results) => res.json(results))
    })

    app.get('/api/:user_id/menus/:menu_id', (req,res) =>{
        db.Menu.findOne({
            where: {
                UserId: req.params.user_id,
                id: req.params.menu_id

            }
        }).then((results) => res.json(results))
    })

    app.get('api/menus/:menu_id', (req, res) => {
        db.Menu.findOne({
            where: {
                id: req.params.menu_id
            }
        }).then(results => res.json(results));
    })

    

    app.delete('/api/:user_id/menus/:menu_id', (req,res) =>{
        db.Menu.destroy({
            where:{
                UserId: req.params.user_id,
                id: req.params.menu_id
            }
        })
    })

    app.delete('/api/:user_id/menus/:menu_id/menuItems', (req,res) => {
        db.MenuItem.destroy({
            where: {
                MenuId: req.params.menu_id,
                id: req.body.id
            }
        }).then((results)=> res.json(results))
    })

    app.post('/api/:user_id/createMenus', (req,res) =>{
        db.Menu.create({
                UserId: req.params.user_id,
                menuName: req.body.menuName
        }).then((results) => res.json(results))
    })

    app.post('/api/:user_id/menus/:menu_id/menuItems', (req,res) =>{
        db.MenuItem.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            img: req.body.img,
            MenuId: req.params.menu_id
        }).then((results) => res.json(results))
    })

    app.put('/api/:user_id/:menu_id', (req,res) =>{
        db.Menu.put({
            where:{
                UserId: req.params.user_id,
                id: req.params.menu_id
            },
            menuName: req.body.menuName,
            UserId: req.params.user_id
        }).then((results) => res.json(results))
    })

    app.put('/api/:user_id/:menu_id/updateItem', (req,res) =>{
        db.MenuItem.put({
            where:{
                MenuId: req.params.user_id,
                id: req.body.id
            },
            name: req.body.name,
            MenuId: req.params.menu_id
        })
    })
    app.put('/api/:menu_name/addQR',(req,res) =>{
        db.Menu.put({
            where:{
                menuName: req.params.menu_name
            },
            qr: req.body.qrLink
        })
    })
    app.get('/api/:menu_name/menuinfo', (req,res) => {
        db.Menu.findOne({
            where:{
                menuName: req.params.menu_name
            }
        }).then((results) => res.json(results))
    })
}