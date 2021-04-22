console.log("Hi! I am Ghosty...boo");

const petNameKey = 'PETNAME';
const petKey = 'PET';
const hunger = 'hunger';
const sleepiness = 'sleepiness';
const boredom = 'boredom';
const age = 'age';
const propertiesArr = [hunger, sleepiness, boredom, age];
let petObj = {}; //global object to store pet
let game = {};

function generateRandomInRange(lowerBound, upperBound) {
    return Math.floor(Math.random()*(upperBound-lowerBound+1)) + lowerBound;
}
class Pet {
    constructor(name) {
        this.name = name;
        this.age = generateRandomInRange(1000, 2000) + ' YEARS';
        this.hunger = 5;
        this.sleepiness = 5;
        this.boredom = 5;
    }
}
class Game {
    constructor(pet) {
        this.pet = pet;
        this.isGameOver = false;
        this.boredomOutcomes = [
            {
                scoreChange: -1,
                commentary: `Great job! ${this.pet.name} is having a lot of fun!!!`
            },
            {
                scoreChange: 1, 
                commentary: `You tried to play fetch with your ${this.pet.name}. It did not like it. It wants to play Haunt instead.`
            }
        ];
        this.hungerOutcomes = [
            {
                scoreChange: -1,
                commentary: `Yummm ${this.pet.name} loves cake!`
            },
            {
                scoreChange: 1, 
                commentary: `${this.pet.name} says "Yuck! I want cake. Not broccoli.`
            }
        ];
        this.sleepinessOutcomes = [
            {
                scoreChange: -1,
                commentary: `${this.pet.name} has too much energy. It refuses to sleep.`
            },
            {
                scoreChange: 1, 
                commentary: `${this.pet.name} slept like a ghost baby.`
            }
        ];
    }

    initialize() {
        this.displayStats();
        const initialMessage = `${this.pet.name} is so happy to be your pet! Take good care of it. Remember to feed it, play with it, and give it enough rest or it will die.`
        this.updateCommentary(initialMessage);
    }

    displayStats() {
        $('#name-val-label').text(this.pet.name);
        for(const property of propertiesArr) {
            this.updateScore(property);
        }
    }

    getRandomOutcome(propertyName) {
        let outcomesArrName = propertyName + 'Outcomes';
        const randomIndex = generateRandomInRange(0, this[outcomesArrName].length-1);
        console.log(this[outcomesArrName][randomIndex]);
        return this[outcomesArrName][randomIndex];
    }

    handleScoreChange(propertyName, changeAmount) {
        this.pet[propertyName] += changeAmount;
        if(this.pet[propertyName] < 1) {
            this.pet[propertyName] = 1;
        }
        if(this.pet[propertyName] >= 10){
            this.isGameOver = true;
        }
        this.updateScore(propertyName);
    }

    updateScore(propertyName) {
        let labelName = `#${propertyName}-val-label`;
        $(labelName).text(this.pet[propertyName]);
    }

    updateCommentary(message) {
        $('#game-commentary').text(message);
    }

    handle(propertyName) {
        const outcome = this.getRandomOutcome(propertyName);
        this.handleScoreChange(propertyName, outcome.scoreChange);
        this.updateCommentary(outcome.commentary);
    }
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
    game.handle(boredom);
});

$('#feed-button').on('click', function() {
    game.handle(hunger);
});

$('#sleep-button').on('click', function() {
    game.handle(sleepiness);
});

window.addEventListener("load", function(){
    if (window.location.pathname === '/pages/game.html') {
        console.log("Game loaded!");
        petObj = new Pet(getItem(petNameKey));
        game = new Game(petObj);
        game.initialize();
    }
});

