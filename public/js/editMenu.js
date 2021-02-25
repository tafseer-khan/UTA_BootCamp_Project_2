document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('click', (e) => {
        if(e.target && e.target.id === 'edit'){
            console.log(e.target.getAttribute('data-menu'))
            localStorage.clear();
            localStorage.setItem('menuToEdit', e.target.getAttribute('data-menu'));
            window.location.replace('./editMenu.html');
        }
    })

});
