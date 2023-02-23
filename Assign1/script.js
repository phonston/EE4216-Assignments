let lockBoard = false;
let flipCounter = 0;
// Could implement an array system instead for more flexibility
let firstCard, secondCard, thirdCard;
let clicks = 0,
  score = 0,
  correctPairs = 0;
let finalScore;
// Variable used to check if the cards are currently flipping
// to prevent users from clicking cards too quickly
let flipping = false;
let time;
let myVar;
/* ---------------------------- Helper Functions ---------------------------- */
function updateScore(change) {
  score += change;
  document.querySelector("#score").innerHTML = `Current score: ${score}`;
}

function getRandomArbitrary(min, max) {
  // Generate a random number between min and max
  return Math.random() * (max - min) + min;
}

// Shuffle contents of array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Timer counter
function Timer() {
  time++;
  var date = new Date(0);
  date.setSeconds(time); // specify value for SECONDS here
  var timeString = date.toISOString().substring(11, 19);
  document.querySelector("#timer").innerHTML = `Time elapse: ${timeString}`;
}

// Reset variables
function resetHelper() {
  [clicks, score, flipCounter, correctPairs, time, flipping] = [
    0,
    0,
    0,
    0,
    true,
  ];
  reset();

  document.querySelector(
    "#moves"
  ).innerHTML = `Card(s) flipped: ${flipCounter}`;
  document.querySelector("#score").innerHTML = `Current score: ${score}`;
  document.querySelector("#gameOver").style.visibility = "hidden";
  if (myVar) clearInterval(myVar);
}

/* ---------------------- Start of card game functions ---------------------- */

function start() {
  resetHelper();
  // Gets the number of cards from the set difficulty level
  const cardNum = document.querySelector("#diffLevel").value;
  finalScore = cardNum / 3;

  const gameBody = document.querySelector("#gamebody");

  // Clear out any leftover cards
  while (gameBody.firstChild) gameBody.removeChild(gameBody.lastChild);

  // Generate a map of pairs
  let randomNums = [];
  for (let i = 0; i < cardNum / 3; i++) {
    randomNums.push(i, i, i);
  }
  // Shuffle the pairs
  randomNums = shuffle(randomNums);

  console.log(`Hey! No cheating!! ${randomNums}`);

  // Starts generating the cards
  for (let i = 0; i < cardNum; i++) {
    const newDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    // This dataset id will determine the card's number
    newDiv.dataset.id = `${randomNums[i]}`;
    // Add class of "card" to the parent div which will contain
    // two img elements that are the front and back of the card
    newDiv.classList.add("card");
    innerDiv.classList.add("content");

    const newImg1 = document.createElement("img");
    newImg1.src = `./assets/${randomNums[i] + 1}.jpg`;
    newImg1.alt = `${i % 10}`;
    newImg1.classList.add("backFace");

    const newImg2 = document.createElement("img");
    newImg2.src = `./assets/facedown${Math.floor(
      getRandomArbitrary(1, 4)
    )}.jpg`;
    newImg2.alt = "2";
    newImg2.classList.add("frontFace");

    newDiv.addEventListener("click", flipCard);
    innerDiv.appendChild(newImg1);
    innerDiv.appendChild(newImg2);
    newDiv.appendChild(innerDiv);
    gameBody.appendChild(newDiv);
  }

  // Add the flipping function to all cards generated
  const cards = document.querySelectorAll("card");
  cards.forEach((card) => card.addEventListener("click", flipCard));

  flipping = false;
  myVar = setInterval(Timer, 1000);
}

function flipCard() {
  // Prevents user from clicking cards too quickly
  if (flipping) return;

  // Prevent user from flipping cards that are already flipped
  if (this === firstCard || this === secondCard) return;
  this.lastChild.classList.add("flip");

  document.querySelector(
    "#moves"
  ).innerHTML = `Card(s) flipped: ${++flipCounter}`;

  clicks++;
  switch (clicks) {
    case 1:
      firstCard = this;
      return;
    case 2:
      secondCard = this;
      if (firstCard.dataset.id != secondCard.dataset.id) {
        console.log("not a match");
        updateScore(-2);
        unFlipCards();
      }
      return;
    case 3:
      thirdCard = this;

      console.log(
        `comparing ${firstCard.dataset.id} and ${thirdCard.dataset.id}`
      );
      // Check if correct answer
      if (firstCard.dataset.id == thirdCard.dataset.id) winrar();
      else {
        updateScore(-2);
        unFlipCards();
      }

      return;

    default:
      return;
  }
}

function winrar() {
  updateScore(5);
  correctPairs++;
  clicks = 0;

  if (correctPairs == finalScore) {
    document.querySelector("#gameOver").style.visibility = "visible";
    document.querySelector(
      "#finalScore"
    ).innerHTML = `You scored ${score} points!`;
  }

  clearInterval(myVar);
  reset();
}

function reset() {
  flipping = false;
  [firstCard, secondCard, thirdCard] = [null, null, null];
}

function unFlipCards() {
  clicks = 0;
  flipping = true;

  setTimeout(() => {
    if (firstCard) {
      firstCard.lastChild.classList.remove("flip");
    }
    if (secondCard) {
      secondCard.lastChild.classList.remove("flip");
    }
    if (thirdCard) {
      thirdCard.lastChild.classList.remove("flip");
    }
    reset();
  }, 700);
}
