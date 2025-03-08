const handleAddCategory = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    console.log(name)
    fetch('https://mango-project-six.vercel.app/category/list/', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    })
        .then((response) => response.json())
        .then((data) => {

            console.log("Category Data",data)
            if (data.id) {
                console.log("Category id",data.id)
                alert("Category added successfully!");
                document.getElementById("name").value = "";
                fetchCategories(); 
            } else {
                document.getElementById("error").innerText = "Failed to add category!";
            }
        })
        .catch((error) => console.error('Error:', error));
};


