class Ball {
    constructor(canvas, radius = 10) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.radius = radius;
        this.resetPosition();
        this.speed = 5;
        this.dx = 0;
        this.dy = 0;
    }

    resetPosition() {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 30;
        // Random angle between -45 and 45 degrees
        const angle = (Math.random() * 90 - 45) * Math.PI / 180;
        this.dx = Math.sin(angle) * this.speed;
        this.dy = -Math.cos(angle) * this.speed;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.closePath();
    }

    update(paddle, bricks) {
        // Wall collision
        if (this.x + this.dx > this.canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }

        // Paddle collision
        if (this.y + this.dy > this.canvas.height - this.radius - paddle.height) {
            if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
                // Calculate bounce angle based on where ball hits paddle
                let hitPoint = (this.x - (paddle.x + paddle.width/2)) / (paddle.width/2);
                this.dx = hitPoint * this.speed;
                this.dy = -this.dy;
            }
        }

        // Move ball
        this.x += this.dx;
        this.y += this.dy;

        return this.y <= this.canvas.height;
    }

    checkBrickCollision(brick) {
        const distX = Math.abs(this.x - brick.x - brick.width/2);
        const distY = Math.abs(this.y - brick.y - brick.height/2);

        if (distX > (brick.width/2 + this.radius)) return false;
        if (distY > (brick.height/2 + this.radius)) return false;

        if (distX <= (brick.width/2)) return true;
        if (distY <= (brick.height/2)) return true;

        const dx = distX - brick.width/2;
        const dy = distY - brick.height/2;
        return (dx * dx + dy * dy <= (this.radius * this.radius));
    }
}
