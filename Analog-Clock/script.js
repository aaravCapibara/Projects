// Selecting components from the DOM
const hourHand = document.getElementById('hour');
const minHand = document.getElementById('min');
const secHand = document.getElementById('sec');
const digitalTime = document.getElementById('time');

function updateClock() {
    // 1. Fetching current local time metrics
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 2. Analog Clock Logic: Computing rotation vectors
    const hourRotation = (30 * hours) + (minutes / 2); // 30 deg per hour + fractional shift
    const minRotation = 6 * minutes;                  // 6 deg per minute
    const secRotation = 6 * seconds;                  // 6 deg per second

    // Rendering angles onto the CSS elements
    hourHand.style.transform = `rotate(${hourRotation}deg)`;
    minHand.style.transform = `rotate(${minRotation}deg)`;
    secHand.style.transform = `rotate(${secRotation}deg)`;

    // 3. Digital Clock Logic: Extracting AM/PM format
    let ampm = hours >= 12 ? 'PM' : 'AM';
    let displayHours = hours % 12;
    displayHours = displayHours ? displayHours : 12; // Formats "0" hours to "12"

    // String formatting padding rules (forcing two digits)
    const formattedHours = displayHours < 10 ? '0' + displayHours : displayHours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Outputting formatted string inside the digital panel
    digitalTime.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

// Establishing standard interval lifecycle
setInterval(updateClock, 1000);

// Initialize interface state directly upon initial render execution
updateClock();