// earthAbsorbingDisk.js: Draws a yellow absorbing disk directly in front of Earth

document.addEventListener('DOMContentLoaded', () => {
  function drawAbsorbingDisk() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas || !window.earthPosition) {
      setTimeout(drawAbsorbingDisk, 100);
      return;
    }

    let diskCanvas = document.getElementById('earthAbsorbingCanvas');
    if (!diskCanvas) {
      diskCanvas = document.createElement('canvas');
      diskCanvas.id = 'earthAbsorbingCanvas';
      diskCanvas.style.position = 'absolute';
      diskCanvas.style.left = canvas.offsetLeft + 'px';
      diskCanvas.style.top = canvas.offsetTop + 'px';
      diskCanvas.style.pointerEvents = 'none';
      canvas.parentNode.appendChild(diskCanvas);
    }

    diskCanvas.width = canvas.width;
    diskCanvas.height = canvas.height;

    const ctx = diskCanvas.getContext('2d');
    ctx.clearRect(0, 0, diskCanvas.width, diskCanvas.height);

    if (window.selectedCalculation !== 'totalPowerEarth') return;

    const { centerX, centerY } = window.earthPosition;

    const radius = 19;  // ✅ Match Earth shadow's size

    // ✅ Position immediately in front of Earth
    const diskCenterX = centerX - radius - (radius * 0.5);

    // ✅ Ellipse matches shadow cap shape
    ctx.beginPath();
    ctx.ellipse(diskCenterX, centerY, radius * 0.5, radius, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 230, 0, 0.85)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(200, 170, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  window.refreshEarthAbsorbingDisk = drawAbsorbingDisk;
});
