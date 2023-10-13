function getPageWideStyle(settings) {
    const css = getModifiedStyle(settings)
    if (!css) return undefined
    return `* {${css}}`
}

function getModifiedStyle({ type, color, strength }) {
    // const css = '* {-webkit-font-smoothing: none !important}'
    // const css = '* {-webkit-font-smoothing: none !important; text-rendering: optimizeSpeed;}'
    // const css = '* {text-shadow: 0px 0px 0.0px rgba(80,80,80,1) !important}'
    // const css = '* {text-shadow: 0px 0px 0.0px rgba(0,0,0,1) !important}'
    switch (type) {
        case 'no-smoothing':
            return '-webkit-font-smoothing: none !important'
        case 'shadow':
            if (strength > 1) {
                return `text-shadow: 0px 0px ${strength - 1}px rgba(${color},${color},${color},1) !important`
            }
            return `text-shadow: 0px 0px 0px rgba(${color},${color},${color},${strength}) !important`
    }
    return undefined
}
