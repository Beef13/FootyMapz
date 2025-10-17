mapboxgl.accessToken = 'pk.eyJ1Ijoic2F2Y3VyY2lvIiwiYSI6ImNtZ3U2azl4YjBjcnAya3B1cnE4Z3MzMHcifQ.tfQmFhPkDPVzd3wKeJXHyA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [133.7751, -25.2744],
    zoom: 4
});

// 13 markers with custom coordinates and names
const markers = [
    { name: 'Adelaide United', lng: 138.6007, lat: -34.9285 },
    { name: 'Auckland FC', lng: 174.7633, lat: -36.8485 },
    { name: 'Brisbane Roar', lng: 153.0235, lat: -27.4698 },
    { name: 'Central Coast Mariners', lng: 151.3440, lat: -33.4240 },
    { name: 'Macarthur FC', lng: 150.8260, lat: -34.0660 },
    { name: 'Melbourne City', lng: 144.9836, lat: -37.8243 },
    { name: 'Melbourne Victory', lng: 144.9839, lat: -37.8243 },
    { name: 'Newcastle Jets', lng: 151.7810, lat: -32.9290 },
    { name: 'Perth Glory', lng: 115.8570, lat: -31.9520 },
    { name: 'Sydney FC', lng: 151.2190, lat: -33.8900 },
    { name: 'Wellington Phoenix', lng: 174.7762, lat: -41.2865 },
    { name: 'Western Sydney Wanderers', lng: 151.0060, lat: -33.8140 },
    { name: 'Western United', lng: 144.6285, lat: -37.8281 }
];

// Store marker references
const markerElements = [];
const guessedSet = new Set();

// Add markers when map loads
map.on('load', function() {
    markers.forEach((marker, index) => {
        // Create marker element (blank initially)
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.style.width = '20px';
        markerElement.style.height = '20px';
        markerElement.style.borderRadius = '50%';
        markerElement.style.backgroundColor = '#808080';
        markerElement.style.border = '2px solid white';
        markerElement.style.cursor = 'pointer';
        markerElement.dataset.clubName = marker.name.toLowerCase();
        markerElement.dataset.index = index;

        // Create popup (blank initially)
        const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false
        }).setHTML(`<div class="marker-popup">Guess this club!</div>`);

        // Create marker
        const mapboxMarker = new mapboxgl.Marker(markerElement)
            .setLngLat([marker.lng, marker.lat])
            .setPopup(popup)
            .addTo(map);

        // Store reference
        markerElements.push({
            element: markerElement,
            popup: popup,
            mapboxMarker: mapboxMarker,
            name: marker.name
        });
    });

    // Initialize progress label
    const progressLabel = document.getElementById('progressLabel');
    if (progressLabel) {
        progressLabel.textContent = `0 / ${markers.length} guessed`;
    }
});

function checkGuess() {
    const guess = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!guess) return;

    let found = false;
    markerElements.forEach(markerRef => {
        if (markerRef.element.dataset.clubName === guess) {
            // Correct guess - turn marker blue and show name
            markerRef.element.style.backgroundColor = '#4285f4';
            markerRef.popup.setHTML(`<div class="marker-popup"><strong>${markerRef.name}</strong><br>Correct!</div>`);
            found = true;
            guessedSet.add(markerRef.name);
        }
    });

    if (found) {
        document.getElementById('searchInput').value = '';
        console.log('Correct guess!');
        updateGuessedUI();
    } else {
        console.log('Incorrect guess. Try again!');
    }
}

document.getElementById('searchBtn').addEventListener('click', checkGuess);

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

    // Update list
    list.innerHTML = '';
    Array.from(guessedSet).sort().forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        list.appendChild(li);
    });

    // Update progress
    const total = markers.length;
    const guessed = guessedSet.size;
    const pct = Math.round((guessed / total) * 100);
    progressBar.style.width = pct + '%';
    progressLabel.textContent = `${guessed} / ${total} guessed`;
}