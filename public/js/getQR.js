const finishMenu = document.getElementById('finish-menu')
const mostRecent = localStorage.getItem('mostRecent')
const canvas = document.getElementById('canvas')
finishMenu.addEventListener('click', (e) => {
    e.preventDefault()
    var QRCode = require('qrcode')
    QRCode.toString("https://www.npmjs.com/package/qrcode",{type:'terminal'},(err,url) =>{
    console.log(url)
    }).then(
        fetch(`/api/${mostRecent}/addQR`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        })

    )

})