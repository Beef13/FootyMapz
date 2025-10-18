mapboxgl.accessToken = 'pk.eyJ1Ijoic2F2Y3VyY2lvIiwiYSI6ImNtZ3U2azl4YjBjcnAya3B1cnE4Z3MzMHcifQ.tfQmFhPkDPVzd3wKeJXHyA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/savcurcio/cmgufe8q8002c01sr9c4r3grt',
    center: [133.7751, -25.2744],
    zoom: 4,
    pitch: 0,
    bearing: 0,
    // Constrain view to Australia and New Zealand
    maxBounds: [
        [110.0, -48.0], // SW lng, lat
        [179.9, -8.0]   // NE lng, lat
    ],
    renderWorldCopies: false,
    // Add tile loading configuration
    maxTileCacheSize: 100,
    localIdeographFontFamily: 'Arial Unicode MS, sans-serif',
    // Force tile loading
    preserveDrawingBuffer: true,
    antialias: true,
    // Additional tile loading fixes
    crossSourceCollisions: false,
    fadeDuration: 0
});

// Add error handling for tile loading
map.on('error', function(e) {
    console.error('Map error:', e);
    // Fallback to default style if custom style fails
    if (e.error && e.error.message.includes('style')) {
        console.log('Falling back to default Mapbox style');
        map.setStyle('mapbox://styles/mapbox/streets-v11');
    }
});

map.on('style.load', function() {
    console.log('Map style loaded successfully');
});

map.on('sourcedata', function(e) {
    if (e.isSourceLoaded) {
        console.log('Source loaded:', e.sourceId);
    }
});

// Add loading state monitoring
map.on('load', function() {
    console.log('Map fully loaded');
    // Force a repaint to ensure all tiles are rendered
    map.triggerRepaint();
    
    // Multiple attempts to force tile loading
    setTimeout(() => {
        // Method 1: Slight zoom to force tile loading
        const currentZoom = map.getZoom();
        map.setZoom(currentZoom + 0.1);
        setTimeout(() => {
            map.setZoom(currentZoom);
        }, 200);
    }, 300);
    
    setTimeout(() => {
        // Method 2: Pan slightly to force tile loading
        const currentCenter = map.getCenter();
        map.panTo([currentCenter.lng + 0.01, currentCenter.lat + 0.01]);
        setTimeout(() => {
            map.panTo([currentCenter.lng, currentCenter.lat]);
        }, 200);
    }, 800);
    
    setTimeout(() => {
        // Method 3: Force style refresh
        map.setStyle(map.getStyle());
    }, 1200);
});

// Add tile loading monitoring
map.on('idle', function() {
    console.log('Map is idle - all tiles should be loaded');
});

// Add data loading monitoring
map.on('data', function(e) {
    if (e.isSourceLoaded) {
        console.log('Data source loaded:', e.sourceId);
    }
});

// Force complete tile loading
map.on('style.load', function() {
    console.log('Style loaded, forcing tile loading...');
    
    // Wait for style to fully load, then force all tiles
    setTimeout(() => {
        // Get current viewport bounds
        const bounds = map.getBounds();
        const center = map.getCenter();
        const zoom = map.getZoom();
        
        // Force tile loading by briefly expanding the view
        map.fitBounds([
            [bounds.getWest() - 0.1, bounds.getSouth() - 0.1],
            [bounds.getEast() + 0.1, bounds.getNorth() + 0.1]
        ], { duration: 0 });
        
        // Return to original view
        setTimeout(() => {
            map.setCenter(center);
            map.setZoom(zoom);
        }, 500);
    }, 1000);
});

// Disable 3D tilt/pitch controls
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();


