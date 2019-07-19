/**
 * This file contains the provided tests that will be run on the HTML and JavaScript
 */

describe('The Assignment Page', function () {
  it('loads in the browser', function () {
      cy.visit('/') // change URL to match your dev URL
  });
  it('has all nine buttons and the render area', function () {
      cy.visit('/');
      for (let i = 0; i < 10; i++) {
          cy.get('#button' + i).should('be.visible');
      }
      cy.get('#renderhere').should('be.visible');
  })
});
//Change this to alter the number of games it plays in buttons 2 and 8
const numGamesToPlay = 5;

const mastermindColours = [
  'Xanadu', 'Arsenic', 'Fallow',
  'Gamboge', 'Niagara', 'Cerise'
];

const mastermindInitialSequence = (() => {
  const finalSequence = [];
  for (let a of mastermindColours) {
      for (let b of mastermindColours) {
          for (let c of mastermindColours) {
              for (let d of mastermindColours) {
                  finalSequence.push([a, b, c, d]);
              }
          }
      }
  }
  return finalSequence;
})();

// describe('Button 8', function () {
//   beforeEach(function () {
//       cy.get('#button8').click();
//   });
//   it('should display the initial game state', function () {
//       cy.get('#renderhere select');
//       cy.get('#renderhere select').first().should('not.be.disabled');
//       cy.get('#renderhere select').should('have.length', 4);
//       mastermindColours.forEach((colour) => {
//           cy.get('#renderhere option').contains(colour).should('have.length', 4);
//       });
//       cy.get('#renderhere select option:nth-child(6)').should('have.length', 4);
//       cy.get('#renderhere button').contains('Submit');
//   });
//   it('should allow me to submit something and get a read-out', function () {
//       cy.get('#renderhere select').first().select('Xanadu');
//       cy.get('#renderhere select').eq(1).select('Arsenic');
//       cy.get('#renderhere select').eq(3).select('Arsenic');
//       cy.get('#renderhere select').eq(2).select('Niagara');
//       cy.get('#renderhere button').click();
//       cy.log('One play should get me one read out, and no more.');
//       cy.get('#renderhere ol > li:nth-child(2)').should('not.exist');
//       cy.get('#renderhere ol > li').contains(/X-A-N-A/);
//       cy.get('#renderhere ol > li').contains(/[EWB]-[EWB]-[EWB]-[EWB]/);
//       cy.get('#renderhere select').eq(0).find('option').contains('Xanadu').should('be.selected');
//       cy.get('#renderhere select').eq(1).find('option').contains('Arsenic').should('be.selected');
//       cy.get('#renderhere select').eq(2).find('option').contains('Niagara').should('be.selected');
//       cy.get('#renderhere select').eq(3).find('option').contains('Arsenic').should('be.selected');
//   });
//   it('should allow me to lose one game in ' + numGamesToPlay, function () {
//       const testForWinning = (steps, times) => {
//           if (times >= numGamesToPlay) {
//               return cy.get('#thisiddoesn\'texist' + (Math.random() * 2000));
//           }
//           if (steps === 0) {
//               cy.get('#renderhere select').first().select('Xanadu');
//               cy.get('#renderhere select').eq(1).select('Arsenic');
//               cy.get('#renderhere select').eq(3).select('Arsenic');
//               cy.get('#renderhere select').eq(2).select('Niagara');
//               cy.get('#renderhere button').click();
//               cy.get('#renderhere ol > li')
//                   .contains('X-A-N-A')
//                   .then(($obj) => {
//                       if ($obj.get(0).innerText.indexOf('B-B-B-B')) {
//                           return testForWinning(0, times + 1);
//                       } else {
//                           cy.get('#renderhere')
//                               .contains('You win!')
//                               .should('not.exist');
//                           return testForWinning(1, times);
//                       }
//                   })
//           } else if (steps === 8) {
//               cy
//                   .get('#renderhere')
//                   .contains(/You fool: my code was [XAFGNC]-[XAFGNC]-[XAFGNC]-[XAFGNC]/);
//               return cy
//                   .get('#renderhere')
//                   .contains(/You fool: my code was X-A-N-A/)
//                   .should('not.exist');
//           } else {
//               cy.get('#renderhere button').click();
//               cy.get('#renderhere ol > li:nth-child(' + (steps + 1) + ')').contains('X-A-N-A');
//               cy.get('#renderhere').contains('You fool: my code was').should('not.exist');
//               return testForWinning(steps + 1, times);
//           }
//       };
//       testForWinning(0, 0)
//   });
//   it('should allow me to win one game in ' + numGamesToPlay, function () {
//       const playSequence = (seq) => {
//           seq.forEach((c, indx) => {
//               cy.get('#renderhere select')
//                   .eq(indx)
//                   .select(c);
//           });
//           return cy.get('#renderhere button').click();
//       };
//       const playGame = (playWithSeq = ['Arsenic', 'Arsenic', 'Niagara', 'Niagara'], playSpace = mastermindInitialSequence, steps = 1) => {
//           if (steps > 8 || playSpace.length < 1 || playWithSeq.length !== 4) {
//               cy.log('I\'ve lost, but that is mathematically impossible');
//               return cy.get('#thisiddoesn\'texist' + (Math.random() * 2000));
//           }
//           playSequence(playWithSeq);
//           cy.get('#renderhere')
//               .then(($obj) => {
//                   const iT = $obj.get(0).innerText;
//                   if ([iT.indexOf('B-B-B-B'), iT.indexOf('You win!')].indexOf(-1) !== -1) {
//                       //I've won!
//                       [0, 1, 2, 3].forEach((i) => {
//                           cy.get('#renderhere select')
//                               .eq(i)
//                               .should('be.disabled')
//                       });
//                       return cy
//                           .get('#renderhere button')
//                           .should('be.disabled');
//                   } else {
//                       //OK, I've failed this one! Now to reduce the possible play space
//                       return cy
//                           .get('#renderhere ol li:last-child')
//                           .contains((() => {
//                               playWithSeq.map((s) => s.slice(0, 1)).join('-')
//                           })())
//                           .then(($obj) => {
//                               const inT = $obj.get(0).innerText;
//                               const ix = inT.search(/[EWB]-[EWB]-[EWB]-[EWB]/);
//                               const iT = iT.slice(ix, ix + 7).split('-');
//                               //Lovely, now I know my result!
//                               const nextPlaySpace = playSpace
//                                   .filter(
//                                       (seq) => {
//                                           const passedColours = [];
//                                           let failed = iT.reduce((failed, resCode, resIndx) => {
//                                               const f = failed || (resCode === "B" && seq[resIndx] !== playWithSeq[resIndx]);
//                                               if (!f) {
//                                                   passedColours.push(playWithSeq[resIndx]);
//                                               }
//                                               return f;
//                                           }, false);
//                                           failed = failed || iT.reduce((failed, resCode, resIndx) => {
//                                               if (resCode === "W") {
//                                                   passedColours.push(playWithSeq[resIndx]);
//                                                   return seq[resIndx] === playWithSeq[resIndx]
//                                               } else {
//                                                   return failed;
//                                               }
//                                           });
//                                           //OK, we can now filer out if they have too many of a colour!
//                                           failed = failed || mastermindColours.every((clr) => {
//                                               return seq.filter((c) => c === clr).length >= passedColours.filter((c) => c === clr).length;
//                                           });
//                                           if (passedColours.length === 4) {
//                                               failed =
//                                                   failed || mastermindColours
//                                                       .filter((c) => passedColours.indexOf(c) === -1)
//                                                       .every((c) => seq.indexOf(c) === -1)
//                                           }
//                                           //Now we eliminate the ones where they are flat out wrong.
//                                           failed = failed || iT.reduce((failed, resCode, resIndx) => {
//                                               if (resCode === "E") {
//                                                   return seq[resIndx] === playWithSeq[resIndx];
//                                               } else {
//                                                   return failed;
//                                               }
//                                           });
//                                           return !failed;
//                                       }
//                                   );
//                               return playGame(nextPlaySpace[0], nextPlaySpace, steps + 1);
//                           });
//                   }
//               })
//       };
//       Cypress._.times(numGamesToPlay, (i) => {
//           cy.get('#button8').click();
//           playGame();
//       });
//   })
// });

