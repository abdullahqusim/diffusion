var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";

// Particle Class
class Particle {
    constructor(x, y, radius, dy, dx, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dy = dy;
        this.dx = dx;      
        this.color = color;
    }
}

// Array of Particles
var particles = [];

// Create Particles
for (i=0;i<50;i++) {
        particles.push(
            new Particle(
                310 + (Math.random() * 280),
                10 + Math.random() * 580,
                5,
                Math.sin(Math.random() * 2 * Math.PI) * 5,
                Math.sin(Math.random() * 2 * Math.PI) * 5,
                "#0000ff"
            )
        );
}

for (x=0;x<50;x++) {
    particles.push(
        new Particle(
            290 - (Math.random() * 280),
            10 + (Math.random() * 580),
            5,
            Math.sin(Math.random() * 2 * Math.PI) * 5,
            Math.sin(Math.random() * 2 * Math.PI) * 5,
            "#ff0000"
        )
    );
}

// Frame Processing
setInterval(function() {

    // Reset Canvas
    ctx.clearRect(0, 0, 600, 600);

    // For each particle
    for (a in particles) {
    
        // Draw particles
        ctx.fillStyle = particles[a].color;
        ctx.beginPath();
        ctx.arc(particles[a].x, particles[a].y, particles[a].radius, 0, 2 * Math.PI);
        ctx.fill();

        // Alter particles x and y
        particles[a].x = particles[a].x + particles[a].dx;
        particles[a].y = particles[a].y + particles[a].dy;

        // Check if colliding with walls
        if ((particles[a].y + particles[a].radius) >= 600 || (particles[a].y - particles[a].radius) <= 0) {
            particles[a].dy = -particles[a].dy;
        }

        if ((particles[a].x + particles[a].radius) >= 600 || (particles[a].x - particles[a].radius) <= 0) {
            particles[a].dx = -particles[a].dx;
        }

        // For each particle which isnt the current particle
        for (b in particles) {
            if (a != b) {

                // Check if colliding
                if (
                    Math.sqrt(Math.pow((particles[a].x - particles[b].x), 2) + Math.pow((particles[a].y - particles[b].y), 2)) 
                        <= particles[a].radius + particles[b].radius) {

                    // Reverse dy and dx

                    tempdx = particles[a].dx;
                    tempdy = particles[a].dy;

                    particles[a].dx = particles[b].dx;
                    particles[a].dy = particles[b].dy;

                    particles[b].dx = tempdx;
                    particles[b].dy = tempdy;
                    
                }
            }
        }
    
    }

}, 17);