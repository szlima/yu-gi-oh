const state= {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.querySelector("#score_points")
    },
    cardSprites: {
        avatar: document.querySelector("#card-image"),
        name: document.querySelector("#card-name"),
        type: document.querySelector("#card-type")
    },
    fieldCards: {
        player: document.querySelector("#player-field-card"),
        computer: document.querySelector("#computer-field-card")
    },
    playerSides: {
        player: "player-cards",
        playerBox: document.getElementById("player-cards"),
        computer: "computer-cards",
        computerBox: document.getElementById("computer-cards")
    },
    actions: {
        button: document.querySelector("#next-duel")
    }
};

const pathImages= "./src/assets/icons/";
const cardData= [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2]
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf: [2],
        loseOf: [0]
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1]
    }
];

async function getRandomCardId(){
    const randomIndex= Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide){
    const cardImage= document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSides.player){

        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(idCard);
        });

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }

    return cardImage;
}

async function setCardsField(cardId){
    await removeAllCardsImages();

    let computerCardId= await getRandomCardId();

    await showHiddenCardFieldsImages(true);

    await drawCardsInField(cardId, computerCardId);

    let duelResults= await checkDuelResults(cardId, computerCardId);

    await showResult(duelResults);
    await updateScore();
    await drawButton(duelResults);
}

async function drawCardsInField(cardId, computerCardId){
    state.fieldCards.player.src= cardData[cardId].img;
    state.fieldCards.computer.src= cardData[computerCardId].img;
}

async function showHiddenCardFieldsImages(value){
    if(value){
        state.fieldCards.player.style.display= "block";
        state.fieldCards.computer.style.display= "block";
    }else{
        state.fieldCards.player.style.display= "none";
        state.fieldCards.computer.style.display= "none";
    }
}

async function showResult(text){
    state.cardSprites.avatar.src= "";
    state.cardSprites.name.style.display= "none";
    state.cardSprites.type.innerText= text.toUpperCase();
}

async function drawButton(text){
    state.actions.button.innerText= text.toUpperCase();
    state.actions.button.style.visibility= "visible";
}

async function updateScore(){
    state.score.scoreBox.innerText= `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardId){
    let duelResults= "draw";

    let playerCard= cardData[playerCardId];

    if(playerCard.winOf.includes(computerCardId)){
        duelResults= "win";
        state.score.playerScore++;
    }

    if(playerCard.loseOf.includes(computerCardId)){
        duelResults= "lose";
        state.score.computerScore++;
    }

    await playAudio(duelResults);
    return duelResults;
}

async function removeAllCardsImages(){
    const {computerBox, playerBox}= state.playerSides;

    let imgElements= computerBox.querySelectorAll("img");
    imgElements.forEach(img => img.remove());

    imgElements= playerBox.querySelectorAll("img");
    imgElements.forEach(img => img.remove());
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src= cardData[index].img;
    state.cardSprites.name.innerText= cardData[index].name;
    state.cardSprites.type.innerText= "Attribute: " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide){
    for(let i=0; i<cardNumbers; i++){
        const randomIdCard= await getRandomCardId();
        const cardImage= await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel(){
    state.cardSprites.name.style.display= "block";

    state.cardSprites.name.innerText= "Selecione";
    state.cardSprites.type.innerText= "uma carta";
    state.actions.button.style.visibility= "hidden";

    await showHiddenCardFieldsImages(false);

    init();
}

async function playAudio(status){
    const audio= new Audio(`./src/assets/audios/${status}.wav`);

    try {
        audio.volume= 0.2;
        audio.play();
    } catch (err) {
        console.error(err);
    }
}

function init(){
    drawCards(5, state.playerSides.player);
    drawCards(5, state.playerSides.computer);

    const bgm= document.getElementById("bgm");
    bgm.volume= 0.1;
    bgm.play();
}

init();