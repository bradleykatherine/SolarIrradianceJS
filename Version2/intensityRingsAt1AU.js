// intensityRingsAt1AU.js: Draws orbital rings only when 'intensityAt1AU' is selected from dropdown

document.addEventListener('DOMContentLoaded', () => {
  function drawIntensityRings() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas || !window.sunParams) {
      setTimeout(drawIntensityRings, 100);
      return;
    }

    let ringCanvas = document.getElementById('intensityRingCanvas');
    if (!ringCanvas) {
      ringCanvas = document.createElement('canvas');
      ringCanvas.id = 'intensityRingCanvas';
      ringCanvas.style.position = 'absolute';
      ringCanvas.style.left = canvas.offsetLeft + 'px';
      ringCanvas.style.top = canvas.offsetTop + 'px';
      ringCanvas.style.pointerEvents = 'none';
      canvas.parentNode.appendChild(ringCanvas);
    }

    ringCanvas.width = canvas.width;
    ringCanvas.height = canvas.height;

    const ctx = ringCanvas.getContext('2d');
    ctx.clearRect(0, 0, ringCanvas.width, ringCanvas.height);

    if (window.selectedCalculation !== 'intensityAt1AU') return;

    const { sunCenterX, sunCenterY } = window.sunParams;
    const AU_IN_PIXELS = 450;

    const rings = [
      { name: 'Mercury', au: 0.39 },
      { name: 'Venus',   au: 0.72 },
      { name: 'Earth',   au: 1.00 },
      { name: 'Mars',    au: 1.52 }
    ];

    ctx.strokeStyle = 'rgba(255, 200, 0, 0.5)';
    ctx.lineWidth = 2;

    rings.forEach(({ au }) => {
      const radius = au * AU_IN_PIXELS;
      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, radius, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  window.refreshIntensityRings = drawIntensityRings;
});
