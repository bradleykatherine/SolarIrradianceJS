// earthWrapVisualization.js: Ellipses morphing toward Earth, now clears properly on deselection

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
    ctx.clearRect(0, 0, wrapCanvas.width, wrapCanvas.height); // ✅ always clear

    if (window.selectedCalculation !== 'avgIntensityEarth') return; // ✅ skip drawing if not selected

    const { centerX, centerY } = window.earthPosition;
    const radius = 19;
    const steps = 4;

    const fixedFirstLeftEdge = centerX - 110;

    const ellipses = [];
    const fixedHeight = radius;

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const width = radius * 0.5 + (radius * 0.5 * t);
      ellipses.push({ t, width, height: fixedHeight });
    }

    const totalWidths = ellipses.map(e => e.width * 2);
    const usedWidth = totalWidths.slice(0, -1).reduce((a, b) => a + b, 0);
    const remaining = centerX - fixedFirstLeftEdge - ellipses[steps - 1].width;
    const spacing = (remaining - usedWidth) / (steps - 1);

    let currentLeft = fixedFirstLeftEdge;

    for (let i = 0; i < steps; i++) {
      const { width, height, t } = ellipses[i];
      const x = currentLeft + width;
      const y = centerY;

      ctx.beginPath();
      ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);

      const opacity = 0.7 - t * 0.5;
      ctx.fillStyle = `rgba(255, 255, 0, ${opacity})`;
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(230, 190, 0, ${opacity + 0.2})`;
      ctx.stroke();

      currentLeft += 2 * width + spacing;
    }
  }

  window.refreshEarthWrapVisualization = drawWrapEllipses;
});
