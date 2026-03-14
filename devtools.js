var DEFAULTS = {
    monoFamily: '"Consolas", monospace',
    monoSize: 12,
    sourceFamily: '"Consolas", monospace',
    sourceSize: 12
};

var MIN_SIZE = 8;
var MAX_SIZE = 32;

function sanitizeFontFamily(value) {
    return String(value || '').replace(/[{};\r\n]/g, '');
}

function clampSize(value) {
    if (isNaN(value) || value < MIN_SIZE) { return MIN_SIZE; }
    if (value > MAX_SIZE) { return MAX_SIZE; }
    return value;
}

function applyConfiguredStyleSheet(items) {
    var monoFamily = sanitizeFontFamily(items.monoFamily);
    var sourceFamily = sanitizeFontFamily(items.sourceFamily);
    var monoSize = clampSize(parseInt(items.monoSize, 10));
    var sourceSize = clampSize(parseInt(items.sourceSize, 10));
    var request = new XMLHttpRequest();

    request.open('GET', 'style.css');
    request.onload = function() {
        var css = request.responseText
            .replace(/__MONO_SIZE__/g, String(monoSize))
            .replace(/__MONO_FAMILY__/g, monoFamily)
            .replace(/__SOURCE_SIZE__/g, String(sourceSize))
            .replace(/__SOURCE_FAMILY__/g, sourceFamily);

        chrome.devtools.panels.applyStyleSheet(css);
    };
    request.send();
}

chrome.storage.sync.get(DEFAULTS, function(items) {
    applyConfiguredStyleSheet(items);
});
