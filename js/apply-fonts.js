const DEFAULT_OPTIONS = {
    type: 'shadow',
    color: '0',
    strength: '1.00',
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
            if (strength >= 1.05) {
                const width = parseFloat(strength - 1).toFixed(2)
                return `text-shadow: 0px 0px ${width}px rgba(${color},${color},${color},1) !important`
            }
            const a = parseFloat(strength).toFixed(2)
            return `text-shadow: 0px 0px 0px rgba(${color},${color},${color},${a}) !important`
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