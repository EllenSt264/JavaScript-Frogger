class Frogger {
    constructor() {
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
    }
    update() {
        if (keys[38] || keys[87]) {     // up
            if (this.moving === false) {    // the player scores a point when leaving the canvas, so we don't need to define a boundary condition here
                this.y -= grid;   // frog will jump up 80 pixels
                this.moving = true;
            }
        }
        if (keys[40] || keys[83]) {     // down
            if (this.moving === false && this.y < canvas.height - this.height * 2) {    // prevents player from leaving the canvas
                this.y += grid;   // frog will jump up 80 pixels
                this.moving = true;
            }
        }
        if (keys[37] || keys[65]) {     // left
            if (this.moving === false && this.x > this.width) {    // prevents player from leaving the canvas
                this.x -= grid;   // frog will jump up 80 pixels
                this.moving = true;
            }
        }
        if (keys[39] || keys[68]) {     // right
            if (this.moving === false && this.x < canvas.width - this.width * 2) {    // prevents player from leaving the canvas
                this.x += grid;   // frog will jump up 80 pixels
                this.moving = true;
            }
        }
        if (this.y < 0) {   // when player moves past the top edge of the canvas
            scored();
        }
    }
    draw() {
        ctx3.fillStyle = "green";
        ctx3.fillRect(this.x, this.y, this.width, this.height);
    }
    jump() {
        console.log("jump");
    }
}

const frogger = new Frogger();