describe('Button 4', function () {
  beforeEach(function () {
      cy.get('#button4').click();
  });
  const playSequence = (seq, crosses = true) => {
      if (seq.length === 0) {
          return cy.get('#renderhere table');
      } else {
          cy.log('Clicking ' + seq[0]);
          const selector = '#renderhere table tr:nth-child(' + (Math.ceil((seq[0]) / 3)) + ') td:nth-child(' + (((seq[0] - 1) % 3) + 1) + ')'
          cy.get(selector)
          .click({
              force: true
            });
            cy.get(selector)
            .contains(crosses ? 'X' : 'O');
          return playSequence(seq.slice(1), !crosses);
      }
  };
  it('Should render a table and instructions', function () {
      cy.get('#renderhere table');
      cy.get('#renderhere')
          .contains('Crosses turn!');
      playSequence([9], true);
      cy.get('#renderhere')
          .contains('Noughts turn!');
      playSequence([1], false);
      cy.get('#renderhere')
          .contains('Crosses turn!');
  });
  it('Should correctly forbid clicking a cell again', function () {
      cy.get('#renderhere')
          .contains('Crosses turn!');
      playSequence([9], true);
      cy.get('#renderhere')
          .contains('Noughts turn!');
      cy.get('#renderhere table tr:nth-child(3) td:nth-child(3)')
          .click();
      cy.get('#renderhere')
          .contains('Noughts turn!');
      cy.get('#renderhere table tr:nth-child(3) td:nth-child(3)')
          .contains('X');
  });
  it('Should not let me play after a win', function () {
      playSequence([9, 1, 8, 2, 7]);
      cy.get('#renderhere')
          .contains('Crosses win');
      cy.get('#renderhere table tr:nth-child(2) td:nth-child(2)')
          .click();
      cy.get('#renderhere')
          .contains('Crosses win');
      cy.get('#renderhere table tr:nth-child(2) td:nth-child(2)')
          .contains('X').should('not.exist');
      cy.get('#renderhere table tr:nth-child(2) td:nth-child(2)')
          .contains('O').should('not.exist')
  });
  it('should correctly identify several possible wins', function () {
      [
          [9, 1, 8, 2, 7],
          [1, 9, 2, 8, 5, 7],
          [1, 2, 4, 5, 7],
          [9, 1, 2, 4, 5, 7],
          [3, 1, 7, 9, 5],
          [1, 5, 2, 3, 6, 7],
          [1, 2, 6, 3, 9, 4, 8, 7, 5]
      ].forEach((seq) => {
          cy
              .get('#button4')
              .click();
          const whoWon = seq.length % 2 === 0 ? 'Noughts' : 'Crosses';
          playSequence(seq);
          cy.get('#renderhere')
              .contains(whoWon + ' win');
      })
  });
  it('should correctly identify several possible draws', function () {
      [
          [3, 1, 4, 2, 5, 6, 8, 7, 9],
          [1, 3, 2, 4, 6, 5, 7, 8, 9],
      ].forEach((seq) => {
          cy
              .get('#button4')
              .click();
          playSequence(seq);
          cy.get('#renderhere')
              .contains('Draw!');
      })
  })
});

