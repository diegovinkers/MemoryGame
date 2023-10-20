const gameGrid = document.getElementById('game-grid');
const gameInfo = document.getElementById('game-info');
const startButton = document.getElementById('start-btn');


let cardArray = [
    { id: 1, img: 'images/1.png' },
    { id: 2, img: 'images/2.png' },
    { id: 3, img: 'images/3.png' },
    { id: 4, img: 'images/4.png' },
    { id: 5, img: 'images/5.png' },
    { id: 6, img: 'images/6.png' },
    { id: 7, img: 'images/7.png' },
    { id: 8, img: 'images/8.png' },
    { id: 1, img: 'images/1.png' },
    { id: 2, img: 'images/2.png' },
    { id: 3, img: 'images/3.png' },
    { id: 4, img: 'images/4.png' },
    { id: 5, img: 'images/5.png' },
    { id: 6, img: 'images/6.png' },
    { id: 7, img: 'images/7.png' },
    { id: 8, img: 'images/8.png' },
];

cardArray.sort(() => 0.5 - Math.random());

let pickedCards = [];
let pickedCardsId = [];
let cardsWon = [];
let score = 0;
let startTime = null; // Variable para rastrear el tiempo de inicio
let timerInterval; // Variable para el temporizador

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-btn').style.display = 'none'; // Oculta el botón "Jugar"
    gameInfo.style.display = 'block'; // Muestra el puntaje, cronómetro y botón de reinicio
    createBoard();
    updateScoreDisplay(); 
    startTimer(); 
});

function checkMatch() {
    if (pickedCards[0] === pickedCards[1]) {
        cardsWon.push(pickedCards[0]);
        pickedCardsId.forEach(cardIndex => {
            gameGrid.children[cardIndex].classList.add('found');
        });

        // Calcula el tiempo que tomó encontrar el par y agrega puntos en función de la rapidez
        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;
        score += Math.floor(10000 / elapsedTime);
    } else {
        pickedCardsId.forEach(cardIndex => {
            gameGrid.children[cardIndex].style.backgroundImage = 'url("images/0.png")';
        });
    }
    pickedCards = [];
    pickedCardsId = [];
    if (cardsWon.length === cardArray.length / 2) {
        alert('¡Felicidades! Ganaste con un puntaje de ' + score);
        restartGame();
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    const cardElement = gameGrid.children[cardId];

    if (pickedCards.length === 2 || cardElement.classList.contains('found')) {
        return;
    }

    this.style.backgroundImage = 'url(' + cardArray[cardId].img + ')';
    pickedCards.push(cardArray[cardId].id);
    pickedCardsId.push(cardId);

    if (pickedCards.length === 1) {
        // Marca el tiempo de inicio cuando se voltea la primera carta
        startTime = new Date().getTime();
    }

    if (pickedCards.length === 2) {
        setTimeout(() => {
            checkMatch();
            updateScoreDisplay(); 
        }, 500);
    }
}

function updateScoreDisplay() {
    document.getElementById('score-counter').textContent = 'Puntos: ' + score;
}

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('data-id', i);
        card.classList.add('grid');
        card.style.backgroundImage = 'url("images/0.png")';
        card.addEventListener('click', flipCard);
        gameGrid.appendChild(card);
    }
}

document.getElementById('restart-btn').addEventListener('click', () => {
    restartGame();
});

function restartGame() {
    clearInterval(timerInterval); 
    cardArray.sort(() => 0.5 - Math.random());
    pickedCards = [];
    pickedCardsId = [];
    cardsWon = [];
    score = 0; 

    gameGrid.querySelectorAll('.grid').forEach(cardElement => {
        cardElement.style.backgroundImage = 'url("images/0.png")';
        cardElement.classList.remove('found');
    });

    // Actualiza la pantalla del puntaje al reiniciar
    updateScoreDisplay();
    timeRemaining = 60;
    startTimer();
}


let timeRemaining = 60;

function updateTimerDisplay() {
    document.getElementById('timer').textContent = `Tiempo restante: ${timeRemaining} segundos`;
}

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('¡Tiempo agotado! Game Over con un puntaje de ' + score);
            restartGame();
        }
    }, 1000);
}