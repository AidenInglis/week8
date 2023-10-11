// DOM Selector
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentElement = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const addQuestionBtn = document.getElementById('add-question');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActive = 0;
// Store DOM Cards
const cardsElement = [];
// Store card data
let cardsData = getCardsData(); 

function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    // Add to DOM cards
    cardsElement.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
}

function updateCurrentText() {
    currentElement.innerText = `${currentActive + 1}/${cardsElement.length}`;
}

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

nextBtn.addEventListener('click', () => {
    cardsElement[currentActive].className = 'card left';
    currentActive = currentActive + 1;
    if (currentActive > cardsElement.length - 1) {
        currentActive = cardsElement.length - 1;
    }
    cardsElement[currentActive].className = 'card active';
    updateCurrentText();
});

prevBtn.addEventListener('click', () => {
    cardsElement[currentActive].className = 'card right';
    currentActive = currentActive - 1;
    if (currentActive < 0) {
        currentActive = 0;
    }
    cardsElement[currentActive].className = 'card active';
    updateCurrentText();
});

showBtn.addEventListener('click', () => addContainer.classList.add('show'));
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

addQuestionBtn.addEventListener('click', () => {
    const question = questionElement.value.trim();
    const answer = answerElement.value.trim();
    if (question && answer) {
        const newCard = { question, answer };
        createCard(newCard, cardsElement.length);
        questionElement.value = '';
        answerElement.value = '';
        addContainer.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});
