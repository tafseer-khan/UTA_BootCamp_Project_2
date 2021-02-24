document.addEventListener('DOMContentLoaded', () => {

    fetch('/api/user_data', {
        credentials: 'include',
        method: 'GET'
    }).then(res => {
        res.json().then(data =>({
            id: data.id
        })
    ).then(res =>{
        console.log(res.id)
    })})})