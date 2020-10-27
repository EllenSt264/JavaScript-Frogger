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