document.addEventListener('DOMContentLoaded', () => {

    fetch('/api/user_data', {
        credentials: 'include',
        method: 'GET'
    }).then(res => {
        const user = res;
        console.log(res.email);
    });

});