const db = require("../models");

module.exports = (app) => {
    // gets menu information for given menu name 
    app.get('/api/:menu_name/menuinfo', (req, res) => {
        db.Menu.findOne({
            where: {
                menuName: req.params.menu_name
            }
        }).then((results) => res.json(results))
    })
    // Gets all menus for the specified user
    app.get('/api/:user_id/menus', (req, res) => {
        db.Menu.findAll({
            where: {
                UserId: req.params.user_id,
            }

        }).then((results) => res.json(results))
    })
    // gets all menu Items for the specified menu id
    app.get('/api/:user_id/menus/:menu_id/menuItems', (req, res) => {
        db.MenuItem.findAll({
            where: {
                MenuId: req.params.menu_id
            }
        }).then((results) => res.json(results))
    })
    // gets all menu items for the specified menu ID
    app.get('/api/menus/:menu_id/menuItems', (req, res) => {
        db.MenuItem.findAll({
            where: {
                MenuId: req.params.menu_id
            }
        }).then(result => res.json(result))
    })
    // gets specific menu for the specified menu ID and user ID
    app.get('/api/:user_id/menus/:menu_id', (req, res) => {
        db.Menu.findOne({
            where: {
                UserId: req.params.user_id,
                id: req.params.menu_id

            }
        }).then((results) => res.json(results))
    })
    // Gets one menu for the specified menu ID
    app.get('/api/menus/:menu_id', (req, res) => {
        db.Menu.findOne({
            where: {
                id: req.params.menu_id
            }
        }).then(results => res.json(results));
    })


    // Deletes menu for specified menu and user ID
    app.delete('/api/:user_id/menus/:menu_id', (req, res) => {
        db.Menu.destroy({
            where: {
                UserId: req.params.user_id,
                id: req.params.menu_id
            }
        })
    })
    // Deletes all menu item for specified item id and menu id
    app.delete('/api/:user_id/menus/:menu_id/menuItems', (req, res) => {
        db.MenuItem.destroy({
            where: {
                MenuId: req.params.menu_id,
                id: req.body.id
            }
        }).then((results) => res.json(results))
    })
    // creates menu for given user id
    app.post('/api/:user_id/createMenus', (req, res) => {
        db.Menu.create({
            UserId: req.params.user_id,
            menuName: req.body.menuName
        }).then((results) => res.json(results))
    })
    // creates menu item for given user id and menu id
    app.post('/api/:user_id/menus/:menu_id/menuItems', (req, res) => {
        db.MenuItem.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            img: req.body.img,
            MenuId: req.params.menu_id
        }).then((results) => res.json(results))
    })


    // updates menu item for given menu id and item id
    app.put('/api/:user_id/:menu_id/updateItem', (req, res) => {
        db.MenuItem.update({
            where: {
                MenuId: req.params.user_id,
                id: req.body.id
            },
            name: req.body.name,
            MenuId: req.params.menu_id
        })
    })
    // puts QR code for given menu name
    app.put('/api/maybe/:menu_name/addQR', (req) => {
        var values = { qr: req.body.qrLink }
        var condition = { where: { menuName: req.params.menu_name } }
        options = { multi: true }
        db.Menu.update(
            values, condition, options
        ).then((upresult) => { })
    })

}