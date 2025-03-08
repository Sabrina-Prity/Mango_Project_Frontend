
const fetchOrders = () => {
    const token = localStorage.getItem("token");

    const ordersList = document.getElementById("orders-list");
    ordersList.innerHTML = "<img src='Images/loading.jpg' alt='Loading...' style='width: 160px; height: auto; display: block; margin-top: 50px; margin-left: auto; margin-right: auto;' />";

    fetch("https://mango-project-six.vercel.app/add_to_cart/admin-order/", { 
        method: "GET",
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayOrders(data); 
    })
    .catch(error => {
        console.error("Error fetching orders:", error);
    });
};

const displayOrders = (orders) => {
    console.log("Orders", orders);
    const ordersList = document.getElementById("orders-list");

    // Clear previous content and add a title
    ordersList.innerHTML = `
        <h1 style="text-align: center; color: #18634C; font-size: 40px; font-weight: bold; margin-top: 30px;" class="title">Admin Order Management</h1>
    `;

    if (!orders || orders.length === 0) {
        ordersList.innerHTML += "<p style='font-size:25px; color:gray; text-align:center; margin-top:20px;'>No orders found.</p>";
        return;
    }

    // ✅ Find the highest Order ID
    const finalOrderId = Math.max(...orders.map(order => order.id));

    // Show total orders count and final order ID
    ordersList.innerHTML += `
        <p style="text-align:center; font-size:18px; font-weight:bold; color:#333; margin-top:-25px; ">
            Total Orders: ${orders.length} | Final Order ID: ${finalOrderId}
        </p>
    `;

    // // Show total orders count
    // ordersList.innerHTML += `<p style="text-align:center; font-size:18px; font-weight:bold; color:#333;">Total Orders: ${orders.length}</p>`;

    // Create table for order details
    let table = `
        <table border="1" style="width: 90%; border-collapse: collapse; text-align: center; margin: auto;">
            <thead>
                <tr style="background-color: #18634C; color: white;">
                    <th style="padding: 10px;">Order ID</th>
                    <th style="padding: 10px;">Product</th>
                    <th style="padding: 10px;">Quantity</th>
                    <th style="padding: 10px;">Total Price</th>
                    <th style="padding: 10px;">Buying Status</th>
                    <th style="padding: 10px;">Payment Status</th>
                    <th style="padding: 10px;">Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    orders.forEach((order) => {
        const price = order.product.price;
        const quantity = order.quantity;
        const total_price = price * quantity;

        // Check if the order is already completed
        const isCompleted = order.buying_status === "Completed";

        table += `
            <tr>
                <td style="padding: 10px;">${order.id}</td>
                <td style="padding: 10px;">${order.product.name}</td>
                <td style="padding: 10px;">${order.quantity}</td>
                <td style="padding: 10px;">$${total_price}</td>
                <td style="padding: 10px;">${order.buying_status}</td>
                <td style="padding: 10px;">${order.payment_status}</td>
                <td style="padding: 10px;">
                    <button id="complete-btn-${order.id}" onclick="handleComplete(${order.id})"
                        style="background-color: ${isCompleted ? 'gray' : 'green'}; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: ${isCompleted ? 'not-allowed' : 'pointer'};"
                        ${isCompleted ? 'disabled' : ''}>
                        ✅ ${isCompleted ? 'Completed' : 'Complete'}
                    </button>
                    <button id="delete-btn-${order.id}" onclick="handleDelete(${order.id})"
                        style="background-color: rgb(187, 55, 7); color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                        ❌ Delete
                    </button>
                </td>
            </tr>
        `;
    });

    table += `</tbody></table>`;
    ordersList.innerHTML += table;
};

// ✅ Disable "Complete" button after clicking
const handleComplete = (orderId) => {
    const completeBtn = document.getElementById(`complete-btn-${orderId}`);
    completeBtn.disabled = true;
    completeBtn.style.backgroundColor = "gray"; // Change color to indicate disabled
    completeBtn.style.cursor = "not-allowed";
    completeBtn.innerText = "✅ Completed"; // Update button text
    updateStatus(orderId, "Completed");
};



const updateStatus = (orderId, status) => {
    const token = localStorage.getItem("token");
    fetch(`https://mango-project-six.vercel.app/add_to_cart/admin-order-updated/${orderId}/`, { 
        method: "PUT",
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            buying_status: status
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || "Order status updated successfully.");
        fetchOrders(); 
    })
    .catch(error => {
        console.error("Error updating order:", error);
    });
};



// const deleteOrder = (orderId) => {
//     const token = localStorage.getItem("token");

//     const orderDiv = document.getElementById(`order-${orderId}`);

//     if (confirm("Are you sure you want to delete this order from the page?")) {

//         if (orderDiv) {
//             orderDiv.remove();
//         }
//         alert("Order deleted from the page.");
//     }
// };




const deleteOrder = (orderId) => {
    console.log("Order Id",orderId);
    const token = localStorage.getItem("token");
    if (confirm("Are you sure you want to delete this order?")) {
        fetch(`https://mango-project-six.vercel.app/add_to_cart/admin-order-updated/${orderId}/`, {  
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || "Order deleted successfully.");
            fetchOrders(); 
        })
        .catch(error => {
            console.error("Error deleting order:", error);
        });
    }
};


fetchOrders();
