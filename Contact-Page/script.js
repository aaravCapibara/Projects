document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  const firstNameGroup = document.getElementById("firstNameGroup");
  const lastNameGroup = document.getElementById("lastNameGroup");
  const emailGroup = document.getElementById("emailGroup");
  const subjectGroup = document.getElementById("subjectGroup");
  const messageGroup = document.getElementById("messageGroup");

  const validateEmailFormat = (emailValue) => {
    return String(emailValue)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const showError = (elementGroup) => {
    elementGroup.classList.add("error");
  };

  const removeError = (elementGroup) => {
    elementGroup.classList.remove("error");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValidForm = true;

    if (firstName.value.trim() === "") {
      showError(firstNameGroup);
      isValidForm = false;
    } else {
      removeError(firstNameGroup);
    }

    if (lastName.value.trim() === "") {
      showError(lastNameGroup);
      isValidForm = false;
    } else {
      removeError(lastNameGroup);
    }

    if (!validateEmailFormat(email.value.trim())) {
      showError(emailGroup);
      isValidForm = false;
    } else {
      removeError(emailGroup);
    }

    if (subject.value === "") {
      showError(subjectGroup);
      isValidForm = false;
    } else {
      removeError(subjectGroup);
    }

    if (message.value.trim().length < 10) {
      showError(messageGroup);
      isValidForm = false;
    } else {
      removeError(messageGroup);
    }

    if (isValidForm) {
      alert("Message sent successfully!");
      form.reset();
    }
  });

  firstName.addEventListener("input", () => removeError(firstNameGroup));
  lastName.addEventListener("input", () => removeError(lastNameGroup));
  email.addEventListener("input", () => removeError(emailGroup));
  subject.addEventListener("change", () => removeError(subjectGroup));
  message.addEventListener("input", () => {
    if (message.value.trim().length >= 10) {
      removeError(messageGroup);
    }
  });
});