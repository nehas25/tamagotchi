console.log("Hi! I am Ghosty...boo");

const petNameKey = 'PETNAME';
const petKey = 'PET';

function generateRandomInRange(lowerBound, upperBound) {
    return Math.floor(Math.random()*(upperBound-lowerBound+1)) + lowerBound;
}

const boredomOutcomes = [
    {
        scoreChange: -1,
        commentary: `Great job! Your pet is having a lot of fun!!!`
    },
    {
        scoreChange: 1, 
        commentary: `You tried to play fetch with your pet. It did not like it. It wants to play Haunt instead.`
    }
]

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
    storeItem(petNameKey, nameEntered);
    window.location.href = '../pages/game.html';
});
class Pet {
    constructor(name) {
        this.name = name;
        this.age = generateRandomInRange(1000, 2000) + ' YEARS';
        this.hunger = 5;
        this.sleepiness = 5;
        this.boredom = 5;
    }
}

$('#play-button').on('click', function() {
    const boredomOutcome = boredomOutcomes[generateRandomInRange(0, boredomOutcomes.length-1)];
    console.log(boredomOutcome);
    const newBoredomVal = updatePetBoredom(boredomOutcome.scoreChange);
    displayNewScore('#boredom-val-label', newBoredomVal);
});

function updatePetBoredom(scoreChange) {
    const pet = getItem(petKey);
    pet.boredom += scoreChange;
    storeItem(petKey, pet);
    return pet.boredom;
}

function displayNewScore(label, newVal) {
        $(label).text(newVal);
}

function displayStats(petObj) {
    $('#name-val-label').text(petObj.name);
    $('#age-val-label').text(petObj.age);
    $('#hunger-val-label').text(petObj.hunger);
    $('#sleepiness-val-label').text(petObj.sleepiness);
    $('#boredom-val-label').text(petObj.boredom);
}

window.addEventListener("load", function(){
    if (window.location.pathname === '/pages/game.html') {
        console.log("Game loaded!");
        const petObj = new Pet(getItem(petNameKey));
        storeItem(petKey, JSON.stringify(petObj));
        displayStats(petObj);
    }
});

