const finishMenu = document.getElementById('finish-menu')
const mostRecent = localStorage.getItem('mostRecent')
// This script is bundled into the bundle.js file using Browserify for use of require outside of node start
// Once clicking finish menu function is run
finishMenu.addEventListener('click', (e) => {
    e.preventDefault()
    var QRCode = require('qrcode')
    // Gets the id for the most recent menu from local storage, aka the menu we had just created
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
        // Using teh QRcode package a qr code of svg format is created and written as a string
        // This QR code will link to the menu with the number associated with it's  menu ID
        QRCode.toString("https://menumaqr.herokuapp.com/menus/"+`${id}`+".html", { type: 'terminal' }, (err, url) => {
            // Object with QR code is made to be later put into our database
            const newQR ={
                qrLink: url
            }  
            // Puts our QRcode svg string into our database, in the row with matching Menu Name
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