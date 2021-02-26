document.addEventListener('DOMContentLoaded', () => {
    const startMenu = document.getElementById('start-menu');

    // When start menu is clicked function will start
    startMenu.addEventListener('click', (e) => {
        e.preventDefault()

        // Will rectrieve our user's id
        fetch('/api/user_data', {
            credentials: 'include',
            method: 'GET'
        }).then(res => {
            res.json().then(data => ({
                id: data.id
            })
            ).then(res => {
                // Creates object with our new Menu with its Menu Name from the document 
                const newMenu = {
                    menuName: document.getElementById('newMenu').value.trim()
                }
                // Sets this new created as our most recent value in our local storage
                localStorage.setItem('mostRecent', newMenu.menuName);
                const myID = res.id
                // Posts the menu name into our menus table with foreign key of the User ID
                fetch(`/api/${myID}/createMenus`, {
                    method: 'POST',
                    body: JSON.stringify(newMenu),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    // Then once new menu is added to database we will be redirected to a page where we can add items
                    window.location.replace('../createMenu.html');
                })
            }


            )
        })

    });
});