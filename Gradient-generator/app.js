// State
let gradientType = 'linear';
let angle = 90;
let shape = 'circle';
let colorStops = [
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 }
];

// Preset Gradients Library
const presetGradients = [
    { name: 'Sunset', type: 'linear', angle: 90, stops: [{color: '#ff6b6b', position: 0}, {color: '#feca57', position: 100}] },
    { name: 'Ocean', type: 'linear', angle: 135, stops: [{color: '#2e86de', position: 0}, {color: '#54a0ff', position: 100}] },
    { name:  'Purple Bliss', type: 'linear', angle: 90, stops: [{color: '#667eea', position: 0}, {color: '#764ba2', position: 100}] },
    { name: 'Mint', type: 'linear', angle:  120, stops: [{color: '#00b894', position: 0}, {color: '#00cec9', position: 100}] },
    { name: 'Fire', type: 'linear', angle:  45, stops: [{color: '#ee5a6f', position: 0}, {color: '#f29263', position: 100}] },
    { name: 'Cotton Candy', type: 'linear', angle: 135, stops: [{color: '#ffeaa7', position: 0}, {color: '#fd79a8', position: 100}] },
    { name:  'Deep Space', type: 'linear', angle: 180, stops: [{color: '#000000', position: 0}, {color: '#434343', position: 100}] },
    { name: 'Peachy', type: 'linear', angle: 90, stops: [{color: '#ed4264', position: 0}, {color: '#ffedbc', position: 100}] },
    { name: 'Aurora', type: 'linear', angle: 45, stops: [{color: '#a8edea', position: 0}, {color: '#fed6e3', position: 100}] },
    { name: 'Forest', type: 'linear', angle: 135, stops: [{color: '#134e5e', position: 0}, {color: '#71b280', position: 100}] },
    { name: 'Lavender', type: 'linear', angle: 90, stops: [{color: '#c471f5', position: 0}, {color: '#fa71cd', position: 100}] },
    { name: 'Sunrise', type: 'linear', angle: 0, stops: [{color: '#ff512f', position: 0}, {color: '#f09819', position: 100}] },
    { name: 'Cosmic', type: 'radial', shape: 'circle', stops: [{color: '#8e2de2', position: 0}, {color: '#4a00e0', position: 100}] },
    { name: 'Watermelon', type: 'linear', angle: 135, stops:  [{color: '#ff0844', position: 0}, {color: '#ffb199', position: 100}] },
    { name: 'Sky', type: 'linear', angle: 180, stops: [{color: '#00d2ff', position: 0}, {color: '#3a7bd5', position: 100}] },
    { name: 'Rainbow', type: 'linear', angle: 90, stops: [
        {color: '#ff0000', position: 0},
        {color: '#ff7f00', position: 16},
        {color: '#ffff00', position: 33},
        {color: '#00ff00', position: 50},
        {color: '#0000ff', position: 66},
        {color: '#4b0082', position: 83},
        {color: '#9400d3', position: 100}
    ]},
];

// DOM Elements
const gradientPreview = document.getElementById('gradientPreview');
const cssCode = document.getElementById('cssCode');
const angleInput = document.getElementById('angle');
const angleValue = document.getElementById('angleValue');
const angleControl = document.getElementById('angleControl');
const directionControl = document.getElementById('directionControl');
const directionSelect = document.getElementById('direction');
const colorStopsContainer = document.getElementById('colorStops');
const addColorStopBtn = document.getElementById('addColorStop');
const copyBtn = document.getElementById('copyBtn');
const copyMessage = document.getElementById('copyMessage');
const gradientTypeRadios = document.querySelectorAll('input[name="gradientType"]');
const randomBtn = document.getElementById('randomBtn');
const exportBtn = document. getElementById('exportBtn');
const saveFavoriteBtn = document.getElementById('saveFavoriteBtn');
const presetsGrid = document.getElementById('presetsGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const directionPresetBtns = document.querySelectorAll('.preset-btn');

// Initialize
function init() {
    renderColorStops();
    updateGradient();
    attachEventListeners();
    renderPresets();
    loadFavorites();
}

// Attach Event Listeners
function attachEventListeners() {
    gradientTypeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            gradientType = e.target.value;
            toggleControls();
            updateGradient();
        });
    });

    angleInput.addEventListener('input', (e) => {
        angle = e.target.value;
        angleValue.textContent = angle;
        updateGradient();
    });

    directionSelect.addEventListener('change', (e) => {
        shape = e. target.value;
        updateGradient();
    });

    addColorStopBtn.addEventListener('click', addColorStop);
    copyBtn.addEventListener('click', copyToClipboard);
    randomBtn.addEventListener('click', generateRandomGradient);
    exportBtn.addEventListener('click', exportAsImage);
    saveFavoriteBtn.addEventListener('click', saveFavorite);

    directionPresetBtns.forEach(btn => {
        btn. addEventListener('click', (e) => {
            const presetAngle = e.target.dataset.angle;
            angle = presetAngle;
            angleInput.value = presetAngle;
            angleValue.textContent = presetAngle;
            updateGradient();
        });
    });
}

