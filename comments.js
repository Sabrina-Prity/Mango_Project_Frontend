const displayComments = () => {
    const commentsList = document.getElementById("comments-list");

    // Show the loading image before fetching data
    commentsList.innerHTML = "<img src='Images/loading.jpg' alt='Loading...' style='width: 160px; height: auto; display: block; margin-top: 50px; margin-left: auto; margin-right: auto;' />";

    fetch("https://mango-project-six.vercel.app/product/all_comment/")
        .then((res) => res.json())
        .then((data) => {
            // Clear the container and add a title
            commentsList.innerHTML = `
                <h1 style="text-align: center; color: #18634C; font-size: 40px; font-weight: bold;margin-top: -30px;" class="title">Comments</h1>
            `;

            if (data.length === 0) {
                commentsList.innerHTML += "<p style='font-size:25px; color:gray; text-align:center; margin-top:20px;'>No comments found!</p>";
            } else {
                let table = `
                    <table border="1" style="width: 100%; border-collapse: collapse; text-align: center; margin-top: 20px;">
                        <thead>
                            <tr style="background-color: #18634C; color: white;">
                                <th style="padding: 10px;">User</th>
                                <th style="padding: 10px;">Comment</th>
                                <th style="padding: 10px;">Rating</th>
                                <th style="padding: 10px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.forEach((comment) => {
                    table += `
                        <tr>
                            <td style="padding: 10px;">${comment.user}</td>
                            <td style="padding: 10px;">${comment.body}</td>
                            <td style="padding: 10px;">${comment.rating}</td>
                            <td style="padding: 10px;">
                                <button class="delete-comment-btn" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer;" 
                                    onclick="deleteComment(${comment.id})">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    `;
                });

                table += `</tbody></table>`;
                commentsList.innerHTML += table;
            }
        })
        .catch((error) => {
            console.error("Error fetching comments:", error);
            commentsList.innerHTML = "<p style='color: red; text-align: center; margin-top: 20px;'>Error fetching comments.</p>";
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
