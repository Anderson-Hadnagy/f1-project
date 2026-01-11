/* ================================
   GAME 1: REACTION TIMER
   ================================ */
let reactionStatus = "waiting";
let startTime;
let timeoutID;
const box = document.getElementById("reaction-box");
const text = document.getElementById("reaction-text");
const res = document.getElementById("reaction-result");

function startReactionGame() {
    if (reactionStatus === "waiting" || reactionStatus === "finished") {
        reactionStatus = "ready";
        box.style.backgroundColor = "#e10600";
        text.innerText = "WAIT...";
        res.innerText = "";
        
        let randomTime = Math.floor(Math.random() * 3000) + 1000;
        timeoutID = setTimeout(() => {
            reactionStatus = "green";
            box.style.backgroundColor = "#00d2be";
            text.innerText = "CLICK!";
            startTime = Date.now();
        }, randomTime);
    } else if (reactionStatus === "ready") {
        clearTimeout(timeoutID);
        reactionStatus = "waiting";
        box.style.backgroundColor = "#333";
        text.innerText = "TOO EARLY!";
    } else if (reactionStatus === "green") {
        let reaction = (Date.now() - startTime) / 1000;
        reactionStatus = "finished";
        box.style.backgroundColor = "#333";
        text.innerText = "RESTART";
        res.innerText = reaction + "s";
    }
}

/* ================================
   GAME 2: STRATEGY CALCULATOR
   ================================ */
function calculateStrategy() {
    const laps = document.getElementById("lapsInput").value;
    const output = document.getElementById("strategy-output");
    if (!laps) return;
    
    if (laps < 15) output.innerHTML = "<span style='color:#e10600'>SOFT TYRES</span> (Pure Speed)";
    else if (laps < 35) output.innerHTML = "<span style='color:#fcd800'>MEDIUM TYRES</span> (Balanced)";
    else output.innerHTML = "<span style='color:#fff'>HARD TYRES</span> (Durability)";
}

/* ================================
   GAME 3: FLAG MARSHAL
   ================================ */
let currentScenario = null;
let scenarioActive = false;

const scenarios = [
    { text: "A car has crashed and is blocking the track!", correct: "red" },
    { text: "There is some debris on the track, drivers must slow down.", correct: "yellow" },
    { text: "The track is clear. Resume racing speed.", correct: "green" },
    { text: "The leader has crossed the line on the final lap!", correct: "checkered" },
    { text: "Heavy rain has made the track impossible to drive on.", correct: "red" },
    { text: "A car has spun off but is safely off the road.", correct: "yellow" }
];

function nextScenario() {
    const output = document.getElementById("flag-scenario");
    const result = document.getElementById("flag-result");
    
    const rand = Math.floor(Math.random() * scenarios.length);
    currentScenario = scenarios[rand];
    
    output.innerText = currentScenario.text;
    output.style.color = "white";
    result.innerText = "Waiting for decision...";
    result.style.color = "#888";
    scenarioActive = true; 
}

function checkFlag(color) {
    const result = document.getElementById("flag-result");
    if (!currentScenario) { result.innerText = "Click 'Start' first!"; return; }
    if (!scenarioActive) return;

    if (color === currentScenario.correct) {
        result.innerHTML = "✅ CORRECT! Good decision Marshal.";
        result.style.color = "#00d2be"; 
    } else {
        result.innerHTML = "❌ WRONG FLAG! Dangerous decision.";
        result.style.color = "#e10600"; 
    }
    scenarioActive = false;
}

/* ================================
   GAME 4: ULTIMATE QUIZ ENGINE
   ================================ */

