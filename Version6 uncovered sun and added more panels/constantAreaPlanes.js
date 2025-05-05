// constantAreaPlanes.js: Draws equal visual-height curved panels spaced evenly in AU

document.addEventListener('DOMContentLoaded', () => {
  function drawConstantAreaPlanes() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas || !window.sunParams) {
      setTimeout(drawConstantAreaPlanes, 100);
      return;
    }

    let planeCanvas = document.getElementById('constantAreaCanvas');
    if (!planeCanvas) {
      planeCanvas = document.createElement('canvas');
      planeCanvas.id = 'constantAreaCanvas';
      planeCanvas.style.position = 'absolute';
      planeCanvas.style.left = canvas.offsetLeft + 'px';
      planeCanvas.style.top = canvas.offsetTop + 'px';
      planeCanvas.style.pointerEvents = 'none';
      canvas.parentNode.appendChild(planeCanvas);
    }

    planeCanvas.width = canvas.width;
    planeCanvas.height = canvas.height;

    const ctx = planeCanvas.getContext('2d');
    ctx.clearRect(0, 0, planeCanvas.width, planeCanvas.height);

    if (window.selectedCalculation !== 'intensityAt1AU') return;

    const AU_IN_PIXELS = 450;
    const { sunCenterX, sunCenterY } = window.sunParams;

    // ✅ Generate evenly spaced panels
    const numberOfPanels = 12;
    const minAU = 0.3;
    const maxAU = 1.6;
    const step = (maxAU - minAU) / (numberOfPanels - 1);

    const panels = [];
    for (let i = 0; i < numberOfPanels; i++) {
      const au = minAU + i * step;
      panels.push({
        au,
        color: `rgba(255, 255, 0, ${1 - (i / numberOfPanels) * 0.7})` // optional fade
      });
    }

    const visualHeight = 15; // fixed height in pixels
    const arcWidth = 8;     // fixed panel width in pixels

    panels.forEach(({ au, color }) => {
      const radius = au * AU_IN_PIXELS;
      const centerAngle = 0;

      // Calculate angular span from vertical height
      const halfAngle = Math.asin((visualHeight / 2) / radius);
      const startAngle = centerAngle - halfAngle;
      const endAngle = centerAngle + halfAngle;

      const rInner = radius - arcWidth / 2;
      const rOuter = radius + arcWidth / 2;

      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, rOuter, startAngle, endAngle, false);
      ctx.arc(sunCenterX, sunCenterY, rInner, endAngle, startAngle, true);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.stroke();
    });
  }

  window.refreshConstantAreaPlanes = drawConstantAreaPlanes;
});
