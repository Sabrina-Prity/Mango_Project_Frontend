const fetchMango = () => {
    const token = localStorage.getItem("token");
    
    // Show the loading spinner before the fetch request
    const container = document.getElementById("display-all-product");
    container.innerHTML = "<img src='Images/loading.jpg' alt='Loading...' style='width: 160px; height: auto; display: block; margin-top: 50px; margin-left: auto; margin-right: auto;' />";

    fetch('https://mango-project-six.vercel.app/product/mango/', {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((mangos) => {
            // Clear the container and add table structure
            container.innerHTML = `
                <h1 style="text-align: center; color: #18634C; font-size: 40px; font-weight: bold; margin-top: -30px; margin-bottom:-10px;" class="title">All Mango Items</h1>
            `;

            if (mangos.length === 0) {
                container.innerHTML += "<p style='font-size:25px; color:gray; text-align:center; margin-top:20px;'>No mango found!</p>";
            } else {
                let table = `
                    <table border="1" style="width: 100%; border-collapse: collapse; text-align: center; margin-top: 20px;">
                        <thead>
                            <tr style="background-color: #18634C; color: white;">
                                <th style="padding: 10px;">Image</th>
                                <th style="padding: 10px;">Name</th>
                                <th style="padding: 10px;">Price</th>
                                <th style="padding: 10px;">Quantity</th>
                                <th style="padding: 10px;">Category</th>
                                <th style="padding: 10px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                mangos.forEach((mango) => {
                    table += `
                        <tr>
                            <td style="padding: 10px;">
                                <img src="${mango.image}" alt="${mango.name}" style="width: 80px; height: auto;" />
                            </td>
                            <td style="padding: 10px;">${mango.name}</td>
                            <td style="padding: 10px;">$${mango.price}</td>
                            <td style="padding: 10px;">${mango.quantity}</td>
                            <td style="padding: 10px;">${mango.category}</td>
                            <td style="padding: 10px;">
                                <button class="delete-btn" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer;" 
                                    onclick="deleteMango(${mango.id})">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    `;
                });

                table += `</tbody></table>`;
                container.innerHTML += table;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            container.innerHTML = "<p style='color: red; text-align: center; margin-top: 20px;'>Error fetching mango items.</p>";
        });
};




const deleteMango = (id) => {
    const token = localStorage.getItem("token");
    // if (!confirm("Are you sure you want to delete this mango?")) return;

    fetch(`https://mango-project-six.vercel.app/product/mango/${id}/`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.status === 204) {
                // alert("Mango deleted successfully!");
                fetchMango(); 
            } else {
                alert("Failed to delete mango!");
            }
        })
        .catch((error) => console.error('Error:', error));
};

fetchMango();