var DEFAULTS = {
    monoFamily: '"Consolas", monospace',
    monoSize: 12,
    sourceFamily: '"Consolas", monospace',
    sourceSize: 12
};

var MIN_SIZE = 8;
var MAX_SIZE = 32;

function clampSize(value) {
    if (isNaN(value) || value < MIN_SIZE) { return MIN_SIZE; }
    if (value > MAX_SIZE) { return MAX_SIZE; }
    return value;
}

function loadOptions() {
    chrome.storage.sync.get(DEFAULTS, function(items) {
        document.getElementById('monoFamily').value = items.monoFamily;
        document.getElementById('monoSize').value = items.monoSize;
        document.getElementById('sourceFamily').value = items.sourceFamily;
        document.getElementById('sourceSize').value = items.sourceSize;
    });
}

document.getElementById('save').addEventListener('click', function() {
    var monoSize = clampSize(parseInt(document.getElementById('monoSize').value, 10));
    var sourceSize = clampSize(parseInt(document.getElementById('sourceSize').value, 10));
    var opts = {
        monoFamily: document.getElementById('monoFamily').value,
        monoSize: monoSize,
        sourceFamily: document.getElementById('sourceFamily').value,
        sourceSize: sourceSize
    };
    chrome.storage.sync.set(opts, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved. Reload DevTools to apply changes.';
        setTimeout(function() { status.textContent = ''; }, 3000);
    });
});

document.getElementById('reset').addEventListener('click', function() {
    chrome.storage.sync.set(DEFAULTS, function() {
        loadOptions();
        var status = document.getElementById('status');
        status.textContent = 'Options reset to defaults. Reload DevTools to apply changes.';
        setTimeout(function() { status.textContent = ''; }, 3000);
    });
});

loadOptions();
