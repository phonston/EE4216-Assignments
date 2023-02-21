let lockBoard = false;
let flipCounter = 0;
let firstCard, secondCard, thirdCard;
let clicks = 0;
let score = 0;
let finalScore;

/* ---------------------------- Helper Functions ---------------------------- */
function getRandomArbitrary(min, max) {
  // generate a random number between min and max
  return Math.random() * (max - min) + min;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

/* ---------------------- Start of card game functions ---------------------- */

function start() {
  // Gets the number of cards from the set difficulty level
  const cardNum = document.querySelector("#diffLevel").value;
  finalScore = cardNum / 3;

  const gameBody = document.querySelector("#gamebody");

  // Clear out any leftover cards
  while (gameBody.firstChild) {
    gameBody.removeChild(gameBody.lastChild);
  }
  // Generate a map of pairs
  let randomNums = [];
  for (let i = 0; i < cardNum / 3; i++) {
    randomNums.push(i, i, i);
  }
  // Shuffle the pairs
  randomNums = shuffle(randomNums);

  console.log(randomNums);

  // Starts generating the cards
  for (let i = 0; i < cardNum; i++) {
    const newDiv = document.createElement("div");

    // This dataset id will determine the card's number
    newDiv.dataset.id = `${randomNums[i]}`;
    // Add class of "card" to the parent div which will contain
    // two img elements that are the front and back of the card
    newDiv.classList.add("card");

    const newImg1 = document.createElement("img");
    newImg1.src = `./assets/${randomNums[i] + 1}.jpg`;
    newImg1.alt = `${i % 10}`;
    newImg1.classList.add("frontFace");
    newImg1.classList.add("hidden");

    const newImg2 = document.createElement("img");
    newImg2.src = `./assets/facedown${Math.floor(
      getRandomArbitrary(1, 4)
    )}.jpg`;
    newImg2.alt = "2";
    newImg2.classList.add("backFace");

    newDiv.addEventListener("click", flipCard);
    newDiv.appendChild(newImg1);
    newDiv.appendChild(newImg2);
    gameBody.appendChild(newDiv);
  }

  const cards = document.querySelectorAll("card");
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

function flipCard() {
  this.firstChild.classList.remove("hidden");
  this.lastChild.classList.add("hidden");
  clicks++;
  switch (clicks) {
    case 1:
      console.log("clicked once");
      firstCard = this;
      return;
    case 2:
      console.log("clicked twice");
      secondCard = this;
      if (firstCard.dataset.id != secondCard.dataset.id) {
        console.log(firstCard.dataset.id == secondCard.dataset.id);
        console.log("not a match");
        unFlipCards();
      }
      return;
    case 3:
      console.log("clicked thrice");
      thirdCard = this;

      console.log(
        `comparing ${firstCard.dataset.id} and ${thirdCard.dataset.id}`
      );
      // Check if correct answer
      if (firstCard.dataset.id == thirdCard.dataset.id) winrar();
      else unFlipCards();

      return;

    default:
      return;
  }
}

function winrar() {
  console.log("adding score");
  reset();
  score++;
  clicks = 0;

  const scoreElement = document.querySelector("#score");
  scoreElement.innerHTML = `Current score: ${score}`;
  if (score == finalScore) {
    console.log("You win!");
  }
}

function reset() {
  [firstCard, secondCard, thirdCard] = [null, null, null];
}

function unFlipCards() {
  clicks = 0;
  setTimeout(() => {
    firstCard.firstChild.classList.add("hidden");
    firstCard.lastChild.classList.remove("hidden");
    secondCard.firstChild.classList.add("hidden");
    secondCard.lastChild.classList.remove("hidden");
    thirdCard.firstChild.classList.add("hidden");
    thirdCard.lastChild.classList.remove("hidden");
    reset();
  }, 700);
}