// Toggle Controls based on gradient type
function toggleControls() {
    if (gradientType === 'linear' || gradientType === 'conic') {
        angleControl. classList.remove('hidden');
        directionControl.classList.add('hidden');
    } else {
        angleControl.classList.add('hidden');
        directionControl. classList.remove('hidden');
    }
}

// Render Color Stops
function renderColorStops() {
    colorStopsContainer.innerHTML = '';
    
    colorStops.forEach((stop, index) => {
        const stopElement = createColorStopElement(stop, index);
        colorStopsContainer.appendChild(stopElement);
    });
}

// Create Color Stop Element
function createColorStopElement(stop, index) {
    const div = document.createElement('div');
    div.className = 'color-stop';
    
    div.innerHTML = `
        <input type="color" value="${stop. color}" data-index="${index}">
        <span class="color-value">${stop.color}</span>
        <input type="number" value="${stop. position}" min="0" max="100" data-index="${index}">
        <span>%</span>
        ${colorStops.length > 2 ?  `<button class="btn-remove" data-index="${index}">Remove</button>` : ''}
    `;
    
    // Color input event
    const colorInput = div.querySelector('input[type="color"]');
    colorInput.addEventListener('input', (e) => {
        const idx = e.target.dataset.index;
        colorStops[idx].color = e.target.value;
        div.querySelector('.color-value').textContent = e.target.value;
        updateGradient();
    });
    
    // Position input event
    const positionInput = div.querySelector('input[type="number"]');
    positionInput.addEventListener('input', (e) => {
        const idx = e.target.dataset.index;
        colorStops[idx]. position = e.target.value;
        updateGradient();
    });
    
    // Remove button event
    const removeBtn = div.querySelector('.btn-remove');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            removeColorStop(index);
        });
    }
    
    return div;
}

// Add Color Stop
function addColorStop() {
    const newPosition = colorStops.length > 0 
        ? Math.min(colorStops[colorStops.length - 1].position + 10, 100)
        : 50;
    
    colorStops.push({
        color: '#' + Math.floor(Math. random()*16777215).toString(16).padStart(6, '0'),
        position: newPosition
    });
    
    renderColorStops();
    updateGradient();
}

// Remove Color Stop
function removeColorStop(index) {
    if (colorStops.length > 2) {
        colorStops. splice(index, 1);
        renderColorStops();
        updateGradient();
    }
}

// Update Gradient
function updateGradient() {
    const css = generateCSS();
    gradientPreview.style.background = css;
    cssCode. textContent = `background: ${css};`;
}

