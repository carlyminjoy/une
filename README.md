# Assignment 1

Assessment 1 is a set of exercises using JavaScript and the DOM. For assessment 1, we're not going to use any front end framework, just the DOM API and JavaScript capabilities that modern browsers already provide. Or, in other words, "vanilla JS" - for a satirical take on this, see http://vanilla-js.com/

This starter project includes:

- An HTML file, that you should not need to edit
- A JavaScript file, that you will need to edit
- Some project files that relate to the Cypress unit testing frame work, and
- This Readme.md file you are looking at!

Make sure you read the entire Readme through before doing anything.

_Handy hint_: to open the page in a browser, put this project in your public_html directory on the student server. Or if you are on your own computer and have Python3 installed, this will often serve the current directory to http://localhost:8000/ :

```sh
python3 -m http.server
```

If you open the page, you will see there are several buttons. Buttons 0 and 1 are implemented for you. You then have 10 tasks, each of which will be marked on a "0, 0.5, or 1 mark" scale depending on how well you do.

The first 8 tasks are behaviours that we want when buttons 2, 3, 4, 5, 6, 7, 8, and 9 are clicked. The 9th and 10th tasks are to write Cypress tests for Buttons 0 and 1.

_Handy hint_: The behaviour of the buttons always involves setting something up with in the `#renderhere` element in the page.

_Handy hint_: `cypress.json` contains the "base URL" that Cypress will be testing. At the moment **it points to the lecturer's home directory** (you'll want to change it so you can test your own code)

Some of the buttons you will be implementing already have cypress tests (giving you plenty of examples). Others do not, and will be marked by hand.

## What you I need to work on this?

If you are working on turing, all the software is already installed.

If you are working on your own computer, you will need nodejs and npm (version 5 or newer). Remember, we can't debug your own computer - turing is your fallback option. I recommend Visual Studio Code as an editor.

## How do I get started?

Clone the repository (or unzip the project zip), and from within the project directory run `npm install` to install everything that is needed (Cypress)

To launch Cypress, run `npx cypress open`

## What is Cypress?

