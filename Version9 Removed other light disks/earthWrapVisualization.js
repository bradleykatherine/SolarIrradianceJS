// earthWrapVisualization.js: Draws only the original leftmost disk for avgIntensityEarth

document.addEventListener('DOMContentLoaded', () => {
  function drawWrapEllipses() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas || !window.earthPosition) {
      setTimeout(drawWrapEllipses, 100);
      return;
    }

    let wrapCanvas = document.getElementById('earthWrapVisualCanvas');
    if (!wrapCanvas) {
      wrapCanvas = document.createElement('canvas');
      wrapCanvas.id = 'earthWrapVisualCanvas';
      wrapCanvas.style.position = 'absolute';
      wrapCanvas.style.left = canvas.offsetLeft + 'px';
      wrapCanvas.style.top = canvas.offsetTop + 'px';
      wrapCanvas.style.pointerEvents = 'none';
      canvas.parentNode.appendChild(wrapCanvas);
    }

    wrapCanvas.width = canvas.width;
    wrapCanvas.height = canvas.height;

    const ctx = wrapCanvas.getContext('2d');
    ctx.clearRect(0, 0, wrapCanvas.width, wrapCanvas.height);

    if (window.selectedCalculation !== 'avgIntensityEarth') return;

    const { centerX, centerY } = window.earthPosition;
    const radius = 19;

    const width = radius * 0.5; // ✅ Original horizontal radius
    const height = radius;      // ✅ Original vertical radius

    const spacing = 100; // Space between disk and Earth
    const diskCenterX = centerX - 2 * radius - spacing;

    ctx.beginPath();
    ctx.ellipse(diskCenterX, centerY, width, height, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(230, 190, 0, 1)';
    ctx.stroke();
  }

  window.refreshEarthWrapVisualization = drawWrapEllipses;
});
