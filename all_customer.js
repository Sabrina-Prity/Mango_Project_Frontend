const handleCustomerList = () => {
    const token = localStorage.getItem("token");

    // Show the loading image before the fetch request
    const parent = document.getElementById("cart-section");
    parent.innerHTML = "<img src='Images/loading.jpg' alt='Loading...' style='width: 160px; height: auto; display: block; margin-top: 50px; margin-left: auto; margin-right: auto;' />";


    fetch('https://mango-project-six.vercel.app/customer/customer-list/', {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log("Data", data)
            displayCustomerList(data);
        })
        .catch((err) => {
            console.error(err);
        });
};

const displayCustomerList = (items) => {
    const parent = document.getElementById("cart-section");

    // Clear the container and add a title
    parent.innerHTML = `
                <h1 style="text-align: center; color: #18634C; font-size: 40px; font-weight: bold;" class="title">All Customer</h1>
            `;

    if (items.length === 0) {
        parent.innerHTML += "<p style='text-align:center; font-size:18px; color:gray;'>Empty Customer List!</p>";
        return;
    }

    // Create a table to display customer details
    let table = `
        <p style="text-align:center; font-size:18px; font-weight:bold; color:#333;">Total Customers: ${items.length}</p>
        <table border="1" style="width: 90%; border-collapse: collapse; text-align: center; margin: auto;">
            <thead>
                <tr style="background-color: #18634C; color: white;">
                    <th style="padding: 10px;">Image</th>
                    <th style="padding: 10px;">Name</th>
                    <th style="padding: 10px;">Mobile</th>
                    <th style="padding: 10px;">Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    items.forEach((item) => {
        table += `
            <tr>
                <td style="padding: 10px; ">
                    <img src="${item.image}" alt="Customer Image" style="width: 80px; height: 60px; ">
                </td>
                <td style="padding: 10px;">${item.user}</td>
                <td style="padding: 10px;">${item.mobile_no}</td>
                <td style="padding: 10px;">
                    <a href="#" class="details-btn" style="background-color: #BE4209; color: white; padding: 5px 10px; text-decoration: none; border-radius: 5px;">
                        Details
                    </a>
                </td>
            </tr>
        `;
    });

    table += `</tbody></table>`;
    parent.innerHTML += table;
};


// const handleSearch = (event) =>{
//     event.preventDefault();
//     const value = document.getElementById("customer-search").value;
//     console.log(value);
//     handleCustomerList(value);
// }


handleCustomerList();

// {/* <a href="customerDetails.html?customerId=${item.id}">Details</a> */}
// <button class="delete-btn" onclick="deleteCustomer('${item.id}')">Delete</button>


// function deleteCustomer(id) {
//     const url = `http://127.0.0.1:8000/customer/customer-detail/${id}/`;

//     fetch(url, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(response => response.json())
//     .then(data => {

//         const customer = document.getElementById(id);
//         if (customer) {
//             customer.remove(); 
//         }
        
//     })
//     .catch(error => {
//         console.error('Error deleting cart item:', error);
//     });
// }



