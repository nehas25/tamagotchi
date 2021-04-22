console.log("Hi! I am Ghosty...boo");

const petNameKey = 'PETNAME';
const petKey = 'PET';
let petObj = {}; //global object to store pet

class Pet {
    constructor(name) {
        this.name = name;
        this.age = generateRandomInRange(1000, 2000) + ' YEARS';
        this.hunger = 5;
        this.sleepiness = 5;
        this.boredom = 5;
    }
}

// class Game {
//     constructor(pet) {
//         this.pet = pet;
//     }
//     handlePlay() {

//     }
// }

function generateRandomInRange(lowerBound, upperBound) {
    return Math.floor(Math.random()*(upperBound-lowerBound+1)) + lowerBound;
}


//When coffin button is clicked, navigate to Name Form page
$('#coffin-btn').click(function() {
    window.location.href = 'pages/name-form.html';
});

//Function to store from local storage
function storeItem(keyName, value) {
    if(keyName === petNameKey) {
        localStorage.setItem(petNameKey, value);
    }
    if(keyName === petKey) {
        localStorage.setItem(petKey, JSON.stringify(value));
    }
}

//Function to retrieve item from local storage
function getItem(keyName) {
    if(keyName === petNameKey) {
        return localStorage.getItem(petNameKey);
    }
    if(keyName === petKey) {
        return new Pet(JSON.parse(localStorage.getItem(petKey)));
    }
}

// When pet's name is entered, store name in local storage and navigate to game page
$('#name-form').on('submit', function(event) {
    event.preventDefault();
    let nameEntered = $('#name-textbox').val();
    storeItem(petNameKey, nameEntered.toUpperCase());
    window.location.href = '../pages/game.html';
});

$('#play-button').on('click', function() {
    const boredomOutcomes = [
    {
        scoreChange: -1,
        commentary: `Great job! ${petObj.name} is having a lot of fun!!!`
    },
    {
        scoreChange: 1, 
        commentary: `You tried to play fetch with your ${petObj.name}. It did not like it. It wants to play Haunt instead.`
    }
]

    const boredomOutcome = boredomOutcomes[generateRandomInRange(0, boredomOutcomes.length-1)];
    $('#game-commentary').text(boredomOutcome.commentary);
    updatePetBoredom(boredomOutcome.scoreChange);
    updateBoredomScore();
});

function updatePetBoredom(scoreChange) {
    petObj.boredom += scoreChange;
}

function updateBoredomScore() {
    $('#boredom-val-label').text(petObj.boredom);
}

function displayStats(petObj) {
    $('#name-val-label').text(petObj.name);
    $('#age-val-label').text(petObj.age);
    $('#hunger-val-label').text(petObj.hunger);
    $('#sleepiness-val-label').text(petObj.sleepiness);
    updateBoredomScore();
}

window.addEventListener("load", function(){
    if (window.location.pathname === '/pages/game.html') {
        console.log("Game loaded!");
        petObj = new Pet(getItem(petNameKey));
        displayStats(petObj);
        $('#game-commentary').text(`${petObj.name} is so happy to be your pet! Take good care of it. Remember to feed it, play with it, and give it enough rest or it will die.`);
    }
});

