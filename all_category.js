const fetchCategories = () => {
    const container = document.getElementById("display-all-category");
    container.innerHTML = "<img src='Images/loading.jpg' alt='Loading...' style='width: 160px; height: auto; display: block; margin-top: 50px; margin-left: auto; margin-right: auto;' />";

    fetch('https://mango-project-six.vercel.app/category/list/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((categories) => {
        container.innerHTML = `<h1 style="text-align: center; color: #18634C; font-size: 40px; font-weight: bold; margin-top: 30px;" class="title">All Categories</h1>`;

        if (categories.length === 0) {
            container.innerHTML += "<p style='font-size:25px; color:gray; text-align:center; margin-top:20px;'>No categories found!</p>";
        } else {
            let table = `
                <table border="1" style="width: 90%; border-collapse: collapse; text-align: center;  margin: auto;">
                    <thead>
                        <tr style="background-color: #18634C; color: white;">
                            <th style="padding: 10px;">Category ID</th>
                            <th style="padding: 10px;">Category Name</th>
                            <th style="padding: 10px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            categories.forEach((category) => {
                table += `
                    <tr>
                        <td style="padding: 10px;">${category.id}</td>
                        <td style="padding: 10px;">${category.name}</td>
                        <td style="padding: 10px;">
                            <button onclick="deleteCategory(${category.id})" style="background-color:rgb(187, 55, 7); color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                                ❌ Delete
                            </button>
                        </td>
                    </tr>
                `;
            });

            table += `</tbody></table>`;
            container.innerHTML += table;
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