describe('Button 3', function () {
  beforeEach(function () {
      cy.get('#button3').click();
  });
  it('should render a text input field and two buttons', function () {
      cy.get('#renderhere input[type="text"]');
      cy.get('#renderhere button').contains('Add');
      //cy.get('#renderhere button').contains('Delete');
  });
  it('should not let me enter nothing into the text field', function () {
      cy.get('#renderhere button')
          .contains('Add')
          .click();
      cy.get('#renderhere label')
          .should('not.exist');
  });
  it('should have a delete button and a label after adding something (if not earlier)', function () {
      cy.get('#renderhere input[type="text"]').type('Wolololo ');
      cy.get('#renderhere button')
          .contains('Add')
          .click();
      cy.get('#renderhere label');
      cy.get('#renderhere button')
          .contains('Delete')
  });
  it('should let me freely add and remove items', function () {
      Cypress._.times(5, (i) => {
          cy.get('#renderhere input[type="text"]').type('Test ' + i);
          cy.get('#renderhere button')
              .contains('Add')
              .click();
          cy
              .get('#renderhere label')
              .contains('Test ' + i)
              .should('be.visible');
      });
      cy.log('Deleting nothing should delete nothing!');
      cy.get('#renderhere button').contains('Delete').click();
      Cypress._.times(5, (i) => {
          cy.get('#renderhere label')
              .contains('Test ' + i)
              .should('be.visible');
      });
      cy.log('Deleting two items should work');
      //OK, we have 5 items, now let's grab some items
      cy.get('#renderhere label').contains('Test 2').prevAll('input[type="checkbox"]').check();
      cy.get('#renderhere label').contains('Test 4').prevAll('input[type="checkbox"]').check();
      cy.get('#renderhere button').contains('Delete').click();
      Cypress._.times(5, (i) => {
          cy.get('#renderhere label')
              .contains('Test ' + i)
              .should([2, 4].indexOf(i) === -1 ? 'be.visible' : 'not.exist');
      });
      cy.log('Now we should be able to add an item and not return any to the list');
      cy.get('#renderhere input[type="text"]').type('Test 5');
      cy.get('#renderhere button')
          .contains('Add')
          .click();
      cy
          .get('#renderhere label')
          .contains('Test 5')
          .should('be.visible');
      cy
          .get('#renderhere label')
          .contains('Test 4')
          .should('not.exist');
      cy.log('Now delete them all!');
      cy.get('#renderhere input[type="checkbox"]').check();
      cy.get('#renderhere button').contains('Delete').click();
      cy.get('#renderhere label').should('not.exist');
      cy.get('#renderhere input[type="checkbox"]').should('not.exist');
  });
});

