var DEFAULTS = {
    monoFamily: '"Consolas", monospace',
    monoSize: 12,
    sourceFamily: '"Consolas", monospace',
    sourceSize: 12
};

var MIN_SIZE = 8;
var MAX_SIZE = 32;

function sanitizeFontFamily(value) {
    return value.replace(/[{};]/g, '');
}

function clampSize(value) {
    if (isNaN(value) || value < MIN_SIZE) { return MIN_SIZE; }
    if (value > MAX_SIZE) { return MAX_SIZE; }
    return value;
}

chrome.storage.sync.get(DEFAULTS, function(items) {
    var monoFamily = sanitizeFontFamily(items.monoFamily);
    var sourceFamily = sanitizeFontFamily(items.sourceFamily);
    var monoSize = clampSize(parseInt(items.monoSize, 10));
    var sourceSize = clampSize(parseInt(items.sourceSize, 10));

    var css = [
        'body.platform-windows,',
        'body.platform-linux,',
        'body.platform-mac,',
        ':host-context(.platform-windows),',
        ':host-context(.platform-linux),',
        ':host-context(.platform-mac) {',
        '    --monospace-font-size: ' + monoSize + 'px !important;',
        '    --monospace-font-family: ' + monoFamily + ' !important;',
        '    --source-code-font-size: ' + sourceSize + 'px !important;',
        '    --source-code-font-family: ' + sourceFamily + ' !important;',
        '}',
        '.monospace {',
        '    font-size: var(--monospace-font-size);',
        '    font-family: var(--monospace-font-family);',
        '}',
        '.source-code {',
        '    font-size: var(--source-code-font-size);',
        '    font-family: var(--source-code-font-family);',
        '}'
    ].join('\n');

    chrome.devtools.panels.applyStyleSheet(css);
});