// Generate CSS
function generateCSS() {
    const sortedStops = [... colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    
    if (gradientType === 'linear') {
        return `linear-gradient(${angle}deg, ${stopsString})`;
    } else if (gradientType === 'radial') {
        return `radial-gradient(${shape}, ${stopsString})`;
    } else if (gradientType === 'conic') {
        return `conic-gradient(from ${angle}deg, ${stopsString})`;
    }
}

// Copy to Clipboard
function copyToClipboard() {
    const css = cssCode.textContent;
    navigator.clipboard.writeText(css).then(() => {
        copyMessage.classList.remove('hidden');
        copyBtn.textContent = '✓ Copied!';
        
        setTimeout(() => {
            copyMessage.classList.add('hidden');
            copyBtn.textContent = '📋 Copy CSS';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Generate Random Gradient
function generateRandomGradient() {
    const types = ['linear', 'radial', 'conic'];
    gradientType = types[Math.floor(Math.random() * types.length)];
    
    // Update radio button
    document.querySelector(`input[value="${gradientType}"]`).checked = true;
    
    if (gradientType === 'linear' || gradientType === 'conic') {
        angle = Math.floor(Math.random() * 361);
        angleInput.value = angle;
        angleValue.textContent = angle;
    } else {
        shape = Math. random() > 0.5 ? 'circle' : 'ellipse';
        directionSelect. value = shape;
    }
    
    // Generate random color stops (2-5 stops)
    const numStops = Math.floor(Math.random() * 4) + 2;
    colorStops = [];
    
    for (let i = 0; i < numStops; i++) {
        colorStops. push({
            color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
            position: Math. floor((100 / (numStops - 1)) * i)
        });
    }
    
    toggleControls();
    renderColorStops();
    updateGradient();
}

// Export as Image
function exportAsImage() {
    const canvas = document.getElementById('exportCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 1200;
    canvas.height = 800;
    
    // Create gradient based on type
    let gradient;
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    
    if (gradientType === 'linear') {
        const angleRad = (angle - 90) * Math.PI / 180;
        const x1 = canvas.width / 2 + Math.cos(angleRad) * canvas.width;
        const y1 = canvas.height / 2 + Math.sin(angleRad) * canvas.height;
        const x2 = canvas. width / 2 - Math.cos(angleRad) * canvas.width;
        const y2 = canvas.height / 2 - Math.sin(angleRad) * canvas.height;
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    } else if (gradientType === 'radial') {
        gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
    } else {
        // Conic gradient (fallback to linear for canvas)
        gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    }
    
    // Add color stops
    sortedStops.forEach(stop => {
        gradient.addColorStop(stop.position / 100, stop.color);
    });
    
    // Fill canvas
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Download image
    canvas.toBlob((blob) => {
        const url = URL. createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gradient-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Save Favorite
function saveFavorite() {
    const favorites = JSON.parse(localStorage.getItem('gradientFavorites') || '[]');
    
    const favorite = {
        id: Date.now(),
        type: gradientType,
        angle: angle,
        shape: shape,
        stops: [... colorStops],
        css: generateCSS()
    };
    
    favorites.push(favorite);
    localStorage.setItem('gradientFavorites', JSON.stringify(favorites));
    
    loadFavorites();
    
    // Show feedback
    saveFavoriteBtn.textContent = '✓ Saved!';
    setTimeout(() => {
        saveFavoriteBtn.textContent = '⭐ Save Favorite';
    }, 2000);
}

// Load Favorites
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('gradientFavorites') || '[]');
    
    if (favorites.length === 0) {
        favoritesGrid. innerHTML = '<p class="empty-message">No favorites yet. Save your first gradient!</p>';
        return;
    }
    
    favoritesGrid.innerHTML = '';
    
    favorites.forEach(fav => {
        const card = document.createElement('div');
        card.className = 'favorite-card';
        card.style.background = fav.css;
        
        card.innerHTML = `
            <div class="favorite-name">Favorite #${fav.id}</div>
            <button class="delete-btn" data-id="${fav.id}">×</button>
        `;
        
        // Load favorite on click
        card.addEventListener('click', (e) => {
            if (! e.target.classList.contains('delete-btn')) {
                loadGradient(fav);
            }
        });
        
        // Delete favorite
        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteFavorite(fav.id);
        });
        
        favoritesGrid.appendChild(card);
    });
}

// Delete Favorite
function deleteFavorite(id) {
    let favorites = JSON.parse(localStorage. getItem('gradientFavorites') || '[]');
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem('gradientFavorites', JSON.stringify(favorites));
    loadFavorites();
}

// Render Presets
function renderPresets() {
    presetsGrid.innerHTML = '';
    
    presetGradients.forEach(preset => {
        const card = document.createElement('div');
        card.className = 'preset-card';
        
        // Generate CSS for preset
        const stopsString = preset.stops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
        let css;
        
        if (preset. type === 'linear') {
            css = `linear-gradient(${preset.angle}deg, ${stopsString})`;
        } else if (preset.type === 'radial') {
            css = `radial-gradient(${preset.shape || 'circle'}, ${stopsString})`;
        }
        
        card.style.background = css;
        card.innerHTML = `<div class="preset-name">${preset.name}</div>`;
        
        card.addEventListener('click', () => {
            loadGradient(preset);
        });
        
        presetsGrid.appendChild(card);
    });
}

// Load Gradient (from preset or favorite)
function loadGradient(gradient) {
    gradientType = gradient.type;
    angle = gradient.angle || 90;
    shape = gradient.shape || 'circle';
    colorStops = [... gradient.stops];
    
    // Update UI
    document.querySelector(`input[value="${gradientType}"]`).checked = true;
    angleInput.value = angle;
    angleValue.textContent = angle;
    directionSelect.value = shape;
    
    toggleControls();
    renderColorStops();
    updateGradient();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior:  'smooth' });
}

// Initialize on load
init();