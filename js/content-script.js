// TODO: Add a keyboard shortcut maybe, and a way to unregister the CSS when the extension is disabled.
// TODO: -webkit-text-stroke: 0.5px rgba(0,0,0,1); is very interesting on Windows
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
        readSettings(storageContents => addCssToPage(head, getPageWideStyle(storageContents)))
    }

    getAndApplyStorage()
    chrome.storage.onChanged.addListener((changedContents) => {
        getAndApplyStorage()
    })
}
