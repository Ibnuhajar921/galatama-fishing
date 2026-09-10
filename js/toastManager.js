var TOAST_DURATION = 2000;

var TIER_LABELS = {
    normal: 'NORMAL',
    bagus: 'BAGUS',
    besar: 'BESAR',
    langka: 'LANGKA',
    legendary: 'LEGENDARY'
};

var TIER_ICONS = {
    normal: '&#9679;',
    bagus: '&#9670;',
    besar: '&#9733;',
    langka: '&#9650;',
    legendary: '&#9670;'
};

var colors = {
    normal: '#64748b',
    bagus: '#4ade80',
    besar: '#facc15',
    langka: '#a855f7',
    legendary: '#fbbf24'
};

function showToast(playerName, weight, tier, containerId) {
    if (!containerId) containerId = 'toastPopup';
    var container = document.getElementById(containerId);
    if (!container) return;

    var toast = document.createElement('div');
    toast.className = 'toast-item toast-' + tier;

    var icon = TIER_ICONS[tier] || '&#9679;';
    var label = TIER_LABELS[tier] || 'NORMAL';
    var weightFormatted = weight.toFixed(1);
    var color = colors[tier] || '#64748b';

    toast.innerHTML =
        '<span class="toast-icon" style="color:' + color + ';">' + icon + '</span>' +
        '<span class="toast-message"><strong>' + playerName + '</strong> ' + weightFormatted + ' kg</span>' +
        '<span class="toast-badge ' + tier + '">' + label + '</span>';

    toast.style.borderLeftColor = color;

    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    container.appendChild(toast);

    requestAnimationFrame(function () {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
        toast.style.transition = 'all 0.3s ease-out';
    });

    setTimeout(function () {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            toast.style.transition = 'all 0.3s ease-in';
            setTimeout(function () {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, TOAST_DURATION);
}

function renderActivityHistory(containerId) {
    if (!containerId) containerId = 'activityContainer';
    var container = document.getElementById(containerId);
    if (!container) return;

    var logs = getActivityLog();

    if (logs.length === 0) {
        container.innerHTML = '';
        return;
    }

    var html = '';
    var displayLogs = logs.slice(0, 3);

    for (var i = 0; i < displayLogs.length; i++) {
        var log = displayLogs[i];
        var icon = TIER_ICONS[log.tier] || '&#9679;';
        var label = TIER_LABELS[log.tier] || 'NORMAL';
        var color = colors[log.tier] || '#64748b';

        html +=
            '<div class="activity-item" style="border-left-color:' + color + ';">' +
            '<span class="activity-icon" style="color:' + color + ';">' + icon + '</span>' +
            '<span class="activity-text"><strong>' + log.playerName + '</strong> ' + log.weight.toFixed(1) + ' kg</span>' +
            '<span class="activity-badge ' + log.tier + '">' + label + '</span>' +
            '<span class="activity-time">' + log.timestamp + '</span>' +
            '</div>';
    }

    container.innerHTML = html;
}

function clearAllToasts(containerId) {
    if (!containerId) containerId = 'toastPopup';
    var container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
    }
}

function clearActivityHistory(containerId) {
    if (!containerId) containerId = 'activityContainer';
    var container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
    }
}