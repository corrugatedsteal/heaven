const container = document.getElementById("container");

const animals = [
    "Lucy",
    "Rosie",
    "Zorro",
    "Cutie",
    "Petal",
    "Barry",
    "Butters",
    "Nipple"
];

// Simulated respects data and train status in localStorage
if (!localStorage.getItem("respectsPaid")) {
    const initialRespects = animals.map(animal => ({ name: animal, respects: 0 }));
    localStorage.setItem("respectsPaid", JSON.stringify(initialRespects));
}
if (!localStorage.getItem("trainDeparted")) {
    localStorage.setItem("trainDeparted", "false");
}

// Initialize the page
function init() {
    loadPage();
    checkTrainEvent();
    //localStorage.setItem("trainDeparted", "false");
}

// Load respects data and render animals
function loadPage() {
    const respectsPaidData = JSON.parse(localStorage.getItem("respectsPaid"));
    const trainDeparted = localStorage.getItem("trainDeparted") === "true";
    console.log(trainDeparted)
    console.log(respectsPaidData)

    respectsPaidData.forEach((animal) => {
       
            renderAnimal(animal, trainDeparted); // Render only animals with respects paid
    });

    updateBackground();
}

// Update the background based on respects paid
function updateBackground() {
    const respectsPaidData = JSON.parse(localStorage.getItem("respectsPaid"));
    const totalRespectsPaid = respectsPaidData.length;

    let backgroundClass = "bg-heaven"; // Default background
    if (totalRespectsPaid >= 2) backgroundClass = "bg-homestead";
    if (totalRespectsPaid >= 4) backgroundClass = "bg-littletown";
    if (totalRespectsPaid >= animals.length) backgroundClass = "bg-dantesinferno";

    container.className = ""; // Clear previous classes
    container.classList.add(backgroundClass);
}

// Render Animal
function renderAnimal(name, trainDeparted) {
    const animalContainer = document.createElement("div");
    animalContainer.classList.add("animal-container");
    animalContainer.style.margin = "10px";
    animalContainer.id = name;

    const animal = document.createElement("img");
    animal.src = `${name.toLowerCase()}.png`;
    animal.classList.add("animal", "animate__animated");

    if (!trainDeparted) {
        setTimeout(() => {
            animalContainer.style.opacity = "1";
        }, 100);
    }

    const options = document.createElement("div");
    options.classList.add("options");
    options.style.position = "absolute";
    options.style.top = "0";
    options.style.left = "0";
    options.style.padding = "1px";
    options.style.borderRadius = "5px";

    const interactionOptions = ["pet", "play", "feel the love"];
    interactionOptions.forEach((action, i) => {
        const btn = document.createElement("div");
        btn.classList.add("option");
        btn.textContent = action;
        btn.style.cursor = "pointer";
        if (i === 0) btn.style.transform = "translate(35%, -100%)";
        if (i === 1) btn.style.transform = "translate(-90%, -90%)";
        if (i === 2) btn.style.transform = "translate(180%, -100%)";
        btn.addEventListener("click", () => animateAnimal(animal, action));
        options.appendChild(btn);
    });

    animalContainer.appendChild(animal);
    animalContainer.appendChild(options);
    container.appendChild(animalContainer);
}

// Animate Animal
function animateAnimal(animal, action) {
    if (action === "pet") animal.classList.add("animate__shakeY");
    if (action === "play") animal.classList.add("animate__wobble");
    if (action === "feel the love") animal.classList.add("animate__tada");

    setTimeout(() => {
        animal.classList.remove("animate__shakeY", "animate__wobble", "animate__tada");
    }, 1000);
}

