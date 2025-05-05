// textToggles.js: Toggle UI for showing/hiding text overlays like solar power and solar intensity

document.addEventListener('DOMContentLoaded', () => {
  // ✅ Initialize shared toggle state if not already
  if (!window.showLabels) {
    window.showLabels = {};
  }
  if (typeof window.showLabels.sunPower === 'undefined') {
    window.showLabels.sunPower = true;
  }
  if (typeof window.showLabels.solarIntensity === 'undefined') {
    window.showLabels.solarIntensity = true;
  }

  // ✅ Build the toggle container UI
  const toggleContainer = document.createElement('div');
  toggleContainer.id = 'textToggleContainer';

  toggleContainer.style.position = 'fixed';
  toggleContainer.style.bottom = '20px';
  toggleContainer.style.right = '20px';
  toggleContainer.style.background = '#f4f4f4';
  toggleContainer.style.padding = '10px';
  toggleContainer.style.border = '1px solid #ccc';
  toggleContainer.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.2)';
  toggleContainer.style.zIndex = '1000';

  const heading = document.createElement('h3');
  heading.textContent = 'Text Display';
  heading.style.margin = '0 0 10px 0';
  heading.style.fontSize = '14px';
  heading.style.textAlign = 'center';
  toggleContainer.appendChild(heading);

  // ✅ Sun Power toggle
  const sunLabel = document.createElement('label');
  sunLabel.style.display = 'block';
  sunLabel.style.cursor = 'pointer';

  const sunCheckbox = document.createElement('input');
  sunCheckbox.type = 'checkbox';
  sunCheckbox.checked = window.showLabels.sunPower;
  sunCheckbox.id = 'toggle-sun-power';

  sunCheckbox.addEventListener('change', () => {
    window.showLabels.sunPower = sunCheckbox.checked;
    if (window.refreshSolarLabels) {
      window.refreshSolarLabels();
    }
  });

  sunLabel.appendChild(sunCheckbox);
  sunLabel.appendChild(document.createTextNode(' Sun’s Power'));
  toggleContainer.appendChild(sunLabel);

  // ✅ Solar Intensity toggle
  const intensityLabel = document.createElement('label');
  intensityLabel.style.display = 'block';
  intensityLabel.style.cursor = 'pointer';

  const intensityCheckbox = document.createElement('input');
  intensityCheckbox.type = 'checkbox';
  intensityCheckbox.checked = window.showLabels.solarIntensity;
  intensityCheckbox.id = 'toggle-solar-intensity';

  intensityCheckbox.addEventListener('change', () => {
    window.showLabels.solarIntensity = intensityCheckbox.checked;
    if (window.refreshSolarIntensityLabels) {
      window.refreshSolarIntensityLabels();
    }
  });

  intensityLabel.appendChild(intensityCheckbox);
  intensityLabel.appendChild(document.createTextNode(' Solar Intensity'));
  toggleContainer.appendChild(intensityLabel);

  // ✅ Add to DOM
  document.body.appendChild(toggleContainer);
});
