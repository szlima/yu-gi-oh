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
    actions: {
        button: document.querySelector("#next-duel")
    }
};

const pathImages= ".src/assets/icons/";
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

function init(){

}

init();