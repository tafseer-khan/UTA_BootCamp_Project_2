// Once document is loaded function will run
document.addEventListener('DOMContentLoaded', () => {
// Clicking edit will take us to Edit Menu
    document.addEventListener('click', (e) => {
        if(e.target && e.target.id === 'edit'){
            console.log(e.target.getAttribute('data-menu'))
            localStorage.clear();
            localStorage.setItem('menuToEdit', e.target.getAttribute('data-menu'));
            window.location.replace('./editMenu.html');
        }
    })

});
