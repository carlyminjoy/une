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
 * Button 4: Noughts and crosses
 */
addEventToButton(4, function(event) {
	document.getElementById("renderhere").innerHTML = "";

	let currentPlayer = 'X';
	let winner = false;
	let moves = 0;

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
					moves++;
					col.innerHTML = currentPlayer;
					col.classList.add;
					
					wins.forEach(function(combination) {
						let count = 0;

						for (let i = 0; i < 3; i++) {
							let cell = document.getElementById(combination[i]);

							if (cell.innerHTML != currentPlayer) { break; }
							count++;

							if (count == 3) { 
								winner = currentPlayer === 'X' ? "Crosses" : "Noughts";
							}
						}
					})

					if (winner) {
						message.innerHTML =  (winner + ' wins!');
					} else if (moves === 9) {
						message.innerHTML = 'Draw!';
						winner = true;
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

/**
 * Button 5: Canvas
 */
addEventToButton(5, function(event) {
	document.getElementById("renderhere").innerHTML = "";

	const canvas = document.createElement('canvas');
	canvas.style.width = '300px';
	canvas.style.height = '300px';
	canvas.style.border = '3px solid #555'
	canvas.style.cursor = 'crosshair';
	const ctx = canvas.getContext('2d');
	ctx.lineWidth = 3;

	let draw = {
		drawing: false,
		start: function(e) {
			ctx.beginPath();
			let x = e.pageX - canvas.offsetLeft;
			let y = e.pageY - (canvas.offsetTop);
			ctx.moveTo(x, y);
			this.drawing = true;
		},
		move: function(e) {
			if (this.drawing) {
				let x = e.pageX - canvas.offsetLeft;
				let y = e.pageY - (canvas.offsetTop);
				ctx.lineTo(x, y);
				ctx.strokeStyle = "#000";
				ctx.lineWidth = 5;
				ctx.stroke();
			}
		},
		end: function(e) {
			this.drawing = false;
		}
	};
	
	canvas.addEventListener('mousedown', draw.start);
	canvas.addEventListener('mousemove', draw.move);
	canvas.addEventListener('mouseup', draw.end);

	document.getElementById("renderhere").append(canvas);
});

/**
 * Button 6: SVG
 */
addEventToButton(6, function(event) {
	document.getElementById("renderhere").innerHTML = "";

	const svg = document.createElement('svg');
	svg.style.width = '300px';
	svg.style.height = '300px';
	svg.style.border = '3px solid #555';

	svg.classList.add('graph');
	svg.innerHTML = `
	<g class="grid x-grid">
		<line x1="90" x2="90" y1="5" y2="371"></line>
	</g>
	`

	document.getElementById("renderhere").append(svg);

});

/**
 * Button 8: Mastermind
 */
addEventToButton(8, function(event) {
	let container = document.getElementById("renderhere");
	container.innerHTML = "";

	const colors = [
		'Xanadu',
		'Arsenic',
		'Fallow',
		'Gamboge',
		'Niagara',
		'Cerise'
	];

	let seq = [];
	let turns = 0;
	let win = false;
	
	for (let i = 0; i < 4; i++) {
		seq.push(colors[Math.floor(Math.random()*colors.length)][0]);

		let select = document.createElement('select');
		select.classList.add('select-' + (i + 1));

		colors.forEach(function(color) {
			let option = document.createElement('option');
			option.innerHTML = color;
			option.value = color;

			select.appendChild(option);
		})

		container.appendChild(select);
	}

	let guessList = document.createElement('ol');
	guessList.type = 'i';

	let turnsRemainingText = document.createElement('p');
	turnsRemainingText.innerHTML = 'Turns remaining: 8';

	let guessBtn = document.createElement('button');
	guessBtn.innerHTML = 'Submit Guess';
	guessBtn.classList.add('btn', 'btn-primary', 'd-block','mt-3', 'mb-3');

	container.appendChild(guessBtn);
	container.appendChild(guessList);
	container.appendChild(turnsRemainingText);

	guessBtn.addEventListener('click', function(e) {
		turns++;
		turnsRemainingText.innerHTML = 'Turns remaining: ' + (8 - turns);

		let guessArr = [];
		let resultArr = [];

		for (let j = 0; j < 4; j++) {
			let selectVal = document.querySelector('.select-' + (j + 1)).value[0];
			let result = (seq[j] === selectVal) 
			? 'B'
			: seq[j] + '/' + selectVal;

			guessArr.push(selectVal);
			resultArr.push(result);
		}

		// Get an array of unresolved indexes to check in the next step
		// let unresolvedIndexes = 

		resultArr.forEach((result, i) => {
			if (result !== 'B') {
				let answer = result[0];
				let guess = result[2];

				// Does guess exist in one of the other columns? (that isn't a B)
				// if so, result is W, otherwise it's an E.
				
			}
		})



		let li = document.createElement('li');
		let guessStr = guessArr.join('-');
		let resultStr = resultArr.join('-')
		li.innerHTML = 'You guessed ' + guessStr + ' (Result: ' + resultStr + ')';
		guessList.appendChild(li);

		if (resultStr == 'B-B-B-B') {
			win = true;
			let winMsg = document.createElement('p');
			winMsg.innerHTML = 'You win!';
			container.appendChild(winMsg);
		}
		
		if (win || turns == 8) {
			guessBtn.disabled = true;
			let selects = this.querySelectorAll('select');
			selects.forEach(function(sel) {
				sel.disabled = true;
			})

			if (!win) {
				let lostMsg = document.createElement('p');
				lostMsg.innerHTML = 'You fool: my code was ' + seq.join('-');
				container.appendChild(lostMsg);
			}
		}
	})

});