// 13 markers with custom coordinates, names, colors, and individual sizes
const markers = [
    { name: 'Adelaide United', lng: 138.6007, lat: -34.9285, color: '#910000', size: 40 },
    { name: 'Auckland FC', lng: 174.7633, lat: -36.8485, color: '#0300c4', size: 40 },
    { name: 'Brisbane Roar', lng: 153.0235, lat: -27.4698, color: '#d16404', size: 40 },
    { name: 'Central Coast Mariners', lng: 151.3440, lat: -33.4240, color: '#ffdd00', size: 40 },
    { name: 'Macarthur FC', lng: 150.8260, lat: -34.0660, color: '#ffffff', size: 40 },
    { name: 'Melbourne City', lng: 144.9836, lat: -37.8243, color: '#00ccff', size: 40 },
    { name: 'Melbourne Victory', lng: 144.9839, lat: -37.8243, color: '#051129', size: 40 },
    { name: 'Newcastle Jets', lng: 151.7810, lat: -32.9290, color: '#9c9954', size: 40 },
    { name: 'Perth Glory', lng: 115.8570, lat: -31.9520, color: '#521569', size: 40 },
    { name: 'Sydney FC', lng: 151.2190, lat: -33.8900, color: '#1392ed', size: 40 },
    { name: 'Wellington Phoenix', lng: 174.7762, lat: -41.2865, color: '#fbff00', size: 40 },
    { name: 'Western Sydney Wanderers', lng: 151.0060, lat: -33.8140, color: '#ab0011', size: 50 },
    { name: 'Western United', lng: 144.6285, lat: -37.8281, color: '#04db00', size: 40 }
];

// Store marker references
const markerElements = [];
const guessedSet = new Set();
const guessedColors = [];
const guessedOrder = []; // preserve guess order for progress segments

// Persistence keys
const STORAGE_KEY = 'footymapz_state_v1';

function saveState() {
    try {
        const state = {
            guessedOrder: [...guessedOrder]
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn('Failed to persist state', e);
    }
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        console.warn('Failed to load state', e);
        return null;
    }
}

// Create and add a marker for a correctly guessed club
function addMarkerForClub(markerMeta) {
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.width = '20px';
    markerElement.style.height = '20px';
    markerElement.style.borderRadius = '50%';
    markerElement.style.backgroundColor = markerMeta.color || '#4285f4';
    markerElement.style.border = '2px solid white';
    markerElement.style.cursor = 'pointer';
    markerElement.dataset.clubName = markerMeta.name.toLowerCase();

    const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false
    }).setHTML(`<div class="marker-popup"><strong>${markerMeta.name}</strong><br>Correct!</div>`);

    const mapboxMarker = new mapboxgl.Marker(markerElement)
        .setLngLat([markerMeta.lng, markerMeta.lat])
        .setPopup(popup)
        .addTo(map);

    markerElements.push({
        element: markerElement,
        popup: popup,
        mapboxMarker: mapboxMarker,
        name: markerMeta.name
    });


    // Smoothly fly to the new marker
    map.flyTo({
        center: [markerMeta.lng, markerMeta.lat],
        zoom: Math.max(map.getZoom(), 4),
        duration: 1500,
        essential: true
    });
}

