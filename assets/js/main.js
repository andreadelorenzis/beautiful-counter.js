/* create buttons */
const buttons = `
  <div class="buttons__wrapper">
    <button class="buttons__increment">+</button>
  </div>
  <div class="buttons__wrapper">
    <button class="buttons__reset">Reset</button>
  </div>
  <div class="buttons__wrapper">
    <button class="buttons__decrement">-</button>
  </div>`;
let div = document.createElement('div');
div.innerHTML = buttons;
div.classList.add('buttons__container');
document.querySelector('.buttons').appendChild(div);

/* create counter */
const counter = `
    <div class="score-board__card-face score-board__card-face--front">0</div>
    <div class="score-board__card-face score-board__card-face--back">1</div>`;
div = document.createElement('div');
div.innerHTML = counter;
div.classList.add('score-board__card');
document.querySelector('.score-board__digit').appendChild(div);


/* global variables */
const scoreBoard = document.querySelector('.score-board');
const scoreBoardInner = document.querySelector('.score-board__inner');
const digit = document.querySelector('.score-board__digit');
let card = document.querySelector('.score-board__card');
const cardFaceFront = document.querySelector('.score-board__card-face--front');
const cardFaceBack = document.querySelector('.score-board__card-face--back');
const incrementBtn = document.querySelector('.buttons__increment');
const decrementBtn = document.querySelector('.buttons__decrement');
const resetBtn = document.querySelector('.buttons__reset');
let cardBaseFontSize;

/* set the base font size of the number depending on window size */
if (window.innerWidth >= 1000) {
  cardBaseFontSize = 250;
} else {
  cardBaseFontSize = 190;
}

/* add click listeners to buttons */
incrementBtn.addEventListener('click', increment);
decrementBtn.addEventListener('click', decrement);
resetBtn.addEventListener('click', reset);

/* increments the counter */
function increment() {
  if (digit.dataset.digitBefore < 9999) {

    /* flip the card down */
    setTimeout(() => {
      card.classList.add('flipped-down');
    }, 20);

    /* change the font of the digits depending on the size of the number */
    if (digit.dataset.digitBefore >= -10 &&
      digit.dataset.digitBefore < 10)
      setTimeout(() => {
        scoreBoard.style.fontSize = cardBaseFontSize + 'px';
      }, 260);
    if (digit.dataset.digitBefore >= 9 &&
      digit.dataset.digitBefore < 100)
      setTimeout(() => {
        scoreBoard.style.fontSize = (cardBaseFontSize - 60) + 'px';
      }, 260);
    if (digit.dataset.digitBefore >= 99 &&
      digit.dataset.digitBefore < 1000)
      setTimeout(() => {
        scoreBoard.style.fontSize = (cardBaseFontSize - 90) + 'px';
      }, 260);
    if (digit.dataset.digitBefore >= 999 &&
      digit.dataset.digitBefore < 10000)
      setTimeout(() => {
        scoreBoard.style.fontSize = (cardBaseFontSize - 110) + 'px';
      }, 260);

    /* disable the buttons */
    incrementBtn.disabled = true;
    decrementBtn.disabled = true;
    resetBtn.disabled = true;
    incrementBtn.classList.add('clicked');

    /* when the transition ends */
    card.addEventListener('transitionend', function () {

      /* increment previous number */
      digit.dataset.digitBefore++;
      card.childNodes[1].textContent = digit.dataset.digitBefore;

      /* clone the card, flip the card up and replace it */
      const cardClone = card.cloneNode(true);
      cardClone.classList.remove('flipped-down');
      digit.replaceChild(cardClone, card);
      card = cardClone;

      /* increment next number */
      digit.dataset.digitAfter++;
      card.childNodes[3].textContent = digit.dataset.digitAfter;

      /* enable the buttons */
      incrementBtn.disabled = false;
      decrementBtn.disabled = false;
      resetBtn.disabled = false;
      incrementBtn.classList.remove('clicked');

    }, { once: true });
  }
}

/* decrement the counter */
function decrement() {
  if (digit.dataset.digitBefore > -9999) {

    /* change the font of the digits depending on the size of the number */
    if (digit.dataset.digitBefore <= 10 &&
      digit.dataset.digitBefore >= -9)
      setTimeout(() => {
        scoreBoard.style.fontSize = cardBaseFontSize + 'px';
      }, 260);
    if (digit.dataset.digitBefore <= -9 &&
      digit.dataset.digitBefore >= -99)
      setTimeout(() => {
        scoreBoard.style.fontSize = (cardBaseFontSize - 60) + 'px';
      }, 260);
    if (digit.dataset.digitBefore <= -99 &&
      digit.dataset.digitBefore >= -9999)
      setTimeout(() => {
        scoreBoard.style.fontSize = (cardBaseFontSize - 90) + 'px';
      }, 260);
    if (digit.dataset.digitBefore <= -99 &&
      digit.dataset.digitBefore >= -9999)
      setTimeout(() => {
        scoreBoard.style.fontSize = (cardBaseFontSize - 110) + 'px';
      }, 260);

    /* disable the buttons */
    incrementBtn.disabled = true;
    decrementBtn.disabled = true;
    resetBtn.disabled = true;
    decrementBtn.classList.add('clicked');

    /* decrement next number */
    digit.dataset.digitAfter--;
    card.childNodes[3].textContent = digit.dataset.digitAfter;

    /* clone the card, flip the card down and replace it */
    const cardClone = card.cloneNode(true);
    cardClone.classList.add('flipped-down');
    digit.replaceChild(cardClone, card)
    card = cardClone;

    /* decrement previous number */
    digit.dataset.digitBefore--;
    card.childNodes[1].textContent = digit.dataset.digitBefore;

    /* flip the card up */
    setTimeout(() => {
      card.classList.remove('flipped-down');
    }, 20)

    /* when the transition ends */
    card.addEventListener('transitionend', function () {

      /* enable the buttons */
      incrementBtn.disabled = false;
      decrementBtn.disabled = false;
      resetBtn.disabled = false;
      decrementBtn.classList.remove('clicked');

    }, { once: true });
  }
}

/* resets the counter */
function reset() {

  /* set the base font size */
  setTimeout(() => {
    scoreBoard.style.fontSize = cardBaseFontSize;
  }, 260);

  /* disable the buttons */
  incrementBtn.disabled = true;
  decrementBtn.disabled = true;
  resetBtn.disabled = true;
  resetBtn.classList.add('clicked');

  /* set the next number equal to the previous number */
  digit.dataset.digitAfter = digit.dataset.digitBefore;
  card.childNodes[3].textContent = digit.dataset.digitAfter;

  /* clone the card, flip the card down and replace it */
  const cardClone = card.cloneNode(true);
  cardClone.classList.add('flipped-down');
  digit.replaceChild(cardClone, card);
  card = cardClone;

  /* set the previous number to zero */
  digit.dataset.digitBefore = 0;
  card.childNodes[1].textContent = 0;

  /* flip the card up */
  setTimeout(() => {
    card.classList.remove('flipped-down');
  }, 20)

  /* when the transition ends */
  card.addEventListener('transitionend', function () {

    /* set the next number to one */
    digit.dataset.digitAfter = 1;
    card.childNodes[3].textContent = 1;

    /* enable the buttons */
    incrementBtn.disabled = false;
    decrementBtn.disabled = false;
    resetBtn.disabled = false;
    resetBtn.classList.remove('clicked');

  }, { once: true });
}
