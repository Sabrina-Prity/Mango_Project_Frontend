
const fetchCategories = () => {

    // Show the loading image before the fetch request
    const container = document.getElementById("display-all-category");
    container.innerHTML = "<img src='Images/loading.jpg' alt='Loading...' style='width: 160px; height: auto; display: block; margin: auto;' />";

    fetch('https://mango-project-six.vercel.app/category/list/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((categories) => {
            const container = document.getElementById("display-all-category");
            container.innerHTML = "<h2>All Categories</h2>";

            if (categories.length === 0) {
                container.innerHTML += "<p style='font-size:25px; color:gray; text-align:center; margin-top:20px;'>No categories found!</p>";
            } else {
                categories.forEach((category) => {
                    const div = document.createElement("div");
                    div.classList.add("category-item");
                    div.innerHTML = `
                        <p>${category.name}</p>
                        <button class="delete-btn" onclick="deleteCategory(${category.id})">Delete</button>
                    `;
                    container.appendChild(div);
                });
            }
        })
        .catch((error) => console.error('Error:', error));
};


const deleteCategory = (id) => {
    // if (!confirm("Are you sure you want to delete this category?")) return;

    fetch(`https://mango-project-six.vercel.app/category/list/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.status === 204) {
                alert("Category deleted successfully!");
                fetchCategories(); 
            } else {
                alert("Failed to delete category!");
            }
        })
        .catch((error) => console.error('Error:', error));
};


fetchCategories();
