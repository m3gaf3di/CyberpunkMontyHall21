let correctDoor;
let playerChoice;
let revealedGoat;

function setupGame() {
    correctDoor = Math.floor(Math.random() * 3) + 1; // Random door between 1 and 3
    document.getElementById("message").innerText = "Neon City awaits. Choose a portal!";
    let doors = document.getElementsByClassName("door");
    for (let door of doors) {
        door.disabled = false;
        door.innerText = door.id;
        door.classList.remove("chosen", "goat"); // Reset visual cues
        door.addEventListener('click', makeChoice);
    }
    document.getElementById("restart").style.display = "none";
}

function makeChoice(event) {
    playerChoice = parseInt(event.target.id.replace("door", ""));
    event.target.classList.add("chosen"); // Visual cue for player choice
    revealGoatDoor();
}

function revealGoatDoor() {
    let possibleDoors = [1, 2, 3];
    possibleDoors.splice(possibleDoors.indexOf(correctDoor), 1);
    if (possibleDoors.includes(playerChoice)) {
        possibleDoors.splice(possibleDoors.indexOf(playerChoice), 1);
    }
    revealedGoat = possibleDoors[Math.floor(Math.random() * possibleDoors.length)];
    let goatDoor = document.getElementById("door" + revealedGoat);
    goatDoor.innerText = "Goat!";
    goatDoor.classList.add("goat"); // Visual cue for goat door
    document.getElementById("message").innerText = "A glitch in the matrix. Switch or stay?";
    addSwitchOrStayListeners();
}

function addSwitchOrStayListeners() {
    let doors = document.getElementsByClassName("door");
    for (let door of doors) {
        door.removeEventListener('click', makeChoice);
        if (parseInt(door.id.replace("door", "")) !== revealedGoat) {
            door.addEventListener('click', finalizeChoice);
        } else {
            door.disabled = true;
        }
    }
}

function finalizeChoice(event) {
    let finalChoice = parseInt(event.target.id.replace("door", ""));
    if (finalChoice === correctDoor) {
        document.getElementById("message").innerText = "Victory! You've claimed the cyber-treasure!";
    } else {
        document.getElementById("message").innerText = "Defeat. Another digital illusion fades...";
    }
    endGame();
}

function endGame() {
    let doors = document.getElementsByClassName("door");
    for (let door of doors) {
        door.disabled = true;
    }
    document.getElementById("restart").style.display = "block";
    document.getElementById("restart").removeEventListener('click', setupGame); // Remove existing listener to prevent duplicates
    document.getElementById("restart").addEventListener('click', setupGame);
}

// Initialize the game
setupGame();
