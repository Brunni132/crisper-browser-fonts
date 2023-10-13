// TODO: configuration popup; allows configuring the type (simple stroke or disabling font smoothing -- chrome on Mac only), the color (black, gray or white)
// Simple stroke is (XX between 0 and 1 for normal strength, NN as an extra function in case you use gray and you want even more strongness, between 0 and 0.5):
// text-shadow: 0px 0px NNpx rgba(0,0,0,XX) !important;
// For the disable font smoothing:
// * {-webkit-font-smoothing: none !important}'
// Use storage.local (https://developer.chrome.com/docs/extensions/reference/storage/) and explain on the page that we don't sync, on purpose, since each computer might need different settings.
// Add a keyboard shortcut maybe, and a way to unregister the CSS when the extension is disabled.
// Also make it that it won't ever create twice the same on the page (keep in memory the created style node).
// Same in case we change the options (be able to apply a different styling directly on the page).
// Permit the setting between 0 and 150% (above 100% it just adds to NN).

let styleElement = undefined

function addCssToPage(head, css) {
    if (!head) return
    if (styleElement) styleElement.remove()
    if (!css) return

    styleElement = document.createElement('style')
    styleElement.type = 'text/css'
    styleElement.appendChild(document.createTextNode(css))
    head.appendChild(styleElement)
}

window.onload = function () {
    window.onload = undefined

    const head = document.head || document.getElementsByTagName('head')[0]
    function getAndApplyStorage() {
        chrome.storage.local.get({
            type: 'no-smoothing',
            color: 0,
            strength: 1.00,
        }, (storageContents) => addCssToPage(head, getPageWideStyle(storageContents)))
    }

    getAndApplyStorage()
    chrome.storage.onChanged.addListener((changedContents) => {
        getAndApplyStorage()
    })
}
