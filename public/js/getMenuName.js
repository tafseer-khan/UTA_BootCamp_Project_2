document.addEventListener('DOMContentLoaded', () => {
    const startMenu = document.getElementById('start-menu');
    startMenu.addEventListener('click', (e) => {
        e.preventDefault();

        const menuName = document.getElementById('menu-name').value;

        //TODO make api call to create menu
        //in the .then() create event listener for 'start menu' to redirect to the create menu page

    });
});