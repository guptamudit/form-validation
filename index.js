function validateForm() {
  var fullNameInput = document.getElementById("fullName");
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  // Check if the first character of the full name is capitalized
  if (!isFirstCharCapitalized(fullNameInput.value)) {
    showError(
      fullNameInput,
      "The first character of the name must be capitalized"
    );
    return false;
  }

  // Check if the password contains the user's name (case-insensitive)
  if (password.toLowerCase().includes(fullNameInput.value.toLowerCase())) {
    showError(
      document.getElementById("password"),
      "Password cannot contain your name"
    );
    return false;
  }

  // Capitalize the first character of the full name
  var fullName = capitalizeFirstChar(fullNameInput.value);
  // Update the value in the input field
  fullNameInput.value = fullName;

  // Validation criteria
  if (fullName.length < 5) {
    showError(fullNameInput, "Name must be at least 5 characters long");
    return false;
  }

  if (!email.includes("@")) {
    showError(document.getElementById("email"), "Enter a valid email address");
    return false;
  }

  if (phoneNumber.length !== 10 || phoneNumber === "1234567890") {
    showError(
      document.getElementById("phoneNumber"),
      "Enter a valid 10-digit phone number"
    );
    return false;
  }

  if (
    password.length < 8 ||
    password === "password" ||
    !hasTwoSymbols(password)
  ) {
    showError(
      document.getElementById("password"),
      "Password must be at least 8 characters long, not 'password', and include at least two symbols"
    );
    return false;
  }

  if (password !== confirmPassword) {
    showError(
      document.getElementById("confirmPassword"),
      "Passwords do not match"
    );
    return false;
  }

  // If all validation criteria are met
  return true;
}

function showError(element, errorMessage) {
  // Add the error class to trigger the shaking animation
  element.classList.add("error-shake");
  // Display the error message
  alert(errorMessage);
  // Remove the error class after the animation completes
  setTimeout(function () {
    element.classList.remove("error-shake");
  }, 500);
}

function isFirstCharCapitalized(str) {
  // Check if the first character is an uppercase letter
  return /^[A-Z]/.test(str);
}

function capitalizeFirstChar(str) {
  // Capitalize the first character and keep the rest of the string unchanged
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function hasTwoSymbols(str) {
  // Count the number of symbols in the string
  var symbolCount = (str.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g) || [])
    .length;

  // Check if there are at least two symbols
  return symbolCount >= 2;
}
