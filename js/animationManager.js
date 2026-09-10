function animateLeaderboardRow(playerId, tier) {
    var row = document.querySelector('[data-player-id="' + playerId + '"]');
    if (!row) return;

    row.classList.remove('flash-langka', 'flash-legendary', 'pulse-bagus', 'pulse-besar');

    if (tier === 'legendary') {
        row.classList.add('flash-legendary');
        showLegendaryPopup();
    } else if (tier === 'langka') {
        row.classList.add('flash-langka');
    } else if (tier === 'besar') {
        row.classList.add('pulse-besar');
    } else if (tier === 'bagus') {
        row.classList.add('pulse-bagus');
    }

    setTimeout(function () {
        row.classList.remove('flash-langka', 'flash-legendary', 'pulse-bagus', 'pulse-besar');
    }, 1500);
}

function showLegendaryPopup(playerName, weight) {
    var popup = document.getElementById('legendaryPopup');
    if (!popup) return;

    var textEl = document.getElementById('legendaryPopupText');
    if (textEl && playerName) {
        textEl.textContent = playerName + ' dapat ' + weight.toFixed(1) + ' kg';
    }

    popup.classList.add('active');

    setTimeout(function () {
        popup.classList.remove('active');
    }, 3000);
}

function triggerLegendaryPopup(playerName, weight) {
    showLegendaryPopup(playerName, weight);
}

function triggerFullScreenFlash() {
    var flash = document.createElement('div');
    flash.className = 'legendary-flash';
    flash.innerHTML =
        '<div class="legendary-content">' +
        '<span class="legendary-icon">&#9670;</span>' +
        '<span class="legendary-text">LEGENDARY CATCH</span>' +
        '<span class="legendary-icon">&#9670;</span>' +
        '</div>';
    document.body.appendChild(flash);

    flash.offsetHeight;

    setTimeout(function () {
        flash.remove();
    }, 1500);
}