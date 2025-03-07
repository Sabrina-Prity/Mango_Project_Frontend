const fetchMango = () => {
    const token = localStorage.getItem("token");
    fetch('https://mango-project-six.vercel.app/product/mango/', {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((mangos) => {
            const container = document.getElementById("display-all-product");
            container.innerHTML = "<h2>All Mango Items</h2>";

            if (mangos.length === 0) {
                container.innerHTML += "<p style='font-size:25px; color:gray; text-align:center; margin-top:20px;'>No mango found!</p>";
            } else {
                mangos.forEach((mango) => {
                    const div = document.createElement("div");
                    div.classList.add("mango-item");

                    // Ensure the mango object has the necessary properties
                    div.innerHTML = `
                        <img src="${mango.image}" alt="${mango.name}" />
                        <p>${mango.name}</p>
                        <p>Price: $${mango.price}</p>
                        <p>Quantity: ${mango.quantity}</p>
                        <p>Category: ${mango.category}</p>
                        <button class="delete-btn" onclick="deleteMango(${mango.id})">Delete</button>
                    `;
                    container.appendChild(div);
                });
            }
        })
        // .catch((error) => {
        //     console.error('Error:', error);
        //     document.getElementById("error").innerText = "Error fetching mango items.";
        // });
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