// On map load: only initialize UI and rehydrate guessed markers
map.on('load', function() {
    // Initialize progress label
    const progressLabel = document.getElementById('progressLabel');
    if (progressLabel) {
        progressLabel.textContent = `0 / ${markers.length} guessed`;
    }

    // Rehydrate persisted state
    const saved = loadState();
    if (saved && Array.isArray(saved.guessedOrder)) {
        saved.guessedOrder.forEach((name) => {
            const markerMeta = markers.find(m => m.name === name);
            if (markerMeta && !guessedSet.has(name)) {
                const clubColor = markerMeta.color || '#4285f4';
                addMarkerForClub(markerMeta);
                guessedSet.add(name);
                guessedColors.push(clubColor);
                guessedOrder.push(name);
            }
        });
        updateGuessedUI();
    }


    // Show landing overlay initially; hide game UI until Club Guesser is selected
    const landing = document.getElementById('landingOverlay');
    const gameUI = document.getElementById('gameUI');
    const guessedPanel = document.getElementById('guessedPanel');
    const clubBtn = document.getElementById('clubGuesserBtn');
    const homeBtn = document.getElementById('homeBtn');
    const mobileHomeBtn = document.getElementById('mobileHomeBtn');
    const usernameInput = document.getElementById('usernameInput');
    const browseBtn = document.getElementById('browseBtn');
    if (clubBtn && landing && gameUI && guessedPanel) {
        clubBtn.addEventListener('click', () => {
            // Persist username if provided
            const username = (usernameInput && usernameInput.value || '').trim();
            if (username) {
                try { localStorage.setItem('footymapz_username', username); } catch (e) {}
            }
            landing.classList.add('hidden');
            gameUI.classList.remove('hidden');
            guessedPanel.classList.remove('hidden');
            if (homeBtn) homeBtn.classList.remove('hidden');
        });
    }

    // Home button: return to landing (both desktop and mobile)
    const handleHomeClick = () => {
        landing.classList.remove('hidden');
        gameUI.classList.add('hidden');
        guessedPanel.classList.add('hidden');
        if (homeBtn) homeBtn.classList.add('hidden');
        // Prefill username from storage when returning home
        try {
            const savedName = localStorage.getItem('footymapz_username') || '';
            if (usernameInput) usernameInput.value = savedName;
        } catch (e) {}
    };

    if (homeBtn && landing && gameUI && guessedPanel) {
        homeBtn.addEventListener('click', handleHomeClick);
    }
    if (mobileHomeBtn && landing && gameUI && guessedPanel) {
        mobileHomeBtn.addEventListener('click', handleHomeClick);
    }

    // Browse mode: show all markers without guessing
    if (browseBtn && landing) {
        browseBtn.addEventListener('click', () => {
            // Persist username if provided
            const username = (usernameInput && usernameInput.value || '').trim();
            if (username) {
                try { localStorage.setItem('footymapz_username', username); } catch (e) {}
            }
            
            // Hide landing overlay
            landing.classList.add('hidden');
            
            // Show all markers immediately
            showAllMarkers();
            
            // Show browse mode info panel
            showBrowseMode();
        });
    }

    // Removed AU/NZ overlay layers (dim, lighten, border)
});

// Normalize string for comparison: lowercase and remove non-alphanumeric
function normalizeName(value) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Compute Levenshtein distance (edit distance)
function levenshteinDistance(a, b) {
    const lenA = a.length;
    const lenB = b.length;
    if (lenA === 0) return lenB;
    if (lenB === 0) return lenA;
    const dp = Array(lenB + 1);
    for (let j = 0; j <= lenB; j++) dp[j] = j;
    for (let i = 1; i <= lenA; i++) {
        let prev = i - 1;
        dp[0] = i;
        for (let j = 1; j <= lenB; j++) {
            const temp = dp[j];
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[j] = Math.min(
                dp[j] + 1,       // deletion
                dp[j - 1] + 1,   // insertion
                prev + cost       // substitution
            );
            prev = temp;
        }
    }
    return dp[lenB];
}

function checkGuess() {
    const inputEl = document.getElementById('searchInput');
    const rawGuess = inputEl.value.trim();
    if (!rawGuess) return;

    const simpleGuess = rawGuess.toLowerCase();
    const normalizedGuess = normalizeName(rawGuess);

    let matchedClub = null;

    // Exact match (raw or normalized)
    matchedClub = markers.find(m => {
        const nameLower = m.name.toLowerCase();
        return nameLower === simpleGuess || normalizeName(m.name) === normalizedGuess;
    });

    // Fuzzy match within distance <= 2 if no exact match
    if (!matchedClub) {
        let best = { club: null, dist: Infinity };
        for (const m of markers) {
            const dist = levenshteinDistance(normalizedGuess, normalizeName(m.name));
            if (dist < best.dist) {
                best = { club: m, dist };
            }
        }
        if (best.club && best.dist <= 2) {
            matchedClub = best.club;
        }
    }

    let accepted = false;
    if (matchedClub && !guessedSet.has(matchedClub.name)) {
        addMarkerForClub(matchedClub);
        const clubColor = matchedClub.color || '#4285f4';
        guessedSet.add(matchedClub.name);
        guessedColors.push(clubColor);
        guessedOrder.push(matchedClub.name);
        accepted = true;
    }

    if (accepted) {
        inputEl.value = '';
        updateGuessedUI();
        saveState();
    } else {
        // Keep input for correction
        console.log('Incorrect guess. Try again!');
    }
}

