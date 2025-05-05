// earthShadow.js: Draws full-width shadow beam trailing Earth, with elliptical cap at the far right

document.addEventListener('DOMContentLoaded', () => {
  function drawEarthShadow() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas || !window.earthPosition) {
      setTimeout(drawEarthShadow, 100);
      return;
    }

    let shadowCanvas = document.getElementById('earthShadowCanvas');
    if (!shadowCanvas) {
      shadowCanvas = document.createElement('canvas');
      shadowCanvas.id = 'earthShadowCanvas';
      shadowCanvas.style.position = 'absolute';
      shadowCanvas.style.left = canvas.offsetLeft + 'px';
      shadowCanvas.style.top = canvas.offsetTop + 'px';
      shadowCanvas.style.pointerEvents = 'none';
      canvas.parentNode.appendChild(shadowCanvas);
    }

    shadowCanvas.width = canvas.width;
    shadowCanvas.height = canvas.height;

    const ctx = shadowCanvas.getContext('2d');
    ctx.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height);

    if (window.selectedCalculation !== 'totalPowerEarth') return;

    const { centerX, centerY } = window.earthPosition;
    const radius = 19;
    const diameter = radius * 2;

    // Left end: aligns with yellow disk center
    const leftExtent = centerX - radius - radius * 0.5;
    const rightExtent = canvas.width;
    const totalLength = rightExtent - leftExtent;

    // 1. Yellow sunlight background
    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, 'rgba(255, 255, 150, 0.2)');
    grad.addColorStop(1, 'rgba(255, 255, 150, 0.05)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, shadowCanvas.width, shadowCanvas.height);

    // 2. Shadow body
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(leftExtent, centerY - radius, totalLength, diameter);

    // 3. Clear the yellow disk position
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(leftExtent, centerY, radius * 0.5, radius, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.clearRect(leftExtent - radius, centerY - radius, radius * 2, radius * 2);
    ctx.restore();

    // ✅ 4. Shadow cap at right edge — half off-screen
    ctx.beginPath();
    ctx.ellipse(canvas.width, centerY, radius * 0.5, radius, 0, 0, Math.PI * 2);
ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fill();
  }

  window.refreshEarthShadow = drawEarthShadow;
});
