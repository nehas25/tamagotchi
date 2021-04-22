console.log("Hi! I am Ghosty...boo");
let petName;
let petGhost;
// const pet = 'PET';
// const petName = 'PETNAME';

const boredomOutcomes = [
    {
        scoreChange: -1,
        commentaary: `Great job! Your pet is having a lot of fun!!!`
    },
    {
        scoreChange: 1, 
        commentaary: `You tried to play fetch with your pet. It did not like it. It wants to play Haunt instead.`
    }
]

$('#coffin-btn').click(function() {
    window.location.href = 'pages/name-form.html';
});

function generateRandomInRange(lowerBound, upperBound) {
    return Math.floor(Math.random()*(upperBound-lowerBound+1)) + lowerBound;
}

function updatePetBoredom(scoreChange) {
    const pet = JSON.parse(localStorage.getItem('pet'));
    pet.boredom += scoreChange;
    console.log(`Pet after score change: `, pet);
    localStorage.setItem('pet', JSON.stringify(pet));
    return pet.boredom;
}

function displayNewScore(label, newVal) {
        $(label).text(newVal);
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

function play() {
    const boredomOutcome = boredomOutcomes[generateRandomInRange(0, boredomOutcomes.length-1)];
    console.log(boredomOutcome);
    const newBoredomVal = updatePetBoredom(boredomOutcome.scoreChange);
    displayNewScore('#boredom-val-label', newBoredomVal);
}

// When pet's name is entered, take to game page
$('#name-form').on('submit', function(event) {
    event.preventDefault();
    petName = $('#name-textbox').val();
    localStorage.setItem('petName', petName);
    window.location.href = '../pages/game.html';
});

function displayStats(petGhost) {
    $('#name-val-label').text(petGhost.name);
    $('#age-val-label').text(petGhost.age);
    $('#hunger-val-label').text(petGhost.hunger);
    $('#sleepiness-val-label').text(petGhost.sleepiness);
    $('#boredom-val-label').text(petGhost.boredom);
}

window.addEventListener("load", function(){
    if (window.location.pathname === '/pages/game.html') {
        console.log("Game loaded!");
        const petName = localStorage.getItem('petName');
        console.log(petName);
        const petGhost = new Pet(petName);
        localStorage.setItem('pet', JSON.stringify(petGhost));
        displayStats(petGhost);
    }
});

$('#play-button').on('click', function() {
    const pet = JSON.parse(window.localStorage.getItem('pet'));
    console.log(pet)
    play();
});