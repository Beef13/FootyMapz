# Footy Maps - Mapbox Style Reference

A simple interactive map using Mapbox GL JS with OpenStreetMap data.

## 🗺️ Mapbox Built-in Styles

### Streets & Navigation
```javascript
// Basic street map
style: 'mapbox://styles/mapbox/streets-v12'

// Navigation-focused
style: 'mapbox://styles/mapbox/navigation-day-v1'
style: 'mapbox://styles/mapbox/navigation-night-v1'
```

### Satellite & Imagery
```javascript
// Satellite imagery
style: 'mapbox://styles/mapbox/satellite-v9'

// Satellite with street labels
style: 'mapbox://styles/mapbox/satellite-streets-v12'
```

### Outdoors & Adventure
```javascript
// Outdoor recreation
style: 'mapbox://styles/mapbox/outdoors-v12'

// Light theme
style: 'mapbox://styles/mapbox/light-v11'

// Dark theme
style: 'mapbox://styles/mapbox/dark-v11'
```

### Specialized Styles
```javascript
// Basic style
style: 'mapbox://styles/mapbox/basic-v9'

// Minimal style
style: 'mapbox://styles/mapbox/minimal-v1'

// Monochrome
style: 'mapbox://styles/mapbox/monochrome-v1'
```

## 🎨 Custom Styles

### Your Custom Styles
```javascript
// Your current custom style
style: 'mapbox://styles/savcurcio/cmgufe8q8002c01sr9c4r3grt'

// Previous custom style
style: 'mapbox://styles/savcurcio/cmgua930l001s01r5g4lj0oa3'
```

## 🔧 How to Change Styles

1. **Open `index.html`**
2. **Find line 64** with the style property
3. **Replace the style URL** with any of the options above
4. **Save and refresh** your browser

### Example:
```javascript
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // Change this line
    center: [0, 0],
    zoom: 2
});
```

## 🌍 Popular Style Combinations

### For Football/Sports Maps
```javascript
// Satellite with labels (shows stadiums clearly)
style: 'mapbox://styles/mapbox/satellite-streets-v12'

// Dark theme (modern look)
style: 'mapbox://styles/mapbox/dark-v11'

// Light theme (clean look)
style: 'mapbox://styles/mapbox/light-v11'
```

### For Navigation
```javascript
// Day navigation
style: 'mapbox://styles/mapbox/navigation-day-v1'

// Night navigation
style: 'mapbox://styles/mapbox/navigation-night-v1'
```

## 🛠️ Troubleshooting Custom Styles

### If your custom style doesn't work:

1. **Check Mapbox Studio**:
   - Go to [https://studio.mapbox.com/](https://studio.mapbox.com/)
   - Make sure your style is **PUBLISHED** (not just saved)
   - Make sure it's **PUBLIC** (not private)

2. **Check Token Permissions**:
   - Go to [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
   - Ensure your token has "Styles: Read" permission

3. **Use Fallback**:
   - The code automatically falls back to `streets-v12` if custom style fails
   - Check browser console for error messages

## 📱 Mobile-Friendly Styles

```javascript
// High contrast for mobile
style: 'mapbox://styles/mapbox/streets-v12'

// Satellite works well on mobile
style: 'mapbox://styles/mapbox/satellite-streets-v12'
```

## 🎯 Quick Style Switcher

Add this to your HTML for easy style switching:

```html
<div class="style-switcher">
    <button onclick="changeStyle('streets-v12')">Streets</button>
    <button onclick="changeStyle('satellite-streets-v12')">Satellite</button>
    <button onclick="changeStyle('dark-v11')">Dark</button>
    <button onclick="changeStyle('light-v11')">Light</button>
</div>

<script>
function changeStyle(styleName) {
    map.setStyle('mapbox://styles/mapbox/' + styleName);
}
</script>
```

## 🔗 Useful Links

- [Mapbox Style Gallery](https://docs.mapbox.com/api/maps/styles/)
- [Mapbox Studio](https://studio.mapbox.com/)
- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [Access Tokens](https://account.mapbox.com/access-tokens/)

## 📝 Notes

- All built-in styles are free to use
- Custom styles require proper permissions
- Style URLs are case-sensitive
- Always test styles in different browsers
