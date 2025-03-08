document.addEventListener("DOMContentLoaded", function () {
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    // Get the current page filename (e.g., "all_customer.html")
    const currentPage = window.location.pathname.split("/").pop();

    sidebarLinks.forEach(link => {
        // Extract the href attribute (e.g., "all_customer.html")
        const linkPage = link.getAttribute("href");

        // If the href matches the current page, add the "active" class
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
});
