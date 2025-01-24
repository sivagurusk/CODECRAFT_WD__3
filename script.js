const board = document.getElementById('board');
        const winnerDisplay = document.getElementById('winner');
        const resetButton = document.getElementById('reset');

        let gameState = ["", "", "", "", "", "", "", "", ""];
        let currentPlayer = "X";
        let gameActive = true;

        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        function createBoard() {
            board.innerHTML = "";
            gameState.forEach((cell, index) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.index = index;
                cellDiv.textContent = cell;
                cellDiv.addEventListener('click', handleCellClick);
                board.appendChild(cellDiv);
            });
        }

        function handleCellClick(event) {
            const index = event.target.dataset.index;
            if (gameState[index] !== "" || !gameActive) return;

            gameState[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            
            if (checkWin()) {
                gameActive = false;
                winnerDisplay.textContent = `${currentPlayer} Wins!`;
                return;
            }

            if (gameState.every(cell => cell !== "")) {
                gameActive = false;
                winnerDisplay.textContent = "It's a Draw!";
                
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";

            if (currentPlayer === "O") {
                setTimeout(aiMove, 500); // AI moves after a short delay
            }
        }

        function aiMove() {
            const emptyCells = gameState.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
            if (emptyCells.length === 0 || !gameActive) return;

            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            gameState[randomIndex] = "O";
            document.querySelector(`[data-index='${randomIndex}']`).textContent = "O";

            if (checkWin()) {
                gameActive = false;
                winnerDisplay.textContent = `O Wins!`;
                return;
            }

            if (gameState.every(cell => cell !== "")) {
                gameActive = false;
                winnerDisplay.textContent = "It's a Draw!";
                return;
            }

            currentPlayer = "X";
        }

        function checkWin() {
            return winningConditions.some(condition => {
                const [a, b, c] = condition;
                return gameState[a] === currentPlayer &&
                       gameState[a] === gameState[b] &&
                       gameState[a] === gameState[c];
            });
        }

        resetButton.addEventListener('click', () => {
            gameState = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            gameActive = true;
            winnerDisplay.textContent = "";
            createBoard();
        });

        createBoard();