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

/**
 * Button 2: Number guessing game
 */
addEventToButton(2, function(event) {
  document.getElementById("renderhere").innerHTML = "";

  let number = Math.ceil(Math.random() * 19);
  let guesses = 0;
  console.log(number);
  const htmlFormEl = document.createElement("form");
  htmlFormEl.name = "btn2form";
  htmlFormEl.innerHTML = `
        <div class="form-group">
            <label for="btn2name">Enter a number between 1 - 20:</label>
            <input style="width:80px;" type="number" min="1" max="20" class="form-control" name="guess" required="required" id="btn2name" />
            <br>
            <button id='submit-guess' type='submit' class='btn btn-primary'>Submit</button>
        </div>`;

  const responseEl = document.createElement("div");
  responseEl.innerHTML = `
        <p>Guesses: 
        <strong><span id='guesses' data-output="guesses">0</span></strong>
        </p>
        <p class='response'></p>`;

  htmlFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    guesses++;

    document.getElementById("guesses").innerHTML = guesses;
    document.querySelector(".response").innerHTML = "";

    const formData = new FormData(event.target);
    let guess = formData.get("guess");
    let response = "";

    if (guess == number) {
      response = "You win! The number was <strong>" + number + "</strong>";

      htmlFormEl.remove();
    } else if (guesses < 5) {
      response =
        "Try again - you guessed too " + (guess > number ? "high." : "low.");
    } else {
      response =
        "Sorry, you lose :(<br>The number I was thinking of was <strong> " +
        number +
        "</strong>";

      document.getElementById("submit-guess").disabled = true;
    }

    document.querySelector(".response").innerHTML = response;
  });
  document.getElementById("renderhere").append(htmlFormEl, responseEl);
});

/**
 * Button 3: Todo
 */
addEventToButton(3, function(event) {
  document.getElementById("renderhere").innerHTML = "";

  const heading = document.createElement("h2");
  heading.innerText = "Todo List";

  const todoList = document.createElement("ul");
  todoList.classList.add("list-group");

  const todoInput = document.createElement("input");
  todoInput.classList.add("form-control");
  todoInput.setAttribute("type", "text");

  const addTodoBtn = document.createElement("button");
  addTodoBtn.classList.add("btn", "btn-primary", "mt-3", "mb-3");
  addTodoBtn.innerText = "Add Item";

  const container = document.createElement("div");
  container.appendChild(heading);
  container.appendChild(todoInput);
  container.appendChild(addTodoBtn);
  container.appendChild(todoList);

  addTodoBtn.addEventListener("click", function(event) {
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    let label = document.createElement("label");
    label.innerText = todoInput.value;
    label.setAttribute("for", todoInput.value);
    label.classList.add("ml-3");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", todoInput.value);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "ml-3");
    deleteBtn.setAttribute = "display:none;";
    deleteBtn.addEventListener("click", function(event) {
      listItem.remove();
    });

    checkbox.addEventListener("click", function(event) {
      if (event.target.value) {
        deleteBtn.setAttribute = "display:inline-block;";
      } else {
        deleteBtn.setAttribute = "display:none;";
      }
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);
    todoInput.value = "";
  });
  document.getElementById("renderhere").append(container);
});

/**
 * Remove the number of the button you are modifying from here whenever you add an event!
 */
[4, 5, 6, 7, 8, 9].forEach(btnNumber => {
  addEventToButton(btnNumber, function(event) {
    document.getElementById("renderhere").innerText =
      "You pressed button " + btnNumber + ", but it doesn't do anything yet!";
  });
});
