let playerOne;
let playerTwo;
let computer;
let x = 0, o = 0, d = 0;

const gameBoard = (() => {
    const game = ["X", "O", "X", "O", "X", "O", 
    "X", "O", "X", "O"];
    let xMarks = [];
    let oMarks = [];
    const arrCheck = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],
    [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    const squareDivs = document.getElementsByClassName("square");

    const scoreTrack = () => {
            for (let i = 0; i < squareDivs.length; i++) {
                if (squareDivs[i].innerHTML == "X" && !xMarks.includes(i)) {
                    xMarks.push(i);
                    xMarks.sort();
                } else if (squareDivs[i].innerHTML == "O" && !oMarks.includes(i)) {
                    oMarks.push(i);
                    oMarks.sort();
                }
            }

            for (let j = 0; j < arrCheck.length; j++) {
                const matchArr = (arr, target) => target.every(v => arr.includes(v));
                if (matchArr(xMarks, arrCheck[j])) {
                    playerOne.winner();
                    x = 1;
                    break;
                } else if (matchArr(oMarks, arrCheck[j])) {
                    playerTwo.winner();
                    o = 1;
                    break;
                } else if ((j == arrCheck.length - 1) && ((xMarks.length > 4 && oMarks.length > 3) || (xMarks.length > 3 && oMarks.length > 4))) {
                    playerOne.draw();
                    d = 1;
                    break;
                }
            }
    
            flow.computerMove();
    }

    const restartGame = () => {
        const gameFlex = document.getElementsByClassName("game-flex");
        const div = document.createElement("div");
        const restartBtn = document.createElement("button");
        const changeBtn = document.createElement("button");
        const firstIMG = document.getElementsByClassName("one");
        const secondIMG = document.getElementsByClassName("two");
        const thirdIMG = document.getElementsByClassName("three");
        const h3 = document.getElementsByClassName("charName");
        const selectBtn = document.querySelectorAll(".select");
        const moveLeftBtn = document.querySelectorAll(".left");
        const moveRightBtn = document.querySelectorAll(".right");
        const cancelBtn = document.getElementsByClassName("cancel");


        div.appendChild(restartBtn);
        div.appendChild(changeBtn);
        div.style.width = "100%";
        div.style.textAlign = "center";
        div.style.position = "relative";
        div.style.bottom = "3rem";
        div.style.order = "4";
        restartBtn.innerHTML = "Play Again?";
        changeBtn.innerHTML = "Change Players"
        const html = document.querySelector("html");
        const body = document.querySelector("body");
        gameFlex[0].appendChild(div);
        restartBtn.addEventListener("click", function() {
            for (let i = 0; i < squareDivs.length; i++) {
                squareDivs[i].innerHTML = "";
            }
            gameBoard.game = ["X", "O", "X", "O", "X", "O", 
            "X", "O", "X", "O"];
            gameFlex[0].removeChild(div);
            if (x == 1) {
                playerOne.removeWinner();
            } else if (o == 1) {
                playerTwo.removeWinner();
            } else {
                playerOne.removeWinner();
            }
            xMarks = [];
            oMarks = [];
            x = 0, o = 0, d = 0;
            playerOne.move = false;
            playerTwo.move = false;
            flow.computerMove();
        });
        
        changeBtn.addEventListener("click", function() {
            const gBoard = document.querySelector(".game-flex");
            const playerMenu = document.querySelector(".player-menu");

            gBoard.style.display = "none";
            playerMenu.style.display = "block";
            html.style.backgroundColor = "orange";
            body.style.backgroundColor = "orange";
            div.removeChild(restartBtn);
            div.removeChild(changeBtn);
            gBoard.removeChild(div);
            cancelBtn[0].style.display = "none";
            cancelBtn[1].style.display = "none";

            for (let i = 0; i < 2; i++) {
                if (firstIMG[i].style.maxWidth == "100%") {
                    h3[i].innerHTML = "The Wicked Witch";
                } else if (secondIMG[i].style.maxWidth == "100%") {
                    h3[i].innerHTML = "T-Rex";
                } else if (thirdIMG[i].style.maxWidth == "100%") {
                    h3[i].innerHTML = "Bjorn the Viking";
                }
                moveLeftBtn[i].style.display = "block";
                moveRightBtn[i].style.display = "block";
                selectBtn[i].style.display = "initial";
            }

            gameBoard.game = ["X", "O", "X", "O", "X", "O", 
            "X", "O", "X", "O"];

            for (let i = 0; i < squareDivs.length; i++) {
                squareDivs[i].innerHTML = "";
            }

            if (x == 1) {
                playerOne.removeWinner();
            } else if (o == 1) {
                playerTwo.removeWinner();
            } else {
                playerOne.removeWinner();
            }

            xMarks = [];
            oMarks = [];
            x = 0, o = 0, d = 0;
           
        })
    }
       
    return {
        game,
        scoreTrack,
        restartGame
    }
})();

