let scoreboard = JSON.parse(localStorage.getItem("score")) || {
  Wins: 0,
  Losses: 0,
  Ties: 0,
};

scoreboardUpdate();

function rockPressed() {
  playRound("rock");
}

function paperPressed() {
  playRound("paper");
}

function scissorsPressed() {
  playRound("scissors");
}

function playRound(playerMove) {
  const comMove = generateComputerMove();
  const result = determineWinner(playerMove, comMove);

  updateScoreboard(result);

  updateMoveDisplay(playerMove, comMove);
  resultMsg(result);

  localStorage.setItem("score", JSON.stringify(scoreboard));

  scoreboardUpdate();
}

function generateComputerMove() {
  const moves = ["rock", "paper", "scissors"];
  return moves[Math.floor(Math.random() * 3)];
}

function determineWinner(player, com) {
  if (player === com) {
    return "tie";
  } else if (
    (player === "rock" && com === "scissors") ||
    (player === "paper" && com === "rock") ||
    (player === "scissors" && com === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function updateScoreboard(result) {
  if (result === "win") {
    scoreboard.Wins += 1;
  } else if (result === "lose") {
    scoreboard.Losses += 1;
  } else {
    scoreboard.Ties += 1;
  }
}

function updateMoveDisplay(player, com) {
  document.querySelector(".all-move").innerHTML = `
      You <img src="asset/${player}-emoji.png" alt="${player}-emoji" class="move-icn" />
      <img src="asset/${com}-emoji.png" alt="${com}-emoji" class="move-icn" />
      Com
  `;
}

function resultMsg(result) {
  let message;
  if (result === "win") {
    message = "You Won!!";
  } else if (result === "lose") {
    message = "You Lose!!";
  } else {
    message = "You Tie!!";
  }
  document.querySelector(".js-result").innerText = message;
}

function resetScoreBoard() {
  scoreboard.Wins = 0;
  scoreboard.Losses = 0;
  scoreboard.Ties = 0;
  localStorage.removeItem("score");
  scoreboardUpdate();
  document.querySelector(".js-result").innerText = "";
  document.querySelector(".all-move").innerHTML = "";
}

function scoreboardUpdate() {
  document.querySelector("#score-card").innerHTML = `
      Wins: ${scoreboard.Wins}, Losses: ${scoreboard.Losses}, Ties: ${scoreboard.Ties}
  `;
}
