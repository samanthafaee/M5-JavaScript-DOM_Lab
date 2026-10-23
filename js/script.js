const menuControl = document.querySelector("#menu-button");
const mainNavigation = document.querySelector("#primary-navigation");
const modeControl = document.querySelector("#theme-button");
const studyArea = document.querySelector("#projects-container");
const responseForm = document.querySelector("#contact-form");
const responseStatus = document.querySelector("#form-status");

const studies = [
  {
    title: "Color and Motion",
    category: "Animation",
    description:
      "A short visual exercise about rhythm, timing, and movement."
  },
  {
    title: "Useful Interfaces",
    category: "Technology",
    description:
      "A layout study focused on clarity, purpose, and user flow."
  },
  {
    title: "The Framed Story",
    category: "Filming",
    description:
      "A concept exploring how composition can guide attention."
  }
];

// Opens and closes the responsive navigation menu.
function changeMenuState() {
  const menuIsVisible =
    mainNavigation.classList.toggle("is-open");

  menuControl.setAttribute(
    "aria-expanded",
    String(menuIsVisible)
  );

  menuControl.setAttribute(
    "aria-label",
    menuIsVisible
      ? "Close navigation"
      : "Open navigation"
  );
}

// Switches the page between the original and alternate visual modes.
function changeDisplayMode() {
  const alternateMode =
    document.body.classList.toggle("dark-mode");

  modeControl.setAttribute(
    "aria-pressed",
    String(alternateMode)
  );

  modeControl.textContent =
    alternateMode
      ? "Original mode"
      : "Change mode";
}

// Converts special characters into safe text.
function protectText(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[character])
  );
}

// Creates study cards from the studies array.
function buildStudyCards() {
  if (studies.length === 0) {
    studyArea.innerHTML =
      "<p>The collection is currently empty.</p>";

    return;
  }

  studyArea.innerHTML = studies
    .map(
      (study) => `
        <article class="project-card">
          <p class="project-tag">
            ${protectText(study.category)}
          </p>

          <h3>${protectText(study.title)}</h3>

          <p>${protectText(study.description)}</p>
        </article>
      `
    )
    .join("");
}

// Displays one specific error beside an invalid field.
function markInvalid(input, messageArea, message) {
  input.setAttribute("aria-invalid", "true");
  messageArea.textContent = message;
}

// Clears validation messages from the previous submission.
function clearFormState() {
  ["name", "email", "message"].forEach((fieldName) => {
    const input = document.querySelector(`#${fieldName}`);
    const messageArea =
      document.querySelector(`#${fieldName}-error`);

    input.setAttribute("aria-invalid", "false");
    messageArea.textContent = "";
  });

  responseStatus.textContent = "";
}

// Checks all form fields and displays the correct result.
function evaluateResponse(event) {
  event.preventDefault();

  clearFormState();

  const nameField = document.querySelector("#name");
  const emailField = document.querySelector("#email");
  const messageField = document.querySelector("#message");

  const nameValue = nameField.value.trim();
  const emailValue = emailField.value.trim();
  const messageValue = messageField.value.trim();

  const validEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fieldsToFix = [];

  if (nameValue.length === 0) {
    markInvalid(
      nameField,
      document.querySelector("#name-error"),
      "Please provide your name."
    );

    fieldsToFix.push(nameField);
  } else if (nameValue.length < 2) {
    markInvalid(
      nameField,
      document.querySelector("#name-error"),
      "Your name must have at least 2 characters."
    );

    fieldsToFix.push(nameField);
  }

  if (!validEmail.test(emailValue)) {
    markInvalid(
      emailField,
      document.querySelector("#email-error"),
      "Please provide a valid email address."
    );

    fieldsToFix.push(emailField);
  }

  if (messageValue.length === 0) {
    markInvalid(
      messageField,
      document.querySelector("#message-error"),
      "Please write a message."
    );

    fieldsToFix.push(messageField);
  } else if (messageValue.length < 10) {
    markInvalid(
      messageField,
      document.querySelector("#message-error"),
      "Your message must have at least 10 characters."
    );

    fieldsToFix.push(messageField);
  }

  if (fieldsToFix.length > 0) {
    fieldsToFix[0].focus();
    return;
  }

  responseStatus.textContent =
    "Your response has been accepted.";

  responseForm.reset();
}

menuControl.addEventListener(
  "click",
  changeMenuState
);

modeControl.addEventListener(
  "click",
  changeDisplayMode
);

responseForm.addEventListener(
  "submit",
  evaluateResponse
);

mainNavigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNavigation.classList.remove("is-open");

    menuControl.setAttribute(
      "aria-expanded",
      "false"
    );

    menuControl.setAttribute(
      "aria-label",
      "Open navigation"
    );
  });
});

buildStudyCards();