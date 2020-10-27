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
        this.frameX = 0;
        this.frameY = 0;
        this.randomise = Math.floor(Math.random() * 30 + 30);
        this.carType = Math.floor(Math.random() * numberOfCars);
    } 
    draw() {
        if (this.type === "turtle") {
            if (frame % this.randomise === 0) {
                if (this.frameX >= 1) {
                this.frameX = 0;
                } 
                else {
                    this.frameX++;
                }
            }
            ctx1.drawImage(turtle, this.frameX * 70, this.frameY * 70, 70, 70, this.x, this.y, this.width, this.height);
        }
        else if (this.type === "log") {
            ctx1.drawImage(log, this.x, this.y, this.width, this.height);
        }
        else {
            ctx2.drawImage(car, this.frameX * this.width, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height);
        }
    }  
    update() {
        this.x += this.speed * gamespeed;   // we need to multiply gamespeed to keep the same plus or minus value
        if (this.speed > 0) {   // for cars moving to the right
            if (this.x > canvas.width + this.width) {
                this.x = 0 - this.width;    // will reset the cars behind the left edge once they pass the right edge
                this.carType = (Math.floor(Math.random() * numberOfCars)); 
            }
        }
        else {      // speed is less than zero so cars are moving to the left
            if (this.x < 0 - this.width) { 
                this.frameX = 1;    
                this.x = canvas.width + this.width;     // '+ this.width' will give the cars a small delay before they appear again
                this.carType = (Math.floor(Math.random() * numberOfCars));
            }
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
    // lane 2
    for (let i = 0; i < 2; i++) {
        let x = i * 300;    
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, "car"));
    }
    // lane 3
    for (let i = 0; i < 2; i++) {
        let x = i * 400;  
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2.5, grid, 2, "car"));
    }
    // River 
    // lane 1  (logs) 
    for (let i = 0; i < 2; i++) {
        let x = i * 400;    
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 30, grid * 2, grid, -2, "log"));
    }
    // lane 2 (turtles)
    for (let i = 0; i < 3; i++) {   // turtles are smaller so we'll make them closer together
        let x = i * 200;    
        logsArray.push(new Obstacle(x, canvas.height - grid * 6 - 30, grid, grid, 1, "turtle"));
    }
}
initObstacles();

// Will cycle through entire cars array 
function handleObstacles() {
    for (let i = 0; i < carsArray.length; i++) {
        carsArray[i].update();
        carsArray[i].draw();
    }
    for (let i = 0; i < logsArray.length; i++) {
        logsArray[i].update();
        logsArray[i].draw();
    }
    // collision with car
    for (let i = 0; i < carsArray.length; i++) {
        if (collision(frogger, carsArray[i])) {
            ctx4.drawImage(collisions, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50);
            resetGame();
        }
    }
}