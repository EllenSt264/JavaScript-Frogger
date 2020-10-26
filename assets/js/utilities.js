function animate() {
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    frogger.draw();
    frogger.update();
    requestAnimationFrame(animate);
}

animate();