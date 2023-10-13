window.onload = function() {
    let settings = undefined
    const elements = {
        type: {
            off: document.getElementById('type-off'),
            'no-smoothing': document.getElementById('type-no-smoothing'),
            shadow: document.getElementById('type-shadow'),
        },
        color: {
            0: document.getElementById('color-0'),
            80: document.getElementById('color-80'),
            128: document.getElementById('color-128'),
            255: document.getElementById('color-255'),
        },
        strength: {
            slider: document.getElementById('strength'),
            display: document.getElementById('strength-value'),
        },
        shadowOptions: {
            container: document.getElementById('type-shadow-options'),
        },
        sampleText: {
            container: document.getElementById('sample-text'),
            size: document.getElementById('sample-text-size'),
            sizeDisplay: document.getElementById('sample-text-size-value'),
        },
    }

    function set(name, value) {
        settings[name] = value
        chrome.storage.local.set(settings)
        updateUi()
    }

    function updateUi() {
        Object.keys(elements.type).forEach(k => elements.type[k].checked = settings.type === k)
        Object.keys(elements.color).forEach(k => elements.color[k].checked = settings.color === k)
        elements.strength.slider.value = settings.strength
        elements.strength.display.textContent = (Math.round(settings.strength * 10) / 10).toFixed(1);
        elements.shadowOptions.container.style.display = settings.type === 'shadow' ? 'block' : 'none';
        elements.sampleText.container.style = `${getModifiedStyle(settings)}; font-size: ${elements.sampleText.size.value}%;`;
        elements.sampleText.sizeDisplay.textContent = elements.sampleText.size.value.toString();
    }

    // TODO: make common (the initialization) with apply-fonts.js
    chrome.storage.local.get({
		type: 'no-smoothing',
        color: 0,
        strength: 1.00,
    }, function(storageContents) {
        settings = storageContents;
        updateUi();

        Object.keys(elements.type).forEach(k => {
            elements.type[k].oninput = () => set('type', k)
        })

        Object.keys(elements.color).forEach(k => {
            elements.color[k].oninput = () => set('color', k)
        })

        elements.strength.slider.oninput = (e) => set('strength', e.target.value);
        elements.sampleText.size.oninput = () => updateUi();
    })
}
