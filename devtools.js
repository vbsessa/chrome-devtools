var DEFAULTS = {
    monoFamily: '"Consolas", monospace',
    monoSize: 12,
    sourceFamily: '"Consolas", monospace',
    sourceSize: 12
};

var MIN_SIZE = 8;
var MAX_SIZE = 32;
var GENERIC_FONT_FAMILIES = {
    'cursive': true,
    'emoji': true,
    'fangsong': true,
    'fantasy': true,
    'math': true,
    'monospace': true,
    'sans-serif': true,
    'serif': true,
    'system-ui': true,
    'ui-monospace': true,
    'ui-rounded': true,
    'ui-sans-serif': true,
    'ui-serif': true
};

function formatFontFamily(value, fallback) {
    var sanitized = String(value || '')
        .replace(/[^a-zA-Z0-9\s,.'-]/g, '')
        .trim();
    var families = sanitized.split(',').map(function(family) {
        return family.trim();
    }).filter(function(family) {
        return family && !/^--/.test(family);
    });

    if (!families.length) {
        return fallback;
    }

    return families.map(function(family) {
        var normalizedFamily = family.toLowerCase();

        return GENERIC_FONT_FAMILIES[normalizedFamily] ? normalizedFamily : '"' + family + '"';
    }).join(', ');
}

function clampSize(value) {
    if (isNaN(value) || value < MIN_SIZE) { return MIN_SIZE; }
    if (value > MAX_SIZE) { return MAX_SIZE; }
    return value;
}

function applyConfiguredStyleSheet(items) {
    var monoFamily = formatFontFamily(items.monoFamily, DEFAULTS.monoFamily);
    var sourceFamily = formatFontFamily(items.sourceFamily, DEFAULTS.sourceFamily);
    var monoSize = clampSize(parseInt(items.monoSize, 10));
    var sourceSize = clampSize(parseInt(items.sourceSize, 10));

    fetch(chrome.runtime.getURL('style.css'))
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Unable to load style.css: ' + response.status + ' ' + response.statusText);
            }
            return response.text();
        })
        .then(function(template) {
            var css = template
                .replace(/__MONO_SIZE__/g, String(monoSize))
                .replace(/__MONO_FAMILY__/g, monoFamily)
                .replace(/__SOURCE_SIZE__/g, String(sourceSize))
                .replace(/__SOURCE_FAMILY__/g, sourceFamily);

            chrome.devtools.panels.applyStyleSheet(css);
        })
        .catch(function(error) {
            console.error('Failed to apply DevTools font stylesheet.', error);
        });
}

chrome.storage.sync.get(DEFAULTS, function(items) {
    applyConfiguredStyleSheet(items);
});
