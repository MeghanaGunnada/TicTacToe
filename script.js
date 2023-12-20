document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-button");
    const cells = [];
    const winnerModal = document.getElementById("winner-modal");
    const winnerMessage = document.getElementById("winner-message");
    const newGameButton = document.getElementById("new-game-button");

    let currentPlayer = "X";
    let isGameOver = false;
    let playerXName, playerOName;

    // Ask for player names
    playerXName = prompt("Enter name for player X:");
    playerOName = prompt("Enter name for player O:");

    function checkWin() {
         const winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
       for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                cells[a].classList.add("win-cell");
                cells[b].classList.add("win-cell");
                cells[c].classList.add("win-cell");
                return cells[a].textContent;
            }
         }

        if ([...cells].every(cell => cell.textContent)) {
            return "Tie";
        }

        return null;
    }

    function handleClick(e) {
        if (isGameOver || e.target.textContent !== "") return;

        e.target.textContent = currentPlayer;
        e.target.classList.add("filled-cell");
        const winner = checkWin();

        if (winner) {
            isGameOver = true;
            if (winner === "Tie") {
                message.textContent = "It's a tie!";
            } else {
                const winningPlayerName = winner === "X" ? playerXName : playerOName;
                winnerMessage.textContent = `${winningPlayerName} wins!`;
                showModal();
            }
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            const playerName = currentPlayer === "X" ? playerXName : playerOName;
            message.textContent = `${playerName}'s turn`;
        }
    }

    function resetGame() {
        for (const cell of cells) {
            cell.textContent = "";
            cell.classList.remove("filled-cell", "win-cell");
        }
        currentPlayer = "X";
        const playerName = playerXName;
        message.textContent = `${playerName}'s turn`;
        isGameOver = false;
        hideModal();
      if (lastWinner) {
            message.textContent = `Last winner: ${lastWinner}`;
        }
    }

    function showModal() {
        winnerModal.style.display = "block";
    }

    function hideModal() {
        winnerModal.style.display = "none";
    }

    resetButton.addEventListener("click", resetGame);
    newGameButton.addEventListener("click", () => {
        resetGame();
        hideModal();
    });

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cells.push(cell);
        cell.addEventListener("click", handleClick);
        gameBoard.appendChild(cell);
    }

    resetGame();
});