describe('Button 2', function () {
  it('should render a number input field, a button, and how many times I have guessed (0)', function () {
      cy.get('#button2').click();
      cy.get('#renderhere').within($form => {
          cy.get('input[type="number"]').should('be.visible');
          cy.get('button').should('be.visible');
          cy.get('span[data-output="guesses"]').contains('0').should('be.visible');
      })

  });
  it('should reject me clicking submit without guessing a number (and keep me at 0 guesses)', function () {
      cy.get('#button2').click();
      cy.get('#renderhere button').click();
      cy.get('#renderhere span[data-output="guesses"]').contains('0').should('be.visible');
      cy.get('#renderhere input[type="number"]')
          .should('be.visible')
          .and(($input) => {
              expect($input.get(0).checkValidity(), 'Validation check').to.equal(false);
              expect($input.get(0).validity.valueMissing, 'Value missing check').to.equal(true);
          })
  });
  it('should reject me clicking submit while guessing too low (and keep me at 0 guesses)', function () {
      cy.get('#button2').click();
      cy.get('#renderhere input[type="number"]')
          .type('-1');
      cy.get('#renderhere button').click();
      cy.get('#renderhere span[data-output="guesses"]').contains('0').should('be.visible');
      cy.get('#renderhere input[type="number"]')
          .should('be.visible')
          .and(($input) => {
              expect($input.get(0).checkValidity(), 'Validation check').to.equal(false);
              expect($input.get(0).validity.rangeUnderflow, 'Range underflow check').to.equal(true);
          })
  });
  it('should reject me clicking submit while guessing too high (and keep me at 0 guesses)', function () {
      cy.get('#button2').click();
      cy.get('#renderhere input[type="number"]')
          .type('999999');
      cy.get('#renderhere button').click();
      cy.get('#renderhere span[data-output="guesses"]').contains('0').should('be.visible');
      cy.get('#renderhere input[type="number"]')
          .should('be.visible')
          .and(($input) => {
              expect($input.get(0).checkValidity(), 'Validation check').to.equal(false);
              expect($input.get(0).validity.rangeOverflow, 'Range underflow check').to.equal(true);
          })
  });
  it('should let me lose at least 1 in ' + numGamesToPlay + ' games', function () {
      cy.get('#button2').click();
      const testForWinning = (steps, times) => {
          if (times >= numGamesToPlay) {
              return cy.get('#thisiddoesn\'texist' + (Math.random() * 2000));
          }
          let guess = '1';
          cy.log('Guessing ' + guess);
          cy.get('#renderhere input[type="number"]')
              .clear().type(guess);
          cy.get('#renderhere button')
              .click();
          cy.wait(5);
          cy
              .get('#renderhere')
              .then(($obj) => {
                  //cy.get()
                  const it = $obj.get(0).innerText;
                  if (it.indexOf('You win!') !== -1) {
                      cy.log('I won! Or I think I did.');
                      cy.get('#renderhere button').should('not.exist');
                      cy.get('#renderhere input').should('not.exist');
                      cy.get('#button2').click();
                      return testForWinning(0, times + 1)
                  } else {
                      //OK!
                      cy.log('My guess was wrong');
                      if (steps === 4) {
                          cy.get('#renderhere')
                              .contains('number I was thinking of was');
                          return cy.get('#renderhere')
                              .contains(/number I was thinking of was 1[$.!]/i)
                              .should('not.exist');
                      } else {
                          cy.get('#renderhere button')
                              .should('be.visible');
                          cy.get('#renderhere input[type="number"]')
                              .should('be.visible');
                          cy.get('#renderhere span[data-output="guesses"]')
                              .contains((steps + 1).toString())
                              .should('be.visible');
                          if (it.indexOf('too high') !== -1) {
                              return testForWinning(steps + 1, times);
                              //currState.lowerThan = guess;
                          } else if (it.indexOf('too low') !== -1) {
                              return testForWinning(steps + 1, times)
                          } else {
                              cy.log(it);
                              cy.log('Except I can\'t tell if I was too high or too low!');
                              if (it.indexOf('number I was thinking of was') !== -1) {
                                  cy.log('It seems I somehow lost, but I should have more turns...');
                              } else {
                                  cy.log('I have no idea what is going on...')
                              }
                              return cy.get('#thisiddoesn\'texist' + (Math.random() * 2000));
                              //expect(false, 'Well, I think this is borked! Try again :P').to.equal(true);
                          }
                      }
                  }
              });
      };
      testForWinning(0, 0);
  });
  it('should let me win ' + numGamesToPlay + ' times', function () {
      //This should be possible in one game
      // Assuming I always guess alternating low and high
      // 10, 15, 12, 14, 13
      //Is one of the longest possible paths I can take.
      const testForWinning = (steps, biggerThan, lessThan) => {
          let guess = Math.min(Math.max(Math.floor((biggerThan + lessThan) / 2), 1), 20).toString();
          cy.log('Guessing ' + guess);
          cy.log('biggerThan ' + biggerThan);
          cy.log('lessThan ' + lessThan);
          cy.get('#renderhere input[type="number"]')
              .clear().type(guess);
          cy.get('#renderhere button')
              .click();
          cy.wait(5);
          cy
              .get('#renderhere')
              .then(($obj) => {
                  //cy.get()
                  const it = $obj.get(0).innerText;
                  if (it.indexOf('You win!') !== -1) {
                      cy.log('I won! Or I think I did.');
                      cy.get('#renderhere button').should('not.exist');
                      return cy.get('#renderhere input').should('not.exist');
                  } else {
                      //OK!
                      cy.log('My guess was wrong');
                      if (steps === 4) {
                          return cy.get('#thisiddoesn\'texist' + guess + (Math.random() * 2000));
                      }
                      cy.get('#renderhere button')
                          .should('be.visible');
                      cy.get('#renderhere input[type="number"]')
                          .should('be.visible');
                      cy.get('#renderhere span[data-output="guesses"]')
                          .contains((steps + 1).toString())
                          .should('be.visible');
                      if (it.indexOf('too high') !== -1) {
                          cy.log('Seems I was too high. Changing my possible max to be lower');
                          return testForWinning(steps + 1, biggerThan, parseInt(guess));
                          //currState.lowerThan = guess;
                      } else if (it.indexOf('too low') !== -1) {
                          cy.log('Too low? Cool cool, move my minimum up a bit!');
                          return testForWinning(steps + 1, parseInt(guess), lessThan)
                      } else {
                          cy.log(it);
                          cy.log('Except I can\'t tell if I was too high or too low!');
                          if (it.indexOf('number I was thinking of was') !== -1) {
                              cy.log('It seems I somehow lost, but that is mathematically impossible');
                          } else {
                              cy.log('I have no idea what is going on...')
                          }
                          return cy.get('#thisiddoesn\'texist' + guess + (Math.random() * 2000));
                          //expect(false, 'Well, I think this is borked! Try again :P').to.equal(true);
                      }
                  }
                  return this;
              });
      };
      Cypress._.times(numGamesToPlay, (i) => {
          cy.get('#button2').click();
          testForWinning(0, 0, 21);
      });
  });
});