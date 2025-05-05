// earthWrapVisualization.js: Draws yellow disk, gradient circle over Earth, and an arrow between them

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
    const diskWidth = radius * 0.5;
    const diskHeight = radius;

    const gap = 20;

    // ✅ 1. Original full yellow disk (unchanged)
    const fullDiskCenterX = centerX - radius - diskWidth - 2 * gap;

    ctx.beginPath();
    ctx.ellipse(fullDiskCenterX, centerY, diskWidth, diskHeight, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(230, 190, 0, 1)';
    ctx.stroke();

    // ✅ 2. Circle over Earth (radius = diskHeight), gradient from yellow to black
    const circleRadius = diskHeight + 2;

    const gradient = ctx.createLinearGradient(
      centerX - circleRadius, centerY,
      centerX + circleRadius, centerY
    );
    gradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.85)');

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();

    // ✅ 3. Arrow from disk to Earth
    const arrowStartX = fullDiskCenterX + diskWidth;
    const arrowEndX = centerX - circleRadius;
    const arrowY = centerY;

    ctx.beginPath();
    ctx.moveTo(arrowStartX, arrowY);
    ctx.lineTo(arrowEndX, arrowY);
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arrowhead
    const headSize = 6;
    ctx.beginPath();
    ctx.moveTo(arrowEndX, arrowY);
    ctx.lineTo(arrowEndX - headSize, arrowY - headSize / 2);
    ctx.lineTo(arrowEndX - headSize, arrowY + headSize / 2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
    ctx.fill();
  }

  window.refreshEarthWrapVisualization = drawWrapEllipses;
});
