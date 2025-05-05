// solarIntensityText.js: Draw solar intensity labels only for toggled-on rings

function drawSolarIntensityLabels() {
  const mainCanvas = document.getElementById('simulationCanvas');
  if (!mainCanvas || !window.sunParams) {
    setTimeout(drawSolarIntensityLabels, 100);
    return;
  }

  let labelCanvas = document.getElementById('solarIntensityCanvas');
  if (!labelCanvas) {
    labelCanvas = document.createElement('canvas');
    labelCanvas.id = 'solarIntensityCanvas';
    labelCanvas.style.position = 'absolute';
    labelCanvas.style.left = mainCanvas.offsetLeft + 'px';
    labelCanvas.style.top = mainCanvas.offsetTop + 'px';
    labelCanvas.style.pointerEvents = 'none';
    mainCanvas.parentNode.appendChild(labelCanvas);
  }

  labelCanvas.width = mainCanvas.width;
  labelCanvas.height = mainCanvas.height;

  const ctx = labelCanvas.getContext('2d');
  ctx.clearRect(0, 0, labelCanvas.width, labelCanvas.height);

  if (!window.ringToggles) return;

  ctx.font = '16px Arial';
  ctx.fillStyle = '#444';
  ctx.textAlign = 'left';

  const sp = window.sunParams;
  const AU_IN_PIXELS = 450;

  const intensityLabels = [
    { name: 'Mars',    au: 1.48, y: 69,  xOffset: 0,    value: '5.90 × 10² W/m²' },
    { name: 'Earth',   au: 0.96, y: 91,  xOffset: -5,   value: '1.36 × 10³ W/m²' },
    { name: 'Venus',   au: 0.69, y: 113, xOffset: -8,   value: '2.60 × 10³ W/m²' },
    { name: 'Mercury', au: 0.37, y: 154, xOffset: -10,  value: '9.08 × 10³ W/m²' }
  ];

  intensityLabels.forEach(({ name, au, y, xOffset, value }) => {
    if (!window.ringToggles[name]) return;

    const ringX = sp.sunCenterX + au * AU_IN_PIXELS;
    const x = ringX + xOffset;

    ctx.fillText('Solar Intensity:', x, y);
    ctx.fillText(value, x, y + 18);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  drawSolarIntensityLabels();
  window.refreshSolarIntensityLabels = drawSolarIntensityLabels;
});
