const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const isUsernameRequired = checkRequired(username);
    const isEmailRequired = checkRequired(email);
    const isPasswordRequired = checkRequired(password);
    const isConfirmRequired = checkRequired(confirmPassword);

    let isFormValid = isUsernameRequired && isEmailRequired && isPasswordRequired && isConfirmRequired;

    if (isUsernameRequired) {
        isFormValid = checkLength(username, 3, 15) && isFormValid;
    }
    if (isEmailRequired) {
        isFormValid = checkEmail(email) && isFormValid;
    }
    if (isPasswordRequired) {
        isFormValid = checkLength(password, 6, 25) && isFormValid;
    }
    if (isConfirmRequired) {
    isFormValid = checkPasswordsMatch(password, confirmPassword, 6, 25) && isFormValid;
    }

    if (isFormValid) {
        alert("Registration successful!");
        form.reset();
        document.querySelectorAll(".form-group").forEach((group) => {
            group.className = "form-group";
        });
    }
});

function checkPasswordsMatch(input1, input2, min, max) {
    if (input2.value.length < min || input2.value.length > max) {
        showError(input2, `${formatFieldName(input2)} must be between ${min} and ${max} characters`);
        return false;
    }
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match");
        return false;
    }
    showSuccess(input2);
    return true;
}

function checkEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, "Email is not valid");
        return false;
    }
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${formatFieldName(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${formatFieldName(input)} must be less than ${max} characters`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkRequired(input) {
    if (input.value.trim() === "") {
        showError(input, `${formatFieldName(input)} is required`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.textContent = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
}