console.log("Hi! I am Ghosty...boo");
let petGhost;

$('#coffin-btn').click(function() {
    window.location.href = 'pages/name-form.html';
});

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

// When pet's name is entered, take to game page
$('#name-form').on('submit', function(event) {
    event.preventDefault();
    localStorage.setItem('petName', petName);
    window.location.href = '../pages/game.html';
});

function createPet(petName) {
    petGhost = new Pet(petName);
}

function displayStats() {
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
        createPet(petName);
        displayStats();
    }
});