const displayComments = () => {
    const commentsList = document.getElementById("comments-list");
    
    // Show the loading image before the fetch request
    commentsList.innerHTML = "<img src='Images/loading.jpg' alt='Loading...' style='width: 160px; height: auto; display: block; margin: auto;' />";
    
    fetch("https://mango-project-six.vercel.app/product/all_comment/")
        .then((res) => res.json())
        .then((data) => {
            // Clear the loading image and process the fetched data
            commentsList.innerHTML = '';

            if (data.length === 0) {
                commentsList.innerHTML += "<p style='font-size:25px; color:gray; text-align:center; margin-top:20px;'>No comments found!</p>";
            } else {
                data.forEach((comment) => {
                    const commentDiv = document.createElement("div");
                    commentDiv.classList.add("comment");

                    commentDiv.innerHTML = `
                    <div class="comment-content">
                        <p class="comment-user">${comment.user}</p>
                        <p class="comment-text">${comment.body}</p>
                        <small class="comment-rating">Rating: ${comment.rating}</small>
                    </div>
                    <button class="delete-comment-btn" onclick="deleteComment(${comment.id})">Delete</button>
                `;

                    commentsList.appendChild(commentDiv);
                });
            };
        })
        .catch((error) => {
            console.error("Error fetching comments:", error);
            document.getElementById("error").innerText = "Error fetching comments.";
        });
};



const deleteComment = (commentId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You must be logged in to delete a comment.");
        return;
    }

    fetch(`https://mango-project-six.vercel.app/product/comment/${commentId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`,
        },
    })
        .then((res) => {
            if (res.status === 204) {
                alert("Comment deleted successfully.");
                displayComments();
            } else {
                alert("Failed to delete the comment.");
            }
        })
        .catch((error) => {
            console.error("Error deleting comment:", error);
        });
};



displayComments();
