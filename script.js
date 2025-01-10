const text = "See the weather!";
const speed = 100; // Adjust typing speed in milliseconds
let index = 0;

function typeWriter() {
    if (index < text.length) {
        document.getElementById("typewriter-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

window.onload = typeWriter;


body { overflow-y: scroll; }

.section {

    position: relative;

    height: 100vh;

}

/* JavaScript would control visibility based on scroll position here */ 
