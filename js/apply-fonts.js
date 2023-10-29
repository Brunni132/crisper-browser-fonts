const DEFAULT_OPTIONS = {
    type: 'shadow',
    color: '0',
    strength: '1.00',
}

function makeStroke(width, color, alpha) {
    return `0px 0px ${width}px rgba(${color},${color},${color},${alpha})`
}

function getModifiedStyle({ type, color, strength }) {
    // const css = '* {-webkit-font-smoothing: none !important}'
    // const css = '* {-webkit-font-smoothing: none !important; text-rendering: optimizeSpeed;}'
    // const css = '* {text-shadow: 0px 0px 0.0px rgba(80,80,80,1) !important}'
    // const css = '* {text-shadow: 0px 0px 0.0px rgba(0,0,0,1) !important}'
    switch (type) {
        case 'jagged':
            return '-webkit-font-smoothing: none !important'
        case 'shadow':
            if (strength >= 1.53) {
                const a = parseFloat((strength - 1.5) * 2).toFixed(2)
                return `text-shadow: ${makeStroke(0, color, 1)}, ${makeStroke(0, color, 1)}, ${makeStroke(0, color, a)} !important`
            } else if (strength >= 1.23) {
                const a = parseFloat((strength - 1) * 2).toFixed(2)
                return `text-shadow: ${makeStroke(0, color, 1)}, ${makeStroke(0, color, a)} !important`
            } else if (strength >= 1.03) {
                const width = parseFloat(strength - 1).toFixed(2)
                return `text-shadow: ${makeStroke(width, color, 1)} !important`
            } else {
                const a = parseFloat(strength).toFixed(2)
                return `text-shadow: ${makeStroke(0, color, a)} !important`
            }
    }
    return undefined
}

function getPageWideStyle(settings) {
    const css = getModifiedStyle(settings)
    if (!css) return undefined
    return `* {${css}}`
}

function readSettings(cb) {
    chrome.storage.local.get(DEFAULT_OPTIONS, cb)
}