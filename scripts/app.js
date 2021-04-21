console.log("Hi! I am Ghosty...boo");
let petName;

$('#coffin-btn').click(function() {
    window.location.href = 'pages/name-form.html';
});

// When pet's name is entered, take to game page
$('#name-form').on('submit', function(event) {
    event.preventDefault();
    petName = $('#name-textbox').val();
    window.location.href = '../pages/game.html';
});