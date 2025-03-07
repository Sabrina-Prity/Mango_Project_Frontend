


const addToCart = (mangoId) => {
    const quantity = document.getElementById("quantity").value;

    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
        alert("No cart found. Please Login first.");
        return;
    }

    // Prepare data to be sent to the backend
    const data = {

        quantity: quantity,
        user: localStorage.getItem("user_id"),
        mango: mangoId,
        cart: cartId,
    };

    console.log("Cart Data", data)
    const token = localStorage.getItem("token");
    fetch("https://mango-project-six.vercel.app/add_to_cart/product_get/", {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("Item added to cart:", data);
            alert("Item added to cart successfully!");
        })
        .catch((error) => {
            console.error("Error adding to cart:", error);
        });
};

const loadCartProduct = () => {
    const cartId = localStorage.getItem("cartId");
    // console.log(cartId);
    if (!cartId) {
        console.log("No cart found. Please create a cart first.");
        return;
    }
    const token = localStorage.getItem("token");

    
    fetch(`https://mango-project-six.vercel.app/add_to_cart/cart_products/${cartId}/`,
        {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    )
        .then((res) => res.json())
        .then((data) => {
            // console.log("Received Cart Data:", data);
            displayCart(data);
        })
        .catch((error) => {
            console.error("Error adding to cart:", error);
        });
};

const displayCart = (items) => {
    const parent = document.getElementById("cart-section");
    parent.innerHTML = `<h2>Your Cart</h2>`;

    if (!items || items.length === 0) {
        parent.innerHTML += `
        <img src="Images/cart_empty.jpg" alt="Empty Cart" class="empty-cart">
        <p>Your cart is empty!</p>
        `;
    } else {
        parent.innerHTML += `<p>Total Item : ${items.length}</p>`;
    }

    items.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.id = item.id;

        const totalPrice = (item.mango.price * item.quantity);

        div.innerHTML = `
        <div class="cart-item-container">
            <!-- Image section -->
            <div class="cart-item-image">
                <img src="${item.mango.image}" alt="Mango Image">
            </div>
            <!-- Middle section for Name, Quantity, Price -->
            <div class="cart-item-details">
                <div class="cart-item-info">
                    <h4>Name: ${item.mango.name}</h4>
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="${item.mango?.quantity}" value="1">
                    <p>Price: $<span id="price-${item.id}">${totalPrice}</span></p>
                </div>
            </div>
            <!-- Buttons section -->
            <div class="cart-item-buttons">
                <button class="details-btn">
                    <a href="mangoDetails.html?mangoId=${item.mango.id}" style="color: white;">Details</a>
                </button>
                <button class="buy-now-btn" onclick="buyNowIntoCart('${item.mango.id}', ${item.mango.price}, ${item.mango.quantity}, '${item.id}')">Buy Now</button>
                <button class="delete-btn" onclick="deleteCartItem('${item.id}')">Delete</button>
            </div>
        </div>
        `;

        parent.appendChild(div);
    });
};


function buyNowIntoCart(mangoId, price, maxQuantity, cartItemId) {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const quantity = document.getElementById("quantity").value;

    if (!token) {
        alert("Please Login first.");
        return;
    }

    if (quantity < 1 || quantity > maxQuantity) {
        alert(`Please enter a valid quantity (1-${maxQuantity}).`);
        return;
    }

    const orderData = {
        quantity: quantity,
        buying_status: "Pending",
        payment_status: "Pending",
        user: user_id,
        product: mangoId,
    };

    // Step 1: Place the Order
    fetch("https://mango-project-six.vercel.app/add_to_cart/orders-view/", {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to place order.");
            }
            return res.json();
        })
        .then((orderResponse) => {
            console.log("Order placed successfully:", orderResponse);
            alert("Successfully bought the product!");

            // Step 2: Remove the Item from Cart
            deleteCartItem(cartItemId);
        })
        .catch((error) => {
            console.error("Error during purchase or cart update:", error);
        });
}


function deleteCartItem(cartItemId) {
    const url = `https://mango-project-six.vercel.app/add_to_cart/update-cart-item/${cartItemId}/`;
    const token = localStorage.getItem("token");
    fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        const cartItemElement = document.getElementById(cartItemId);
        if (cartItemElement) {
            cartItemElement.remove(); 
        }
       
    })
    .catch(error => {
        console.error('Error deleting cart item:', error);
    });
}



// addToCart();
loadCartProduct();


