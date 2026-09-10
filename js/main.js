var timerIntervalRef = null;
var catchTimeoutRef = null;

document.addEventListener('DOMContentLoaded', function () {
    renderAll();
    renderActivityHistory();
});

document.addEventListener('click', function (e) {
    var target = e.target;

    if (target.id === 'startBtn') {
        startSession();
    } else if (target.id === 'endBtn') {
        endSession();
    } else if (target.id === 'resetBtn') {
        resetSession();
    }
});

function startSession() {
    if (!canStartSession()) return;

    resetState();
    setSessionStatus('running');
    setTimeLeft(60);
    clearAllToasts();
    clearActivityHistory();

    renderAll();

    var currentTime = 60;
    timerIntervalRef = setInterval(function () {
        currentTime--;
        setTimeLeft(currentTime);
        renderTimer();

        if (currentTime <= 0) {
            endSession();
        }
    }, 1000);
    setTimerInterval(timerIntervalRef);

    scheduleNextCatch();
}

function endSession() {
    if (!canEndSession()) return;

    if (timerIntervalRef) {
        clearInterval(timerIntervalRef);
        timerIntervalRef = null;
        setTimerInterval(null);
    }

    if (catchTimeoutRef) {
        clearTimeout(catchTimeoutRef);
        catchTimeoutRef = null;
        setCatchTimeout(null);
    }

    setSessionStatus('ended');
    renderAll();
    renderActivityHistory();
}

function resetSession() {
    if (timerIntervalRef) {
        clearInterval(timerIntervalRef);
        timerIntervalRef = null;
        setTimerInterval(null);
    }

    if (catchTimeoutRef) {
        clearTimeout(catchTimeoutRef);
        catchTimeoutRef = null;
        setCatchTimeout(null);
    }

    resetState();
    clearAllToasts();
    clearActivityHistory();
    renderAll();
}

function scheduleNextCatch() {
    if (!isSessionRunning()) return;

    var delay = getRandomCatchDelay();

    catchTimeoutRef = setTimeout(function () {
        var result = processCatchEvent();

        showToast(result.playerName, result.weight, result.tier);

        renderActivityHistory();

        if (result.tier === 'legendary') {
            triggerLegendaryPopup(result.playerName, result.weight);
            triggerFullScreenFlash();
        }

        var player = null;
        for (var i = 0; i < players.length; i++) {
            if (players[i].name === result.playerName) {
                player = players[i];
                break;
            }
        }
        if (player) {
            animateLeaderboardRow(player.id, result.tier);
        }

        renderLeaderboard();
        renderBiggestCatch();

        scheduleNextCatch();
    }, delay);

    setCatchTimeout(catchTimeoutRef);
}