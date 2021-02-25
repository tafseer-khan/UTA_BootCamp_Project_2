const finishMenu = document.getElementById('finish-menu')
const mostRecent = localStorage.getItem('mostRecent')
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'AzAq69SxSw',
//     database: "menu_maqrdb"
// })
finishMenu.addEventListener('click', (e) => {
    e.preventDefault()
    var QRCode = require('qrcode')
    fetch(`/api/${mostRecent}/menuinfo`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        res.json().then(data => ({
            id: data.id
        }
        ))
    }).then(

        QRCode.toString("https://menumaqr.herokuapp.com/public/menus"+`${id}`+".html", { type: 'terminal' }, (err, url) => {

            console.log(url)
            console.log(id)
            const newQR ={
                qrLink: url
            }  
            console.log(JSON.stringify(newQR))
            // connection.query('UPDATE FROM menu_maqrdb SET ? WHERE ?',
            // [
            //     {qr: "nice"},
            //     {menuName: `${mostRecent}`}
            // ])

            fetch(`/api/maybe/${mostRecent}/addQR`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newQR)
                }).then(response =>response.json())
        })

    )


})