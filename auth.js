


const handleRegistration = (event) => {
    event.preventDefault();

    
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const mobile_no = getValue("mobile_no"); 
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");

    const imageInput = document.getElementById("image").files[0];
    console.log("Image",imageInput)
    
    if (!imageInput) {
        document.getElementById("error").innerText = "Please upload an image.";
        return;
    }
    if (password !== confirm_password) {
        document.getElementById("error").innerText = "Password and Confirm Password do not match.";
        return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
        document.getElementById("error").innerText = "Password must contain at least eight characters, one letter, one number, and one special character.";
        return;
    }

   
    const formData = new FormData();
    formData.append("image", imageInput);

    // Upload image to ImageBB
    fetch("https://api.imgbb.com/1/upload?key=13f268ce593eb3a2e14811c1e1de5660", {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                const imageUrl = data.data.url; 
                console.log("Image uploaded successfully:", imageUrl);

                const info = {
                    username,
                    first_name,
                    last_name,
                    mobile_no,
                    email,
                    password,
                    confirm_password,
                    image: imageUrl, 
                };

                fetch("https://mango-project-six.vercel.app/customer/register/", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json" },
                    body: JSON.stringify(info),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) {
                            document.getElementById("error").innerText = data.error;
                        } else {
                            localStorage.setItem('customer_id', data.customer_id);
                            console.log("Registration successful:", data);
                            document.getElementById("error").innerText =
                                "Registration successful! A confirmation email has been sent to your email address.";
                        }
                    })
                    .catch((error) => {
                        console.error("Error during registration:", error);
                        document.getElementById("error").innerText = "Error during registration. Please try again.";
                    });
            } else {
                console.error("Image upload failed:", data);
                document.getElementById("error").innerText = "Image upload failed. Please try again.";
            }
        })
        .catch((error) => {
            console.error("Error during image upload:", error);
            document.getElementById("error").innerText = "Error during image upload. Please check your connection.";
        });
};




const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};


const handleLogin = (event) => {
    event.preventDefault();
    
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    console.log(username, password);
    localStorage.setItem("username", username);

    if (username && password) {
        fetch("https://mango-project-six.vercel.app/customer/login/", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            if (data.token && data.user_id) {
                alert("Login Successful");
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);
                localStorage.setItem("is_admin", data.is_admin);
                window.location.href = "index.html";
            } else {
                alert("Invalid username or password.");
            }
        })
        .catch((error) => {
            console.error("Error during login:", error);
            alert("Login failed. Please try again.");
        });
    } else {
        alert("Please enter both username and password.");
    }
};



const handlelogOut = () => {
    const token = localStorage.getItem("token");

    fetch("https://mango-project-six.vercel.app/customer/logout", {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`,
        },
    })
        .then((res) => {
            console.log("Logout successful");
            localStorage.removeItem("cartId");
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("username");
            localStorage.removeItem("is_admin");
            alert("Logout Successful");
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Error during logout:", error);
            alert("Logout failed. Please try again.");
        });
};


