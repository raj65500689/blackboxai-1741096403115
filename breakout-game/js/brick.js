class Brick {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.visible = true;
    }

    draw(ctx) {
        if (this.visible) {
            ctx.beginPath();
            ctx.roundRect(this.x, this.y, this.width, this.height, 3);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();

            // Add a subtle 3D effect
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
            ctx.lineWidth = 2;
            ctx.moveTo(this.x, this.y + this.height);
            ctx.lineTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

class BrickField {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.brickRowCount = 5;
        this.brickColumnCount = 8;
        this.brickWidth = 80;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 60;
        this.brickOffsetLeft = (canvas.width - (this.brickWidth + this.brickPadding) * this.brickColumnCount + this.brickPadding) / 2;
        
        // Colors for different rows
        this.colors = [
            '#ef4444', // Red
            '#f97316', // Orange
            '#facc15', // Yellow
            '#4ade80', // Green
            '#06b6d4'  // Cyan
        ];
        
        this.init();
    }

    init() {
        this.bricks = [];
        for (let row = 0; row < this.brickRowCount; row++) {
            this.bricks[row] = [];
            for (let col = 0; col < this.brickColumnCount; col++) {
                const brickX = col * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                const brickY = row * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                this.bricks[row][col] = new Brick(
                    brickX,
                    brickY,
                    this.brickWidth,
                    this.brickHeight,
                    this.colors[row]
                );
            }
        }
    }

    draw() {
        for (let row = 0; row < this.brickRowCount; row++) {
            for (let col = 0; col < this.brickColumnCount; col++) {
                const brick = this.bricks[row][col];
                brick.draw(this.ctx);
            }
        }
    }

    checkCollision(ball) {
        for (let row = 0; row < this.brickRowCount; row++) {
            for (let col = 0; col < this.brickColumnCount; col++) {
                const brick = this.bricks[row][col];
                if (brick.visible && ball.checkBrickCollision(brick)) {
                    brick.visible = false;
                    ball.dy = -ball.dy;
                    return true;
                }
            }
        }
        return false;
    }

    allBricksDestroyed() {
        return this.bricks.every(row => 
            row.every(brick => !brick.visible)
        );
    }

    reset() {
        this.init();
    }
}
