function getSessionStatus() {
    return sessionStatus;
}

function isSessionRunning() {
    return sessionStatus === 'running';
}

function isSessionEnded() {
    return sessionStatus === 'ended';
}

function isSessionWaiting() {
    return sessionStatus === 'waiting';
}

function canStartSession() {
    return sessionStatus === 'waiting' || sessionStatus === 'ended';
}

function canEndSession() {
    return sessionStatus === 'running';
}