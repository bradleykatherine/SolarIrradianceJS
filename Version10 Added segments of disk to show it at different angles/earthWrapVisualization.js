// earthWrapVisualization.js: Draws full disk, vertical halves, original quadrants, and duplicated quadrants

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

    const spacing = 100;
    const halfGap = 5;
    const groupShift = 100;

    // === 1. Full Disk ===
    const fullDiskCenterX = centerX - 2 * radius - spacing - groupShift;
    ctx.beginPath();
    ctx.ellipse(fullDiskCenterX, centerY, diskWidth, diskHeight, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(230, 190, 0, 1)';
    ctx.stroke();

    // === 2. Vertical Halves ===
    const verticalCenterX = fullDiskCenterX + 2 * diskWidth + 40;

    // LEFT HALF
    ctx.save();
    ctx.beginPath();
    ctx.rect(verticalCenterX - diskWidth - halfGap / 2, centerY - diskHeight, diskWidth, diskHeight * 2);
    ctx.clip();
    ctx.beginPath();
    ctx.ellipse(verticalCenterX, centerY, diskWidth, diskHeight, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // RIGHT HALF
    ctx.save();
    ctx.beginPath();
    ctx.rect(verticalCenterX + halfGap / 2, centerY - diskHeight, diskWidth, diskHeight * 2);
    ctx.clip();
    ctx.beginPath();
    ctx.ellipse(verticalCenterX, centerY, diskWidth, diskHeight, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // === 3. Original Quadrants ===
    const quadCenterX = verticalCenterX + 2 * diskWidth + 50;
    const gapX = -12;
    const gapY = -32;

    const offsetX = diskWidth + gapX / 2;
    const offsetY = diskHeight + gapY / 2;

    const drawQuadrants = (centerBaseX) => {
      const quadrants = [
        { cx: centerBaseX - offsetX, cy: centerY - offsetY, clipX: -diskWidth, clipY: -diskHeight },
        { cx: centerBaseX + offsetX, cy: centerY - offsetY, clipX: 0,          clipY: -diskHeight },
        { cx: centerBaseX - offsetX, cy: centerY + offsetY, clipX: -diskWidth, clipY: 0 },
        { cx: centerBaseX + offsetX, cy: centerY + offsetY, clipX: 0,          clipY: 0 }
      ];

      quadrants.forEach(({ cx, cy, clipX, clipY }) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(cx + clipX, cy + clipY, diskWidth, diskHeight);
        ctx.clip();

        ctx.beginPath();
        ctx.ellipse(cx, cy, diskWidth, diskHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });
    };

    // Draw original quadrant group
    drawQuadrants(quadCenterX);

    // === 4. Duplicated Quadrants ===
    const duplicateOffset = 2 * diskWidth + 50;
    const duplicateCenterX = quadCenterX + duplicateOffset;

    drawQuadrants(duplicateCenterX);
  }

  window.refreshEarthWrapVisualization = drawWrapEllipses;
});
