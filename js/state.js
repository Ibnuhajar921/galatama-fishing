var players = [
    { id: 1, name: "Bot 1", totalWeight: 0, catches: [] },
    { id: 2, name: "Bot 2", totalWeight: 0, catches: [] },
    { id: 3, name: "Bot 3", totalWeight: 0, catches: [] },
    { id: 4, name: "Bot 4", totalWeight: 0, catches: [] },
    { id: 5, name: "Bot 5", totalWeight: 0, catches: [] },
];

var heaviestCatch = null;
var sessionStatus = 'waiting';
var timeLeft = 60;
var timerInterval = null;
var catchTimeout = null;
var activityLog = [];

function generateRandomWeight() {
    var min = 0.5;
    var max = 10;
    var weight = Math.random() * (max - min) + min;
    return Math.round(weight * 10) / 10;
}

function getCatchTier(weight) {
    if (weight === 10) return "legendary";
    if (weight >= 7) return "langka";
    if (weight >= 5) return "besar";
    if (weight >= 3) return "bagus";
    return "normal";
}

function pickRandomPlayer() {
    var index = Math.floor(Math.random() * players.length);
    return players[index];
}

function getRandomCatchDelay() {
    var minSeconds = 3;
    var maxSeconds = 6;
    var seconds = Math.random() * (maxSeconds - minSeconds) + minSeconds;
    return Math.round(seconds * 1000);
}

function processCatchEvent() {
    var player = pickRandomPlayer();
    var weight = generateRandomWeight();
    var tier = getCatchTier(weight);

    player.totalWeight = Math.round((player.totalWeight + weight) * 10) / 10;
    player.catches.push(weight);

    if (!heaviestCatch || weight > heaviestCatch.weight) {
        heaviestCatch = { playerName: player.name, weight: weight, tier: tier };
    }

    var logEntry = {
        playerName: player.name,
        weight: weight,
        tier: tier,
        timestamp: new Date().toLocaleTimeString()
    };
    activityLog.unshift(logEntry);

    if (activityLog.length > 100) {
        activityLog.pop();
    }

    return {
        playerName: player.name,
        weight: weight,
        tier: tier
    };
}

function calculateLeaderboard() {
    var sorted = players.slice();
    sorted.sort(function (a, b) {
        return b.totalWeight - a.totalWeight;
    });
    return sorted;
}

function getActivityLog() {
    return activityLog;
}

function resetState() {
    for (var i = 0; i < players.length; i++) {
        players[i].totalWeight = 0;
        players[i].catches = [];
    }
    heaviestCatch = null;
    activityLog = [];
    sessionStatus = 'waiting';
    timeLeft = 60;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (catchTimeout) {
        clearTimeout(catchTimeout);
        catchTimeout = null;
    }
}

function setSessionStatus(status) {
    sessionStatus = status;
}

function setTimeLeft(value) {
    timeLeft = value;
}

function setTimerInterval(interval) {
    timerInterval = interval;
}

function setCatchTimeout(timeout) {
    catchTimeout = timeout;
}