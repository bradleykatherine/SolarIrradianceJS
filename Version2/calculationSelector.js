// calculationSelector.js: Dropdown control for calculation visualizations

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.createElement('select');
  selector.id = 'calculationSelector';

  // Style and position
  selector.style.position = 'fixed';
  selector.style.width = '383px';
  selector.style.right = '90px';
  selector.style.top = 'calc(44% - 5px)';
  selector.style.zIndex = '1001';
  selector.style.padding = '6px';
  selector.style.fontSize = '14px';
  selector.style.border = '1px solid #ccc';
  selector.style.boxShadow = '1px 1px 4px rgba(0, 0, 0, 0.15)';
  selector.style.background = '#fff';

  // Default option
  const defaultOption = document.createElement('option');
  defaultOption.text = '-- Select Calculation --';
  defaultOption.value = '';
  selector.appendChild(defaultOption);

  // Dropdown options
  const options = [
    { label: 'Solar Intensity at 1 AU', value: 'intensityAt1AU' },
    { label: 'Total Solar Power Captured by Earth', value: 'totalPowerEarth' },
    { label: 'Average Solar Intensity on Earth', value: 'avgIntensityEarth' }
  ];

  options.forEach(opt => {
    const option = document.createElement('option');
    option.text = opt.label;
    option.value = opt.value;
    selector.appendChild(option);
  });

  selector.addEventListener('change', () => {
    const selected = selector.value;
    window.selectedCalculation = selected;

    // Update calculation text box
    if (selected && window.calculationOptions && window.calculationOptions[selected]) {
      window.updateCalculationBox(window.calculationOptions[selected]);
    } else {
      window.updateCalculationBox('<em>No calculations yet.</em>');
    }

    // Refresh overlays and visualizations
    if (window.refreshEarthShadow) window.refreshEarthShadow();
    if (window.refreshSolarBeams) window.refreshSolarBeams();
    if (window.refreshEarthWrapVisualization) window.refreshEarthWrapVisualization();
    if (window.refreshConstantAreaPlanes) window.refreshConstantAreaPlanes();
    if (window.refreshIntensityRings) window.refreshIntensityRings();
    if (window.refreshSolarIntensityLabels) window.refreshSolarIntensityLabels();

    // ✅ Mars
    if (selected === '') {
      if (window.drawMars) window.drawMars();
    } else {
      if (window.clearMars) window.clearMars();
    }

    // ✅ Venus
    if (selected === '') {
      if (window.drawVenus) window.drawVenus();
    } else {
      if (window.clearVenus) window.clearVenus();
    }

    // ✅ Mercury
    if (selected === '') {
      if (window.drawMercury) window.drawMercury();
    } else {
      if (window.clearMercury) window.clearMercury();
    }

    // ✅ Earth: hide only when "intensityAt1AU" is selected
    if (selected === 'intensityAt1AU') {
      if (window.clearEarth) window.clearEarth();
    } else {
      if (window.drawEarth) window.drawEarth();
    }
  });

  document.body.appendChild(selector);
});
