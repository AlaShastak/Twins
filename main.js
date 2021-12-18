function makeDigitList(range) {
  let i = 0;
  let list = [];
  while (i < 2) {
    for (let num = 1; num < range + 1; num++) {
      list.push(num);
    }
    i++
  }
  return list;
}


function fisherSort(list) {

  for (let i in list) {
    let j = Math.floor(Math.random() * (list.length - 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}


function makeDiv(class_) {
  const div = document.createElement('div');
  div.classList.add(class_);
  return div;
}


function endConfirm(firstStr) {
  const askText = `${firstStr} \nПоменять кол-во карточек?`
  const ask = confirm(askText);
  if (ask) {
    window.location.href === window.location.href;
  } else {
    const cardCount = document.getElementsByClassName('play-card').length;
    document.querySelector('.container').remove();
    runPlay(cardCount);
  }
}


function makeCard(valueCard) {
  const li = document.createElement('li');
  li.classList.add('play-card', 'play-card--close');
  const p = document.createElement('p');
  p.classList.add('play-card__value');
  p.style.display = 'none';
  p.textContent = valueCard;
  const div = makeDiv('play-card__value-wrapper');
  div.append(p);
  li.append(div);
  return li;
}


function makeList(cardCount = 16, timer) {
  const range = cardCount / 2;
  const valueList = makeDigitList(range);

  fisherSort(valueList);
  const ul = document.createElement('ul');
  ul.classList.add('card-list');

  for (let valueCard of valueList) {
    // Создание карточки
    let li = makeCard(valueCard);
    li.style.width = 100 / 4 - 2 + "%";
    li.style.height = 100 / 4 - 2 + "%";
    // Обработка нажатия
    li.addEventListener('click', () => {
      if (document.querySelectorAll('.play-card--open').length >= 2) {
        document.querySelectorAll('.play-card--open').forEach(
          (item) => {
            item.classList.add('play-card--close');
            item.classList.remove('play-card--open');
          })
        li.classList.add('play-card--open');
        li.classList.remove('play-card--close');
        li.querySelector('.play-card__value').style.display = 'inline-block';
      } else {
        if (li.classList.contains('play-card--active')) {
          return
        }
        // Карта "переворачивается"
        li.classList.add('play-card--open');
        li.classList.remove('play-card--close');
        li.querySelector('.play-card__value').style.display = 'inline-block';
        if (document.querySelectorAll('.play-card--open').length === 2 /*|| document.querySelectorAll('.play-card--open').length === 0*/) {
          if (li.classList.contains('.play-card--active')) {
            return;
          }
          if (document.querySelectorAll('.play-card--open')[0].querySelector
          ('.play-card__value').textContent === document.querySelectorAll
          ('.play-card--open')[1].querySelector('.play-card__value').textContent) {
            document.querySelectorAll('.play-card--open').forEach(
              (item) => {
                item.classList.add('play-card--active');
                item.classList.remove('play-card--open');
                item.classList.remove('play-card--close');
              })
          }

        }
        if (document.getElementsByClassName('play-card').length === document.getElementsByClassName('play-card--active').length) {
          clearTimeout(timer);
          document.querySelector('.submit-again').classList.remove('hidden');
        }
      }
    })
    // Добавление получившийся карточки в список
    ul.append(li);
  }
  return ul;
}


function runPlay(cardCount) {
  // Таймер
  const timer = setTimeout(() => {
    endConfirm('Время вышло!')
  }, 60000);

  // Создание дом элементов
  const container = makeDiv('container');
  const ulFull = makeList(cardCount, timer);

  // Сборка DOM
  container.append(ulFull);
  document.body.append(container);
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const input = form.querySelector('.input--card-count');

  form.addEventListener('submit', (e) => {
    // Убираем перезагрузку страницы после нажатия кнопки
    e.preventDefault();
    form.style.display = 'none';

    // Валидация количества карточек
    let cardCount = input.value % 2 === 0 ? input.value : input.value - 1;
    if (cardCount === '') {
      cardCount = 8
    }
    // Запуск игры
    runPlay(cardCount);
  })
  document.querySelector('.submit-again').addEventListener('click', restart);
})

function restart() {
  document.querySelector('.submit-again').classList.add('hidden');
  document.querySelector('.form').style.display = 'block';
  document.querySelector('.container').classList.add('hidden');
}

/*// Находится последняя открытая карта
let selectedCard = document.getElementsByClassName('play-card--selected')[0];

// Проверка карты на одинаковое значение с последней открытой
// открытых карт ещё не было
if (selectedCard === undefined) {
  li.classList.add('play-card--selected');
  return
}*/

/*   // Значения карт не равны
   if (selectedCard.textContent !== li.textContent) {
     selectedCard.classList.add('play-card--close');
     setTimeout(() => {
       selectedCard.classList.remove('play-card--open');
       selectedCard.classList.remove('play-card--selected');
     }, 1500);
     li.classList.add('play-card--selected');
   }
   // Значения карт равны
   else {
     selectedCard.classList.remove('play-card--selected');
     setTimeout(() => {
       if (document.getElementsByClassName('play-card--close').length === 0) {
         // остановка таймера
         clearTimeout(timer);
         endConfirm('Победа!');
       }
     }, 100)
   }*/
/*
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));*/
