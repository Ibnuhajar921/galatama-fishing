function renderLeaderboard(containerId) {
    if (!containerId) containerId = 'leaderboardBody';
    var container = document.getElementById(containerId);
    if (!container) return;

    var sortedPlayers = calculateLeaderboard();

    if (sortedPlayers.length === 0) {
        container.innerHTML = '<tr><td colspan="4">Belum ada data</td></tr>';
        return;
    }

    var html = '';
    for (var i = 0; i < sortedPlayers.length; i++) {
        var player = sortedPlayers[i];
        var rank = i + 1;
        var isHeaviest = false;

        if (heaviestCatch && player.name === heaviestCatch.playerName) {
            isHeaviest = true;
        }

        var rankIcon = '';
        if (rank === 1) {
            rankIcon = '<span class="rank-icon gold">&#9670;</span>';
        } else if (rank === 2) {
            rankIcon = '<span class="rank-icon silver">&#9670;</span>';
        } else if (rank === 3) {
            rankIcon = '<span class="rank-icon bronze">&#9670;</span>';
        }

        var dotColor = '#64748b';
        var dotAnimation = 'none';
        var activeLabel = '&#9679; menunggu';
        var activeColor = '#64748b';

        if (sessionStatus === 'running') {
            dotColor = '#4ade80';
            dotAnimation = 'pulse-status 1.5s infinite';
            activeLabel = '&#9679; aktif';
            activeColor = '#4ade80';
        } else if (sessionStatus === 'ended') {
            dotColor = '#64748b';
            dotAnimation = 'none';
            activeLabel = '&#9679; selesai';
            activeColor = '#64748b';
        }

        html += '<tr data-player-id="' + player.id + '" data-rank="' + rank + '" class="' + (isHeaviest ? 'heaviest-catch' : '') + '">';
        html += '<td class="rank">' + rankIcon + '#' + rank + '</td>';
        html += '<td class="player-name">' + player.name + ' <span class="status-dot" style="background:' + dotColor + ';animation:' + dotAnimation + ';"></span></td>';
        html += '<td class="player-catches">' + player.catches.length + ' tangkapan <span class="active-label" style="color:' + activeColor + ';">' + activeLabel + '</span></td>';
        html += '<td class="player-weight">' + player.totalWeight.toFixed(1) + ' kg</td>';
        html += '</tr>';
    }

    container.innerHTML = html;
}

function renderBiggestCatch(containerId) {
    if (!containerId) containerId = 'biggestCatchContainer';
    var container = document.getElementById(containerId);
    if (!container) return;

    if (heaviestCatch) {
        var tierIcon = '';
        if (heaviestCatch.tier === 'legendary') {
            tierIcon = '&#9670;';
        } else if (heaviestCatch.tier === 'langka') {
            tierIcon = '&#9650;';
        } else if (heaviestCatch.tier === 'besar') {
            tierIcon = '&#9733;';
        } else if (heaviestCatch.tier === 'bagus') {
            tierIcon = '&#9670;';
        } else {
            tierIcon = '&#9679;';
        }

        container.innerHTML =
            '<div class="biggest-catch-display">' +
            '<span class="biggest-catch-player">' + heaviestCatch.playerName + '</span>' +
            '<span class="biggest-catch-weight">' + heaviestCatch.weight.toFixed(1) + ' kg</span>' +
            '<span class="biggest-catch-tier tier-' + heaviestCatch.tier + '">' + tierIcon + ' ' + heaviestCatch.tier.toUpperCase() + '</span>' +
            '<span class="biggest-catch-time">&#9679; baru saja</span>' +
            '</div>';
    } else {
        container.innerHTML = '<div class="empty-state">Belum ada tangkapan</div>';
    }
}

function renderTimer(containerId) {
    if (!containerId) containerId = 'timerDisplay';
    var container = document.getElementById(containerId);
    if (!container) return;

    var display = timeLeft + 's';
    container.textContent = display;

    if (timeLeft <= 10) {
        container.style.color = '#ef4444';
    } else if (timeLeft <= 30) {
        container.style.color = '#facc15';
    } else {
        container.style.color = '#4ade80';
    }
}

function renderStatus(containerId) {
    if (!containerId) containerId = 'statusDisplay';
    var container = document.getElementById(containerId);
    if (!container) return;

    var statusMap = {
        waiting: 'Menunggu Mulai',
        running: 'Sedang Memancing...',
        ended: 'Sesi Berakhir'
    };

    container.textContent = statusMap[sessionStatus] || sessionStatus;
    container.className = 'status-' + sessionStatus;
}

function renderBadges() {
    var liveBadge = document.querySelector('.badge-live');
    var realtimeBadge = document.querySelector('.badge-realtime');

    if (sessionStatus === 'ended' || sessionStatus === 'waiting') {
        if (liveBadge) liveBadge.style.display = 'none';
        if (realtimeBadge) realtimeBadge.style.display = 'none';
    } else {
        if (liveBadge) liveBadge.style.display = 'inline-block';
        if (realtimeBadge) realtimeBadge.style.display = 'inline-block';
    }
}

function renderControls(containerId) {
    if (!containerId) containerId = 'controls';
    var container = document.getElementById(containerId);
    if (!container) return;

    var buttons = '';

    if (sessionStatus === 'waiting' || sessionStatus === 'ended') {
        buttons += '<button id="startBtn" class="btn-primary">&#9654; Mulai Turnamen</button>';
    }

    if (sessionStatus === 'running') {
        buttons += '<button id="endBtn" class="btn-danger">&#9632; Akhiri</button>';
    }

    buttons += '<button id="resetBtn" class="btn-secondary">&#8634; Reset</button>';

    container.innerHTML = buttons;
}

function renderAll() {
    renderControls();
    renderLeaderboard();
    renderBiggestCatch();
    renderTimer();
    renderStatus();
    renderBadges();
}