// Wire restart button
document.getElementById('restartBtn').addEventListener('click', resetGame);

document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Guessed UI updates
function updateGuessedUI() {
    const list = document.getElementById('guessedList');
    const progressBar = document.getElementById('progressBar');
    const progressLabel = document.getElementById('progressLabel');
    const mobileProgressBar = document.getElementById('mobileProgressBar');
    const mobileProgressLabel = document.getElementById('mobileProgressLabel');

    // Update list
    list.innerHTML = '';
    guessedOrder.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        list.appendChild(li);
    });

    // Update progress bar with colored segments
    const total = markers.length;
    const guessed = guessedSet.size;
    const pct = Math.round((guessed / total) * 100);
    
    // Create hard-stop (no blend) segments for progress bar based on guessed colors
    const segments = guessedColors.length > 0 ? 
        guessedColors.map((color, index) => {
            const start = (index / guessedColors.length) * 100;
            const end = ((index + 1) / guessedColors.length) * 100;
            return `${color} ${start}%, ${color} ${end}%`;
        }).join(', ') : 
        '#667eea, #5a6fd8';
    
    const progressStyle = `linear-gradient(90deg, ${segments})`;
    
    // Update desktop progress
    progressBar.style.background = progressStyle;
    progressBar.style.width = pct + '%';
    progressLabel.textContent = `${guessed} / ${total} guessed`;
    
    // Update mobile progress
    if (mobileProgressBar && mobileProgressLabel) {
        mobileProgressBar.style.background = progressStyle;
        mobileProgressBar.style.width = pct + '%';
        mobileProgressLabel.textContent = `${guessed} / ${total}`;
    }
}

// Reset game: clear guesses, markers, UI and persistence
function resetGame() {
    // Remove map markers
    while (markerElements.length > 0) {
        const { mapboxMarker } = markerElements.pop();
        try { mapboxMarker.remove(); } catch (e) { /* ignore */ }
    }

    // Clear state
    guessedSet.clear();
    guessedColors.length = 0;
    guessedOrder.length = 0;

    // Clear input
    const input = document.getElementById('searchInput');
    if (input) input.value = '';

    // Reset UI
    updateGuessedUI();

    // Clear persisted state
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
}

// Show all markers for browse mode
function showAllMarkers() {
    // Clear existing markers
    while (markerElements.length > 0) {
        const { mapboxMarker } = markerElements.pop();
        try { mapboxMarker.remove(); } catch (e) { /* ignore */ }
    }
    
    // Add all markers
    markers.forEach(markerMeta => {
        addMarkerForClub(markerMeta);
    });
    
}

// Show browse mode info panel
function showBrowseMode() {
    // Remove existing browse mode if any
    const existingBrowse = document.getElementById('browseMode');
    if (existingBrowse) {
        existingBrowse.remove();
    }
    
    // Show home button
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.classList.remove('hidden');
    }
    
    // Create browse mode panel
    const browsePanel = document.createElement('div');
    browsePanel.id = 'browseMode';
    browsePanel.className = 'browse-mode';
    browsePanel.innerHTML = `
        <h3>Browse Mode</h3>
        <p>All club locations are displayed. Click markers to learn more about each club.</p>
        <button class="close-browse" onclick="closeBrowseMode()">Close</button>
    `;
    
    document.body.appendChild(browsePanel);
}

// Close browse mode info panel (but stay in browse mode)
function closeBrowseMode() {
    const browsePanel = document.getElementById('browseMode');
    if (browsePanel) {
        browsePanel.remove();
    }
    
    // Keep all markers visible - don't clear them
    // User stays in browse mode to explore the map
}

// Make closeBrowseMode globally available
window.closeBrowseMode = closeBrowseMode;

