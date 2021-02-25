const finishMenu = document.getElementById('finish-menu')
const canvas = document.getElementById('canvas')
finishMenu.addEventListener('click', (e) => {
    e.preventDefault()
    var QRCode = require('qrcode')
        QRCode.toCanvas(canvas,"https://www.npmjs.com/package/qrcode",(error) =>{
        if (error) console.error(error)
    })

})