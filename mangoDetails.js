

const displayMangosDetails = (mango) => {
    const parent = document.getElementById("mango-details");
    parent.innerHTML = "";  // Clear previous content

    const div = document.createElement("div");
    div.classList.add("mango-detail");

    const closeButton = document.createElement("span");
    closeButton.classList.add("close-btn");
    closeButton.innerHTML = "&times;";
    closeButton.onclick = () => window.history.back();
    parent.appendChild(closeButton);

    // Check if user is logged in (modify this based on your authentication method)
    const token = localStorage.getItem("token"); // Example: Checking token in local storage
    const isLoggedIn = !!token; // Convert to boolean

    div.innerHTML = `
        <div class="row">
            <div class="col-12 col-md-6">
                <img class="mango-img" src="${mango?.image}" />
            </div>
            <div class="col-12 col-md-6">
                <div class="mng-detail">
                    <h4>${mango?.name}</h4>
                    <h6>Price: $${mango?.price}</h6>
                    <h6>Quantity: ${mango?.quantity}</h6>
                    <h6>Category: ${mango?.category}</h6>
                    <p>${mango?.description}</p>
                    
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="${mango?.quantity}" value="1">
                    
                    <button class="details-btn" ${isLoggedIn ? "" : "disabled"} onclick="addToCart('${mango.id}')">
                        Add To Cart
                    </button>

                    <button class="buy-now-btn" ${isLoggedIn ? "" : "disabled"} onclick="buyNow('${mango.id}', ${mango.price}, ${mango.quantity})">
                        Buy Now
                    </button>

                    ${!isLoggedIn ? `<p class="login-warning" style="color:#BE4209; margin-top:10px;">🔒 You need to log in to add items to the cart or buy.</p>` : ""}
                </div>
            </div>
        </div>
    `;

    parent.appendChild(div);

    displayComments(mango.id); // Display comments for this mango
};



const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("mangoId");
    console.log("Cart Mango Id", param);

    const detailsContainer = document.getElementById("mango-details");
    const loading = document.getElementById("comment-loading");

    // Show loading image & clear previous details
    loading.style.display = "block";
    detailsContainer.innerHTML = "";

    fetch(`https://mango-project-six.vercel.app/product/mango/${param}/`)
        .then((res) => res.json())
        .then((data) => {
            loading.style.display = "none"; // Hide loading image
            displayMangosDetails(data);
        })
        .catch((err) => {
            console.log(err);
            loading.style.display = "none";
            detailsContainer.innerHTML = "<p>Error loading mango details. Please try again.</p>";
        });
};

// Load details on page load
getparams();


const displayComments = (mangoId) => {
    fetch(`https://mango-project-six.vercel.app/product/comment/comments_by_mango/?mango_id=${mangoId}`)
        .then((res) => res.json())
        .then((data) => {
            const commentsList = document.getElementById("comments-list");
            commentsList.innerHTML = ''; 
            // const username = localStorage.getItem("username")

            data.forEach((comment) => {
                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");
                commentDiv.innerHTML = `
                    <p>${comment.body}</p>
                    <small>by ${comment.user} | Rated: ${comment.rating}</small>
                    <hr>
                `;
                commentsList.appendChild(commentDiv);
            });

            // Show the comment form if the user is logged in
            const token = localStorage.getItem("token");
            if (token) {
                document.getElementById("comment-form").style.display = "block";  // Show comment form if token exists
                document.getElementById("comment-login-msg").style.display = "none"; // Hide login message if token exists
            } else {
                document.getElementById("comment-form").style.display = "none";  // Hide comment form if token doesn't exist
                document.getElementById("comment-login-msg").style.display = "block"; // Show login message if token doesn't exist
            }
        });
};

const postComment = () => {
    const param = new URLSearchParams(window.location.search).get("mangoId");
    console.log(param)
    const token = localStorage.getItem("token");
    const commentText = document.getElementById("comment-text").value;
    const rating = document.getElementById("rating").value;  // Assuming a dropdown or a similar input for the rating

    if (!token) {
        alert("You must be logged in to post a comment.");
        return;
    }

    const commentData = {
        body: commentText,
        rating: rating,
        mango: param,  
    };

    console.log(commentData);
    fetch('https://mango-project-six.vercel.app/product/comment/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
    })
    .then((response) => response.json())
    .then((data) => {
        
        console.log("Comment posted:", data);
        // commentText.value = "";
        // rating.value = ""; 
        // displayComments(param);  
        location.reload();
        
    })
    .catch((error) => {
        console.error("Error posting comment:", error);
    });
};

