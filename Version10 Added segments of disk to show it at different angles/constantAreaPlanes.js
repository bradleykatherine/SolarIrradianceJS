// constantAreaPlanes.js: Draws equal visual-height curved panels spaced from Sun to canvas edge

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

    const { sunCenterX, sunCenterY, sunRadius } = window.sunParams;

    const visualHeight = 8; // height of each arc in pixels
    const arcWidth = 8;      // width (thickness) of each panel

    // ✅ Use pixel-based distances instead of AU
    const minRadius = sunRadius + 10;                  // start just outside the Sun
    const maxRadius = canvas.width - sunCenterX - 10;  // stop at edge of canvas
    const numberOfPanels = 20;
    const step = (maxRadius - minRadius) / (numberOfPanels - 1);

    const panels = [];
    for (let i = 0; i < numberOfPanels; i++) {
      const radius = minRadius + i * step;
      panels.push({
        radius,
        color: `rgba(255, 255, 0, ${1 - (i / numberOfPanels) * 0.7})` // optional fade
      });
    }

    panels.forEach(({ radius, color }) => {
      const centerAngle = 0;

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
