## A simple extension to customize Chrome's Devtools fonts.

This repository contains a simple unpackaged extension that allows you to customize Chrome's Devtools fonts displayed on `Elements`, `Console`, `Sources`, and other tabs.

Fonts can be configured via the extension's **Options** page without manually editing any files.

## How to:

1. Clone this repository (or download it from https://github.com/vbsessa/chrome-devtools/releases).
2. Open `chrome://flags` section and enable `#enable-devtools-experiments` flag.
3. Open **Chrome DevTools** and check `Settings > Experiments > Allow extensions to load custom stylesheets`.
4. Open **Chrome Extensions** tab, click `Load unpacked extension` and point to the directory containing the cloned files.
5. Click the **Details** button for the extension and open **Extension options** to configure font family and size for monospace and source-code text.
