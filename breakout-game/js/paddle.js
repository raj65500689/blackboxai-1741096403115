class Paddle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        this.width = 100;
        this.height = 15;
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - this.height - 10;
        
        this.speed = 8;
        this.dx = 0;
        
        this.leftPressed = false;
        this.rightPressed = false;
        
        // Event listeners for keyboard controls
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            this.leftPressed = true;
        }
        if (e.key === 'ArrowRight' || e.key === 'd') {
            this.rightPressed = true;
        }
    }

    handleKeyUp(e) {
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            this.leftPressed = false;
        }
        if (e.key === 'ArrowRight' || e.key === 'd') {
            this.rightPressed = false;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.roundRect(this.x, this.y, this.width, this.height, 5);
        this.ctx.fillStyle = '#4ade80';
        this.ctx.fill();
        this.ctx.closePath();
    }

    update() {
        // Update paddle position based on input
        if (this.leftPressed && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.rightPressed && this.x + this.width < this.canvas.width) {
            this.x += this.speed;
        }

        // Keep paddle within canvas bounds
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > this.canvas.width) {
            this.x = this.canvas.width - this.width;
        }
    }

    reset() {
        this.x = (this.canvas.width - this.width) / 2;
    }
}