[Cypress](https://www.cypress.io/) is a testing and validation framework. It's a very fast way of checking that a web page does exactly what is expected of it.

You should [check out the docs](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file) if you are ever lost, or check out the code we provided.

Button 3's check is the closest to the solutions you will need, followed by button 4, with buttons 2 and 8 being much more than you need (recusive function calls to check the game states)

## What has been built?

### index.html

This is a simple html file that contains a few buttons. Clicking on these buttons should launch your solution to any of the challenges (or our solution, if provided!)

### Button 0

This just displays a simple message that says "Hello there! Nice to meet you!"

### Button 1

This displays a simple form for the user to fill in their email address and name, and then returns those values to them.

It also displays a custom message if the email address is submitted but empty

### Cypress

Cypress tests for many buttons have already been written, to provide you with examples! In all cases, Cypress will be looking inside the `#renderhere` element. If it is looking for something specific, it will be listed below.

## How am I being marked?

Every item is marked 0/1/2 based on how complete the item is. The items start off pretty easy, then get progressively harder (so yes, button 2 and button 9 have the same weight but button 9 is substantially harder than button 2).

## What do I have to do?

Fill in the rest of the buttons!

### Set-up

You will need to give Cypress a valid URL to access your web app at.
The current `baseUrl` I have configured [as per these instructions](https://docs.cypress.io/guides/getting-started/testing-your-app.html#Step-3-Configure-Cypress) points to Will's copy of the project running on turing.
You can see this in cypress.json

Turing has been configured that in the root of your user folder, there is a `public_html` folder that is accessible at `https://turing.une.edu.au/~`, followed by your username.

There are several ways of doing this for yourselves:

1. Put the entire project in your public_html folder (or some sub folder) and work from there
2. Configure your IDE to automatically copy your files over
   - This is pretty easy to do in Visual Studio Code using something like [fsdeploy](https://marketplace.visualstudio.com/items?itemName=mightycoco.fsdeploy)
   - Other IDEs can easily be configured too I imagine
3. Manually copy the files over as you go (not really recommended)

### Submission information

Zip the entire project directory (minus the node_modules directory), and submit it via Moodle.

Note: if your project directory is a git repository (i.e., you cloned the project using git rather than downloading a zip), committing your work and running "git archive master -o assignment.zip" will produce a zip file (though you should then check its contents)

Please **do not** submit your `node_modules` folder.

### Button 2: Number guessing game

Your code should:

- Randomly select a number between 1 and 20
- Prompt the user to enter a number (between 1 and 20).
  - reject input outside this range, but do not count that as a guess
- If the user gets it right, display "You guessed correctly!"
- If the user gets it wrong, prompt them to guess again
  - If they guess too high, you should say "too high"
  - If they guess too low, you should say "too low"
- If the user gets it wrong five times, tell them they ran out of guesses and what the number was.

Cypress will be searching for:

- An `input` with a `type` set to `number` where I can type my guess
- A `button` to submit my guess
- A `span` with a property `data-output` set to `guesses` (which should start at 0)
- The text "too high" or "too low" being on the page (alongside the input button) if an incorrect guess is made
- The text "number I was thinking of was X" being on the page (where X is not the number I guessed) if I lost
- "You win!" being on the page if I win

### Button 3: To-do list

Your code should:

- Allow users to add items to a to-do list by way of a text input field and an "Add" button
- Allow users to "check" items off on this list
- Allow users to delete checked items off the list by clicking "Delete"

You are not required to build a delete button for each item on the list, only "checked" items.

Cypress will be searching for:

- An `input` field of type `text`
- A `button` with text "Delete"
- A `button` with text "Add"
- A `checkbox`, followed by a `label` that matches what it entered.

### Button 4: Nought and crosses

Your code should:

- Render a table on the page in a 3x3 grid
- Display whose turn it is by saying either "Noughts turn!" or "Crosses turn!"
- When the game is won, display "Noughts wins!" or "Crosses wins!"
- When the game is a draw, display "Draw!"

Cypress will be searching for:

- A `table`
- The text as above
- The `table` should allow me to click on _something_ in the cell or the cell itself
- The cells should contain 'X' for a played cross and 'O' (Capital o) for played Nought
- That I cannot play on an already played cell

### Button 5:

Your code should

- Render a `canvas` element within the `#renderhere` tag, at least 300px high and wide.
- Make the canvas work like a whiteboard - if the mouse button is held down and the mouse dragged on the canvas, it should paint on the canvas in black
- Please put a CSS border around the canvas so we can see where it is! (We'll need to test this one manually)

### Button 6:

Your code should:

- Render an `svg` element with the `#renderhere` tag, at least 300px high and wide.
- The SVG should show the graph of `sin(x)`. The full height of the SVG should be used to show the curve -- sin(x) varies between -1 and 1, but we'd like that to cover the full 300px height. We would like values of x from 0 to `2 * Math.PI` across the width of the SVG

### Button 7:

Your code should:

- Render an `svg` element with the `#renderhere` tag, at least 300px high and wide.
- The SVG should show the graph of `sin(k * x + t)`.
  - The value `k` should come from an input box on the page. It is a number, and editing the number should change the chart
  - The value `t` is the time, taken from `(new Date()).getTime()`
- The chart should update at least 30 times per second. Use the `setInterval()` function for this: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval

### Button 8: Mastermind

You will be building a game of [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game).

The computer will generate a 4 item sequence of 6 colours, and allow the user 8 guesses at the sequence.
Duplicates are allowed, blanks are not.

The computer will then report the result back to the user, with "W" being "Right colour, wrong slot", "B" being "Right colour, right slot", and "E" being "wrong color" (or too many of that colour).
You should calculate the "B" values first, followed by the "W", then the "E".
If the player/cypress guesses "A-N-N-A" and the code is "X-A-N-A", then it should see that the 3rd and 4th positions are both completely correct and have "X/A-A/N-B-B" ("X/A" and "A/N" being uncalculated at this point).
It should then see the "A" in the uncalculated area, and an "A" in the "too guess" sequence that hadn't been matched, so replace that with a "W" yielding "X/W-A/N-B-B" (with only the "A/N" being uncalculated)
It should then replace all that remains with "E" for a final output of "E-W-B-B".

Cypress will be looking for:

- 4 `select` menus with 6 colours in them (yes, I googled "obscure colour names" :P).
  1.  Xanadu
  2.  Arsenic
  3.  Fallow
  4.  Gamboge
  5.  Niagara
  6.  Cerise
  - The `select` menu must use their full text, the output must use the first letter (see below)
- A `button` element to submit its guess
- An `ol` list with the previous guesses it has made and the result.
  1. You guessed A-N-N-A (Result: W-E-B-B)
  2. You guessed G-A-N-A (Result: E-B-B-B)
  3. You guessed A-A-N-A (Result: E-B-B-B)
  4. You guessed X-A-N-A (Result: B-B-B-B)
  - Cypress will be searching for the sequence it entered separated by dashes, and the result separated by dashes, in an `li` under the first `ol` in `#renderhere` in a **case sensitive** manner. It won't search for the rest of the text (so go nuts on remarks the computer can make back)
- The `select` menu and `button` should all be disabled once a win has occurred, with "You win!" being visible
- The `select` menu and `button` should all be disabled once a loss has occured, with the select menus being set to the winning sequence and the text "You fool: my code was X-A-N-A" (with your actual code being displayed) appearing on the page.
- The select menus should retain its previous guess (if applicable)
- A "Turns remaining: X" (where X counts down from 8)

Users are able to submit a sequence they have submitted before (although that's at their detriment).

### Button 9: Grocery shopping!

In the index.html file we have specified a global variable called `grocery_shop`. Using the values this contains:

- Welcome users to the shop
- Allow the users to choose which isle they are shopping in
- Allow the users to add items to their cart
  - Costs for the items are defined in the JSON.
  - Users should be able to add multiple of the same item to their cart
- Below the items, the page should also display the running total cost of the order
