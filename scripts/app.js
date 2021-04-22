console.log("Hi! I am Ghosty...boo");
let petName;
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
        this.age = generateRandomInRange(1000, 5000);
        this.hunger = 5;
        this.sleepiness = 5;
        this.boredom = 5;
    }
}

// When pet's name is entered, take to game page
$('#name-form').on('submit', function(event) {
    event.preventDefault();
    console.log('petName Before: ' + petName);
    petName = $('#name-textbox').val();
    console.log('petName After: ' + petName);

    petGhost = new Pet(petName);

    window.location.href = '../pages/game.html';
    event.preventDefault();
    $('#name-val-label').text(petGhost.name);
    $('#age-val-label').text(petGhost.age);
    console.log(`Writing pet name: ${petGhost.name}`);
});



// $(document.window.).ready(function(){

// });