// Check for the train event
function checkTrainEvent() {
    try {
        // Retrieve respects data and train status from localStorage
        const respectsPaidData = JSON.parse(localStorage.getItem("respectsPaid")) || [];
        const allAnimalsRespected = respectsPaidData.length == 8
        const trainDeparted = localStorage.getItem("trainDeparted") === "true";

        console.log("Train Departed:", trainDeparted);
        console.log("All Animals Respected:", allAnimalsRespected);

        if (allAnimalsRespected && !trainDeparted) {
            // Show the train ticket
            const trainTicket = document.getElementById("train-ticket");
            trainTicket.style.display = "block";
            trainTicket.classList.add("animate__slideInDown");

            // Add click event to train ticket
            trainTicket.addEventListener("click", () => {
                try {
                    // Mark the train as departed in localStorage
                    localStorage.setItem("trainDeparted", "true");

                    // Hide the ticket
                    trainTicket.style.display = "none";

                    // Animate the trolley arriving
                    const trolley = document.createElement("div");
                    trolley.id = "trolley";
                    trolley.style.backgroundImage = `url("trolly.png")`;
                    trolley.style.position = "absolute";
                    trolley.style.right = "-300px"; // Start off-screen
                    trolley.style.bottom = "10px";
                    trolley.style.width = "200px";
                    trolley.style.height = "200px";
                    trolley.style.backgroundSize = "contain";
                    trolley.style.backgroundRepeat = "no-repeat";
                    trolley.classList.add("slideInRight", "animate__animated");
                    document.getElementById("container").appendChild(trolley);

                    // Lower z-index for animals
                    for (const animal of respectsPaidData) {
                        const animalDiv = document.querySelector(`#${animal}`);
                        if (animalDiv) animalDiv.style.zIndex = 0;
                    }

                    // Wait for the trolley to arrive
                    setTimeout(async () => {
                        // Animate animals to the trolley one by one
                        for (const animal of respectsPaidData) {
                            const animalDiv = document.querySelector(`#${animal}`);
                            if (animalDiv) {
                                animalDiv.classList.add("animalToTrolley");
                                await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait for animation
                                setTimeout(() => animalDiv.remove(), 1500); // Remove after animation
                            }
                        }

                        // Change trolley image to "end" state
                        trolley.style.backgroundImage = `url("endtrolly.png")`;

                        // Pause before showing text and whistle
                        setTimeout(() => {
                            const endScene = document.getElementById("end-scene");
                            const whistle = document.getElementById("whistle");
                            const text = document.getElementById("text");

                            // Show text and whistle with animations
                            text.style.display = "block";
                            whistle.style.display = "block";
                            text.classList.add("animate__fadeInDown");
                            whistle.classList.add("animate__fadeInDown");

                            // Add click event to whistle
                            whistle.addEventListener("click", () => {
                                whistle.classList.add("animate__rubberBand");

                                // Animate text and trolley leaving the screen
                                setTimeout(() => {
                                    text.classList.add("animate__fadeOutUp");
                                    trolley.style.right = "50%";
                                    trolley.style.bottom = "10px";
                                    trolley.classList.remove("slideInRight");
                                    whistle.style.animationDelay = "0s";
                                    whistle.classList.add("animate__fadeOut");
                                    trolley.classList.add("slideUpFadeOut");

                                    // Cleanup after animation
                                    setTimeout(() => {
                                        text.style.display = "none";
                                        whistle.style.display = "none";
                                    }, 3000);
                                }, 100);
                            });
                        }, 500); // Pause before showing text and whistle
                    }, 6000); // Pause after trolley arrives
                } catch (error) {
                    console.error("Error handling train departure:", error);
                    alert("An error occurred during the train event. Please try again.");
                }
            });
        }
    } catch (error) {
        console.error("Error checking train event conditions:", error);
    }
}


// Handle the train departure animation
function handleTrainDeparture() {
    const trolley = document.createElement("div");
    trolley.id = "trolley";
    trolley.style.backgroundImage = `url("trolly.png")`;
    trolley.style.position = "absolute";
    trolley.style.right = "-300px";
    trolley.style.bottom = "10px";
    trolley.style.width = "200px";
    trolley.style.height = "200px";
    trolley.classList.add("slideInRight", "animate__animated");
    document.getElementById("container").appendChild(trolley);

    setTimeout(() => {
        const respectsPaidData = JSON.parse(localStorage.getItem("respectsPaid"));
        for (const animal of respectsPaidData) {
            const animalDiv = document.querySelector(`#${animal}`);
            if (animalDiv) {
                animalDiv.classList.add("animalToTrolley");
                setTimeout(() => animalDiv.remove(), 1500);
            }
        }
        trolley.style.backgroundImage = `url("endtrolly.png")`;
    }, 6000);
}

// Initialize the page
window.onload = init;
