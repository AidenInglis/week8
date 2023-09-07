const main = document.getElementById('main')//main div
const addUserBtn = document.getElementById('add-user')//add a user button
const doubleBtn = document.getElementById('double')//double button. doubles the money of each user
const showMillionairesBtn = document.getElementById('show-millionaires')//show only the millionaires button
const sortBtn = document.getElementById('sort')//sort whos the richest. 
const calculateWealthBtn = document.getElementById('calculate-wealth')//calcutaing entire wealth.

// Set up a data store using an array
let data = [];

// Random User Function.
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,//this is an objects.
        money: Math.floor(Math.random() * 10000000)//random number function.
    }
}

//Sort
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
}

// update DOM
function updateDOM(providedData = data) {
    //Clear the main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
}

// Event Listeners 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);