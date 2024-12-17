let respectsPaid = new Set();

// Initialize the application
function initializeApp() {
    console.log("App initialized.");
    handleOliverAnimation();
    checkHeavenSign();
}

// Show sparkle animation
function showSparkles(target) {
    const sparkle = target === "mailbox" ? document.getElementById("sparkle-mailbox") : document.getElementById("sparkle-heaven");
    const targetElement = document.getElementById(target === "mailbox" ? "mailbox" : "heaven-sign");

    sparkle.style.left = `${targetElement.offsetLeft + 20}px`;
    sparkle.style.top = `${targetElement.offsetTop - 20}px`;
    sparkle.style.display = "block";
    sparkle.classList.add("animate__fadeInUp");

    setTimeout(() => {
        sparkle.classList.replace("animate__fadeInUp", "animate__fadeOutDown");
        setTimeout(() => sparkle.style.display = "none", 2000);
    }, 2000);
}

// Show Heaven sign
function showHeavenSign() {
    const heavenSign = document.getElementById("heaven-sign");
    heavenSign.style.display = "block";
}

// Check if Heaven sign should be displayed on load
function checkHeavenSign() {
    const numRespects = localStorage.getItem("totalRespectsPaid") || 0;
    console.log(`Total respects paid: ${numRespects}`);
    if (numRespects > 0) {
        showHeavenSign();
    }
}

// Pay respects
function payRespects() {
    const names = ["Rosie", "Lucy", "Zorro", "Cutie", "Petal", "Barry", "Butters", "Nipple"];
    const name = prompt("Choose someone to pay respects to: " + names.join(", "));

    if (!names.includes(name)) {
        alert("Invalid choice. Please try again.");
        return;
    }

    // Retrieve respectsPaid set from localStorage
    let respectsPaidArray = JSON.parse(localStorage.getItem("respectsPaid")) || [];
    respectsPaid = new Set(respectsPaidArray);

    if (respectsPaid.has(name)) {
        alert(`You have already paid respects to ${name}.`);
        return;
    }

    // Add the new name to the respectsPaid set
    respectsPaid.add(name);
    respectsPaidArray = Array.from(respectsPaid);
    localStorage.setItem("respectsPaid", JSON.stringify(respectsPaidArray));

    // Increment total respects count
    let totalRespects = parseInt(localStorage.getItem("totalRespectsPaid")) || 0;
    totalRespects++;
    localStorage.setItem("totalRespectsPaid", totalRespects);

    // Show sparkles and Heaven sign
    showSparkles("mailbox");

    if (totalRespects === 1) {
        showHeavenSign();
        setTimeout(() => showSparkles("heaven"), 1000);
    }

    // alert(`You have paid respects to ${name}.`);
}

// Go to Heaven page
function goToHeaven() {
    window.location.href = "heaven.html"; // Redirect to the Heaven page
}

// Handle Oliver animation on return
function handleOliverAnimation() {
    const trainDeparted = localStorage.getItem("trainDeparted") === "true";

    if (trainDeparted) {
        const oliver = document.getElementById("oliver");
        oliver.classList.add("oliverWalkIn");
        oliver.style.display = "block";

        setTimeout(() => {
            oliver.src = "oliversit.png"; // Change to sitting Oliver
        }, 5000);
    }
}

// Simulate train departure status (optional: trigger this elsewhere if needed)
function setTrainDeparture() {
    localStorage.setItem("trainDeparted", "true");
    alert("Train has departed!");
}

// Event listeners
document.getElementById("mailbox").addEventListener("click", payRespects);
document.getElementById("heaven-sign").addEventListener("click", goToHeaven);

// Initialize the app on load
window.onload = () => {
    initializeApp();
};

resetButton.addEventListener("click", function(){
    localStorage.clear();
    alert("Welcome back to the beginning")
    window.location.href = window.location.href;
})
