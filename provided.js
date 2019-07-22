"use strict";

console.info("index was loaded");
/**
 * A quicker way of adding in the event listener to the button for click events
 * This will also automatically ensure that you clicked the specific button before running the code.
 * @param btnNumber number The button we are adding to (e.g. 0)
 * @param callback function The function to call back on click.
 */
const addEventToButton = function(btnNumber, callback) {
  document
    .getElementById("button" + btnNumber)
    .addEventListener("click", function(evt) {
      if (!event.target.matches("#button" + btnNumber)) return;
      callback.apply(this, evt);
    });
};

/**
 * Button 0 just simply displays an alert
 */
addEventToButton(0, function(event) {
  document.querySelector("#renderhere").innerHTML =
    "<p>Hello there! Nice to meet you!</p>";
});

/**
 * Button 1 creates a simple form that asks for your name and email address to "sign-up" for emails.
 * (Not really, but it's a simple example)
 */
addEventToButton(1, function(event) {
  const htmlFormElement = document.createElement("form");
  htmlFormElement.noValidate = false;
  htmlFormElement.name = "btn1form";
  //There are two ways of adding HTML here. The first:
  htmlFormElement.innerHTML =
    '<p>Taking an interest in our weekly circular, <q>The gut speaks</q>? Enter your name and email address below to subscribe to email alerts of new issues, and exclusive member benefits!<br /><small>We super promise to share your details with every other person we know and will definitely sell your data to Facebook.</small></p><div class="form-group"><label for="btn1name">Name</label><input type="text" class="form-control" name="name" required="required" id="btn1name" placeholder="User McUserface" /></div>';
  //Or the second:
  const formGroup = document.createElement("div");
  formGroup.classList.add("form-group");
  const htmlEmailInput = document.createElement("input");
  htmlEmailInput.type = "email";
  htmlEmailInput.name = "email";
  htmlEmailInput.autocomplete = "off";
  htmlEmailInput.autofocus = "autofocus";
  htmlEmailInput.id = "btn1email";
  htmlEmailInput.classList.add("form-control");
  htmlEmailInput.placeholder = "jbarlin2@une.edu.au";
  htmlEmailInput.required = "required";
  htmlEmailInput.oninvalid = evt => {
    evt.target.setCustomValidity(
      evt.target.validity.valueMissing
        ? "Please enter an email so my boss can get his cheque!"
        : ""
    );
  };
  const htmlLabelElement = document.createElement("label");
  htmlLabelElement.for = "btn1email";
  htmlLabelElement.innerText = "Email Address";
  const htmlFormGroupElement = document.createElement("div");
  htmlFormGroupElement.classList.add("form-group");
  htmlFormGroupElement.append(htmlLabelElement);
  htmlFormGroupElement.append(htmlEmailInput);
  //Now build the submit button
  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.classList.add("btn", "btn-primary");
  submitBtn.type = "submit";
  //And append the email address and submit button to the form
  htmlFormElement.append(htmlFormGroupElement);
  htmlFormElement.append(submitBtn);

  //OK, now we need to do something when the form is submitted...
  htmlFormElement.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.debug("I have downloaded the form!", {
      event,
      formData
    });
    document.getElementById("renderhere").innerHTML =
      '<p>Thank you, <span data-output="name">' +
      formData.get("name") +
      '</span>, for signing up for our weekly emails at <span data-output="email">' +
      formData.get("email") +
      "</span></p>";
  });
  document.getElementById("renderhere").innerHTML = "";

  document.getElementById("renderhere").append(htmlFormElement);
});