// 1. Data Structure: All your questions here
const quizQuestions = [
    {
        question: "Who has the most World Championships?",
        options: ["Max Verstappen", "Hamilton & Schumacher", "Ayrton Senna"],
        answer: 1 // Index of the correct answer (0, 1, or 2)
    },
    {
        question: "What does 'DRS' stand for?",
        options: ["Drag Reduction System", "Driver Race System", "Downforce Rear Suspension"],
        answer: 0
    },
    {
        question: "What does a RED FLAG mean?",
        options: ["Race Over Permanently", "Session Suspended (Stop)", "Slippery Surface"],
        answer: 1
    },
    {
        question: "Who is the youngest Champion ever?",
        options: ["Max Verstappen", "Sebastian Vettel", "Lando Norris"],
        answer: 1
    },
    {
        question: "Which is the longest track?",
        options: ["Spa-Francorchamps (Belgium)", "Monza (Italy)", "Las Vegas (USA)"],
        answer: 0
    },
    {
        question: "Penalty for speeding in pitlane?",
        options: ["Disqualification", "Time Penalty / Fine", "Start from back"],
        answer: 1
    },
    {
        question: "Who is the 'King of Monaco'?",
        options: ["Lewis Hamilton", "Ayrton Senna", "Charles Leclerc"],
        answer: 1
    },
    {
        question: "What engine do current cars use?",
        options: ["V6 Turbo Hybrid", "V8 Naturally Aspirated", "V10 Twin Turbo"],
        answer: 0
    }
];

let currentQIndex = 0;
let score = 0;
const quizArea = document.getElementById("quiz-game-area");

// 2. Initialize Quiz
function loadQuiz() {
    // If we have finished all questions, show score
    if (currentQIndex >= quizQuestions.length) {
        showFinalScore();
        return;
    }

    const qData = quizQuestions[currentQIndex];
    
    // Generate HTML for the current question
    quizArea.innerHTML = `
        <div class="question-text">
            <span style="color:#666; font-size:0.9rem;">Question ${currentQIndex + 1} / ${quizQuestions.length}</span><br>
            ${qData.question}
        </div>
        <div class="quiz-options-container" id="options-box">
            ${qData.options.map((opt, index) => `
                <div class="quiz-option" onclick="handleQuizAnswer(this, ${index})">${opt}</div>
            `).join('')}
        </div>
        <button id="next-btn" onclick="nextQuestion()">NEXT QUESTION &rarr;</button>
    `;
}

// 3. Handle Answer Click
function handleQuizAnswer(element, selectedIndex) {
    const parent = document.getElementById("options-box");
    const correctIndex = quizQuestions[currentQIndex].answer;
    const nextBtn = document.getElementById("next-btn");

    // Lock the options so they can't change answer
    parent.classList.add("locked");

    // Check Logic
    if (selectedIndex === correctIndex) {
        element.classList.add("correct");
        element.innerHTML += " ✅";
        score++;
    } else {
        element.classList.add("wrong");
        element.innerHTML += " ❌";
        
        // Highlight the correct one so they learn
        const allOptions = parent.getElementsByClassName("quiz-option");
        allOptions[correctIndex].classList.add("correct");
        allOptions[correctIndex].innerHTML += " (Correct)";
    }

    // Show the Next Button
    nextBtn.style.display = "block";
}

// 4. Move to Next Question
function nextQuestion() {
    currentQIndex++;
    loadQuiz();
}

// 5. Show Final Score
function showFinalScore() {
    let message = "";
    if (score === quizQuestions.length) message = "Perfect Lap! You are a Champion! 🏆";
    else if (score > quizQuestions.length / 2) message = "Great job! Points finish. 🏁";
    else message = "Back to the driving school! 🏎️";

    quizArea.innerHTML = `
        <div class="scoreboard">
            <div class="score-msg">QUIZ COMPLETE</div>
            <div class="score-big">${score} / ${quizQuestions.length}</div>
            <p>${message}</p>
            <button class="action-btn" onclick="restartQuiz()">Try Again</button>
        </div>
    `;
}

function restartQuiz() {
    currentQIndex = 0;
    score = 0;
    loadQuiz();
}

// Load the first question immediately when page loads
loadQuiz();