/*  We are passing all these values as attributes to the 
    constructor from the outside,
    so the constructor asigns the attributes we pass to it 
    to properties on the new blank object it creates */
class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
    } 
    draw() {
        ctx1.fillStyle = "blue";
        ctx1.fillRect(this.x, this.y, this.width, this.height);
    }  
    update() {
        this.x += this.speed * gamespeed;   // we need to multiply gamespeed to keep the same plus or minus value
        if (this.x > canvas.width + this.width) {
            this.x = 0 - this.width;    // will reset the cars behind the left edge once they pass the right edge
        }
    }
}

// Go line by line and add new obstacle objects to cars array and log array
function initObstacles() {
    // lane 1
    for (let i = 0; i < 2; i++) {
        let x = i * 350;    // everytime we generate a new car its x value will be different
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, "car"));
    }
}
initObstacles();

// Will cycle through entire cars array 
function handleObstacles() {
    for (let i = 0; i < carsArray.length; i++) {
        carsArray[i].update();
        carsArray[i].draw();
    }
}