const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const buttons = document.querySelectorAll('button');
const winSound = new Audio('win.mp3');
const loseSound = new Audio('lose.mp3');
const bgMusic = new Audio('bg.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0.6;  
      loseSound.volume = 0.5;
      winSound.volume = 0.6;
let bgPlaying = false;

const playerArea = document.getElementById('p_choice');
const computerArea = document.getElementById('c_choice');
const resultText = document.getElementById('result');
const scoreText = document.getElementById('score');

const playerLabel = document.getElementById('player-label');
const computerLabel = document.getElementById('computer-label');

let pScore = 0;
let cScore = 0;
let tieScore = 0;

rockBtn.addEventListener('click', () => play('rock'));
paperBtn.addEventListener('click', () => play('paper'));
scissorsBtn.addEventListener('click', () => play('scissors'));

function playWin() {
    winSound.currentTime = 0;
    winSound.play().catch(error => console.log('Win sound failed:', error));
}
function playLose() {
    loseSound.currentTime = 0;
    loseSound.play().catch(error => console.log('Lose sound failed:', error));
}

function play(choice) {
    disableButtons();
    if (!bgPlaying) {
        bgMusic.play().catch(e => console.log('BG failed:', e));
        bgPlaying = true;
    }
    playerArea.innerHTML = "";
    computerArea.innerHTML = "";

    playerLabel.textContent = "YOU";
    playerLabel.classList.add('visible');
    computerLabel.textContent = "COMPUTER";
    computerLabel.classList.add('visible');

    const playerHand = document.createElement("img");
    playerHand.src = "rock.png";
    playerHand.style.width = "160px";
    playerHand.classList.add("shaking");
    playerArea.appendChild(playerHand);

    const computerHand = document.createElement("img");
    computerHand.src = "rock.png";
    computerHand.style.width = "160px";
    computerHand.classList.add("shaking");
    computerArea.appendChild(computerHand);

    setTimeout(() => {
        playerHand.classList.remove("shaking");
        computerHand.classList.remove("shaking");

        playerHand.src = choice + ".png";

        const options = ["rock", "paper", "scissors"];
        const computerChoice = options[Math.floor(Math.random() * 3)];
        computerHand.src = computerChoice + ".png";

        let outcome = "";
        let bigClass = "";

        if (choice === computerChoice) {
            outcome = "Tie!";
            bigClass = "tie";
            tieScore++;
        } else if (
            (choice === "rock" && computerChoice === "scissors") ||
            (choice === "paper" && computerChoice === "rock") ||
            (choice === "scissors" && computerChoice === "paper")
        ) {
            outcome = "You Win!";
            bigClass = "win";
            playWin();
            pScore++;
        }
        else {
            outcome = "Computer Wins!";
            bigClass = "lose";
            cScore++;
        }
        if (bigClass == "lose") {
            playLose();
        }

        resultText.textContent = outcome.toUpperCase();
        resultText.className = "show " + bigClass;

        if (bigClass === "win") {
            createConfetti();
        }

        scoreText.textContent = `Wins: ${pScore} | Losses: ${cScore} | Ties: ${tieScore}`;

        enableButtons();

        setTimeout(() => {
            resultText.classList.remove("show");
        }, 2200);
    }, 1520);
}

function createConfetti() {
    const container = document.createElement("div");
    container.classList.add("confetti-container");
    document.body.appendChild(container);

    for (let i = 0; i < 110; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = (Math.random() * 1.5 + 1) + "s";
        confetti.style.animationDelay = Math.random() * 0.38 + "s";

        const colors = ["#ff0000", "#00ff00", "#ffff00", "#ff00ff", "#00ffff", "#ffa500"];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(confetti);
    }

    container.style.display = "block";

    setTimeout(() => container.remove(), 2000);
}

function disableButtons() {
    buttons.forEach(b => b.disabled = true);
}

function enableButtons() {
    buttons.forEach(b => b.disabled = false);
}