# Marmeto-Task-2

# Pincode Checker

A simple JavaScript-based Pincode Checker that retrieves location information based on an Indian pincode. It uses the [Postal Pincode API](https://www.postalpincode.in/) to fetch details like locality, division, district, state, and country based on the user-inputted pincode. The application displays the fetched address details in a modal window if all required fields are filled correctly.

## Features

- Automatically fetches address details when a valid 6-digit pincode is entered.
- Debouncing is implemented to avoid unnecessary API requests while typing.
- Displays fetched address information in a modal window.
- Clears the "Address fetched successfully" message and hides the modal if any required field becomes empty.

## Technologies Used

- HTML
- CSS
- JavaScript (ES6)
- Fetch API

## Installation

To use this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pincode-checker.git
   cd pincode-checker
   ```

2. Open the `index.html` file in your preferred web browser to test the application.

## Usage

1. Enter your **First Name**, **Last Name**, **Email**, and a **6-digit Indian Pincode**.
2. The application will automatically fetch the address information when a valid pincode is entered.
3. If all fields are filled, a modal window with the address information will appear, and a success message will be displayed.
4. If any field is cleared after fetching the address, the modal window will close, and the success message will disappear.

## Code Overview

### `fetchAddresses(pincode)`

This function takes a 6-digit pincode as input, fetches address information from the API, and displays it in a modal if all fields are filled.

### Debouncing

Debouncing is implemented to avoid excessive API requests while the user is typing in the pincode field. The debounce delay is set to 500ms.

### Event Listeners

- **Form Submission**: Triggers address fetch if all fields are valid.
- **Input Event on Pincode Field**: Automatically fetches address data when a valid pincode is entered.
- **Input Events on All Fields**: Clears success message and hides modal if any field becomes empty.

## File Structure

```
pincode-checker/
├── index.html         # The main HTML file
├── styles.css         # CSS styling for the application
├── app.js             # JavaScript logic for the pincode checker
└── README.md          # Documentation (this file)
```

## API Used

The application uses the [Postal Pincode API](https://www.postalpincode.in/), which provides location data based on an Indian pincode.

## Example

1. **Input**:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@example.com
   - Pincode: 110001

2. **Output**:
   - A modal displaying:
     - Locality
     - Division
     - District
     - State
     - Country

3. **Error Handling**:
   - If the pincode is invalid, an error message is shown.
   - If any field becomes empty, the modal and success message disappear.

## License

This project is open-source and available under the [MIT License](LICENSE).


**Thank you for using the Pincode Checker!**


**Link**:https://techie-saby.github.io/Marmeto-Task-2/
