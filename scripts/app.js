const petNameKey = 'PETNAME';
const petKey = 'PET';
const hunger = 'hunger';
const sleepiness = 'sleepiness';
const boredom = 'boredom';
const age = 'age';
const interval = 7000;
const ageInterval = 15000;
const propertiesArr = [hunger, sleepiness, boredom, age];
let petObj = {}; //global object to store pet
let game = {};

function generateRandomInRange(lowerBound, upperBound) {
    return Math.floor(Math.random()*(upperBound-lowerBound+1)) + lowerBound;
}
class Pet {
    constructor(name) {
        this.name = name;
        this.age = generateRandomInRange(1000, 2000);
        this.hunger = 5;
        this.sleepiness = 5;
        this.boredom = 5;
    }
}
class Game {
    constructor(pet) {
        this.pet = pet;
        this.timers = {};
        this.boredomOutcomes = [
            {
                scoreChange: -1,
                commentary: `Great job! ${this.pet.name} is having a lot of fun!!!`,
                animationKey: 'love'
            },
            {
                scoreChange: 1, 
                commentary: `You tried to play fetch with your ${this.pet.name}. It did not like it. It wants to play Haunt instead.`,
                animationKey: 'sad'
            }
        ];
        this.hungerOutcomes = [
            {
                scoreChange: -1,
                commentary: `Yummm ${this.pet.name} loves cake!`,
                animationKey: 'happy'
            },
            {
                scoreChange: 1, 
                commentary: `${this.pet.name} says "Yuck! I want cake. Not broccoli.`,
                animationKey: 'angry'
            }
        ];
        this.sleepinessOutcomes = [
            {
                scoreChange: -1,
                commentary: `${this.pet.name} slept like a ghost baby.`,
                animationKey: 'sleeping'
            },
            {
                scoreChange: 1, 
                commentary: `${this.pet.name} has too much energy. It refuses to sleep.`,
                animationKey: 'fun'
            }
        ];
    }
    
    initialize() {
        this.displayStats();
        const initialMessage = `${this.pet.name} is so happy to be your pet! Take good care of it. Remember to feed it, play with it, and give it enough rest or it will die. Don't let any of the scores get to 10.`
        this.updateCommentary(initialMessage);
        for(const property of propertiesArr) {
            this.startTimer(property);
        }
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
        return this[outcomesArrName][randomIndex];
    }
    
    handleScoreChange(propertyName, changeAmount) {
        this.pet[propertyName] += changeAmount;
        this.updateScore(propertyName);
        if(this.pet[propertyName] < 1) {
            this.pet[propertyName] = 1;
        }
        if(this.pet[propertyName] === 8 || this.pet[propertyName] === 9) {
            this.triggerScoreAnimation(propertyName);
        }
        if(this.pet[propertyName] >= 10){
            this.handleGameOver();
        }
    }
    
    updateScore(propertyName) {
        let labelName = `#${propertyName}-val-label`;
        $(labelName).text(this.pet[propertyName]);
    }
    
    updateCommentary(message) {
        $('#game-commentary').text(message);
    }
    
    triggerAnimation(animationKey) {
        let $ghostImg = $('#ghost-img');
        if($ghostImg.attr('class') !== undefined) {
            $ghostImg.removeClass();
        }
        $ghostImg.attr('src', `../resources/ghost-${animationKey}.png`)
        $ghostImg.addClass(animationKey);
    }

    triggerScoreAnimation(propertyName) {  
        let $label = $(`#${propertyName}-val-label`);
        $label.addClass('flashit');
    }
    
    handle(propertyName) {
        const outcome = this.getRandomOutcome(propertyName);
        this.updateCommentary(outcome.commentary);
        this.restartTimer(propertyName);
        this.handleScoreChange(propertyName, outcome.scoreChange);
        this.triggerAnimation(outcome.animationKey);
    }
    
    //has to be an arrow function otherwise the timer does not work
    increaseScore = (propertyName) => {
        return this.handleScoreChange(propertyName, 1);
    }
    
    increaseAge = () => {
        this.pet.age += 5;
        this.updateScore(age);
    }
    
    startTimer(propertyName) {
        if(propertyName === age) {
            this.timers[propertyName] = setInterval(this.increaseAge, ageInterval);
        } else {
            this.timers[propertyName] = setInterval(this.increaseScore, interval, propertyName);
        }
    }
    
    stopTimer(propertyName) {
        clearInterval(this.timers[propertyName]);
    }
    
    restartTimer(propertyName) {
        clearInterval(this.timers[propertyName]);
        this.startTimer(propertyName);
    }
    
    handleGameoverButtons() {
        //Create a new Restart button
        let $gameOverBtn = $('<button/>', {
            id: 'reload-button',
            class: 'game-play-btn',
            text: 'Restart',
            css: {
                'background-color': 'black'
            }
        });

        let $btnsSection = $('#buttons-section');
        //Remove existing game play buttons
        $btnsSection.empty();
        //Replace with Restart button
        $btnsSection.prepend($gameOverBtn);
    }
    
    constructGameOverMessage() {
        let gameOverMsg = `GAME OVER! ${this.pet.name} died `;
        gameOverMsg += (this.pet.hunger >= 10) ? 'of hunger ': '';
        gameOverMsg += (this.pet.sleepiness >= 10) ? 'due to lack of sleep ' : '';
        gameOverMsg += (this.pet.boredom >= 10) ? 'from boredom ' : '';
        return gameOverMsg;
    }
    
    handleGameOver() {
        this.triggerAnimation('dead');
        this.handleGameoverButtons();
        this.updateCommentary(this.constructGameOverMessage());
        //Stop all timers
        for(const property of propertiesArr) {
            this.stopTimer(property);
        }
    }
}

//When coffin button is clicked, navigate to Name Form page
$('#coffin-btn').click(function() {
    window.location.href = 'pages/name-form.html';
});

//Function to store to local storage
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

    // Reference for below logic for typewriter effect was #8 on the page below.
    // https://www.codesdope.com/blog/article/12-creative-css-and-javascript-text-typing-animati/
function typewriterEffectAnimation(content, parentElement) {
    var elem = '<span>' + content.split('').join('</span><span>') + '</span>';

    $(elem).hide().appendTo(parentElement).each(function (i) {
        $(this).delay(50 * i).css({
            display: 'inline',
            opacity: 0
        }).animate({
            opacity: 1
        }, 100);
    });
}

window.addEventListener("load", function(){
    if (window.location.pathname.endsWith('/pages/game.html')) {
        console.log("Game loaded!");
        petObj = new Pet(getItem(petNameKey));
        game = new Game(petObj);
        game.initialize();
    }

    if (window.location.pathname === '/index.html' || window.location.pathname.endsWith('/tamagotchi/')) {
        var content = `It was a magical night. You were on one of your usual midnight walks in the cemetery. You hear a sound "Let me out! Let me out!". You look around and find a coffin. That's where the sound is coming from! As you get close to it, it starts to shake. You open it.`;
        typewriterEffectAnimation(content, 'p');
    }
    
    if (window.location.pathname.endsWith('/pages/name-form.html')) {
        var content = `Out comes a baby ghost!`;
        typewriterEffectAnimation(content, '#para');
    }
});

document.querySelectorAll('.value-label').forEach(label => {
  label.addEventListener('animationend', event => {
    label.classList.remove('flashit');
  })
})

$('#buttons-section').on('click', '#reload-button', function() {
    location.reload();
});

