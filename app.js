// const loadCategory = () => {
//     fetch("https://mango-project-six.vercel.app/category/list/")
//         .then((res) => res.json())
//         // .then((data) => console.log(data))
//         .then((data) => displayCategory(data))
//         .catch((err) => console.log(err));
// };

// const displayCategory = ((data)=>{
//     data?.forEach((item)=>{
//         const parent = document.getElementById("category");
//             const li = document.createElement("li");
//             li.classList.add("dropdown-item");
//             // li.innerText = item?.name;
//             li.innerHTML= `
//             <li onclick="loadMangos('${item?.name}')"> ${item?.name} </li>
//             `
//             parent.appendChild(li);
//     });
//  });
const loadCategory = () => {
    fetch("https://mango-project-six.vercel.app/category/list/")
        .then((res) => res.json())
        .then((data) => displayCategory(data))
        .catch((err) => console.log(err));
};

const displayCategory = (data) => {
    const parent = document.getElementById("category");
    parent.innerHTML = ""; // Clear previous categories before appending

    data?.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("category-item");
        li.innerHTML = `
            <span onclick="loadMangos('${item?.name}')">${item?.name}</span>
        `;
        parent.appendChild(li);
    });
};



const loadMangos = (search) => {
    const cardContainer = document.getElementById("card");
    const loading = document.getElementById("loading");
    const noData = document.getElementById("nodata");

    // Show loading image & hide other sections
    loading.style.display = "block";
    cardContainer.innerHTML = "";
    noData.style.display = "none";

    fetch(`https://mango-project-six.vercel.app/product/mango/?search=${search ? search : ""}`)
        .then((res) => res.json())
        .then((data) => {
            loading.style.display = "none"; // Hide loading image

            if (data.length > 0) {
                noData.style.display = "none";
                displayMangos(data);
            } else {
                noData.style.display = "block";
            }
        })
        .catch((err) => {
            console.log(err);
            loading.style.display = "none";
            noData.style.display = "block";
        });
};


const displayMangos = (mangos) => {
    const parent = document.getElementById("card");
    parent.innerHTML = "";

    mangos?.forEach((mango) => {
        const div = document.createElement("div");
        div.classList.add("mango-card");
        div.innerHTML = `
            <img class="mango-img" src="${mango?.image}" alt="${mango?.name}" />
            <h4>${mango?.name}</h4>
            <h6>$${mango?.price}</h6>
        `;
        div.onclick = () => {
            window.location.href = `mangoDetails.html?mangoId=${mango.id}`;
        };
        parent.appendChild(div);
    });
};


const handleSearch = (event) =>{
    event.preventDefault();
    const value = document.getElementById("search").value;
    console.log(value);
    loadMangos(value);
}




loadCategory();

loadMangos();



const createCart=()=>{
    const token = localStorage.getItem("token");
    console.log("Create Cart",token)
    // if(!token){
    //     alert("Please Login!")
    //     return
    // }
    object = {
        user : localStorage.getItem("user_id"),
    }
    console.log(object)
    fetch("https://mango-project-six.vercel.app/add_to_cart/cart_create/",{
        method : "POST",
        headers : {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(object)
    })

}

createCart();

