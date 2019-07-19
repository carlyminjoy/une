"use strict";

/**
 * DEAR STUDENT - This file is where you should put your code for implementing the tasks.
 */

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

	const addBtn = document.createElement("button");
	addBtn.classList.add("btn", "btn-primary");
	addBtn.innerText = "Add Item";

	let deleteBtn = document.createElement("button");
	deleteBtn.innerText = "Delete Completed";
	deleteBtn.classList.add("btn", "btn-danger");
	deleteBtn.addEventListener("click", function(event) {
		document.querySelectorAll('.list-group-item').forEach(function(item) {
			console.log(item.firstElementChild.checked);
			if (item.firstElementChild.checked) {
				item.remove();
			}
		}) 
	});

	let btnsContainer = document.createElement('div');
	btnsContainer.classList.add('d-flex', 'mt-3', 'mb-3')
	btnsContainer.appendChild(addBtn);
	btnsContainer.appendChild(deleteBtn);

	const container = document.createElement("div");
	container.appendChild(heading);
	container.appendChild(todoInput);
	container.appendChild(btnsContainer);
	container.appendChild(todoList);

	addBtn.addEventListener("click", function(event) {
		if (todoInput.value.length < 1) { return }
		let listItem = document.createElement("li");
		listItem.classList.add("list-group-item");

		let label = document.createElement("label");
		label.innerText = todoInput.value;
		label.setAttribute("for", todoInput.value);
		label.classList.add("ml-3");

		let checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("id", todoInput.value);

		listItem.appendChild(checkbox);
		listItem.appendChild(label);
		todoList.appendChild(listItem);
		todoInput.value = "";
	});

	document.getElementById("renderhere").append(container);

});

  
/**
 * Button 3: Todo
 */
addEventToButton(4, function(event) {
	document.getElementById("renderhere").innerHTML = "";

	let currentPlayer = 'X';
	let winner = false;

	let gridArray = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];

	let wins = [
		['x0y0', 'x1y0', 'x2y0'],
		['x0y1', 'x1y1', 'x2y1'],
		['x0y2', 'x1y2', 'x2y2'],
		['x0y0', 'x1y1', 'x2y2'],
		['x0y2', 'x1y1', 'x2y0'],
		['x1y0', 'x1y1', 'x1y2'],
		['x2y0', 'x2y1', 'x2y2']
	];
	
	const grid = document.createElement('table');
	let message = document.createElement('h3');
	message.innerHTML = 'Crosses turn!';
	
	for (let x = 0; x < 3; x++) {
		let row = document.createElement('tr')
		
		for (let y = 0; y< 3; y++) {
			let col = document.createElement('td');
			col.style.width = '100px';
			col.style.height = '100px';
			col.style.fontSize = '32px';
			col.style.textAlign = 'center';
			col.style.border = '1px solid #555';
			col.id = 'x' + x + 'y' + y;

			col.addEventListener('click', function(e) {
				if (!winner && !['X', 'O'].includes(col.innerHTML)) {
					col.innerHTML = currentPlayer;
					col.classList.add;
					gridArray[x][y] = currentPlayer;
					
					wins.forEach(function(combination) {
						let count = 0;

						for (let i = 0; i < 3; i++) {
							let cell = document.getElementById(combination[i]);

							if (cell.innerHTML == currentPlayer) {
								count++;
							}

							if (count == 3) { 
								winner = currentPlayer === 'X' ? "Crosses" : "Noughts";
							}
						}
					})

					if (winner) {
						message.innerHTML = winner + ' wins!';
					} else if (currentPlayer === 'X') {
						currentPlayer = 'O';
						message.innerHTML = 'Noughts turn!';
					} else {
						currentPlayer = 'X';
						message.innerHTML = 'Crosses turn!';
					}
				}
			})

			row.appendChild(col);
		}

		grid.appendChild(row);
	}


	const container = document.createElement('div');
	container.appendChild(message);
	container.appendChild(grid);

	document.getElementById("renderhere").append(container);
});