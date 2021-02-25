document.addEventListener('DOMContentLoaded', () => {
    let url = window.location.href;
    url = url.split('/');
    console.log();
    let menuId = url[url.length - 1];
    menuId = menuId[0];
    console.log(menuId);
    fetch(`api/menus/${menuId}`, {
        method: 'GET'
    }).then(res => {
        res.json().then(data => {
            console.log(data);
        })
    })
});