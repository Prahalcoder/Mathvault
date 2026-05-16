let teams = [];
let currentTeam = 0;
let openedSuitcases = 0;
let questions = [
    { question: "The curve traced by a point on the rim of a rolling circle is called a __", answer: "Cycloid" },
    { question: "The curve that represents the oscillations of the sine function and is closely related to the unit circle is called the __.", answer: "Pi curve" },
    { question: "The special number approximately equal to 1.618, often found in art, nature, and architecture, is called the __.", answer: "Golden Ratio" },
    { question: "A superhero flies from (0,0,0) to (6, 8, 10) in 2 seconds.If they continue at this speed for another 3 seconds, where will they be?", answer: "(15,20,25)" },
    { question: "Which award is given for outstanding work in statistics and probability?", answer: "C.R. Rao Award" },
    { question: "Which famous award is given for exceptional contributions to mathematics, often considered the Nobel Prize of Mathematics?", answer: "Fields Medal" },
    { question: "If a square matrix A satisfies the equation A² = I, What are the possible eigenvalues of A?", answer: "+1 or -1" },
    { question: "The field is said to be irrotational if the value of curl of a vector field is ___", answer: 0 },
    { question: "Which theorem gives The circulation of a vector field around a closed curve", answer: "Stokes" },
    { question: "Which series is a periodic function can be expressed as an infinite sum of sine and cosine terms", answer: "Fourier" },
    { question: "The information about concavity of a function is given by which order of derivation", answer: "Second" },
    { question: "If a function reached its peak at an instant, what is the first derivative value in that instance?", answer: 0 },
    { question: "If \\( \\int_{0}^{2\\pi} |x\\sin x| \\,dx = k\\pi \\), then the value of \\( k \\) is equal to ____.", answer: "4" },
    { question: "The function f(x) = x sin(x) satisfies the following equation:\n\n f''(x) + f(x) + t cos(x) = 0 \n\n The value of t is _____ .",answer: -2 },
    { question: "Consider the function y = |x| in the interval [-1,1]. In this interval, the function is:\n\n1. Continuous and differentiable \n2. Continuous but not differentiable \n3. Differentiable but not continuous \n4. Neither continuous nor differentiable", answer: 2 },
    { question: "The sum of the series 1+2(a²+1)+3(a²+1)²+4(a²+1)³+⋯  is____", answer: "1/a^4" },
    { question: "A man's wage was reduced by 50% . Again the reduced wage was increased by 50%. Find his loss in terms of percentage.", answer: "25%" },
    { question: "'Every square matrix satisfies its own characteristic equation' is known as _____ theorem", answer: "Cayley-Hamilton" },
    { question: "The Sieve of Eratosthenes is used to find ...", answer: "Prime Numbers" },
    { question: "A fair coin is flipped twice, and it is known that at least one tail is observed. The probability of getting two tails is", answer: "1/3" },
    { question: "How many 4-digit even numbers have all 4 digits distinct? (choose the digits from 0-9)", answer: 2296 },
    { question: "Two girls have picked 10 roses, 15 sunflowers, and 15 daffodils. What is the number of ways they can divide the flowers among themselves?", answer: 2816 },
    { question: "If two fair coins are flipped and at least one of the outcomes is known to be a head, what is the probability that both outcomes are heads?", answer: "1/3" },
    { question: "Suppose there are two coins. The first coin gives heads with probability 5/8 when tossed, while the second coin gives heads with probability 1/4. One of the two coins is picked up at random with equal probability and tossed. What is the probability of obtaining heads? ", answer: "1/2" },
    { question: "A bag contains 10 blue marbles, 20 green marbles, and 30 red marbles. A marble is drawn from the bag, its colour is recorded, and it is put back in the bag. This process is repeated 3 times. The probability that no two of the marbles drawn have the same colour is", answer: "1/6" }
];

