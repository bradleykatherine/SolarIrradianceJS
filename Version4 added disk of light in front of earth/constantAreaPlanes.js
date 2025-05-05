// constantAreaPlanes.js: Draws equal visual-height curved panels aligned with orbits

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
    ctx.clearRect(0, 0, planeCanvas.width, planeCanvas.height); // ✅ always clear

    if (window.selectedCalculation !== 'intensityAt1AU') return; // ✅ skip draw

    const AU_IN_PIXELS = 450;
    const { sunCenterX, sunCenterY } = window.sunParams;

    const planets = [
      { name: 'Mercury', au: 0.39, color: 'rgba(255, 255, 0, 0.8)' },
      { name: 'Venus',   au: 0.72, color: 'rgba(255, 255, 100, 0.6)' },
      { name: 'Earth',   au: 1.00, color: 'rgba(255, 255, 150, 0.45)' },
      { name: 'Mars',    au: 1.52, color: 'rgba(255, 255, 180, 0.3)' }
    ];

    const visualHeight = 8; // fixed height in pixels
    const arcWidth = 8;      // fixed panel width in pixels

    planets.forEach(({ au, color }) => {
      const radius = au * AU_IN_PIXELS;
      const centerAngle = 0;

      // Convert vertical height to angular span
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
