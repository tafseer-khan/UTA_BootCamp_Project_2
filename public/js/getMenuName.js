document.addEventListener('DOMContentLoaded', () => {
    const startMenu = document.getElementById('start-menu');


    startMenu.addEventListener('click', (e) => {
        e.preventDefault()


        fetch('/api/user_data', {
            credentials: 'include',
            method: 'GET'
        }).then(res => {
            res.json().then(data => ({
                id: data.id
            })
            ).then(res => {
                // console.log(newMenu)

                const newMenu = {
                    menuName: document.getElementById('newMenu').value.trim()
                }
                localStorage.setItem('mostRecent', newMenu.menuName);
                console.log(menuName)
                console.log(newMenu);
                const myID = res.id
                console.log(myID)
                fetch(`/api/${myID}/createMenus`, {
                    method: 'POST',
                    body: JSON.stringify(newMenu),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    window.location.replace('../createMenu.html');
                })
            }


            )
        })



        // added for testing
        //TODO make api call to create menu
        //in the .then() create event listener for 'start menu' to redirect to the create menu page

    });
});