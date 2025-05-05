// lightBeams.js: Draws orbital rings for selected planets based on AU distances

document.addEventListener('DOMContentLoaded', () => {
  function drawPlanetaryRings() {
    const simCanvas = document.getElementById('simulationCanvas');
    if (!simCanvas || !window.sunParams) {
      setTimeout(drawPlanetaryRings, 100);
      return;
    }

    const sp = window.sunParams;

    // Set up or reuse overlay canvas
    let ringCanvas = document.getElementById('beamsCanvas');
    if (!ringCanvas) {
      ringCanvas = document.createElement('canvas');
      ringCanvas.id = 'beamsCanvas';
      ringCanvas.style.position = 'absolute';
      ringCanvas.style.left = simCanvas.offsetLeft + 'px';
      ringCanvas.style.top = simCanvas.offsetTop + 'px';
      ringCanvas.style.pointerEvents = 'none';
      simCanvas.parentNode.appendChild(ringCanvas);
    }
    ringCanvas.width = simCanvas.width;
    ringCanvas.height = simCanvas.height;

    const ctx = ringCanvas.getContext('2d');
    ctx.clearRect(0, 0, ringCanvas.width, ringCanvas.height);

    const AU_IN_PIXELS = 450;

    const orbits = [
      { name: 'Mercury', au: 0.39 },
      { name: 'Venus',   au: 0.72 },
      { name: 'Earth',   au: 1.00 },
      { name: 'Mars',    au: 1.52 }
    ];

    orbits.forEach(planet => {
      if (window.ringToggles && window.ringToggles[planet.name]) {
        const radius = planet.au * AU_IN_PIXELS;
        ctx.beginPath();
        ctx.arc(sp.sunCenterX, sp.sunCenterY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 223, 0, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }

  // Expose a refresh method so other scripts can call it
  window.refreshBeams = drawPlanetaryRings;

  // Initialize toggle state and create checkboxes for each planet
  document.addEventListener('DOMContentLoaded', () => {
    const toggleContainer = document.createElement('div');
    toggleContainer.id = 'toggleContainer';
    toggleContainer.style.position = 'fixed';
    toggleContainer.style.top = '60px';
    toggleContainer.style.right = '20px';
    toggleContainer.style.background = '#f4f4f4';
    toggleContainer.style.padding = '10px';
    toggleContainer.style.border = '1px solid #ccc';
    toggleContainer.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.2)';

    const heading = document.createElement('h3');
    heading.textContent = 'Orbital Rings';
    heading.style.margin = '0 0 10px 0';
    heading.style.fontSize = '16px';
    heading.style.textAlign = 'center';
    toggleContainer.appendChild(heading);

    const planets = ['Mercury', 'Venus', 'Earth', 'Mars'];

    if (!window.ringToggles) {
      window.ringToggles = {};
      planets.forEach(p => {
        window.ringToggles[p] = false;
      });
    }

    planets.forEach(planet => {
      const label = document.createElement('label');
      label.style.display = 'block';
      label.style.cursor = 'pointer';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = window.ringToggles[planet];
      checkbox.id = `ring-${planet}`;

      checkbox.addEventListener('change', () => {
        window.ringToggles[planet] = checkbox.checked;

        // Redraw orbital rings
        if (window.refreshBeams) window.refreshBeams();

        // Redraw solar power labels
        if (window.refreshSolarLabels) window.refreshSolarLabels();

        // Redraw solar intensity labels
        if (window.refreshSolarIntensityLabels) window.refreshSolarIntensityLabels();
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${planet}`));
      toggleContainer.appendChild(label);
    });

    document.body.appendChild(toggleContainer);

    // Initial draw
    drawPlanetaryRings();

    // Also draw labels if applicable
    if (window.refreshSolarLabels) window.refreshSolarLabels();
    if (window.refreshSolarIntensityLabels) window.refreshSolarIntensityLabels();
  });
});
