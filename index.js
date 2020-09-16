// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 *    Counter1 created a closure so the count can be saved in the counter1 variable that calls the function.
 * 2. Which of the two uses a closure? How can you tell?
 *    Counter1 uses a closure because the function within the function give it the ability to save the count
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better?
 *    Counter1 might be better if one was trying to keep score. Counter2 might be better if the count variable needs to be accessed by multiple functions or changed later. 
 *
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

const scoring = function () {
  return Math.floor(Math.random() * 3);
};

//console.log(inning());

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 

function finalScore(callBack, numOfInnings){

  let score1 = 0;
  let score2 = 0;
  let final = {};

    for (let i = 0; i < numOfInnings; i++) {
      score1 = score1 + callBack();
      score2 = score2 + callBack();
    };  
    final = {home: score1, away: score2};

  return final;

}

console.log(finalScore(scoring, 9));
//`Inning: ${i+1} Score: Home ${score1} Away ${score2}`; For testing the output
/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */

const getInningScore = function (cbScoring){
  return {Home: cbScoring(), Away: cbScoring()}
};
console.log(getInningScore(scoring));

//4
function scoreboard(cbInningScore, cbScoring, numOfInnings) {
  const runningScore = [];

  let home = 0;
  let away = 0;

 
  for (let i = 0; i < numOfInnings; i++) {
    const currentInning = cbInningScore(cbScoring);
    home = home + currentInning.Home;
    away = away + currentInning.Away;
    runningScore.push(`Inning ${i + 1}: Away ${currentInning.Away} - Home ${currentInning.Home}`);
  }
  
  if (home === away) {
    runningScore.push(`Tie game!`);
  }else{
    runningScore.push(`Final Score: Away ${away} - Home ${home}`);
  }
  return runningScore;
};


console.log(scoreboard(getInningScore, scoring , 9));
