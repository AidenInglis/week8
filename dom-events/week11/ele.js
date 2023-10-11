//DOM Selector
const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentElement = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionElement = document.getElementById('question')
const answerElement = document.getElementById('answer')
const addQuestionBtn = document.getElementById('add-question')
const clearBtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')

// Keep track of current card
let currentActive = 0;
//Store DOM Cards
const cardsElement = []
//Store card data
const cardData = getCardData()

function createCards() {
    cardsData.forEach((data, index) => createCards(data, index)); //loop through the 
}

function createCard(data, index) { //Each cars will contain a question and answer
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }
    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
        <p>
            ${data.question}
        </p>
    </div>
    <div class="inner-card-back">
        <p>
            ${data.answer}
        </p>
    </div>
</div>
`;
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    // Add to DOM cards
    cardsEl.push(card);
    cardsContainer.appendChild(card);//put in in the container
    updateCurrentText();
}

//Show number of cards
function updateCurrentText() {
    currentElement.innerText = `${currentActive + 1}/${cardsEl.length}`;
}

//get cards from local storage
function getCardsData() {
    // local storage only store string so we will take the array fetch back as an array by using parse
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;// if the cards are null return an empty array
}

// Add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

//Event Listeners
nextBtn.addEventListener('click', () => {
    cardsEl[currentActive].className = 'card left';
    currentActive = currentActive + 1;
    if (currentActive > cardsEl.length - 1) {
        currentActive = cardsEl.length - 1;
    }
    cardsEl[currentActive].className = 'card active';
    updateCurrentText();
});

prevBtn.addEventListener('click', () => {
    cardsEl[currentActive].className = 'card right';
    currentActive = currentActive - 1;
    if (currentActive < 0) {
        currentActive = 0;
    }
    cardsEl[currentActive].className = 'card active';
    updateCurrentText();
});

//Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

//Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//Add new card
addQuestionBtn.addEventListener('click', () => {
    const question = questionElement.value;
    const answer = answerElement.value;
    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };
        createCard(newCard);
        questionElement.value = '';
        answerElement.value = '';
        addContainer.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

//Clear cards button
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});

