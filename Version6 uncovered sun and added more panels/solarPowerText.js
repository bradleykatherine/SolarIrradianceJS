// solarPowerText.js: Draw solar power labels only for toggled-on rings

function drawSolarPowerLabels() {
  const mainCanvas = document.getElementById('simulationCanvas');
  if (!mainCanvas || !window.sunParams) {
    setTimeout(drawSolarPowerLabels, 100);
    return;
  }

  let labelCanvas = document.getElementById('solarTextCanvas');
  if (!labelCanvas) {
    labelCanvas = document.createElement('canvas');
    labelCanvas.id = 'solarTextCanvas';
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
  const powerString = 'Solar Power: 3.84 × 10²⁶ W';

  const orbitalLabels = [
    { name: 'Mars',    au: 1.45, y: 25,  xOffset: 0 },
    { name: 'Earth',   au: 0.92, y: 47,  xOffset: -5 },
    { name: 'Venus',   au: 0.64, y: 69,  xOffset: -8 },
    { name: 'Mercury', au: 0.30, y: 110, xOffset: -10 }
  ];

  orbitalLabels.forEach(({ name, au, y, xOffset }) => {
    if (!window.ringToggles[name]) return;

    const ringX = sp.sunCenterX + au * AU_IN_PIXELS;
    const x = ringX + xOffset;

    const [label, value] = powerString.split(':');
    ctx.fillText(label + ':', x, y);
    ctx.fillText(value.trim(), x, y + 18);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  drawSolarPowerLabels();
  window.refreshSolarLabels = drawSolarPowerLabels;
});
