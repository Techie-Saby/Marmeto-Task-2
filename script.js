document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkoutForm');
    const addressWindow = document.getElementById('addressWindow');
    const addressContent = document.getElementById('addressContent');
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('closeButton');
    const submitButton = document.getElementById('submitButton');
    const addressResult = document.getElementById('addressResult');
    const errorMessage = document.getElementById('errorMessage');
    const pincodeInput = document.getElementById('pincode');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');

    let debounceTimeout;

    // Check if all fields are filled

    function areAllFieldsFilled() {
        return (
            firstNameInput.value.trim() !== '' &&
            lastNameInput.value.trim() !== '' &&
            emailInput.value.trim() !== '' &&
            pincodeInput.value.trim().length === 6
        );
    }

    // Fetch addresses based on the pincode

    async function fetchAddresses(pincode) {
        submitButton.disabled = true;
        const originalButtonText = submitButton.textContent;
        submitButton.innerHTML = '<span class="loading"></span>Fetching...';

        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const [data] = await response.json();

            if (data.Status !== 'Success') {
                throw new Error('Invalid pincode. Please try again.');
            }

            const addresses = data.PostOffice;

            addressContent.innerHTML = `
                <p><strong>Pincode:</strong> ${pincode}</p>
                ${addresses.map(address => `
                    <div class="address-item">
                        <p><strong>Locality:</strong> ${address.Name}</p>
                        <p><strong>Division:</strong> ${address.Division}</p>
                        <p><strong>District:</strong> ${address.District}</p>
                        <p><strong>State:</strong> ${address.State}</p>
                        <p><strong>Country:</strong> ${address.Country}</p>
                    </div>
                `).join('')}
            `;
            
            // Show the address window only if all fields are filled

            if (areAllFieldsFilled()) {
                addressWindow.style.display = 'block';
                overlay.style.display = 'block';
                addressResult.textContent = 'Address fetched successfully!';
                errorMessage.textContent = '';
            }
        } catch (error) {
            console.error("Error Occurred:", error);
            errorMessage.textContent = error.message || 'An error occurred. Please try again later.';
            addressResult.textContent = '';
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    }

    // Debounce function to limit the number of fetch requests

    function debounceFetch(pincode) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            if (pincode.length === 6) {  // Only fetch if pincode has 6 characters
                fetchAddresses(pincode);
            }
        }, 500); // Delay by 500ms
    }

    // Event listener for pincode input changes

    pincodeInput.addEventListener('input', function() {
        const pincode = this.value.trim();
        debounceFetch(pincode);
    });

    // Form submission handler

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const pincode = pincodeInput.value.trim();
        if (pincode.length === 6 && areAllFieldsFilled()) {
            fetchAddresses(pincode);
        } else {
            errorMessage.textContent = 'Please fill in all required fields correctly.';
            addressResult.textContent = '';
        }
    });

    // Event listener to clear success message if fields are cleared
    
    [firstNameInput, lastNameInput, emailInput, pincodeInput].forEach(input => {
        input.addEventListener('input', function() {
            if (!areAllFieldsFilled()) {
                // Hide address window and clear success message if fields are incomplete
                addressWindow.style.display = 'none';
                overlay.style.display = 'none';
                addressResult.textContent = '';
            }
        });
    });

    // Close the address window
    
    closeButton.addEventListener('click', function() {
        addressWindow.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function() {
        addressWindow.style.display = 'none';
        overlay.style.display = 'none';
    });
});