const Player = (name, player, type) => {
    const getName = () => name;
    const getPlayer = () => player;
    const getType = () => type;
    const difficulty = null;
    const move = false;
    const playerIcon = document.getElementsByClassName("player-icon");
    const winner = () => {
        if (getPlayer() == "1") {
            playerIcon[0].innerHTML = "Winner!";
        } else {
            playerIcon[1].innerHTML = "Winner!";
        }
    };
    const removeWinner = () => {
        playerIcon[0].innerHTML = "X";
        playerIcon[1].innerHTML = "O";
    };
    const draw = () => {
        playerIcon[0].innerHTML = "Draw";
        playerIcon[1].innerHTML = "Draw";
    };

    return {getName, getPlayer, getType, winner, removeWinner, draw, move, difficulty};
};

const flow = (() => {
    const firstIMG = document.getElementsByClassName("one");
    firstIMG[0].style.maxWidth = "100%";
    firstIMG[1].style.maxWidth = "100%";
    const secondIMG = document.getElementsByClassName("two");
    secondIMG[0].style.maxWidth = "0";
    secondIMG[1].style.maxWidth = "0";
    const thirdIMG = document.getElementsByClassName("three");
    thirdIMG[0].style.maxWidth = "0";
    thirdIMG[1].style.maxWidth = "0";
    const h3 = document.getElementsByClassName("charName");
    const selectBtn = document.querySelectorAll(".select");
    const moveLeftBtn = document.querySelectorAll(".left");
    const moveRightBtn = document.querySelectorAll(".right");
    const cancelBtn = document.querySelectorAll(".cancel");
    const option = document.getElementsByClassName("player-option");
    
    let i = 0;

    const enterMenu = () => {
        const h1 = document.querySelector("h1");
        const svg = document.querySelector("svg");
        const flexCont = document.getElementsByClassName("flex-container");
        const playerFlex = document.getElementsByClassName("player-flex");
        h1.addEventListener("click", function() {
            svg.style.animation = "strike 1s forwards";
            flexCont[0].style.animation = "fadeOut 0.75s forwards";
            flexCont[0].style.animationDelay = "1s";
            setTimeout(function() {
                flexCont[0].style.display = "none";
                playerFlex[0].style.animation = "fadeIn 0.75s forwards";

            }, 2000);
            scrollChar();
        })
    };

    const scrollChar = () => {
        const playerMenu = document.getElementsByClassName("player-menu");
        setTimeout(function() {
            playerMenu[0].style.height = "100%";
        }, 2000);
        const moveLeft = document.querySelectorAll(".left").forEach(move => {
            move.addEventListener("click", event => {
                if (move.id == "firstLeft") {
                    if (firstIMG[0].style.maxWidth == "100%") {
                        firstIMG[0].style.maxWidth = "0";
                        thirdIMG[0].style.maxWidth = "100%";
                        h3[0].innerHTML = "Bjorn the Viking";
                    } else if (secondIMG[0].style.maxWidth == "100%") {
                        secondIMG[0].style.maxWidth = "0";
                        firstIMG[0].style.maxWidth = "100%";
                        h3[0].innerHTML = "The Wicked Witch"
                    } else {
                        thirdIMG[0].style.maxWidth = "0";
                        secondIMG[0].style.maxWidth = "100%";
                        h3[0].innerHTML = "T-Rex";
                    }
                } else {
                    if (firstIMG[1].style.maxWidth == "100%") {
                        firstIMG[1].style.maxWidth = "0";
                        thirdIMG[1].style.maxWidth = "100%";
                        h3[1].innerHTML = "Bjorn the Viking"
                    } else if (secondIMG[1].style.maxWidth == "100%") {
                        secondIMG[1].style.maxWidth = "0";
                        firstIMG[1].style.maxWidth = "100%";
                        h3[1].innerHTML = "The Wicked Witch";
                    } else {
                        thirdIMG[1].style.maxWidth = "0";
                        secondIMG[1].style.maxWidth = "100%";
                        h3[1].innerHTML = "T-Rex";
                    }
                }
            })
        });

        const moveRight = document.querySelectorAll(".right").forEach(move => {
            move.addEventListener("click", event => {
                if (move.id == "firstRight") {
                    if (firstIMG[0].style.maxWidth == "100%") {
                        firstIMG[0].style.maxWidth = "0";
                        secondIMG[0].style.maxWidth = "100%";
                        h3[0].innerHTML = "T-Rex";
                    } else if (secondIMG[0].style.maxWidth == "100%") {
                        secondIMG[0].style.maxWidth = "0";
                        thirdIMG[0].style.maxWidth = "100%";
                        h3[0].innerHTML = "Bjorn the Viking";
                    } else {
                        thirdIMG[0].style.maxWidth = "0";
                        firstIMG[0].style.maxWidth = "100%";
                        h3[0].innerHTML = "The Wicked Witch";
                    }
                } else {
                    if (firstIMG[1].style.maxWidth == "100%") {
                        firstIMG[1].style.maxWidth = "0";
                        secondIMG[1].style.maxWidth = "100%";
                        h3[1].innerHTML = "T-Rex";
                    } else if (secondIMG[1].style.maxWidth == "100%") {
                        secondIMG[1].style.maxWidth = "0";
                        thirdIMG[1].style.maxWidth = "100%";
                        h3[1].innerHTML = "Bjorn the Viking";
                    } else {
                        thirdIMG[1].style.maxWidth = "0";
                        firstIMG[1].style.maxWidth = "100%";
                        h3[1].innerHTML = "The Wicked Witch";
                    }
                }
            })
        });

        selectChar();
        return moveLeft, moveRight;
    };

    const selectChar = () => {
        const imageFele = document.createElement("img");
        const imageSele = document.createElement("img");
        const imageContainer = document.getElementsByClassName("player-image-container");

        selectBtn[0].addEventListener("click", event => {
            if (option[0].value == "player") {
                playerOne = Player(h3[0].innerHTML, 1, "player");
            } else if (option[0].value == "computer") { 
                playerOne = Player(h3[0].innerHTML, 1, "computer");
            } else {
                playerOne = Player(h3[0].innerHTML, 1, "AI");
            }

            if (h3[0].innerHTML == "The Wicked Witch") {
                imageFele.setAttribute("src", "file:///Users/andrewperez/Downloads/new-witch-cut-2.png");
                imageFele.style.width = "12rem";
                imageFele.style.height = "18rem";
                imageFele.style.position = "relative";
                imageFele.style.left = "0.5rem";
                imageContainer[0].style.padding = "1rem";
            } else if (h3[0].innerHTML == "T-Rex") {
                imageFele.setAttribute("src", "file:///Users/andrewperez/Downloads/t-rex-image.png");
                imageFele.style.width = "17rem";
                imageFele.style.height = "12rem";
                imageFele.style.position = "relative";
                imageFele.style.top = "4rem";
                imageContainer[0].style.padding = "1rem";
            } else {
                imageFele.setAttribute("src", "file:///Users/andrewperez/Downloads/viking-image.png");
                imageFele.style.width = "16rem";
                imageFele.style.height = "22rem";
                imageFele.style.position = "relative";
                imageFele.style.bottom = "4.5rem";
                imageContainer[0].style.padding = "-1rem";
            }

            imageFele.style.marginTop = "8rem";
            imageFele.setAttribute("alt", "");
            imageContainer[0].appendChild(imageFele);
            playerOne.move = null;
            h3[0].innerHTML = "Player One Ready!";
            moveLeftBtn[0].style.display = "none";
            moveRightBtn[0].style.display = "none";
            selectBtn[0].style.display = "none";
            cancelBtn[0].style.display = "initial";
            startGame();
        });

        selectBtn[1].addEventListener("click", event => {
            if (option[1].value == "player") { 
                playerTwo = Player(h3[1].innerHTML, 2, "player");
            } else if (option[1].value == "computer") { 
                playerTwo = Player(h3[1].innerHTML, 2, "computer");
            } else {
                playerTwo = Player(h3[1].innerHTML, 2, "AI");
            }

            if (h3[1].innerHTML == "The Wicked Witch") {
                imageSele.setAttribute("src", "file:///Users/andrewperez/Downloads/new-witch-cut-2.png");
                imageSele.style.width = "12rem";
                imageSele.style.height = "18rem";
                imageSele.style.position = "relative";
                imageSele.style.left = "0.5rem";
                imageContainer[1].style.padding = "1rem";
            } else if (h3[1].innerHTML == "T-Rex") {
                imageSele.setAttribute("src", "file:///Users/andrewperez/Downloads/t-rex-image.png");
                imageSele.style.width = "17rem";
                imageSele.style.height = "12rem";
                imageSele.style.position = "relative";
                imageSele.style.top = "4rem";
                imageContainer[1].style.padding = "1rem";
            } else {
                imageSele.setAttribute("src", "file:///Users/andrewperez/Downloads/viking-image.png");
                imageSele.style.width = "16rem";
                imageSele.style.height = "22rem";
                imageSele.style.position = "relative";
                imageSele.style.bottom = "4.5rem";
                imageContainer[1].style.padding = "-1rem";
            }

            imageSele.style.marginTop = "8rem";
            imageSele.setAttribute("alt", "");
            imageContainer[1].appendChild(imageSele);
            playerTwo.move = null;
            h3[1].innerHTML = "Player Two Ready!";
            moveLeftBtn[1].style.display = "none";
            moveRightBtn[1].style.display = "none";
            selectBtn[1].style.display = "none";
            cancelBtn[1].style.display = "initial";
            startGame();
        });

        cancelBtn[0].addEventListener("click", event => {
            playerOne = false;
            if (firstIMG[0].style.maxWidth == "100%") {
                h3[0].innerHTML = "The Wicked Witch";
            } else if (secondIMG[0].style.maxWidth == "100%") {
                h3[0].innerHTML = "T-Rex";
            } else if (thirdIMG[0].style.maxWidth == "100%") {
                h3[0].innerHTML = "Bjorn the Viking";
            }
            moveLeftBtn[0].style.display = "block";
            moveRightBtn[0].style.display = "block";
            selectBtn[0].style.display = "initial";
            cancelBtn[0].style.display = "none";
        });

        cancelBtn[1].addEventListener("click", event => {
            playerTwo = false;
            if (firstIMG[1].style.maxWidth == "100%") {
                h3[1].innerHTML = "The Wicked Witch";
            } else if (secondIMG[1].style.maxWidth == "100%") {
                h3[1].innerHTML = "T-Rex";
            } else if (thirdIMG[1].style.maxWidth == "100%") {
                h3[1].innerHTML = "Bjorn the Viking";
            }
            moveLeftBtn[1].style.display = "block";
            moveRightBtn[1].style.display = "block";
            selectBtn[1].style.display = "initial";
            cancelBtn[1].style.display = "none";
        });

    };

    const startGame = () => {
        const h4 = document.createElement("h4");
        const yesBtn = document.createElement("button");
        const noBtn = document.createElement("button");
        const btnDiv = document.createElement("div");
        const playerFlex = document.querySelector(".player-flex");

        if (playerOne.move == null && playerTwo.move == null) {
            btnDiv.style.cssText = "text-align:center; position:absolute; background-color:rgb(251 163 0); border:1px solid orange; border-radius:15px; width:17rem; height:14rem; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); padding:25px";
            btnDiv.classList.add("startDiv");
            h4.innerHTML = "Start Game?"
            yesBtn.innerHTML = "Yes";
            noBtn.innerHTML = "No";
            yesBtn.classList.add("game-btn");
            noBtn.classList.add("game-btn");
            noBtn.style.marginTop = "0.25rem";
            noBtn.style.fontSize = "1rem";
            yesBtn.style.marginTop = "2rem";
            yesBtn.style.fontSize = "1rem";
            playerFlex.appendChild(btnDiv);
            btnDiv.appendChild(h4);
            btnDiv.appendChild(yesBtn);
            btnDiv.appendChild(noBtn);
            cancelBtn[0].disabled = true;
            cancelBtn[1].disabled = true; 
        }

        yesBtn.addEventListener("click", event => {
            const playerMenu = document.querySelector(".player-menu");
            const gameFlex = document.querySelector(".game-flex");
            const html = document.querySelector("html");
            const body = document.querySelector("body");

            playerMenu.style.display = "none";
            gameFlex.style.display = "flex";
            html.style.backgroundColor = "rgb(230, 134, 25)";
            body.style.backgroundColor = "rgb(230, 134, 25)";
            playerOne.move = false;
            playerTwo.move = false;
            playerFlex.removeChild(btnDiv);
            computerMove();
        })

        noBtn.addEventListener("click", event => {
            playerFlex.removeChild(btnDiv);
            playerOne = null;
            playerTwo = null;
            for (let i = 0; i < 2; i++) {
                if (firstIMG[i].style.maxWidth == "100%") {
                    h3[i].innerHTML = "The Wicked Witch";
                } else if (secondIMG[i].style.maxWidth == "100%") {
                    h3[i].innerHTML = "T-Rex";
                } else if (thirdIMG[i].style.maxWidth == "100%") {
                    h3[i].innerHTML = "Bjorn the Viking";
                }
                moveLeftBtn[i].style.display = "block";
                moveRightBtn[i].style.display = "block";
                selectBtn[i].style.display = "initial";
                cancelBtn[i].style.display = "none";
            }
        })
    }

    const computerMove = () => {
        const randomChoice = Math.floor(Math.random() * 9);
        const square = document.getElementsByClassName("square");
        if (x == 0 && o == 0 && d == 0) {
            if (playerOne.getType() == "computer" || playerTwo.getType() == "computer") {
                if (square[randomChoice].innerHTML) {
                    computerMove();
                } else {
                    if (playerOne.move == false && playerOne.getType() == "computer") {
                        square[randomChoice].innerHTML = gameBoard.game[0];
                        playerOne.move = true;
                        playerTwo.move = false;
                        gameBoard.game.shift();
                        gameBoard.scoreTrack(); 
                    } else if (playerTwo.move == false && playerOne.move == true && playerTwo.getType() == "computer") {
                        square[randomChoice].innerHTML = gameBoard.game[0];
                        playerOne.move = false;
                        playerTwo.move = true;
                        gameBoard.game.shift();
                        gameBoard.scoreTrack();
                    } else if (playerOne.getType() == "player" && playerOne.move == false) {
                        playerOne.move = true;
                        playerTwo.move = false;
                        playerMove();
                    } else if (playerTwo.getType() == "player" && playerTwo.move === false) {
                        playerOne.move = false;
                        playerTwo.move = true;
                        playerMove();
                    } else if (playerTwo.move == false && playerOne.move == true && playerTwo.getType() == "AI") {
                        playerOne.move = false;
                        playerTwo.move = true;
                        minimax("X");
                    } else if (playerOne.move == false && playerOne.getType() == "AI") {
                        playerOne.move = true;
                        playerTwo.move = false;
                        minimax("O");
                    }
                }
            } else if (playerOne.getType() == "player" && playerTwo.getType() == "player") {
                if (playerOne.move == false) {
                    playerOne.move = true;
                    playerTwo.move = false;
                    playerMove();
                } else {
                    playerOne.move = false;
                    playerTwo.move = true;
                    playerMove();
                }
            } else if (playerOne.getType() == "AI" || playerTwo.getType() == "AI") {
                if (playerOne.getType() == "AI" && playerOne.move == false) {
                    playerOne.move = true;
                    playerTwo.move = false;
                    minimax("O");
                } else if (playerTwo.getType() == "AI" && playerTwo.move == false && playerOne.move == true) {
                    playerOne.move = false;
                    playerTwo.move = true;
                    minimax("X");
                } else if (playerOne.getType() == "player" && playerOne.move == false) {
                    playerOne.move = true;
                    playerTwo.move = false;
                    playerMove();
                } else if (playerTwo.getType() == "player" && playerTwo.move == false && playerOne.move == true) {
                    playerOne.move = false;
                    playerTwo.move = true;
                    playerMove();
                }
            }
        } else {
            gameBoard.restartGame();
        }
    
    };

    const playerMove = () => {
        const square = document.querySelectorAll(".square").forEach(square => {
            square.addEventListener("click", event => {
                if (x == 0 && o == 0 && d == 0) {
                    if (square.innerHTML) {
                        return null;
                    }
                    square.innerHTML = gameBoard.game[0];
                    gameBoard.game.shift();
                    gameBoard.scoreTrack();
                } else {
                    square.removeEventListener("click", event => {
                        if (square.innerHTML) {
                            return null;
                        }
                        square.innerHTML = gameBoard.game[0];
                        gameBoard.game.shift();
                        gameBoard.scoreTrack();
                    })
                }
            })
        })
        return square;
    };


    const minimax = (ele) => {
        const square = document.getElementsByClassName("square");
        let eleWins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],
        [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        let nonWins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],
        [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    
        for (let i = 0; i < square.length; i++) {
            for (let j = 0; j < eleWins.length; j++) {
                if ((square[i].innerHTML == ele) && eleWins[j].includes(i)) {
                    let eleIndex = eleWins[j].indexOf(i);
                    eleWins[j].splice(eleIndex, 1);
                    if (nonWins[j].includes(i)) {
                        nonWins[j].splice(0, nonWins[j].length);
                    }
                } else if ((square[i].innerHTML == ele) && nonWins[j].includes(i)) {
                    nonWins[j].splice(0, nonWins[j].length);
                }
            }
        };
    
        for (let i = 0; i < square.length; i++) {
            for (let j = 0; j < eleWins.length; j++) {
                if (square[i].innerHTML && (square[i].innerHTML != ele) && eleWins[j].includes(i)) {
                    eleWins[j].splice(0, eleWins[j].length);
                    if (nonWins[j].includes(i)) {
                        let nonIndex = nonWins[j].indexOf(i);
                        nonWins[j].splice(nonIndex, 1);
                    }      
                } else if (square[i].innerHTML && (square[i].innerHTML != ele) && nonWins[j].includes(i)) {
                    let nonIndex = nonWins[j].indexOf(i);
                    nonWins[j].splice(nonIndex, 1);
                }
            }
        }

        const eleAll = Array.prototype.concat.apply([], eleWins);
        const nonAll = Array.prototype.concat.apply([], nonWins);
    
        
        const eleFilter = eleAll.sort((a, b) => eleAll.filter(v => v===a).length - eleAll.filter(v => v===b).length);
        const nonFilter = nonAll.sort((a, b) => nonAll.filter(v => v===a).length - nonAll.filter(v => v===b).length);
        
        const elePick = eleFilter.filter(item => typeof item === 'number');
    
        const nonPick = nonFilter.filter(item => typeof item === 'number');
    
        var eleFreq = elePick[elePick.length - 1];
        var nonFreq = nonPick[nonPick.length - 1];
        var eleNum = 0;
        var nonNum = 0;
        var pointsArr = [];
    
        elePick.forEach(function(item) {
            if (eleFreq === item) {
                eleNum--;
            }
        });
    
        nonPick.forEach(function(item) {
            if (nonFreq === item) {
                nonNum++;
            }
        });
    
        eleWins.forEach(function(item) {
            if (item.length == 1) {
                eleFreq = item[0];
            }
        });
    
        nonWins.forEach(function(item) {
            if (item.length == 1) {
                eleFreq = item[0];
            }
        });
    
        pointsArr.push(eleFreq);
        pointsArr.push(eleNum);
        pointsArr.push(nonNum);
        
        console.log(elePick);
        console.log(nonPick);
        console.log(pointsArr);
    
        let computerChoice = pointsArr[0];

        if (typeof pointsArr[0] === 'undefined') {
            for (let i = 0; i < square.length; i++) {
                if (square[i].innerHTML == "") {
                    computerChoice = i;
                    square[computerChoice].innerHTML = gameBoard.game[0];
                }
            }
        } else {
            square[computerChoice].innerHTML = gameBoard.game[0];
        }

        pointsArr = [];
        eleFreq = [];
        eleNum = [];
        nonNum = [];
    
        gameBoard.game.shift();
        gameBoard.scoreTrack();
    
        
    
    } 

    return {
        scrollChar,
        computerMove,
        playerMove,
        selectChar,
        startGame,
        enterMenu
    };

})();

flow.enterMenu();
