document.addEventListener("DOMContentLoaded", () => {
  const fetchCustomerDetails = async () => {
    const username = localStorage.getItem('username'); // Fetch username from localStorage
    const token = localStorage.getItem('token'); // Fetch token from localStorage

    const customerDetailsDiv = document.getElementById('customer-details');

    // Ensure the element exists
    if (!customerDetailsDiv) {
      console.error("Element with ID 'customer-details' not found.");
      return;
    }
    // Show loading message with an image (spinner or placeholder)
    customerDetailsDiv.innerHTML = `
      <div class="customer-loading">
        <img src="Images/loading.jpg" alt="Loading..." width="50">
        <p style="color:black;">Loading customer details...</p>
      </div>
    `;

    setTimeout(async () => {
      try {
        const response = await fetch(`https://mango-project-six.vercel.app/customer/customer-detail/${username}/`, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const customer = await response.json();

          // Display customer details
          customerDetailsDiv.innerHTML = `
            <div class="customer-card">
              <img src="${customer.image}" alt="Customer Image" class="customer-image">
              <h2>Customer Details</h2>
              <p><strong>Username:</strong> ${customer.user}</p>
              <p><strong>Mobile Number:</strong> ${customer.mobile_no}</p>
            </div>
          `;
        } else {
          const errorData = await response.json(); // Parse the error response
          customerDetailsDiv.innerHTML = `<p style="color: red;">Error: ${errorData.detail || 'Customer not found'}</p>`;
        }
      } catch (error) {
        console.error('Error fetching customer details:', error);
        customerDetailsDiv.innerHTML = `<p style="color: red;">Error fetching customer details. Please try again later.</p>`;
      }
    }, 100); // Small delay to ensure UI updates before fetch
  };

  fetchCustomerDetails();
});