function generateTeamInputs() {
    let teamCount = document.getElementById("team-count").value;
    let teamInputsDiv = document.getElementById("team-inputs");
    let teamNamesDiv = document.getElementById("team-names");

    teamInputsDiv.innerHTML = "";

    for (let i = 0; i < teamCount; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Team ${i + 1} Name`;
        input.id = `team-${i}`;
        teamInputsDiv.appendChild(input);
        teamInputsDiv.appendChild(document.createElement("br"));
    }

    teamNamesDiv.style.display = "block";
}

function startGame() {
    let teamCount = document.getElementById("team-count").value;
    teams = [];

    for (let i = 0; i < teamCount; i++) {
        let name = document.getElementById(`team-${i}`).value.trim() || `Team ${i + 1}`;
        teams.push({ name: name, score: 0 });
    }

    document.getElementById("team-setup").style.display = "none";
    document.getElementById("game-container").style.display = "flex";
    openedSuitcases = 0;
    createGrid();
    updateTurn();
    updateLeaderboard();
}

function createGrid() {
    let grid = document.getElementById("grid");
    grid.innerHTML = "";

    for (let i = 0; i < 25; i++) {
        let suitcase = document.createElement("div");
        suitcase.classList.add("suitcase");
        suitcase.dataset.index = i;
        suitcase.dataset.opened = "false";

        let numberTag = document.createElement("span");
        numberTag.innerText = i + 1;
        numberTag.style.position = "absolute";
        numberTag.style.top = "5px";
        numberTag.style.left = "5px";
        numberTag.style.background = "white";
        numberTag.style.padding = "3px 6px";
        numberTag.style.borderRadius = "5px";
        numberTag.style.fontSize = "14px";
        numberTag.style.fontWeight = "bold";

        suitcase.appendChild(numberTag);
        suitcase.addEventListener("click", openSuitcase);
        suitcase.addEventListener("mouseover", () => document.getElementById("hover-sound").play());

        grid.appendChild(suitcase);
    }
}

function openSuitcase(event) {
    let suitcase = event.currentTarget;
    if (suitcase.dataset.opened === "true") return;

    let index = parseInt(suitcase.dataset.index);
    let randomQ = questions[index];

    suitcase.classList.add("open");
    suitcase.dataset.opened = "true";
    suitcase.dataset.answer = randomQ.answer;

    openQuestion(suitcase, randomQ.question, randomQ.answer);
}

function openQuestion(suitcase, questionText, answer) {
    document.getElementById("question-text").innerHTML = questionText;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "question-text"]); // Refresh MathJax

    document.getElementById("question-modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("answer").value = "";

    document.getElementById("submit-btn").onclick = function() {
        checkAnswer(suitcase, answer);
    };
}


function closeQuestion() {
    document.getElementById("question-modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function checkAnswer(suitcase, correctAnswer) {
    let answerInput = document.getElementById("answer").value.trim();

    if (answerInput === "") {
        alert("⚠ Please enter an answer!");
        return;
    }

    let popup = document.getElementById("result-popup");
    let popupText = document.getElementById("result-text");

    // Convert answers to lowercase strings for case-insensitive comparison
    let userAnswer = answerInput.toLowerCase();
    let expectedAnswer = String(correctAnswer).toLowerCase();

    if (userAnswer === expectedAnswer) {
        document.getElementById("correct-sound").play();
        teams[currentTeam].score += 100;
        popupText.innerText = `✅ Correct! ${teams[currentTeam].name} gains 100 points.`;
        popup.style.backgroundColor = "#4CAF50"; // Green for correct
    } else {
        document.getElementById("wrong-sound").play();
        popupText.innerText = `❌ Wrong! The correct answer was ${correctAnswer}.`;
        popup.style.backgroundColor = "#f44336"; // Red for wrong
    }

    // Show popup in the center
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000); // Hide after 2 seconds

    closeQuestion();
    openedSuitcases++;
    updateLeaderboard();

    if (openedSuitcases === 25) {
        endGame();
    } else {
        nextTurn();
    }
}



function nextTurn() {
    currentTeam = (currentTeam + 1) % teams.length;
    updateTurn();
}

function updateTurn() {
    document.getElementById("team-turn").innerText = `${teams[currentTeam].name}'s Turn`;
}

function updateLeaderboard() {
    let table = document.getElementById("leaderboard");
    table.innerHTML = `<tr><th>Team</th><th>Score</th></tr>`;
    teams.forEach(team => {
        let row = `<tr><td>${team.name}</td><td>${team.score}</td></tr>`;
        table.innerHTML += row;
    });
}

function endGame() {
    let winner = teams.reduce((max, team) => (team.score > max.score ? team : max), teams[0]);
    alert(`🎉 Game Over! The winner is ${winner.name} with ${winner.score} points!`);

    resetGame();
}

function resetGame() {
    document.getElementById("game-container").style.display = "none";
    document.getElementById("team-setup").style.display = "block";

    teams = [];
    currentTeam = 0;
    openedSuitcases = 0;
}
