// Game state variables
let gameState = [];
let flippedCards = [];
let score = 0;

// Initialize the game
function initGame() 
{
	// Generate pairs of cards (e.g., [1, 1, 2, 2, 3, 3, ...])
	const pairs = Array.from({ length: 8 }, (_, i) => i + 1).flatMap(x => [x, x]);
	gameState = pairs.map(id => ({ id, flipped: false, matched: false }));

	// Shuffle the cards
	shuffleCards(gameState);

	// Reset score and render the game board
	score = 0;
	updateScore();
	renderBoard();
}

// Shuffle cards using Fisher-Yates algorithm
function shuffleCards(cards) 
{
	for (let i = cards.length - 1; i > 0; i--)
	{
		const j = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[j]] = [cards[j], cards[i]];
	}
}

// Update score in the DOM
function updateScore() 
{
	document.getElementById("score").textContent = `Score: ${score}`;
}

// Render the game board
function renderBoard() 
{
	const board = document.getElementById("game-board");
	board.innerHTML = ""; // Clear the board

	gameState.forEach
	((card, index) => 
		{
			// Create card element
			const cardElement = document.createElement("div");
			cardElement.className = `card ${card.matched ? "matched" : ""}`;
			cardElement.textContent = card.flipped || card.matched ? card.id : "?"; // Show ID if flipped or matched

			// Add click event to flip the card
			cardElement.addEventListener("click", () => handleCardClick(index));

			// Append the card to the game board
			board.appendChild(cardElement);
		}
	);
}

// Handle card click
function handleCardClick(index) 
{
	const card = gameState[index];

	// Ignore clicks on already matched or flipped cards
	if (card.matched || card.flipped)
		return;

	// Flip the card
	card.flipped = true;
	flippedCards.push(index);

	// If two cards are flipped, check for a match
	if (flippedCards.length === 2) 
	{
		const [index1, index2] = flippedCards;
		const card1 = gameState[index1];
		const card2 = gameState[index2];

		if (card1.id === card2.id)
		{
			// Cards match: mark as matched and increase the score
			card1.matched = true;
			card2.matched = true;
			score++;
			updateScore();
		} 
		else 
		{
			// Cards don"t match: flip them back after a short delay
			setTimeout
			(() => 
				{
					card1.flipped = false;
					card2.flipped = false;
					renderBoard();
				}, 
			1000);
		}

		// Clear flipped cards array
		flippedCards = [];
	}

	// Re-render the board
	renderBoard();
}

// Reset the game
document.getElementById("reset-button").addEventListener("click", initGame);

// Start the game on page load
initGame();