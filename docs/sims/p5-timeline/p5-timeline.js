// CANVAS_HEIGHT: 1050
/* History of Processing and p5.js MicroSim
   This MicroSim is part of the "Art of Processing" interactive intelligent textbook: https://dmccreary.github.io/p5-textbook
   For a complete lesson plan see:  https://dmccreary.github.io/p5-textbook/sims/p5-timeline/
*/

document.addEventListener('DOMContentLoaded', async () => {
    const main = document.querySelector('main');
    
    // Build UI
    main.innerHTML = `
        <div id="header">
            <h2>History of Processing and p5.js</h2>
        </div>
        <div id="controls">
            <button class="btn-all" onclick="filterCategory('all')">All</button>
            <button class="btn-processing" onclick="filterCategory('processing')">Processing (Java)</button>
            <button class="btn-foundation" onclick="filterCategory('foundation')">Foundation</button>
            <button class="btn-p5_core" onclick="filterCategory('p5_core')">p5.js Core</button>
            <button class="btn-p5_features" onclick="filterCategory('p5_features')">p5.js Features</button>
            <button class="btn-community" onclick="filterCategory('community')">Community</button>
        </div>
        <div id="timeline"></div>
        <div id="details">
            <strong>Click an event on the timeline to see details here.</strong>
        </div>
    `;

    let data;
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        data = await response.json();
    } catch (e) {
        document.getElementById('timeline').innerHTML = '<p style="color:red; padding:20px; border:1px solid red; background:#fee;"><strong>Error loading timeline data:</strong> Could not fetch data.json. If you are viewing this file directly from your local file system, your browser is blocking it for security reasons. Please use a local web server (e.g., run <code>mkdocs serve</code>) to view the timeline.</p>';
        console.error(e);
        return;
    }

    // Map items to vis-timeline format
    const itemsArray = data.items.map(item => ({
        id: item.id,
        group: item.group, // keep group property for filtering, but timeline won't group into lanes
        className: item.group,
        start: item.start,
        content: item.content,
        title: item.description, // Tooltip
        description: item.description // Panel
    }));

    // Add ghosts to prevent edge clipping
    itemsArray.push({
        id: 'ghost_left',
        group: 'processing',
        className: 'ghost',
        start: '2000-01-01',
        content: ''
    });
    itemsArray.push({
        id: 'ghost_right',
        group: 'community',
        className: 'ghost',
        start: '2027-01-01',
        content: ''
    });

    window.allItems = itemsArray.slice();
    window.visibleItems = itemsArray.filter(i => i.className !== 'ghost');

    window.timelineData = new vis.DataSet(window.visibleItems);
    
    const container = document.getElementById('timeline');
    const options = {
        width: '100%',
        height: '700px',
        margin: {
            item: { horizontal: 50, vertical: 10 },
            axis: 40
        },
        align: 'center',
        tooltip: { followMouse: true },
        zoomable: false,
        moveable: true,
        min: new Date(1980, 0, 1),
        max: new Date(2050, 0, 1),
        orientation: 'top'
    };

    // Instantiate without data.groups to remove the left column
    window.timeline = new vis.Timeline(container, window.timelineData, options);

    fitAll();

    window.timeline.on('select', function (properties) {
        const detailsDiv = document.getElementById('details');
        if (properties.items.length > 0) {
            const itemId = properties.items[0];
            const item = window.allItems.find(i => i.id === itemId);
            if (item && item.className !== 'ghost') {
                detailsDiv.innerHTML = `<strong>${item.content} (${item.start.substring(0,4)}):</strong><br/>${item.description}`;
                detailsDiv.style.borderLeftColor = getCategoryColor(item.group);
            }
        } else {
            detailsDiv.innerHTML = '<strong>Click an event on the timeline to see details here.</strong>';
            detailsDiv.style.borderLeftColor = '#ccc';
        }
    });
});

function getCategoryColor(group) {
    const colors = {
        'processing': '#0047AB',
        'foundation': '#228B22',
        'p5_core': '#ED225D',
        'p5_features': '#E91E63',
        'community': '#8A2BE2'
    };
    return colors[group] || '#ccc';
}

window.filterCategory = function(category) {
    if (category === 'all') {
        window.timelineData.clear();
        window.timelineData.add(window.visibleItems);
    } else {
        const filtered = window.visibleItems.filter(item => item.group === category);
        window.timelineData.clear();
        window.timelineData.add(filtered);
    }
    fitAll();
}

function fitAll() {
    const dates = window.allItems.map(item => new Date(item.start).getTime());
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const pad = 2 * 365 * 24 * 60 * 60 * 1000;
    
    window.timeline.setWindow(
        new Date(minDate - pad),
        new Date(maxDate + pad),
        { animation: false }
    );
}
