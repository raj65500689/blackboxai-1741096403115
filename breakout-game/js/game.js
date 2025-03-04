class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.paddle = new Paddle(this.canvas);
        this.ball = new Ball(this.canvas);
        this.brickField = new BrickField(this.canvas);
        
        this.score = 0;
        this.lives = 3;
        this.gameStarted = false;
        this.gameOver = false;
        
        this.startButton = document.getElementById('startButton');
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        
        this.startButton.addEventListener('click', () => this.startGame());
        
        // Initial render
        this.render();
    }

    startGame() {
        if (this.gameOver) {
            // Reset game state
            this.score = 0;
            this.lives = 3;
            this.brickField.reset();
            this.gameOver = false;
            this.updateUI();
        }
        
        this.gameStarted = true;
        this.startButton.textContent = 'Restart Game';
        this.ball.resetPosition();
        this.paddle.reset();
        
        // Start game loop if not already running
        if (!this.animationId) {
            this.gameLoop();
        }
    }

    gameLoop() {
        this.update();
        this.render();
        
        if (!this.gameOver) {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    update() {
        if (!this.gameStarted || this.gameOver) return;

        this.paddle.update();
        
        // Check if ball is still in play
        const ballInPlay = this.ball.update(this.paddle, this.brickField);
        
        if (!ballInPlay) {
            this.lives--;
            this.updateUI();
            
            if (this.lives <= 0) {
                this.gameOver = true;
                this.gameStarted = false;
                this.startButton.textContent = 'Play Again';
                return;
            }
            
            this.ball.resetPosition();
            this.paddle.reset();
            this.gameStarted = false;
        }

        // Check brick collision
        if (this.brickField.checkCollision(this.ball)) {
            this.score += 10;
            this.updateUI();
            
            // Check if all bricks are destroyed
            if (this.brickField.allBricksDestroyed()) {
                this.gameOver = true;
                this.gameStarted = false;
                this.startButton.textContent = 'Play Again';
            }
        }
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw game elements
        this.brickField.draw();
        this.paddle.draw();
        this.ball.draw();
        
        // Draw game over message
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.font = '48px "Press Start 2P"';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.textAlign = 'center';
            
            if (this.lives <= 0) {
                this.ctx.fillText('GAME OVER', this.canvas.width/2, this.canvas.height/2);
            } else {
                this.ctx.fillText('YOU WIN!', this.canvas.width/2, this.canvas.height/2);
            }
            
            this.ctx.font = '24px "Press Start 2P"';
            this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width/2, this.canvas.height/2 + 60);
        }
        // Draw "Press Start" message
        else if (!this.gameStarted) {
            this.ctx.font = '24px "Press Start 2P"';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Press Start', this.canvas.width/2, this.canvas.height/2);
        }
    }

    updateUI() {
        this.scoreElement.textContent = this.score;
        this.livesElement.textContent = this.lives;
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new Game();
});
