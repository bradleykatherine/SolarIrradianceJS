// toggles.js: Toggles for orbital rings based on AU distance

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

  const planets = [
    { name: 'Mercury', label: 'Mercury (0.39 AU)' },
    { name: 'Venus',   label: 'Venus (0.72 AU)' },
    { name: 'Earth',   label: 'Earth (1.00 AU)' },
    { name: 'Mars',    label: 'Mars (1.52 AU)' },
  ];

  if (!window.ringToggles) {
    window.ringToggles = {};
    planets.forEach(p => {
      window.ringToggles[p.name] = false;
    });
  }

  planets.forEach(planet => {
    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.marginBottom = '5px';
    label.style.cursor = 'pointer';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = window.ringToggles[planet.name];
    checkbox.id = `ring-${planet.name}`;

    checkbox.addEventListener('change', () => {
      window.ringToggles[planet.name] = checkbox.checked;

      // Redraw orbital rings
      if (window.refreshBeams) window.refreshBeams();

      // Redraw solar power and intensity labels
      if (window.refreshSolarLabels) window.refreshSolarLabels();
      if (window.refreshSolarIntensityLabels) window.refreshSolarIntensityLabels();
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${planet.label}`));
    toggleContainer.appendChild(label);
  });

  document.body.appendChild(toggleContainer);
});
