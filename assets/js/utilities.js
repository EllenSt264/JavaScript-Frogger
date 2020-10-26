function animate() {
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    frogger.draw();
    frogger.update();
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