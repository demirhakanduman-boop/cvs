// Album data
const albumData = {
    international: [],
    turkey: [],
    jazz: [],
    'classical-ost': []
};

let currentCategory = null;
let allAlbums = [];  // Tüm albümleri içeren dizi (kategorisi ile birlikte)

// Load albums from txt files
async function loadAlbums() {
    try {
        const categories = [
            { key: 'international', file: './int_list.txt' },
            { key: 'turkey', file: './tr_list.txt' },
            { key: 'jazz', file: './jazz_list.txt' },
            { key: 'classical-ost', file: './classic-ost_list.txt' }
        ];

        for (const category of categories) {
            try {
                const timestamp = new Date().getTime();
                const response = await fetch(`${category.file}?t=${timestamp}`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const text = await response.text();
                const albums = text
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0);
                albumData[category.key] = albums;
                // Her albümü kategorisi ile birlikte allAlbums dizisine ekle
                albums.forEach(album => {
                    allAlbums.push({ album, category: category.key });
                });
                console.log(`Loaded ${albums.length} ${category.key} albums`);
            } catch (error) {
                console.error(`Failed to load ${category.file}:`, error);
                albumData[category.key] = [];
            }
        }
    } catch (error) {
        console.error('Error loading albums:', error);
    }
}

function parseAlbum(albumString) {
    const parts = albumString.split(' - ');
    if (parts.length >= 2) {
        const artist = parts[0].trim();
        const album = parts.slice(1).join(' - ').trim();
        return { artist, album };
    }
    return { artist: albumString, album: '' };
}

function showCategory(category) {
    currentCategory = category;
    const displayContainer = document.querySelector('.display-area');
    const display = document.getElementById('albumDisplay');
    const list = document.getElementById('albumList');
    
    const data = albumData[category].sort();
    
    display.innerHTML = '';
    displayContainer.style.display = 'none';
    list.style.display = 'block';
    
    let html = '';
    
    data.forEach((albumStr, index) => {
        const { artist, album } = parseAlbum(albumStr);
        html += `
            <div class="album-item">
                <div class="album-item-text">
                    <div class="album-item-artist">${artist}</div>
                    <div class="album-item-name">${album}</div>
                </div>
            </div>
        `;
    });
    
    list.innerHTML = html;
}

function selectAlbum(category, index) {
    // Intentionally empty - no action on album click
}

function randomAlbum() {
    const list = document.getElementById('albumList');
    const displayContainer = document.querySelector('.display-area');
    const display = document.getElementById('albumDisplay');
    
    if (allAlbums.length === 0) {
        display.innerHTML = '';
        displayContainer.style.display = 'none';
        list.style.display = 'none';
        return;
    }
    
    // Tüm albümlerden eşit şansla seç
    const randomItem = allAlbums[Math.floor(Math.random() * allAlbums.length)];
    const { artist, album } = parseAlbum(randomItem.album);
    
    const categoryNames = {
        international: 'International',
        turkey: 'Turkey',
        jazz: 'Jazz',
        'classical-ost': 'Classical / OST'
    };
    
    display.innerHTML = `
        <div>
            <div class="album-display artist">${artist}</div>
            <div class="album-display title">${album}</div>
            <div class="album-display genre">${categoryNames[randomItem.category]}</div>
        </div>
    `;
    displayContainer.style.display = 'flex';
    list.style.display = 'none';
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadAlbums();
    const displayContainer = document.querySelector('.display-area');
    const display = document.getElementById('albumDisplay');
    const list = document.getElementById('albumList');
    display.innerHTML = '';
    displayContainer.style.display = 'none';
    list.style.display = 'none';
});
