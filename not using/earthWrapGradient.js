// earthWrapGradient.js: Visualizes sunlight intensity spreading across Earth's surface

document.addEventListener('DOMContentLoaded', () => {
  function drawEarthWrapGradient() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas || !window.earthPosition) {
      setTimeout(drawEarthWrapGradient, 100);
      return;
    }

    // Create or reuse overlay canvas
    let wrapCanvas = document.getElementById('earthWrapCanvas');
    if (!wrapCanvas) {
      wrapCanvas = document.createElement('canvas');
      wrapCanvas.id = 'earthWrapCanvas';
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

    // Only draw for the correct dropdown selection
    if (window.selectedCalculation !== 'avgIntensityEarth') return;

    const { centerX, centerY, radius } = window.earthPosition;

    // Create a left-to-right linear gradient across Earth’s diameter
    const grad = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    grad.addColorStop(0.0, 'rgba(0, 0, 0, 0.2)');   // left side (morning) = dim
    grad.addColorStop(0.5, 'rgba(255, 255, 150, 0.25)'); // center = bright
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.2)');   // right side (evening) = dim

    // Mask to Earth circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }

  window.refreshEarthWrapGradient = drawEarthWrapGradient;
});
