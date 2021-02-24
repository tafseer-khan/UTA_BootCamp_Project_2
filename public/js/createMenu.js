document.addEventListener('DOMContentLoaded', () => {
    const addItem = document.getElementById('add-item');
    fetch('/api/user_data', {
        method: 'GET'
    }).then(res => {
        const user = res;
        console.log(res.email);
    });
    addItem.addEventListener('click', (e) => {
        e.preventDefault;

        const section = document.getElementById('categories').value;
        const dishName = document.getElementById('dish-name').value.trim();
        const description = document.getElementById('description').value.trim();

        console.log(section, dishName, description);

        const newDish = {
            name: dishName,
            description: description,
            category: section
        };

        fetch('/api/1/menus/1/menuItems', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDish)
        }).then(res => {
            console.log(res);
        })

    })

    
});

const getUserInfo = () => {
    
}