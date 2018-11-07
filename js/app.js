// defining variables 

// top-deck
var moves = 0;
var counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
var starList = document.querySelectorAll(".stars li");
//actions 
var matchedCards = document.getElementsByClassName("match");
var closeModal = document.querySelector(".close");
var modal = document.querySelector("#modalBox");
var chosenCards = [];    // for chosen cards -- 2 @ a time.
//cards 
var card = document.getElementsByClassName("card");
const cards = [...card];
console.log(cards);

//deck
const deck = document.querySelector("#card-deck");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// start game after loading
window.onload = startGame();
function startGame() {
        //a new deck of cards is shuffled for every game
    var shuffleCards = shuffle(cards);
    for (var i = 0; i < shuffleCards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item){
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "deactivateCards");
    }
        // moves is set to 0
    moves = 0;
    counter.innerHTML = moves;
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "FFD700";
        stars[i].style.visibility = "visible";
    }
        //timer is set to 0
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 H : 0 M : 0S";
    clearInterval(interval);
}

// moves
function movesCounter(){
    moves++;
    counter.innerHTML = moves;
    if(moves == 1){
        second = 0 ;
        minute = 0;
        hour = 0;
        startTime();
    }
    if(moves > 10 && moves <15){
        for(i=0; i<3 ;i++){
            if(i>1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 18) {
        for (var i = 0; i < 3; i++) {
            if (i > 0) {
                    stars[i].style.visibility = "collapse";
                }
            }
        }
}

// timer 
var second = 0, minute = 0, hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTime()
{
    interval = setInterval(function(){
        timer.innerHTML =hour + "H : " + minute + "M : " + second + "S";
        second++;
        if(second == 60){
            minute++;
            second = 00;
        }
        if(minute == 60){
            hour++;
            minute = 00;
        }
    },1000);
}

// open and show cards
var display = function(){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

// flipping cards
function cardsFlipped() {
    chosenCards.push(this);
    var flips = chosenCards.length;
    if(flips === 2){
        movesCounter();
        if(chosenCards[0].type === chosenCards[1].type){
            matchFound();
        }
        else{
            noMatch();
        }
    }
}
function matchFound()
{
    chosenCards[0].classList.add('match','disabled');
    chosenCards[1].classList.add('match','disabled');
    chosenCards[0].classList.remove('show','open','no-event');
    chosenCards[1].classList.remove('show', 'open', 'no-event');
    chosenCards = [];
}

function noMatch()
{
    chosenCards[0].classList.add('noMatch');
    chosenCards[1].classList.add('noMatch');
    deactivateCards();
    setTimeout(function(){
        chosenCards[0].classList.remove('show','open','no-event','noMatch');
        chosenCards[1].classList.remove('show','open','no-event','noMatch');
        activateCards();
        chosenCards = [];
    },900);
}
function deactivateCards()
{
    Array.prototype.filter.call(cards, function(card){
        card.classList.add("disabled");
    });
}

function activateCards()
{
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i =0 ; i <matchedCards.length; i++){
            matchedCards[i].classList.add('disabled');
        }
    });
}

 // modal popup
function finished() {
    if(matchedCards.length == 16) {
        clearInterval(interval);
        totalTime = timer.innerHTML;
        modal.classList.add("show");
    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("totalMoves").innerHTML = moves;
    document.getElementById("totalStars").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = totalTime;
    };
}
  // play again function
function restart() {
    modal.classList.remove("show");
    moves = 0;
    hour = 0;
    minute =0;
    second =0;
    startGame();
}
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", display);
    card.addEventListener("click", cardsFlipped);
    card.addEventListener("click", finished);
};