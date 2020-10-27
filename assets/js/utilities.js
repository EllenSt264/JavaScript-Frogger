function animate() {
    // for optimization
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    ctx4.clearRect(0, 0, canvas.width, canvas.height);
    ctx5.clearRect(0, 0, canvas.width, canvas.height);

    handleRipples();
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
    handleParticles();
    frogger.draw();
    frogger.update();
    handleObstacles();
    handleScoreBoard();
    ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);
    frame++;
    requestAnimationFrame(animate);
}

animate();

// Event listeners

window.addEventListener("keydown", function(e) {
    keys = [];      // set keys to an empty array incase it holds any values
    keys[e.keyCode] = true;
    if ((keys[37] || keys[38] || keys[39] || keys[40]) || (keys[65] || keys[87] || keys[68] || keys[83])) {
        frogger.jump();
    }
})

window.addEventListener("keyup", function(e) {
    delete keys[e.keyCode];
    frogger.moving = false;
    frogger.frameX = 0;
})

function scored() {
    score ++;
    gamespeed += 0.05;  // to increase game difficulty
    // resets the frog once the player moves it past the top edge of the canvas
    frogger.x = canvas.width/2 - frogger.width/2;  
    frogger.y = canvas.height - frogger.height - 40;
}

// Score board
function handleScoreBoard() {
    // Score Board Text
    ctx4.fillStyle = "black";
    ctx4.strokeStyle = "black";
    ctx4.font = "15px Verdana";
    ctx4.strokeText("Score", 265, 15);
    // Score Count
    ctx4.font = "60px Verdana";
    ctx4.fillText(score, 270, 65);
    // Collisions Count
    ctx4.font = "15px Verdana";
    ctx4.strokeText("Collisions: " + collisionsCount, 35, 55);
    // Game Speed Count
    ctx4.strokeText("Game Speed: " + gamespeed.toFixed(1), 35, 75);     // toFixed(1) ensures we only see the gamespeed by 1 decimal point
}


// Collision detection between two rectangles

/*  This will explain the function:

If first.x is more than second.x plus second.width
then the rectangles are far enough on the horizontal x-axis
which means that they do not collide.
So if any of the first conditions are true then there is no collision

Use exclamation points to turn the statement into false.
The OR operator will return true if ANY of the statements involved are true.
If any of the statements are true then there is no collision, so we
want the function to return false,
which is why we must use the exclamation
mark to return the opposite.

On the otherhand, 
if all four statements return false then it means the two rectangles are overlapping.
The function will want to return false but the exclamation mark converts it
to true, so collision will return true.
*/

function collision(first, second) {
    return !(first.x > second.x + second.width || first.x + first.width < second.x ||
                first.y > second.y + second.height || first.y + first.height < second.y)
}

/* When frogger gets hit by car or falls into water,
reset its x and y axis to the starting position, 
and reset score to 0, increase collisions count
and return gamespeed back to 1 */
function resetGame() {
    frogger.x = canvas.width/2 - frogger.width/2;  
    frogger.y = canvas.height - frogger.height - 40;
    score = 0;
    collisionsCount++;
    gamespeed = 1;
}