const fetchCategory = () => {
    // const token = localStorage.getItem("token"); 
    // if (!token) {
    //     console.error("Token is missing!");
    //     return;
    // }
    console.log("Data")
    fetch('https://mango-project-six.vercel.app/category/list/', {
        method: 'GET',
        headers: {
            // Authorization: `Token ${token}`, 
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            console.log('Fetch response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); 
        })
        .then((categories) => {
            // console.log('Fetched Categories:', categories);

            const parent = document.getElementById("category"); 
            if (!parent) {
                console.error("Category <select> element not found!");
                return;
            }

            parent.innerHTML = '<option value="" selected disabled>Select Category</option>';
            categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id; 
                option.textContent = category.name; 
                parent.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
            document.getElementById("error").textContent = "Failed to load categories.";
        });
};

fetchCategory();



const handleAdd_Mango = (event) => {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const imageInput = document.getElementById("image").files[0];

    if (!name || !price || !quantity || !category || !description) {
        document.getElementById("error").innerText = "All fields are required.";
        return;
    }

    if (!imageInput) {
        document.getElementById("error").innerText = "Please upload an image.";
        return;
    }

    const formData = new FormData();
    formData.append("image", imageInput);

    fetch("https://api.imgbb.com/1/upload?key=13f268ce593eb3a2e14811c1e1de5660", {
        method: "POST",
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            const imageUrl = data.data.url;

            const productData = {
                category,
                name,
                price: parseFloat(price),
                quantity: parseInt(quantity, 10),
                description,
                image: imageUrl,
            };

            console.log("Product Data:", productData);
            const token = localStorage.getItem("token");
            fetch("https://mango-project-six.vercel.app/product/mango/", {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            })
            .then((res) => res.json())
            .then((response) => {
                
                document.getElementById("error").innerText = "Product added successfully!";

                // Reset the form fields
                document.getElementById("name").value = '';
                document.getElementById("price").value = '';
                document.getElementById("quantity").value = '';
                document.getElementById("category").value = '';
                document.getElementById("description").value = '';
                document.getElementById("image").value = '';

                // Reload the page
                setTimeout(() => {
                    window.location.reload();
                }, 100); 
                
            })
            
        } else {
            document.getElementById("error").innerText = "Image upload failed. Please try again.";
        }
    })
    .catch((error) => {
        document.getElementById("error").innerText = "Error during image upload. Please check your connection.";
    });
};







