class Particle {
    constructor(x, y) {
        this.x = x + 25;
        this.y = y + 25;
        this.radius = Math.random() * 20 + 1;
        this.opacity = 1;
        // Plus numbers will make the particles go up
        // Minus numbers will makes the particles go down
        this.directionX = Math.random() * 1 - 0.5;
        this.directionY = Math.random() * 1 - 0.5;
    }
    draw() {
        ctx3.fillStyle = "rgba(150, 150, 150,"+ this.opacity + ")";
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx3.fill();
        ctx3.closePath();
    }
    update() {  // handles dust particles
        this.x += this.directionX;
        this.y += this.directionY;
        if (this.opacity > 0.1) {
            this.opacity -= 0.9;
        }
        if (this.radius > 0.15) {
            this.radius -= 0.14;
        }
    }
    drawRipple() {
        ctx1.strokeStyle = "rgba(255, 255, 255,"+ this.opacity + ")";
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx1.stroke();
        ctx1.closePath();
    }
    ripple() {
        if (this.radius < 50) {
            this.radius += 0.5;
            this.x -= 0.03;
            this.y -= 0.03;
        }
        if (this.opacity > 0) {
            this.opacity -= 0.02;  // decrease by small amount so the ripples slowly disappear
        }
    }
}

function handleParticles() {
    // Dust Effects
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    if (particlesArray.length > maxParticles) {
        for (let i = 0; i < 30; i++) {      // If we have more than 300 particles remove 30 particles
            particlesArray.pop()
        }
    }
    if (((keys[37] || keys[38] || keys[39] || keys[40]) || (keys[65] || keys[87] || keys[68] || keys[83])) 
    && frogger.y > 250 && particlesArray.length < maxParticles + 10) {
        for (let i = 0; i < 10; i++) {
            particlesArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
} 

function handleRipples() {
    // Water Ripples
    for (let i = 0; i < ripplesArray.length; i++) {
        ripplesArray[i].ripple();   // want to call ripple() instead of update()
        ripplesArray[i].drawRipple();
    }
    if (ripplesArray.length > 20) {
        for (let i = 0; i < 5; i++) {
            ripplesArray.pop()
        }
    }
    if (((keys[37] || keys[38] || keys[39] || keys[40]) || (keys[65] || keys[87] || keys[68] || keys[83]))
    && frogger.y < 250 && frogger.y > 100) {
        for (let i = 0; i < 20; i++) {
            ripplesArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
}